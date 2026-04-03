const https = require('https');
const fs = require('fs');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Saved ${dest}`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  await downloadFile('https://ui-avatars.com/api/?name=%E4%B9%90&background=E8721C&color=fff&size=192&font-size=0.5', 'public/icon-192.png');
  await downloadFile('https://ui-avatars.com/api/?name=%E4%B9%90&background=E8721C&color=fff&size=512&font-size=0.5', 'public/icon-512.png');
}

run().catch(console.error);
