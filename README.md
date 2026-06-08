# PopX App

A React JS app with 4 screens built pixel-perfect from the provided Adobe XD design.

## Screens

1. **Welcome** (`/`) — Landing page with Create Account & Login buttons
2. **Register** (`/register`) — Create PopX account form
3. **Login** (`/login`) — Sign in page
4. **Account Settings** (`/account`) — Profile page (protected, login required)

## Features

- If you create an account and then try to register again with the same email, it shows "already exists" error
- Login validates against registered accounts (in-memory state)
- Account settings shows the logged-in user's info
- Mobile-centered layout (390px) on all screen sizes
- React Router v6 navigation

## Getting Started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

## Deploy to Vercel / Netlify

Upload the project folder or connect your GitHub repo.

## Tech Stack

- React 18
- React Router DOM v6
- CSS3 (no external UI library)
- Poppins font (Google Fonts)
