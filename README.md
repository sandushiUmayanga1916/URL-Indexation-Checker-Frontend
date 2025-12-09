# URL Indexation Checker - Frontend Dashboard

React + Tailwind CSS dashboard for monitoring URL indexation status with real-time statistics, color-coded display, and manual trigger capabilities.

---

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **axios** - HTTP client for API calls

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx     # Main dashboard component
│   │   └── URLTable.jsx      # URL list table component
│   ├── services/
│   │   └── api.js            # API integration service
│   ├── App.jsx               # Root component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── postcss.config.cjs        # PostCSS configuration
├── tailwind.config.cjs       # Tailwind configuration
└── package.json              # Dependencies
```

---

## 🚀 Installation

### Prerequisites
- Node.js v16 or higher
- npm v7 or higher
- Backend server running on port 5000

### Setup Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.6",
    "postcss": "^8.4.32",
    "autoprefixer": "^10.4.16",
    "vite": "^5.0.8"
  }
}
```

### Install All Dependencies
```bash
npm install react react-dom axios lucide-react
npm install -D tailwindcss@3.3.6 postcss@8.4.32 autoprefixer@10.4.16 @vitejs/plugin-react vite
```

---

## ⚙️ Configuration

### Vite Configuration
File: `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
```

### Tailwind Configuration
File: `tailwind.config.cjs` (must be .cjs)

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### PostCSS Configuration
File: `postcss.config.cjs` (must be .cjs)

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Important:** Config files must use `.cjs` extension because `package.json` has `"type": "module"`.

---

## 🔌 API Integration

### API Service
File: `src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Available API Methods

```javascript
import api from './services/api';

// Get all URLs
const response = await api.getAllURLs();

// Trigger manual check
const response = await api.checkURLs();

// Get statistics
const response = await api.getStatus();
```

### Change Backend URL

Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

Or use environment variables:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

Create `.env`:
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🎨 Components

### Dashboard Component
File: `src/components/Dashboard.jsx`

**Features:**
- Statistics cards (Total, Indexed, Not Indexed, Invalid, Pending)
- Manual check button with loading state
- Alert messages (success/error/info)
- Last checked timestamp
- Responsive grid layout

**State Management:**
```javascript
const [urls, setUrls] = useState([]);
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(false);
const [checking, setChecking] = useState(false);
const [message, setMessage] = useState(null);
```

### URLTable Component
File: `src/components/URLTable.jsx`

**Features:**
- Responsive table with 5 columns
- Color-coded status badges:
  - 🟢 Green = Indexed
  - 🔴 Red = Not Indexed
  - ⚫ Gray = Invalid URL
  - 🔵 Blue = Pending
- Clickable URLs (open in new tab)
- Loading spinner
- Empty state handling
- Hover effects

---

## 🎯 Features

### 1. Real-time Statistics
- Total URLs count
- Indexed count (green)
- Not Indexed count (red)
- Invalid URLs count (gray)
- Pending checks (blue)

### 2. Manual Check Trigger
- "Run Check Now" button
- Loading state with spinner
- Success/error messages
- Auto-dismiss alerts (5 seconds)

### 3. URL Table
- Sortable columns
- Status badges with icons
- Last checked timestamps
- Error notes/details
- Responsive design

### 4. User Experience
- Clean, modern interface
- Smooth transitions
- Loading states
- Empty states
- Error handling
- Mobile responsive

---

## 🎨 Styling

### Tailwind CSS Classes

**Color Palette:**
- Primary: Blue (bg-blue-600, text-blue-600)
- Success: Green (bg-green-100, text-green-800)
- Error: Red (bg-red-100, text-red-800)
- Warning: Gray (bg-gray-100, text-gray-800)
- Info: Blue (bg-blue-50, text-blue-800)

**Component Styling:**
```jsx
// Statistics Card
<div className="bg-white rounded-lg shadow p-6">

// Status Badge (Indexed)
<span className="bg-green-100 text-green-800 border-green-200">

