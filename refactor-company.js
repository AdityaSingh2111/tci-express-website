const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  "src/components/seo/SeoContentBlock.tsx",
  "src/components/layout/Navbar.tsx",
  "src/components/layout/MobileBottomNav.tsx",
  "src/components/layout/Footer.tsx",
  "src/components/layout/FloatingWhatsAppButton.tsx",
  "src/components/home/EmergencyContactBanner.tsx",
  "src/components/home/FinalCta.tsx",
  "src/components/home/HeroSection.tsx",
  "src/components/home/CoverageAcrossIndia.tsx",
  "src/components/gallery/GalleryPreview.tsx",
  "src/app/blog/[slug]/page.tsx",
  "src/components/shared/TestimonialCard.tsx"
];

filesToUpdate.forEach(relativePath => {
  const fullPath = path.join(__dirname, relativePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace import
    if (content.includes("import { companyInfo } from '@/data/company';")) {
      content = content.replace(
        "import { companyInfo } from '@/data/company';",
        "import { companyConfig } from '@/config/company';\nimport { contactConfig } from '@/config/contact';"
      );
    }

    // Replace usages
    content = content.replace(/companyInfo\.brandName/g, 'companyConfig.brandName');
    content = content.replace(/companyInfo\.legalName/g, 'companyConfig.legalName');
    content = content.replace(/companyInfo\.tagline/g, 'companyConfig.tagline');
    content = content.replace(/companyInfo\.address/g, 'companyConfig.headOfficeAddress');
    
    content = content.replace(/companyInfo\.phone/g, 'contactConfig.phone');
    content = content.replace(/companyInfo\.whatsapp/g, 'contactConfig.whatsapp');
    content = content.replace(/companyInfo\.email/g, 'contactConfig.supportEmail');

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${fullPath}`);
  }
});
