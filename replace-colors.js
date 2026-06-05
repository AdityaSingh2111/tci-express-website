const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
  { regex: /\[#0052CC\]/g, replacement: 'brand-blue' },
  { regex: /\[#DC2626\]/g, replacement: 'brand-red' },
  { regex: /\[#E53E3E\]/g, replacement: 'brand-red' }, // Catch old red too
  { regex: /\[#00102A\]/g, replacement: 'brand-navy' },
  { regex: /\[#0D1117\]/g, replacement: 'background-dark' },
  { regex: /\[#1F2937\]/g, replacement: 'gray-800' }, // Standardize dark gray
];

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach((file) => {
      const fullPath = path.join(directory, file);
      fs.stat(fullPath, (err, stats) => {
        if (stats.isDirectory()) {
          processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
          fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) return console.log(err);
            
            let result = data;
            let changed = false;

            replacements.forEach(({regex, replacement}) => {
              if (result.match(regex)) {
                result = result.replace(regex, replacement);
                changed = true;
              }
            });

            if (changed) {
              fs.writeFile(fullPath, result, 'utf8', (err) => {
                 if (err) return console.log(err);
                 console.log(`Updated ${fullPath}`);
              });
            }
          });
        }
      });
    });
  });
}

processDirectory(directoryPath);
