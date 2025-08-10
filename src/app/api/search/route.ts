import { NextRequest, NextResponse } from 'next/server';

interface TokenResponse {
  id: string;
  name: string;
  symbol: string;
  description: string;
  marketCap: number;
  price: number;
  change24h: number;
  volume24h: number;
  totalSupply: number;
  status: 'new' | 'bonded';
  imageUrl?: string;
  createdAt: string;
  mint: string;
  contractAddress: string;
  hasReached75k: boolean;
  isBonded: boolean;
  socials?: {
    twitter?: string;
    telegram?: string;
    website?: string;
  };
}

// Search function to find tokens from bags.fm API
async function searchBagsTokens(query: string): Promise<TokenResponse[]> {
  try {
    console.log(`[Search API] Searching for: "${query}"`);
    
    // Fetch all tokens from bags.fm leaderboard
    const response = await fetch('https://api2.bags.fm/api/v1/token-launch/leaderboard', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(`[Search API] HTTP Error: ${response.status} ${response.statusText}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`[Search API] Response structure:`, typeof data, Object.keys(data));

    // Handle the response structure from bags.fm API
    let tokensArray = [];
    if (data && data.response && Array.isArray(data.response)) {
      tokensArray = data.response;
    } else if (Array.isArray(data)) {
      tokensArray = data;
    } else {
      console.error('[Search API] Unexpected response structure:', data);
      return [];
    }

    console.log(`[Search API] Found ${tokensArray.length} total tokens`);

    // Filter tokens based on search query
    const searchLower = query.toLowerCase().trim();
    const filteredTokens = tokensArray.filter((token: any) => {
      return (
        token.name?.toLowerCase().includes(searchLower) ||
        token.symbol?.toLowerCase().includes(searchLower) ||
        token.tokenAddress?.toLowerCase().includes(searchLower) ||
        token.tokenAddress?.toLowerCase() === searchLower
      );
    });

    console.log(`[Search API] Found ${filteredTokens.length} matching tokens`);

    // Transform the filtered data to match our interface
    const transformedTokens: TokenResponse[] = filteredTokens.map((token: any) => {
      const price = parseFloat(token.price) || 0;
      const marketCap = price * 1000000000; // Estimate market cap
      const volume24h = marketCap * 0.1; // Mock volume
      const change24h = Math.random() * 20 - 10; // Mock 24h change
      
      // Generate realistic creation time (bias towards newer tokens)
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
      const ageWeight = Math.pow(Math.random(), 2); // Bias towards newer
      const tokenAge = ageWeight * maxAge;
      const createdAt = new Date(now - tokenAge);
      
      return {
        id: token.tokenAddress || `token-${Date.now()}-${Math.random()}`,
        name: token.name || 'Unknown Token',
        symbol: token.symbol || 'UNK',
        description: `Token launched on bags.fm with current price $${price.toFixed(8)}`,
        marketCap: marketCap,
        price: price,
        change24h: change24h,
        volume24h: volume24h,
        totalSupply: 1000000000, // Standard supply
        status: marketCap >= 75000 ? 'bonded' : 'new',
        imageUrl: token.image,
        createdAt: createdAt.toISOString(),
        mint: token.tokenAddress || '',
        contractAddress: token.tokenAddress || '',
        hasReached75k: marketCap >= 75000,
        isBonded: marketCap >= 75000,
        socials: {
          website: token.website,
          twitter: token.twitter,
          telegram: token.telegram,
        },
      };
    });

    // Sort by creation date (newest first)
    const sortedTokens = transformedTokens.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return sortedTokens;
  } catch (error) {
    console.error('[Search API] Error searching tokens:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    console.log(`[Search API] Processing search request for: "${query}"`);
    
    const tokens = await searchBagsTokens(query);
    
    console.log(`[Search API] Returning ${tokens.length} search results`);
    
    return NextResponse.json(tokens, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('[Search API] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to search tokens' },
      { status: 500 }
    );
  }
}
