const https = require('https');
const http = require('http');
const fs = require('fs');
const { URL } = require('url');

async function downloadFallback(urlString, filename) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(urlString);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    client.get(urlString, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303 || res.statusCode === 307 || res.statusCode === 308) {
          const redirectUrl = new URL(res.headers.location, urlString).href;
          downloadFallback(redirectUrl, filename).then(resolve).catch(reject);
      } else if (res.statusCode >= 200 && res.statusCode < 300) {
          const fileStream = fs.createWriteStream(filename);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Saved ${filename}`);
            resolve(true);
          });
      } else {
          reject(new Error(`Failed to download ${urlString}, status: ${res.statusCode}`));
      }
    }).on('error', err => reject(err));
  });
}

async function run() {
  await downloadFallback('https://loremflickr.com/1200/800/elderly,asian', 'public/hero.png');
  await downloadFallback('https://loremflickr.com/1200/800/nurse,asian', 'public/training.png');
  await downloadFallback('https://loremflickr.com/1200/800/caregiver,asian', 'public/service.png');
}

run().catch(console.error);
