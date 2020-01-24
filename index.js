const pw = require('playwright');
const iPhone11 = pw.devices['iPhone 11 Pro'];

(async () => {
  const browser = await pw.webkit.launch();
  const context = await browser.newContext({
    viewport: iPhone11.viewport,
    userAgent: iPhone11.userAgent,
    geolocation: { longitude: 12.492507, latitude: 41.889938 },
    permissions: { 'https://www.google.com': ['geolocation'] }
  });

  const page = await context.newPage('https://maps.google.com');
  await page.click('text="Your location"');
  await page.waitForRequest(/.*preview\/pwa/);
  await page.screenshot({ path: 'colosseum-iphone.png' });  
  console.log('DONE!!');
  await browser.close();
})();