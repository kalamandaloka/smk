import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private prisma: PrismaService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    
    return next.handle().pipe(
      tap(() => {
        // Hanya catat metode mutasi
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
          const userId = req.user?.sub || null;
          
          this.prisma.auditLog.create({
            data: {
              userId,
              action: req.method,
              method: req.method,
              path: req.url,
              statusCode: res.statusCode,
              metadata: {
                body: req.body,
                query: req.query,
              }
            }
          }).catch(err => {
            // Abaikan error audit agar tidak memblokir response
            console.error('Failed to write audit log:', err);
          });
        }
      }),
    );
  }
}
