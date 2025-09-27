# KimBu - Ünlü Tahmin Oyunu

Ünlü kişileri tahmin et, puan kazan! Modern ve responsive tasarımla geliştirilmiş eğlenceli bir tahmin oyunu.

## Features

- ⚡ Next.js 14 with App Router
- 🔷 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌙 Dark Mode / Light Mode support
- 📱 Fully Responsive Design (Mobile, Tablet, Desktop)
- 🎮 Interactive guessing game
- 🏆 Leaderboard system
- 🍔 Mobile-first navigation
- 🎭 Celebrity guessing mechanics

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Play

1. **Start the Game**: Click "Oyuna Başla" on the home page
2. **Guess the Celebrity**: Look at the celebrity photo and make your guess
3. **Earn Points**: Get 10 points for each correct answer
4. **Check Scores**: View your progress and compete on the leaderboard

## Game Features

- **Celebrity Photos**: High-quality images of famous people
- **Hints**: Get helpful clues for each celebrity
- **Score Tracking**: Your progress is saved locally
- **Leaderboard**: Compete with other players
- **Responsive Design**: Play on any device

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── game/
│   │   └── page.tsx     # Game page
│   └── scores/
│       └── page.tsx     # Scores page
├── components/          # React components
│   ├── ThemeSwitcher.tsx
│   └── Navbar.tsx
├── contexts/            # React contexts
│   └── ThemeContext.tsx
└── utils/               # Utility functions
    └── supabaseClient.ts # Supabase configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **React Context**: State management for theme switching
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints