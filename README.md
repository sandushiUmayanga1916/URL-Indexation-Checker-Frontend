# URL Indexation Checker Dashboard

A web-based tool to monitor Google indexation status of URLs with automated daily checks and manual trigger capabilities.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **node-cron** - Task scheduler for automated checks
- **axios** - HTTP client for URL validation
- **csv-parser** - Read CSV files
- **csv-writer** - Write CSV files
- **cors** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **axios** - API communication

### Storage
- **CSV File** - Simple file-based data storage

---

## 🚀 Setup Steps

### Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- Code editor (VS Code recommended)

### Step 1: Verify Node.js Installation
```bash
node --version
npm --version
```

### Step 2: Create Project Structure
```bash
# Create main folder
mkdir url-indexation-checker
cd url-indexation-checker

# Create backend and frontend folders
mkdir backend frontend
```

### Step 3: Backend Setup

```bash
# Navigate to backend
cd backend

# Initialize npm
npm init -y

# Install dependencies
npm install express cors csv-parser csv-writer node-cron axios
npm install --save-dev nodemon

# Create folder structure
mkdir config controllers middleware models routes services data
```

**Create these backend files:**
- `server.js` - Main server file
- `config/scheduler.js` - Cron job configuration
- `controllers/urlController.js` - Request handlers
- `middleware/errorHandler.js` - Error handling
- `models/urlModel.js` - Data operations
- `routes/urlRoutes.js` - API routes
- `services/indexationService.js` - Indexation logic

**Update `package.json` scripts:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 4: Frontend Setup

```bash
# Go back to project root
cd ..

# Create Vite React app
npm create vite@latest frontend -- --template react

# Navigate to frontend
cd frontend

# Install dependencies
npm install
npm install axios lucide-react
npm install -D tailwindcss@3.3.6 postcss@8.4.32 autoprefixer@10.4.16

# Create folders
mkdir src/components src/services
```

**Create these frontend files:**
- `vite.config.js` - Vite configuration
- `postcss.config.cjs` - PostCSS configuration
- `tailwind.config.cjs` - Tailwind configuration
- `index.html` - HTML template
- `src/index.css` - Global styles
- `src/main.jsx` - React entry point
- `src/App.jsx` - Root component
- `src/components/Dashboard.jsx` - Main dashboard
- `src/components/URLTable.jsx` - URL table
- `src/services/api.js` - API service

**Important Configuration Files:**

**`postcss.config.cjs`:**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**`tailwind.config.cjs`:**
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

**`vite.config.js`:**
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

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

Expected output:
```
✅ Server running on http://localhost:5000
⏰ Starting daily scheduler...
✅ Scheduler configured: Time: 9:00 AM IST (Daily)
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

### Step 6: Access Application

Open browser: **http://localhost:5173**

You should see:
- Dashboard with statistics cards
- "Run Check Now" button
- Table with 30 sample URLs

---

## ⏰ Scheduler Configuration

### Current Schedule
- **Time**: 9:00 AM IST (Daily)
- **File**: `backend/config/scheduler.js`
- **Implementation**: node-cron

### How It Works

The scheduler automatically runs the indexation check every day at 9:00 AM IST. It:
1. Reads all URLs from the CSV file
2. Checks each URL's indexation status
3. Updates the CSV with results
4. Logs the summary to console

### Scheduler Code Location

File: `backend/config/scheduler.js`

```javascript
const cronExpression = '0 9 * * *'; // 9:00 AM daily

const task = cron.schedule(
  cronExpression,
  performScheduledCheck,
  {
    scheduled: true,
    timezone: 'Asia/Kolkata'  // IST timezone
  }
);
```

---

## 🕐 How to Change Schedule Time

### Step 1: Open Configuration File

Navigate to: `backend/config/scheduler.js`

### Step 2: Modify Cron Expression

Find this line:
```javascript
const cronExpression = '0 9 * * *'; // Current: 9:00 AM daily
```

### Step 3: Replace with Your Desired Time

**Cron Expression Format:**
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 7) (0 or 7 = Sunday)
│ │ │ │ │
* * * * *
```

### Common Schedule Examples

