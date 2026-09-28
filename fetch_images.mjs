import fs from 'fs';
import path from 'path';
import https from 'https';

const plantsData = [
  { id: 1, name: "Monstera Deliciosa", wiki: "Monstera_deliciosa" },
  { id: 2, name: "Fiddle Leaf Fig", wiki: "Ficus_lyrata" },
  { id: 3, name: "Rubber Plant", wiki: "Ficus_elastica" },
  { id: 4, name: "Bird of Paradise", wiki: "Strelitzia" },
  { id: 5, name: "Alocasia Polly", wiki: "Alocasia_amazonica" },
  { id: 6, name: "ZZ Plant", wiki: "Zamioculcas" },
  { id: 7, name: "Snake Plant", wiki: "Dracaena_trifasciata" },
  { id: 8, name: "Cast Iron Plant", wiki: "Aspidistra_elatior" },
  { id: 9, name: "Golden Pothos", wiki: "Epipremnum_aureum" },
  { id: 10, name: "Parlor Palm", wiki: "Chamaedorea_elegans" },
  { id: 11, name: "Peace Lily", wiki: "Spathiphyllum" },
  { id: 12, name: "Spider Plant", wiki: "Chlorophytum_comosum" },
  { id: 13, name: "English Ivy", wiki: "Hedera_helix" },
  { id: 14, name: "Boston Fern", wiki: "Nephrolepis_exaltata" },
  { id: 15, name: "Bamboo Palm", wiki: "Chamaedorea_seifrizii" },
  { id: 16, name: "Calathea Ornata", wiki: "Calathea_ornata" },
  { id: 17, name: "Peperomia Obtusifolia", wiki: "Peperomia_obtusifolia" },
  { id: 18, name: "Ponytail Palm", wiki: "Beaucarnea_recurvata" },
  { id: 19, name: "African Violet", wiki: "Saintpaulia" },
  { id: 20, name: "Money Tree", wiki: "Pachira_aquatica" },
  { id: 21, name: "Aloe Vera", wiki: "Aloe_vera" },
  { id: 22, name: "Jade Plant", wiki: "Crassula_ovata" },
  { id: 23, name: "Haworthia", wiki: "Haworthia" },
  { id: 24, name: "Philodendron Micans", wiki: "Philodendron_hederaceum" },
  { id: 25, name: "String of Pearls", wiki: "Senecio_rowleyanus" }
];

const headers = { 'User-Agent': 'PlantoraApp/1.0 (contact@plantora.com)' };

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Simple redirect handling just in case
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

async function main() {
  const publicPlantsDir = path.join(process.cwd(), 'public', 'plants');
  if (!fs.existsSync(publicPlantsDir)) {
    fs.mkdirSync(publicPlantsDir, { recursive: true });
  }

  let dataJsPath = path.join(process.cwd(), 'src', 'data.js');
  let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

  const delay = ms => new Promise(res => setTimeout(res, ms));

  for (let plant of plantsData) {
    const slug = plant.name.toLowerCase().replace(/ /g, '_');
    const localPath = `/plants/${slug}.jpg`;
    const absolutePath = path.join(publicPlantsDir, `${slug}.jpg`);
    
    console.log(`Processing ${plant.name}...`);
    
    try {
      const apiURL = `https://en.wikipedia.org/w/api.php?action=query&titles=${plant.wiki}&prop=pageimages&format=json&pithumbsize=500`;
      const res = await fetch(apiURL, { headers });
      const data = await res.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      
      let imageUrl = null;
      if (pages[pageId].thumbnail) {
        imageUrl = pages[pageId].thumbnail.source;
      }
      
      if (imageUrl) {
        await downloadImage(imageUrl, absolutePath);
        console.log(`Downloaded image for ${plant.name}`);
        
        // Update data.js content
        const regex = new RegExp(`(name:\\s*"${plant.name}",[\\s\\S]*?image:\\s*)"([^"]+)"`, 'g');
        dataJsContent = dataJsContent.replace(regex, `$1"${localPath}"`);
      } else {
        console.log(`No image found on Wiki for ${plant.name}, leaving as is.`);
      }
    } catch (e) {
      console.error(`Failed to process ${plant.name}: ${e.message}`);
    }
    
    await delay(500); // polite delay
  }

  fs.writeFileSync(dataJsPath, dataJsContent);
  console.log('Finished updating data.js with local Wikipedia images.');
}

main();
