const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Navbar.tsx', 'utf8');

const targetStr = '<div className="hidden md:flex items-center gap-2">\n            <div className="hidden md:flex items-center gap-2">';
const replaceStr = '<div className="hidden md:flex items-center gap-2">';

if (code.includes(targetStr)) {
  code = code.replace(targetStr, replaceStr);
  fs.writeFileSync('src/components/layout/Navbar.tsx', code);
  console.log("Replaced duplicate div successfully.");
} else {
  // If we can't find exact whitespace, use regex
  const regex = /<div className="hidden md:flex items-center gap-2">\s*<div className="hidden md:flex items-center gap-2">/g;
  if (regex.test(code)) {
    code = code.replace(regex, '<div className="hidden md:flex items-center gap-2">');
    fs.writeFileSync('src/components/layout/Navbar.tsx', code);
    console.log("Replaced duplicate div with regex successfully.");
  } else {
    console.log("Duplicate div not found!");
  }
}