| What You Want | Cron Expression | Code |
|--------------|----------------|------|
| **9:00 AM daily** (default) | `0 9 * * *` | `const cronExpression = '0 9 * * *';` |
| **2:30 PM daily** | `30 14 * * *` | `const cronExpression = '30 14 * * *';` |
| **Midnight (12:00 AM)** | `0 0 * * *` | `const cronExpression = '0 0 * * *';` |
| **Every 6 hours** | `0 */6 * * *` | `const cronExpression = '0 */6 * * *';` |
| **9 AM on weekdays only** | `0 9 * * 1-5` | `const cronExpression = '0 9 * * 1-5';` |
| **Twice daily (9 AM & 9 PM)** | `0 9,21 * * *` | `const cronExpression = '0 9,21 * * *';` |
| **Every hour** | `0 * * * *` | `const cronExpression = '0 * * * *';` |
| **Every 30 minutes** | `*/30 * * * *` | `const cronExpression = '*/30 * * * *';` |

### Step 4: Save and Restart

1. Save the file
2. Stop backend server (Ctrl+C)
3. Restart: `npm start`
4. Check console for confirmation:
   ```
   ✅ Scheduler configured:
      - Time: [Your New Time]
      - Cron: [Your Cron Expression]
   ```

### Example: Change to 2:30 PM Daily

**Before:**
```javascript
const cronExpression = '0 9 * * *'; // 9:00 AM daily
```

**After:**
```javascript
const cronExpression = '30 14 * * *'; // 2:30 PM daily
```

### Testing Your Cron Expression

Use this online tool to validate: **https://crontab.guru/**

Just enter your cron expression and it will show you in plain English when it will run.

---

## 📝 How to Update URLs List

### Method 1: Edit CSV File Directly (Recommended)

**Step 1:** Navigate to the CSV file
```
backend/data/urls.csv
```

**Step 2:** Open with Excel, Google Sheets, or any text editor

**Step 3:** Add/Edit URLs following this format:
```csv
URL,Status,Last Checked Date,Notes
https://yourwebsite.com,Pending,Not yet checked,
https://another-site.com,Pending,Not yet checked,
```

**Step 4:** Save the file

**Step 5:** Restart backend server (if running) or wait for next check

**Important:** 
- Keep the header row (first row)
- Use `Pending` status for new URLs
- Use `Not yet checked` for Last Checked Date
- Leave Notes empty or add your own notes

### Method 2: Modify Sample Data Function

**Step 1:** Open `backend/models/urlModel.js`

**Step 2:** Find the `createSampleData()` function

**Step 3:** Replace the sample URLs with your own:

```javascript
static async createSampleData() {
  const sampleURLs = [
    // Your indexed URLs
    { url: 'https://mysite.com', status: 'Pending', lastChecked: 'Not yet checked', notes: '' },
    { url: 'https://mysite.com/page1', status: 'Pending', lastChecked: 'Not yet checked', notes: '' },
    
    // Your other URLs
    { url: 'https://mysite.com/page2', status: 'Pending', lastChecked: 'Not yet checked', notes: '' },
    // ... add more URLs
  ];

  await this.writeAllURLs(sampleURLs);
}
```

**Step 4:** Delete the existing `backend/data/urls.csv` file

**Step 5:** Restart backend server - new CSV will be created with your URLs

### Method 3: Bulk Upload (Advanced)

**Step 1:** Create a text file with URLs (one per line):
```
https://site1.com
https://site2.com
https://site3.com
```

**Step 2:** Use a script or Excel to convert to CSV format:
```csv
URL,Status,Last Checked Date,Notes
https://site1.com,Pending,Not yet checked,
https://site2.com,Pending,Not yet checked,
https://site3.com,Pending,Not yet checked,
```

**Step 3:** Replace `backend/data/urls.csv` with your file

### CSV File Format Rules

✅ **Correct Format:**
```csv
URL,Status,Last Checked Date,Notes
https://example.com,Pending,Not yet checked,
https://site.com/page,Indexed,06/12/2025 10:30:00 AM,HTTP 200 - Page accessible
```

