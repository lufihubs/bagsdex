# BagsDEX 🛍️

A professional token explorer for Solana blockchain with real-time data from bags.fm. Built with Next.js, TypeScript, and Tailwind CSS.

![BagsDEX](https://img.shields.io/badge/BagsDEX-Live-orange?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🔴 Real-time Data** - Live token data from bags.fm API
- **🛍️ Bags.fm Design** - Professional orange/red gradient theme matching bags.fm
- **⚡ 15-second Updates** - Auto-refreshing token information
- **🎯 Smart Filtering** - Filter by All, New, or Bonded tokens
- **📱 Responsive Design** - Perfect on mobile and desktop
- **🎨 FontAwesome Icons** - Professional iconography throughout
- **📋 Copy Contract Addresses** - One-click CA copying
- **🔗 Social Integration** - Direct links to token websites, Twitter, and Telegram

## Tech Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Helius RPC API for Solana blockchain data
- **Runtime**: React 18

## API Integration

The application integrates with Helius RPC API to fetch real-time Solana token data:
- **Endpoint**: `https://mainnet.helius-rpc.com/`
- **Method**: `getAssets` with fungible token type
- **Refresh Rate**: Every 30 seconds
- **Data**: Token metadata, prices, market caps, and volumes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bagsdex
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
bagsdex/
├── src/
│   └── app/
│       ├── api/
│       │   └── tokens/
│       │       └── route.ts      # API route for Helius integration
│       ├── globals.css
│       ├── layout.tsx
│       └── page.tsx              # Main application with live data
├── .github/
│   └── copilot-instructions.md
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## Features Overview

### Professional Interface
- Clean, minimalist design inspired by bags.fm
- Dark theme with professional typography
- Responsive grid layout for token cards
- Live indicator showing real-time status

### Real-time Data
- Automatic refresh every 30 seconds
- Live token prices and market data
- Recent token launches and migrations
- Professional data visualization

### Filtering & Navigation
- All Tokens view
- New tokens filter
- Migrated tokens filter
- Mobile-responsive navigation

## API Configuration

The app uses a server-side API route (`/api/tokens`) to:
- Fetch data from Helius RPC API
- Handle CORS and security
- Process and format token data
- Provide consistent response format

## Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start production server:
```bash
npm run start
```

The application will be available at `http://localhost:3000`

## License

This project is for educational and demonstration purposes. Not affiliated with bags.fm.

## Disclaimer

This is a read-only token explorer. No trading functionality or wallet connection is provided. Token prices and market data are for informational purposes only.
