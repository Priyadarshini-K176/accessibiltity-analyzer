const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

// Analyze URL for accessibility issues
router.post('/url', async (req, res) => {
  const { url } = req.body;

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

    // Set realistic user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.setViewport({ width: 1920, height: 1080 });

    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    });

    // Navigate with retry logic
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (navError) {
      console.log('Retrying with domcontentloaded...');
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    }

    // Run axe-core accessibility tests
    const results = await new AxePuppeteer(page).analyze();

    // Extract additional information
    const pageInfo = await page.evaluate(() => {
      return {
        title: document.title,
        lang: document.documentElement.lang,
        hasH1: !!document.querySelector('h1'),
        imageCount: document.querySelectorAll('img').length,
        imagesWithoutAlt: document.querySelectorAll('img:not([alt])').length,
        linksCount: document.querySelectorAll('a').length,
        formsCount: document.querySelectorAll('form').length
      };
    });

    await browser.close();

    res.json({
      success: true,
      url,
      timestamp: new Date().toISOString(),
      pageInfo,
      violations: results.violations,
      passes: results.passes,
      incomplete: results.incomplete,
      summary: {
        violationCount: results.violations.length,
        passCount: results.passes.length,
        incompleteCount: results.incomplete.length
      }
    });

  } catch (error) {
    if (browser) {
      try {
        await browser.close();
      } catch (closeError) {
        console.error('Error closing browser:', closeError);
      }
    }
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze URL', 
      message: error.message,
      suggestion: 'This website may block automated browsers. Try a different URL.'
    });
  }
});

// Get detailed information about a specific violation
router.get('/violation-help/:ruleId', (req, res) => {
  const { ruleId } = req.params;
  
  // This can be expanded with a comprehensive database of fixes
  const helpDatabase = {
    'color-contrast': {
      title: 'Color Contrast',
      description: 'Elements must have sufficient color contrast',
      wcagLevel: 'AA',
      wcagCriteria: '1.4.3',
      howToFix: [
        'Ensure text has a contrast ratio of at least 4.5:1 for normal text',
        'Ensure text has a contrast ratio of at least 3:1 for large text (18pt+)',
        'Use online contrast checkers to verify colors',
        'Consider using darker text or lighter backgrounds'
      ]
    },
    'image-alt': {
      title: 'Image Alt Text',
      description: 'Images must have alternate text',
      wcagLevel: 'A',
      wcagCriteria: '1.1.1',
      howToFix: [
        'Add descriptive alt text to all images',
        'Use alt="" for decorative images',
        'Describe the content and function of the image',
        'Keep alt text concise but meaningful'
      ]
    },
    'label': {
      title: 'Form Labels',
      description: 'Form elements must have labels',
      wcagLevel: 'A',
      wcagCriteria: '1.3.1, 4.1.2',
      howToFix: [
        'Associate labels with form controls using for/id attributes',
        'Use aria-label or aria-labelledby for custom controls',
        'Ensure all inputs have accessible names',
        'Use fieldset and legend for radio/checkbox groups'
      ]
    }
  };

  const help = helpDatabase[ruleId] || {
    title: ruleId,
    description: 'Accessibility issue detected',
    howToFix: ['Refer to WCAG guidelines for specific remediation steps']
  };

  res.json(help);
});

module.exports = router;