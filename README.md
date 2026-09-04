# TikTok Media Downloader — GitHub + Render

## GitHub
Upload these files/folders to a GitHub repository:
- `server.js`
- `package.json`
- `render.yaml`
- `public/index.html`

## Render
1. Create a Web Service on Render.
2. Connect the GitHub repository.
3. Build command: `npm install`
4. Start command: `npm start`
5. Deploy.

## yt-dlp
The backend expects `yt-dlp` to be installed and available in the Render runtime. If your Render environment does not provide it, add an appropriate installation step or use a server image that includes it.

## Frontend API URL
After deployment, copy your Render service URL and set this in `public/index.html`:

const API_BASE="https://YOUR-RENDER-SERVICE.onrender.com";

Then redeploy.

Use only for content you own or have permission to download. Platform terms and copyright rules may apply.
