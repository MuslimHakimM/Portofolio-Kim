import fs from 'fs';
import path from 'path';

const userUploadedDir = 'C:\\Users\\Lim\\.gemini\\antigravity-ide\\brain\\55d006f9-9cd4-489c-b899-bf18144e34f3\\.user_uploaded';
const targetDir = path.resolve('public', 'assets', 'certificates');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = [
  { src: 'media_1792683794113.pdf', dest: 'cert_bangkit.pdf' },
  { src: 'media_1792683848843.pdf', dest: 'cert_android_fundamental.pdf' },
  { src: 'media_1792683882911.pdf', dest: 'cert_android_intermediate.pdf' },
  { src: 'media_1792683919612.pdf', dest: 'cert_kotlin.pdf' },
  { src: 'media_1792683973421.pdf', dest: 'cert_git.pdf' }
];

files.forEach(({ src, dest }) => {
  const srcPath = path.join(userUploadedDir, src);
  const destPath = path.join(targetDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${destPath}`);
  } else {
    console.warn(`Source not found: ${srcPath}`);
  }
});
