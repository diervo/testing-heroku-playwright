const pw = require('playwright');
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const engines = ['chromium', 'firefox', 'webkit'];

app.get('/', (req, res) => {
  res.send(`
  <a href="/test/chromium">Test Chromium</a>
  <a href="/test/firefox">Test Firefox</a>
  <a href="/test/webkit">Test Webkit</a>
  `);
});

app.get('/test/:browserName', async (req, res) => {
  const name = req.params.browserName;
  console.log(`Testing browser engine: ${name}`);
  if (!engines.includes(name)) {
    return res.send(`Not available engine ${name}`);
  }

  try {
    const browser = await pw[name].launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const context = await browser.newContext();
    const page = await context.newPage('http://whatsmyuseragent.org/');
    
    await page.screenshot({ path: `example-${name}.png` });
    await browser.close();
    console.log(`Testing ${name} successfull!`);
    res.send('DONE');
  } catch(err) {
    console.log(err);
    res.send(err + '');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))