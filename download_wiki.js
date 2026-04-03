const https = require('https');
const fs = require('fs');

async function getWikiImage(query, filename) {
  return new Promise((resolve, reject) => {
    // 1. Search for a page
    const searchUrl = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=imageinfo&iiprop=url`;
    
    https.get(searchUrl, { headers: { 'User-Agent': 'Node.js' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.query || !json.query.pages) {
            console.log("No wiki image found for", query);
            resolve(false);
            return;
          }
          
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const imgUrl = pages[pageId].imageinfo[0].url;
          
          console.log(`Downloading ${imgUrl} to ${filename}`);
          https.get(imgUrl, { headers: { 'User-Agent': 'Node.js' } }, (imgRes) => {
            // Handle redirects if any
            if (imgRes.statusCode === 301 || imgRes.statusCode === 302) {
                https.get(imgRes.headers.location, { headers: { 'User-Agent': 'Node.js' } }, (imgRes2) => {
                    saveStream(imgRes2, filename, resolve, reject);
                });
            } else {
                saveStream(imgRes, filename, resolve, reject);
            }
          }).on('error', err => reject(err));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', err => reject(err));
  });
}

function saveStream(res, filename, resolve, reject) {
    const fileStream = fs.createWriteStream(filename);
    res.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close();
      console.log(`Saved ${filename}`);
      resolve(true);
    });
}

async function run() {
  await getWikiImage('Chinese elderly care', 'public/hero.png');
  await getWikiImage('Nurse training China', 'public/training.png');
  await getWikiImage('Asian elderly at home', 'public/service.png');
}

run().catch(console.error);
