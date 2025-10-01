# Quick Start Guide 🚀

Get your Accessibility Analyzer up and running in 5 minutes!

## Step 1: Install Backend Dependencies

Open your terminal and navigate to the backend folder:

```bash
cd backend
npm install
```

This will install:
- Express (web server)
- Puppeteer (browser automation)
- Axe-core (accessibility testing)
- CORS (cross-origin support)
- Mongoose (MongoDB ODM)

## Step 2: Install Frontend Dependencies

In a new terminal, navigate to the frontend folder:

```bash
cd frontend
npm install
```

This will install:
- React and React DOM
- Testing libraries
- Web vitals

## Step 3: Start the Backend Server

In the backend terminal:

```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:5000
```

**Note:** The first time Puppeteer runs, it will download Chromium (~150MB). This is normal and only happens once.

## Step 4: Start the Frontend

In the frontend terminal:

```bash
npm start
```

Your browser should automatically open to `http://localhost:3000`

If it doesn't, manually navigate to: **http://localhost:3000**

## Step 5: Try It Out!

### Option A: Load a Website URL
1. Enter a URL like `https://example.com` in the input field
2. Click "Load URL"
3. Wait for the screenshot to load

### Option B: Upload a Screenshot
1. Click "Upload Screenshot"
2. Select an image file from your computer
3. The image will load instantly

### Option C: Test with a Local File
For quick testing, you can upload any image from your computer to see the simulations work.

## Using the Simulator

1. **Choose Simulation Category:**
   - Click "Color Vision" for color blindness simulations
   - Click "Low Vision" for blur, cataracts, etc.

2. **Select Condition:**
   - Use the dropdown to choose a specific condition
   - Examples: Protanopia, Deuteranopia, Blur, Cataracts

3. **Adjust Intensity (Low Vision only):**
   - Drag the slider to change severity
   - 0% = minimal effect, 100% = maximum effect

4. **Enable Magnifier:**
   - Check the "Enable Magnifier" box
   - Hover over the image to see a 2x zoom

5. **Read Information:**
   - The right panel shows details about each condition
   - Learn about prevalence and characteristics

## Troubleshooting

### Backend won't start
- **Error: Port 5000 in use**
  - Another app is using port 5000
  - Change the port in `backend/server.js` (line 3)
  - Or stop the other application

- **Error: Cannot find module**
  - Run `npm install` again in the backend folder
  - Make sure you're in the correct directory

### Frontend won't start
- **Error: Port 3000 in use**
  - Press `Y` when asked to use a different port
  - Or stop the other application using port 3000

- **Blank page**
  - Check the browser console (F12) for errors
  - Make sure the backend is running

### Image won't load
- **"Failed to load image" error**
  - Make sure the backend is running on port 5000
  - Check if the URL is accessible
  - Try uploading a local screenshot instead

- **CORS error**
  - Some websites block screenshots
  - Try a different URL or upload a screenshot

### Simulation not working
- **Image loads but simulation doesn't apply**
  - Check browser console for errors
  - Try refreshing the page
  - Make sure you selected a simulation type

## Next Steps

Once you have the simulator working:

1. **Test Different Websites:**
   - Try your own website
   - Test popular sites
   - Compare accessibility

2. **Explore All Simulations:**
   - Try each color blindness type
   - Test all low vision conditions
   - Adjust intensity levels

3. **Share Findings:**
   - Take screenshots of simulations
   - Share with your team
   - Improve your website's accessibility

## Development Mode

For development with auto-reload:

### Backend (with nodemon)
```bash
cd backend
npm run dev
```

### Frontend (already has hot reload)
```bash
cd frontend
npm start
```

## Testing the API Directly

You can test the backend API using curl or Postman:

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Capture Screenshot
```bash
curl -X POST http://localhost:5000/api/screenshot/capture \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### Analyze Accessibility
```bash
curl -X POST http://localhost:5000/api/analysis/url \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## Common Commands Reference

| Action | Command | Directory |
|--------|---------|-----------|
| Install backend deps | `npm install` | backend/ |
| Install frontend deps | `npm install` | frontend/ |
| Start backend | `npm start` | backend/ |
| Start frontend | `npm start` | frontend/ |
| Backend dev mode | `npm run dev` | backend/ |
| Run frontend tests | `npm test` | frontend/ |

## Need Help?

- Check the main [README.md](README.md) for detailed documentation
- Look at the code comments for implementation details
- Open an issue on GitHub if you find bugs

---

Happy testing! 🎉 Make the web more accessible for everyone! ♿
