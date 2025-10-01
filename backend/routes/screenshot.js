const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');

// Capture screenshot of a URL
router.post('/capture', async (req, res) => {
  const { url, fullPage = true } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--disable-blink-features=AutomationControlled'
      ],
      ignoreHTTPSErrors: true,
      protocolTimeout: 60000
    });

    const page = await browser.newPage();
    
    // Set a realistic user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    });

    // Navigate with better error handling
try {
  await page.goto(url, { 
    waitUntil: 'networkidle0',
    timeout: 30000 
  });
} catch (navError) {
  // Try with domcontentloaded if networkidle fails
  console.log('Retrying with domcontentloaded...');
  await page.goto(url, { 
    waitUntil: 'domcontentloaded',
    timeout: 30000 
  });
}

// Wait a bit for dynamic content
await new Promise(resolve => setTimeout(resolve, 2000));

    // Capture screenshot
    const screenshot = await page.screenshot({
      encoding: 'base64',
      fullPage: fullPage,
      type: 'png'
    });

    await browser.close();

    res.json({
      success: true,
      screenshot: `data:image/png;base64,${screenshot}`,
      url,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    
    console.error('Screenshot error:', error);
    
    // Send more helpful error message
    res.status(500).json({ 
      error: 'Failed to capture screenshot',
      message: error.message,
      suggestion: 'This website may block automated browsers. Try a different URL or upload a screenshot instead.'
    });
  }
});

module.exports = router;