// Button
<button className="bg-blue-600 hover:bg-blue-700 text-white">
```

### Custom Styles
File: `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

---

## 🧪 Development

### Development Server
```bash
npm run dev
```
- Hot Module Replacement (HMR)
- Fast refresh
- Opens at http://localhost:5173

### Build for Production
```bash
npm run build
```
- Creates optimized bundle in `dist/`
- Minifies code
- Tree-shaking

### Preview Production Build
```bash
npm run preview
```

### Scripts
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

---

## 🐛 Troubleshooting

### PostCSS/Tailwind Errors

**Error:** `Failed to load PostCSS config`

**Solution:** Ensure config files use `.cjs` extension:
- ✅ `postcss.config.cjs`
- ✅ `tailwind.config.cjs`
- ❌ NOT `postcss.config.js`

```bash
# Delete .js versions
rm postcss.config.js tailwind.config.js

# Recreate as .cjs
# (See Configuration section above)
```

### API Connection Issues

**Error:** `Network Error` or CORS error

**Solutions:**
1. Ensure backend is running on port 5000
2. Check `src/services/api.js` has correct URL
3. Verify backend CORS allows localhost:5173
4. Check browser console for details

### Module Not Found

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

**Error:** `Port 5173 is already in use`

**Solution:**
```bash
# Change port in vite.config.js
server: {
  port: 5174  // Use different port
}
```

---

## 🔄 State Management

### Data Flow

```
User Action → API Call → Update State → Re-render

Example:
Click "Run Check Now"
  ↓
api.checkURLs()
  ↓
setUrls(response.data)
  ↓
URLTable re-renders
```

### React Hooks Used

```javascript
useState()    // State management
useEffect()   // Fetch data on mount
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

### Mobile Optimization
- Stacked statistics cards on mobile
- Horizontal scrolling table
- Touch-friendly buttons
- Readable font sizes

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
npm run build
vercel --prod
```

3. **Set Environment Variables**
   - `VITE_API_URL` = your backend URL

### Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `dist`
3. **Environment Variables:**
   - `VITE_API_URL` = your backend URL

### GitHub Pages

1. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  base: '/repository-name/',
  // ... rest of config
})
```

2. **Deploy:**
```bash
npm run build
npx gh-pages -d dist
```

---

## 🔐 Environment Variables

### Development
Create `.env.local`:
```env
VITE_API_URL=http://localhost:5000/api
```


---

## 📊 Performance

### Optimization Tips
- Component memoization with `React.memo()`
- Lazy loading routes
- Code splitting
- Image optimization
- Minimize re-renders

### Current Performance
- Fast initial load (< 2s)
- Smooth interactions
- Efficient state updates
- Responsive UI

---

## 🎯 User Flow

```
1. User opens dashboard
   ↓
2. App fetches URLs and stats
   ↓
3. Display in table with statistics
   ↓
4. User clicks "Run Check Now"
   ↓
5. Show loading state
   ↓
6. API checks all URLs
   ↓
7. Update table with new status
   ↓
8. Show success message
   ↓
9. Auto-refresh statistics
```

---

## 🤝 Backend Integration

### Required Backend Endpoints

```
GET  /api/urls        - Get all URLs
POST /api/urls/check  - Trigger check
GET  /api/urls/status - Get statistics
```

### Expected Response Format

```javascript
{
  success: true,
  data: [
    {
      url: string,
      status: string,
      lastChecked: string,
      notes: string
    }
  ]
}
```

---

## 🔧 Customization

### Change Colors

Edit Tailwind classes in components:
```jsx
// Change primary color from blue to purple
className="bg-purple-600 hover:bg-purple-700"
```

### Add New Features

1. Create component in `src/components/`
2. Import in `Dashboard.jsx`
3. Add to render

### Modify Layout

Edit `src/components/Dashboard.jsx` grid classes:
```jsx
// Change from 5 columns to 3
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
```

---

## 📄 License

MIT License

---

**Version**: 1.0.0  
**React Version**: 18.2.0  
**Build Tool**: Vite 5.x