❌ **Common Mistakes:**
```csv
# Missing header
https://example.com,Pending,Not yet checked,

# Wrong separator (semicolon instead of comma)
URL;Status;Last Checked Date;Notes

# Missing columns
https://example.com,Pending
```

### Supported URL Count

- **Default**: 30 URLs (sample data)
- **Recommended**: Up to 100 URLs for CSV
- **Maximum**: No hard limit, but consider database for 100+ URLs

### Updating URLs While Server is Running

1. **Stop the check** (wait for current check to finish if running)
2. **Edit the CSV file**
3. **Save changes**
4. **Manual check**: Click "Run Check Now" to see new URLs
5. **Or wait**: Next scheduled check will process new URLs

### Backup Your URLs

Before making changes:
```bash
# Windows
copy backend\data\urls.csv backend\data\urls_backup.csv

# Mac/Linux
cp backend/data/urls.csv backend/data/urls_backup.csv
```

---

## 🔍 Indexation Check Explanation

### How We Check Indexation (3-5 Lines)

We check URL indexation by first validating the URL format (protocol, domain structure), then making an HTTP GET request to verify the page is accessible. If the page returns HTTP 200 OK status, we mark it as likely indexed; 404/403 errors are marked as not indexed; DNS failures or malformed URLs are marked as invalid. This method tests page accessibility rather than querying Google's actual index, making it suitable for demonstration but requiring Google Search Console API integration for production accuracy.

### What Gets Checked

For each URL, the system:
1. ✅ Validates URL format and structure
2. ✅ Makes HTTP request with 10-second timeout
3. ✅ Analyzes HTTP response status code
4. ✅ Handles errors gracefully (DNS, timeout, connection)
5. ✅ Stores result with timestamp and notes

### Status Types

- **Indexed** - HTTP 200 OK (page accessible and working)
- **Not Indexed** - 404, 403, or other errors
- **Invalid URL** - Malformed format, DNS not found, connection refused
- **Pending** - Not yet checked

---

## 📁 Project Structure

```
url-indexation-checker/
├── backend/
│   ├── config/scheduler.js          # ← Cron job (change schedule here)
│   ├── controllers/urlController.js
│   ├── middleware/errorHandler.js
│   ├── models/urlModel.js           # ← Sample data (edit URLs here)
│   ├── routes/urlRoutes.js
│   ├── services/indexationService.js
│   ├── data/
│   │   └── urls.csv                 # ← URL list (edit directly)
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   └── URLTable.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── postcss.config.cjs           # ← Must be .cjs extension
│   ├── tailwind.config.cjs          # ← Must be .cjs extension
│   └── package.json
│
└── README.md
```

---

## 🧪 Testing

### Manual Testing
1. Start both backend and frontend
2. Open http://localhost:5173
3. Click "Run Check Now"
4. Watch status updates in table
5. Check `backend/data/urls.csv` for updated data

### Verify Scheduler
1. Check backend console for scheduler confirmation
2. Set schedule to run in 2 minutes for testing
3. Watch console for automatic check execution
4. Verify CSV updates after scheduled run

---

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify all dependencies installed: `npm install`
- Check for syntax errors in files

### Frontend won't start
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure config files end in `.cjs` not `.js`

### CSV not updating
- Close Excel if file is open
- Check file permissions
- Verify `backend/data` folder exists

### Scheduler not running
- Check backend console for error messages
- Verify cron expression is valid
- Ensure server is running continuously

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review console error messages
3. Verify all files are created correctly
4. Ensure all dependencies installed

---

## ✅ Summary

**What you get:**
- ✅ Automated URL indexation checker
- ✅ Daily checks at 9 AM IST (customizable)
- ✅ Manual trigger button
- ✅ Visual dashboard with statistics
- ✅ CSV data storage
- ✅ Error handling for invalid URLs

**Tech used:**
- Backend: Node.js + Express
- Frontend: React + Tailwind CSS
- Storage: CSV file
- Scheduler: node-cron

**Key files to remember:**
- Schedule: `backend/config/scheduler.js`
- URLs: `backend/data/urls.csv`
- API: `frontend/src/services/api.js`

---

**Version**: 1.0.0  
**Assignment**: Web Development L2  
**Status**: ✅ Ready to Submit
