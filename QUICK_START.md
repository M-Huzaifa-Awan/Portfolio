# 🚀 Quick Start Guide

## Step 1: Install Dependencies

Open your terminal in the Portfolio folder and run:

```bash
npm install
```

This will install all required packages:
- React
- Framer Motion (for animations)
- React Icons

## Step 2: Start Development Server

```bash
npm start
```

The app will automatically open at `http://localhost:3000`

## Step 3: Customize Your Portfolio

### Update Contact Email
1. Open `src/components/Contact.js`
2. Find `mailto:your-email@example.com` (around line 30)
3. Replace with your actual email

### Update Social Media Links
1. Open `src/components/Hero.js`
2. Update the URLs for GitHub, LinkedIn, and Twitter (around lines 80-95)
3. Also update in `src/components/Contact.js` (around line 100)

### Update About Section
1. Open `src/components/About.js`
2. Modify the text in the `about-text` section
3. Update skills and technologies as needed

### Update Projects
1. Open `src/components/Projects.js`
2. Modify the projects array to match your projects
3. Ensure PDF filenames match the files in the `public` folder

## Step 4: Build for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `build` folder that you can deploy to any hosting service.

## 📁 PDF Files Location

All PDF files should be in the `public` folder:
- ✅ `APEX INTELLIGENCE0.pdf`
- ✅ `Huzaifa_Awan_CV.pdf`
- ✅ `kiosk.pdf`
- ✅ `Multilingual Dashboard.pdf`
- ✅ `Multilingual Website Builder.pdf`

## 🎨 Features to Explore

- **Particle Background**: Interactive animated particles
- **Smooth Animations**: Scroll-triggered animations throughout
- **Responsive Design**: Test on different screen sizes
- **Interactive Cards**: Hover over project cards for effects
- **Contact Form**: Fully functional with animations

## 🐛 Troubleshooting

**Port 3000 already in use?**
- Kill the process or use: `set PORT=3001 && npm start`

**PDFs not loading?**
- Make sure they're in the `public` folder
- Check that filenames match exactly (case-sensitive)

**Animations not working?**
- Make sure all dependencies are installed
- Check browser console for errors

---

Enjoy your awesome portfolio! 🎉
