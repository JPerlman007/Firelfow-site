# Fireflow Yoga Website

A single-page website for Fireflow Yoga with an editable CMS admin panel.

## What's in here

```
fireflow-site/
├── _data/
│   └── content.yml        ← All your site text, prices, testimonials (edit via CMS or directly)
├── admin/
│   ├── index.html          ← CMS admin page
│   └── config.yml          ← CMS field definitions
├── css/
│   └── style.css           ← All styling
├── images/                 ← Your photos go here
├── build.js                ← Builds the site from content.yml → _site/
├── netlify.toml            ← Netlify build config
├── package.json            ← Dependencies
└── README.md               ← You're reading it
```

## Setup (one time, ~15 minutes)

### 1. Create a GitHub account (if you don't have one)
Go to https://github.com and sign up (free).

### 2. Create a new repository
- Click the "+" button → "New repository"
- Name it `fireflow-site`
- Set it to **Public** (required for free Netlify)
- Click "Create repository"

### 3. Upload these files
- On the repository page, click "uploading an existing file"
- Drag all the files from this folder into the upload area
- Click "Commit changes"

### 4. Add your images
Upload to the `images/` folder in your repository:
- `jonathan.jpg` — your headshot or teaching photo
- `studio-1.jpg` — garden/entrance photo
- `studio-2.jpg` — Reformer/interior photo
- `studio-3.jpg` — yoga mat or studio detail

### 5. Update the video URL
Edit `_data/content.yml` and replace `YOUR_VIDEO_ID` in the `lolitta.video_url` field with your actual YouTube video ID.

### 6. Connect to Netlify
- Go to https://app.netlify.com and sign up with your GitHub account
- Click "Add new site" → "Import an existing project"
- Select GitHub → select your `fireflow-site` repository
- Netlify will auto-detect the build settings from `netlify.toml`
- Click "Deploy site"
- Your site will be live at a random URL like `happy-turtle-abc123.netlify.app`

### 7. Set up your custom domain
- In Netlify, go to "Domain settings" → "Add custom domain"
- Enter `www.fireflowyoga.com`
- Follow Netlify's instructions to update your DNS (point your domain to Netlify)
- This replaces Squarespace — once DNS points to Netlify, cancel Squarespace

### 8. Enable the CMS admin panel
- In Netlify, go to "Integrations" → "Identity" → "Enable Identity"
- Under Identity settings, set "Registration" to "Invite only"
- Click "Invite users" and enter your email
- Go to "Integrations" → "Git Gateway" → "Enable Git Gateway"
- You'll get an email invite — click it, set a password
- Now go to `www.fireflowyoga.com/admin` and log in

### 9. Enable the contact form
- Netlify automatically detects the contact form (it uses `data-netlify="true"`)
- Form submissions will appear in your Netlify dashboard under "Forms"
- You can set up email notifications: "Forms" → "Form notifications" → add your email

## How to edit your site

### Option A: Use the CMS (recommended)
1. Go to `www.fireflowyoga.com/admin`
2. Log in
3. Click "All Site Content"
4. Edit any field — prices, text, testimonials, photos
5. Click "Publish"
6. Site rebuilds automatically in ~30 seconds

### Option B: Edit the YAML directly
1. Go to your GitHub repository
2. Open `_data/content.yml`
3. Click the pencil icon to edit
4. Make your changes
5. Click "Commit changes"
6. Netlify rebuilds automatically

## Common edits

**Change the intro price:**
CMS → Hero Section → "Offer (main text)" → change to whatever you want

**Add a new testimonial:**
CMS → Testimonials → click "Add" → fill in quote, name, detail

**Swap a studio photo:**
CMS → Studio Photos → click on the photo → upload a new one

**Change your booking link (e.g., add Calendly):**
CMS → Booking Section → "Booking URL" → paste your Calendly link

## Cost

- GitHub: free
- Netlify (free tier): free for personal sites, includes forms, identity, builds
- Total: $0/month (vs ~$22/month CAD for Squarespace)
