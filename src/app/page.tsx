'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCopy, 
  faGlobe, 
  faCoins, 
  faChartLine, 
  faFilter,
  faLink,
  faStar,
  faTrophy,
  faAddressCard,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faTelegram 
} from '@fortawesome/free-brands-svg-icons';

interface Token {
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

// API function to fetch Solana tokens from our API route
async function fetchSolanaTokens(): Promise<Token[]> {
  try {
    const response = await fetch('/api/tokens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }

    const tokens = await response.json();
    return tokens;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

function TokenCard({ token }: { token: Token }) {
  const isPositive = token.change24h > 0;
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a1a] border border-[#2a2a2a] rounded-lg p-4 hover:border-orange-500/30 hover:from-[#1e1e1e] hover:to-[#2e1e1e] transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
      {/* Header with Image and Basic Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center overflow-hidden">
            {token.imageUrl ? (
              <Image 
                src={token.imageUrl} 
                alt={token.symbol} 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-full object-cover" 
                unoptimized
              />
            ) : (
              <span className="text-white font-semibold text-lg">{token.symbol.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{token.name}</h3>
            <p className="text-gray-400 text-sm">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold">${token.price.toFixed(6)}</p>
          <p className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
          </p>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{token.description}</p>
      
      {/* Market Data */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-gray-500 text-xs flex items-center space-x-1">
            <FontAwesomeIcon icon={faChartLine} className="w-3 h-3" />
            <span>Market Cap</span>
          </p>
          <p className="text-white font-medium">${formatNumber(token.marketCap)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-xs flex items-center space-x-1">
            <FontAwesomeIcon icon={faCoins} className="w-3 h-3" />
            <span>Volume 24h</span>
          </p>
          <p className="text-white font-medium">${formatNumber(token.volume24h)}</p>
        </div>
      </div>

      {/* Contract Address */}
      <div className="mb-4">
        <p className="text-gray-500 text-xs mb-1 flex items-center space-x-1">
          <FontAwesomeIcon icon={faAddressCard} className="w-3 h-3" />
          <span>Contract Address (CA)</span>
        </p>
        <div className="flex items-center justify-between bg-gradient-to-r from-[#0f0f0f] to-[#1a0f0f] rounded px-2 py-1 border border-[#2a2a2a]">
          <p className="text-gray-300 text-xs font-mono truncate mr-2">
            {token.contractAddress}
          </p>
          <button 
            onClick={() => copyToClipboard(token.contractAddress)}
            className="text-gray-400 hover:text-orange-400 text-xs transition-colors"
            title="Copy CA"
          >
            <FontAwesomeIcon icon={faCopy} className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Socials */}
      {token.socials && (
        <div className="mb-4">
          <p className="text-gray-500 text-xs mb-2">Socials</p>
          <div className="flex space-x-2">
            {token.socials.website && (
              <a 
                href={token.socials.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-full flex items-center justify-center hover:from-[#3a3a3a] hover:to-[#2a2a2a] transition-all duration-200 border border-[#333] hover:border-orange-500/50"
                title="Website"
              >
                <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-300 hover:text-orange-300" />
              </a>
            )}
            {token.socials.twitter && (
              <a 
                href={token.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-full flex items-center justify-center hover:from-[#3a3a3a] hover:to-[#2a2a2a] transition-all duration-200 border border-[#333] hover:border-blue-500/50"
                title="Twitter"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-4 h-4 text-blue-400 hover:text-blue-300" />
              </a>
            )}
            {token.socials.telegram && (
              <a 
                href={token.socials.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] rounded-full flex items-center justify-center hover:from-[#3a3a3a] hover:to-[#2a2a2a] transition-all duration-200 border border-[#333] hover:border-blue-500/50"
                title="Telegram"
              >
                <FontAwesomeIcon icon={faTelegram} className="w-4 h-4 text-blue-300 hover:text-blue-200" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex justify-between items-center pt-3 border-t border-[#2a2a2a]">
        <span className={`px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 ${
          token.status === 'bonded' 
            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30' 
            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          <FontAwesomeIcon 
            icon={token.status === 'bonded' ? faLink : faStar} 
            className="w-3 h-3" 
          />
          <span>{token.status === 'bonded' ? 'Bonded' : 'New'}</span>
        </span>
        {token.isBonded && (
          <span className="text-xs text-orange-400" title="Token has completed bonding curve">
            <FontAwesomeIcon icon={faTrophy} className="w-3 h-3" />
          </span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState<'all' | 'new' | 'bonded'>('all');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    async function loadTokens() {
      if (tokens.length === 0) {
        setLoading(true);
      } else {
        setUpdating(true);
      }
      
      try {
        const fetchedTokens = await fetchSolanaTokens();
        setTokens(fetchedTokens);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setLoading(false);
        setUpdating(false);
      }
    }
    
    loadTokens();
    
    // Refresh data every 15 seconds for real-time updates
    const interval = setInterval(loadTokens, 15000);
    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredTokens = tokens.filter(token => 
    filter === 'all' || token.status === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900/10 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400">Loading tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900/10 text-white">
      {/* Header */}
      <header className="border-b border-[#2a2a2a] bg-gradient-to-r from-gray-900 via-gray-900 to-orange-900/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <FontAwesomeIcon icon={faShoppingBag} className="w-7 h-7 text-orange-400" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  bagsdex
                </h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setFilter('all')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'all' ? 'text-orange-400' : 'text-gray-400 hover:text-orange-300'}`}
                >
                  <FontAwesomeIcon icon={faCoins} className="w-3 h-3" />
                  <span>All Tokens</span>
                </button>
                <button 
                  onClick={() => setFilter('new')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'new' ? 'text-orange-400' : 'text-gray-400 hover:text-orange-300'}`}
                >
                  <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                  <span>New</span>
                </button>
                <button 
                  onClick={() => setFilter('bonded')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'bonded' ? 'text-orange-400' : 'text-gray-400 hover:text-orange-300'}`}
                >
                  <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                  <span>Bonded</span>
                </button>
              </nav>
            </div>
            
            {/* Live Update Indicator */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${updating ? 'bg-yellow-400 animate-pulse' : 'bg-orange-400'}`}></div>
                <span className="text-xs text-gray-400">
                  {updating ? 'Updating...' : 'Live'}
                </span>
              </div>
              {lastUpdate && (
                <span className="text-xs text-gray-500">
                  Last: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Token Count and Status */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-white">
              {filteredTokens.length} Tokens
            </h2>
            <span className="text-sm text-gray-400">
              ({filter === 'all' ? 'All' : filter === 'new' ? 'New' : 'Bonded'})
            </span>
          </div>
          <div className="text-sm text-gray-500">
            Real-time data from bags.fm
          </div>
        </div>
        
        {/* Mobile Filter */}
        <div className="md:hidden mb-6">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#2a1a1a] border border-[#2a2a2a] rounded-lg px-3 py-2 text-white focus:border-orange-500 focus:outline-none"
          >
            <option value="all">All Tokens</option>
            <option value="new">New</option>
            <option value="bonded">Bonded</option>
          </select>
        </div>

        {/* Token Grid */}
        {filteredTokens.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No tokens found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTokens.map((token) => (
              <TokenCard key={token.id} token={token} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Real-time token data from Solana blockchain
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
