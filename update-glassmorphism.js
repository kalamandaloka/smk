const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./apps/frontend/app/dashboard', function(filePath) {
  if (filePath.endsWith('.tsx') && filePath !== 'apps\\frontend\\app\\dashboard\\page.tsx' && filePath !== 'apps/frontend/app/dashboard/page.tsx') {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace typical solid white backgrounds with glassmorphism
    content = content.replace(/className="bg-white border rounded/g, 'className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm');
    content = content.replace(/className="bg-white p-4 border rounded/g, 'className="bg-white/60 backdrop-blur-lg p-4 border border-white/50 rounded-2xl shadow-sm');
    
    // Some buttons
    content = content.replace(/className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700/g, 'className="bg-blue-600/80 backdrop-blur-md text-white py-2 px-4 rounded-xl hover:bg-blue-600 shadow-md border border-blue-500/50 transition-all');
    content = content.replace(/className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"/g, 'className="bg-blue-600/80 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-blue-600 shadow-md border border-blue-500/50 transition-all"');
    
    // Tables headers
    content = content.replace(/className="bg-gray-50"/g, 'className="bg-white/40"');
    
    // inputs
    content = content.replace(/className="border p-2 rounded w-full"/g, 'className="border border-white/50 bg-white/50 p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"');
    content = content.replace(/className="border p-2 rounded"/g, 'className="border border-white/50 bg-white/50 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"');

    fs.writeFileSync(filePath, content, 'utf8');
  }
});
