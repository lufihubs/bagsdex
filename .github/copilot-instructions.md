<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# BagsDEX Project Instructions

This is a Next.js project for BagsDEX - a professional token explorer for Solana blockchain with bags.fm inspired design.

## Project Status: ✅ COMPLETE - ENHANCED

- [x] Verify that the copilot-instructions.md file in the .github directory is created.
- [x] Clarify Project Requirements - Next.js site to display tokens from bags.fm with pump.fun inspired UI, no wallet connect/trading
- [x] Scaffold the Project - Manually created Next.js project structure with TypeScript, Tailwind CSS, and App Router
- [x] Customize the Project - Created bagsdex homepage with pump.fun inspired design, token cards, filtering, and mock data
- [x] Install Required Extensions - No extensions needed for Next.js project
- [x] Compile the Project - Successfully built project after installing autoprefixer and fixing next.config.js
- [x] Create and Run Task - Created development server task, running on http://localhost:3000
- [x] Launch the Project - Development server is running and accessible at http://localhost:3000
- [x] Ensure Documentation is Complete - README.md created with complete project information and instructions
- [x] Enhanced Token Cards - Added detailed token information with images, market cap, price, socials, and contract address
- [x] Implemented Migrated Token Logic - Tokens that have crossed 75K market cap are marked as migrated
- [x] Live Helius API Integration - Real-time Solana token data from Helius RPC API

## Development Server

The project is currently running at: **http://localhost:3000**

## Enhanced Features

### Professional Token Cards
- **Token Images** - Display actual token logos/images
- **Market Cap** - Formatted market capitalization values
- **Token Price** - Precise pricing information
- **Contract Address (CA)** - Clickable contract addresses with copy functionality
- **Social Links** - Website, Twitter, and Telegram links when available
- **24h Change** - Price change indicators with color coding

### Smart Migrated Token Detection
- **75K Threshold** - Tokens that have ever reached 75K market cap are marked as "Migrated"
- **Historical Tracking** - Even if current market cap is below 75K, tokens remain migrated if they previously crossed threshold
- **Visual Indicators** - Gold trophy emoji for tokens that have reached the milestone

### Live Data Integration
- **Helius RPC API** - Real-time Solana blockchain data
- **Auto-refresh** - Updates every 30 seconds
- **Fallback Data** - Mock data if API is unavailable
- **Error Handling** - Graceful error handling with fallback responses

## API Endpoint

**Helius RPC API**: `https://mainnet.helius-rpc.com/?api-key=148399dc-189f-4b46-84b6-a741677283b9`

## Key Features Implemented

- Modern dark theme with professional bags.fm-inspired design
- Enhanced token cards with comprehensive information
- Smart filtering (All, New, Migrated) based on 75K market cap threshold
- Real-time data from Solana blockchain via Helius API
- Responsive design with Tailwind CSS
- TypeScript for type safety
- No wallet connection or trading features (as requested)
- Copy-to-clipboard functionality for contract addresses
- Social media integration for tokens

## Next Steps

The application is feature-complete for token exploration. Future enhancements could include:
1. Token search functionality
2. Advanced filtering options
3. Price charts and historical data
4. Token analytics and insights
