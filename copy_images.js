const fs = require('fs');
const path = require('path');

const srcDir = path.join('C:', 'Users', 'hp', '.gemini', 'antigravity', 'brain', 'f3480b68-816c-4c1d-aa56-32792587ed82');
const destDir = path.join(__dirname, 'public');

const filesToCopy = [
    { src: 'caregiver_wang_1773452828729.png', dest: 'wang.png' },
    { src: 'caregiver_li_1773452862707.png', dest: 'li.png' },
    { src: 'caregiver_zhang_1773452879809.png', dest: 'zhang.png' },
    { src: 'hero_elderly_care_1773452367737.png', dest: 'hero.png' },
    { src: 'service_home_1773452460797.png', dest: 'service.png' },
    { src: 'training_class_1773452384771.png', dest: 'training.png' }
];

filesToCopy.forEach(file => {
    const srcPath = path.join(srcDir, file.src);
    const destPath = path.join(destDir, file.dest);
    try {
        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file.src} to ${file.dest}`);
        } else {
            console.error(`Source file not found: ${srcPath}`);
        }
    } catch (err) {
        console.error(`Error copying ${file.src}:`, err);
    }
});
