const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) return console.log('Unable to scan directory: ' + err);
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

            // Handle companyInfo
            if (result.includes("import { companyInfo } from '@/data/company';") || result.includes('import { companyInfo } from "@/data/company";')) {
              result = result.replace(/import \{ companyInfo \} from ['"]@\/data\/company['"];/g, "import { companyConfig } from '@/config/company';\nimport { contactConfig } from '@/config/contact';");
              result = result.replace(/companyInfo\.brandName/g, 'companyConfig.brandName');
              result = result.replace(/companyInfo\.legalName/g, 'companyConfig.legalName');
              result = result.replace(/companyInfo\.tagline/g, 'companyConfig.tagline');
              result = result.replace(/companyInfo\.address/g, 'companyConfig.headOfficeAddress');
              result = result.replace(/companyInfo\.phone/g, 'contactConfig.phone');
              result = result.replace(/companyInfo\.whatsapp/g, 'contactConfig.whatsapp');
              result = result.replace(/companyInfo\.email/g, 'contactConfig.supportEmail');
              changed = true;
            }

            // Handle seoConfig
            if (result.includes("import { seoConfig } from '@/data/seo';") || result.includes('import { seoConfig } from "@/data/seo";')) {
              result = result.replace(/import \{ seoConfig \} from ['"]@\/data\/seo['"];/g, "import { seoConfig } from '@/config/seo';");
              changed = true;
            }

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

processDirectory(srcDir);
