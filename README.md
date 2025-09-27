# WhoDat

A Next.js 14 application with TypeScript, Tailwind CSS, and Supabase integration.

## Features

- ⚡ Next.js 14 with App Router
- 🔷 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🗄️ Supabase for backend services
- 📦 Pre-configured CRUD helpers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env.local
   ```
   
   Then edit `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Add them to your `.env.local` file

## Database Schema

The project includes three main tables:

- **rooms**: Game rooms with status tracking
- **players**: Players in each room with assigned identities
- **identities**: Identity submissions by players

## Usage

The project includes pre-configured Supabase client with WhoDat-specific helper functions:

```typescript
import { supabase, supabaseHelpers, whoDatHelpers, gameFlowHelpers } from '@/utils/supabaseClient'

// Game Flow Example
// 1. Create a new room
const roomId = await gameFlowHelpers.createRoom('waiting')

// 2. Players join the room
const player1Id = await gameFlowHelpers.joinRoom(roomId, 'Alice')
const player2Id = await gameFlowHelpers.joinRoom(roomId, 'Bob')
const player3Id = await gameFlowHelpers.joinRoom(roomId, 'Charlie')

// 3. Players submit their identities
await gameFlowHelpers.submitIdentities(roomId, player1Id, ['Doctor', 'Teacher', 'Engineer'])
await gameFlowHelpers.submitIdentities(roomId, player2Id, ['Lawyer', 'Artist', 'Chef'])
await gameFlowHelpers.submitIdentities(roomId, player3Id, ['Pilot', 'Scientist', 'Writer'])

// 4. Assign identities randomly (players won't get their own identities)
const status = await gameFlowHelpers.assignIdentities(roomId)
// Status will be 'assigned'

// Get room data to see assignments
const roomData = await whoDatHelpers.getRoomWithPlayersAndIdentities(roomId)
```

### Available Helper Functions

**Room Operations:**
- `createRoom(status)` - Create a new game room
- `getRoom(roomId)` - Get room details
- `updateRoomStatus(roomId, status)` - Update room status

**Player Operations:**
- `addPlayerToRoom(roomId, name)` - Add player to room
- `getPlayersInRoom(roomId)` - Get all players in room
- `assignIdentityToPlayer(playerId, identity)` - Assign identity to player

**Identity Operations:**
- `submitIdentity(roomId, submittedBy, name)` - Submit new identity
- `getIdentitiesInRoom(roomId)` - Get all identities in room
- `getIdentitiesByPlayer(playerId)` - Get identities submitted by player

**Complex Queries:**
- `getRoomWithPlayersAndIdentities(roomId)` - Get room with all related data
- `getPlayerWithIdentities(playerId)` - Get player with their identities

**Game Flow Functions:**
- `createRoom(status?)` - Create new game room (default: 'waiting')
- `joinRoom(roomId, playerName)` - Add player to room
- `submitIdentities(roomId, playerId, names[])` - Submit player identities
- `assignIdentities(roomId)` - Randomly assign identities to players

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── dashboard/
│   │   └── page.tsx     # Dashboard page
│   └── room/
│       └── [id]/
│           └── page.tsx # Room page
├── components/          # React components
│   ├── PlayerNameInput.tsx
│   ├── IdentityForm.tsx
│   ├── PlayerList.tsx
│   ├── GameInterface.tsx
│   ├── UserProfile.tsx
│   ├── StatsCard.tsx
│   ├── RecentFilesCard.tsx
│   ├── QuickActionsCard.tsx
│   └── ActivityCard.tsx
└── utils/               # Utility functions
    └── supabaseClient.ts # Supabase configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
