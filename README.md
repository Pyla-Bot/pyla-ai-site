# Pyla AI Static Website

Production-ready static website for Pyla AI, built with vanilla HTML, CSS, and JavaScript for GitHub Pages.

## Project Structure

```text
.
├── index.html
├── features.html
├── install.html
├── docs.html
├── download.html
├── community.html
├── assets/
├── css/
│   ├── styles.css
│   └── styles.min.css
├── js/
│   ├── main.js
│   └── main.min.js
├── favicon.ico
├── og-image.png
├── robots.txt
├── CNAME
├── .nojekyll
├── .gitattributes
├── .gitignore
├── LICENSE
└── CHANGELOG.md
```

## Run Locally

This site works directly from `file://` because it has no framework or build-time routing.

```powershell
cd pyla-ai-site
start index.html
```

For a local server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Copy Local Assets

The current project already includes the PNG files copied from `C:\Users\gavin\Downloads\Pyla-Bot`.

To refresh assets later:

```powershell
Copy-Item -Path "$HOME\Downloads\Pyla-Bot\*" -Destination ".\assets" -Recurse -Force
```

## Optional Build

The readable files are `css/styles.css` and `js/main.js`. Minified versions are included for hosting or manual replacement.

```powershell
npm install
npm run build
```

The build script minifies CSS and JS with `clean-css-cli` and `terser`.

## Deploy to GitHub Pages

Important: upload the contents of this folder to the repository root, not a folder named `pyla-ai-site`. If GitHub Pages shows a plain white page with only the repository name, Pages is serving the wrong source folder.

1. Create a new GitHub repository.
2. Copy or commit the contents of this folder into the repository root.
3. Push to GitHub:

```powershell
git init
git add .
git commit -m "Initial Pyla AI static site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

4. In GitHub, open `Settings -> Pages`.
5. Set Source to `Deploy from a branch`.
6. Select branch `main` and folder `/root`.
7. Save. The site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

## Fix a Blank GitHub Pages Site

If the deployed page only says `pyla-ai-site`, use one of these fixes:

1. Recommended: `Settings -> Pages -> Build and deployment -> Source -> GitHub Actions`, then push this repo. The included workflow deploys the static site automatically.
2. Branch source option: `Settings -> Pages -> Deploy from a branch -> main -> /root`.
3. Alternative branch source: choose `main -> /docs`. A complete `/docs` mirror is included for this exact Pages setting.

Do not upload the ZIP file itself to GitHub. Extract it first, then commit the files inside the extracted folder.

For a custom domain, replace the placeholder text in `CNAME` with the domain only, such as:

```text
pyla.example.com
```

Leave `CNAME` empty if you are not using a custom domain.

## Links to Update

- Discord invite: `https://discord.gg/pylaai`
- GitHub repo: `https://github.com/PylaAI/PylaAI`
- GitHub releases: `https://github.com/PylaAI/PylaAI/releases`
- TODO comments in HTML are intentionally left for future analytics, releases, or domain-specific updates.

## Manual Testing Checklist

- Open `index.html` directly from the filesystem.
- Serve locally with `python -m http.server 8000`.
- Test navigation and page links on desktop and mobile widths.
- Verify hamburger menu opens and closes on mobile.
- Verify carousel buttons and dots work.
- Verify FAQ accordion expands and collapses.
- Verify docs search filters sections.
- Verify keyboard focus is visible.
- Check text contrast on the dark background.
- Confirm all images load from relative paths on GitHub Pages.

## Licensing and Credits

This website scaffold is MIT licensed by default. Pyla AI project credit:

- Original repository: https://github.com/PylaAI/PylaAI
- Community Discord: https://discord.gg/pylaai

The placeholder email form does not submit or store data. Add a privacy policy before connecting a real backend, analytics service, or mailing list provider.

## Sample Commit Message

```text
Initial Pyla AI static site
```

## Suggested Branch Strategy

Use `main` for the GitHub Pages production site. For larger updates, create short-lived branches such as `feature/docs-search`, merge with pull requests, and keep Pages deployed from `main` root.
