# Accessibility Analyzer 🌐♿

A comprehensive full-stack web application for analyzing website accessibility and simulating various vision conditions.

## 🎯 Features

### 1️⃣ Vision Simulation
- **Color Vision Simulation**: Experience how users with color blindness see your website
  - Protanopia (red-blind)
  - Deuteranopia (green-blind)
  - Tritanopia (blue-blind)
  - Protanomaly, Deuteranomaly, Tritanomaly
  - Achromatopsia (complete color blindness)

- **Low Vision Simulation**: Understand challenges faced by users with low vision
  - Blurred vision
  - Cataracts
  - Low contrast sensitivity
  - Tunnel vision (peripheral vision loss)
  - Macular degeneration (central vision loss)
  - Diabetic retinopathy

- **Magnification Tool**: Interactive magnifying glass for detailed inspection

### 2️⃣ Accessibility Checker (Coming Soon)
- Automated scanning for WCAG violations
- Missing alt text detection
- Color contrast analysis
- Heading structure validation
- ARIA label verification
- Keyboard navigation testing

### 3️⃣ AI-Powered Suggestions (Coming Soon)
- Intelligent recommendations for fixing accessibility issues
- Context-aware solutions
- Best practice guidance

### 4️⃣ Dashboard & Reporting (Coming Soon)
- Comprehensive accessibility scores
- Visual issue highlighting
- Exportable reports (PDF/CSV)

## 🛠️ Tech Stack

### Frontend
- **React** (v19.1.1) - UI framework
- **Canvas API** - Image processing and simulation
- **CSS3** - Modern, responsive styling

### Backend
- **Node.js** + **Express** (v5.1.0) - REST API
- **Puppeteer** (v24.22.3) - Headless browser for screenshots
- **Axe-core** (v4.10.3) - Accessibility testing engine
- **MongoDB** + **Mongoose** - Database (ready for integration)

## 📁 Project Structure

```
accessibility-analyzer/
├── frontend/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── VisionSimulator.js
│   │   │   └── VisionSimulator.css
│   │   ├── utils/           # Utility functions
│   │   │   ├── colorVisionSimulation.js
│   │   │   └── lowVisionSimulation.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── backend/                  # Node.js backend
│   ├── routes/              # API routes
│   │   ├── analysis.js      # Accessibility analysis endpoints
│   │   └── screenshot.js    # Screenshot capture endpoints
│   ├── server.js            # Express server
│   ├── .env.example         # Environment variables template
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (optional, for future features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Priyadarshini-K176/accessibility-analyzer.git
   cd accessibility-analyzer
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure Environment Variables**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Running the Application

1. **Start the Backend Server** (Terminal 1)
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   # App opens at http://localhost:3000
   ```

3. **Access the Application**
   - Open your browser to `http://localhost:3000`
   - The backend API is available at `http://localhost:5000`

## 📖 Usage Guide

### Vision Simulation

1. **Load a Website**
   - Enter a URL in the input field and click "Load URL"
   - OR upload a screenshot using "Upload Screenshot"

2. **Choose Simulation Type**
   - Select "Color Vision" or "Low Vision" category
   - Pick a specific condition from the dropdown

3. **Adjust Settings**
   - For low vision simulations, adjust the intensity slider
   - Enable the magnifier for detailed inspection

4. **Learn About Conditions**
   - View detailed information about each vision condition
   - Understand prevalence and characteristics

### API Endpoints

#### Screenshot Capture
```http
POST /api/screenshot/capture
Content-Type: application/json

{
  "url": "https://example.com",
  "fullPage": true
}
```

#### Accessibility Analysis
```http
POST /api/analysis/url
Content-Type: application/json

{
  "url": "https://example.com"
}
```

#### Violation Help
```http
GET /api/analysis/violation-help/:ruleId
```

## 🔧 Development

### Backend Development Mode
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # Hot reload enabled
```

### Running Tests
```bash
# Frontend tests
cd frontend
npm test

# Backend tests (to be implemented)
cd backend
npm test
```

## 🎨 Customization

### Adding New Vision Simulations

1. Add transformation matrix to `colorVisionSimulation.js` or algorithm to `lowVisionSimulation.js`
2. Update the info object with condition details
3. Add the type to the component's type list

### Styling
- Modify `VisionSimulator.css` for component-specific styles
- Update `App.css` for global styles
- All styles use modern CSS with flexbox/grid

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Roadmap

- [x] Vision simulation (color blindness & low vision)
- [x] Screenshot capture API
- [x] Basic accessibility analysis API
- [ ] Complete accessibility checker with detailed reports
- [ ] Screen reader simulation
- [ ] Keyboard navigation testing
- [ ] MongoDB integration for saving reports
- [ ] User authentication
- [ ] AI-powered suggestions (OpenAI integration)
- [ ] PDF/CSV report export
- [ ] Chrome extension
- [ ] Batch URL analysis

## 🐛 Known Issues

- CORS may need configuration for certain URLs
- Large screenshots may take time to process
- Some simulations are approximations (especially color blindness)

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Priyadarshini K - [GitHub](https://github.com/Priyadarshini-K176)

## 🙏 Acknowledgments

- [Axe-core](https://github.com/dequelabs/axe-core) for accessibility testing
- [Puppeteer](https://pptr.dev/) for browser automation
- Color blindness simulation matrices based on research by [Machado et al.](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html)

## 📧 Support

For support, email priyadarshini.k176@example.com or open an issue on GitHub.

---

Made with ❤️ for a more accessible web