const https = require('https');
const fs = require('fs');

async function downloadUnsplash(query, filename) {
  return new Promise((resolve, reject) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          let imgUrl = null;
          if (json.results && json.results.length > 0) {
            // Pick the first horizontal or generic image
            let img = json.results.find(r => r.width > r.height) || json.results[0];
            imgUrl = img.urls.regular;
          }
          
          if (!imgUrl) {
            console.log("No image found for", query);
            resolve(false);
            return;
          }

          console.log(`Downloading ${imgUrl} to ${filename}`);
          https.get(imgUrl, (imgRes) => {
            const fileStream = fs.createWriteStream(filename);
            imgRes.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              console.log(`Saved ${filename}`);
              resolve(true);
            });
          }).on('error', err => reject(err));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', err => reject(err));
  });
}

async function run() {
  await downloadUnsplash('asian elderly care', 'public/hero.png');
  await downloadUnsplash('nurse training asian', 'public/training.png');
  await downloadUnsplash('doctor home visit asian', 'public/service.png');
}

run().catch(console.error);
