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
  faShoppingBag,
  faSearch,
  faTimes,
  faCheck
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
    console.log('🌐 Fetching tokens from /api/tokens');
    const response = await fetch('/api/tokens', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('🌐 Response status:', response.status, response.ok);

    if (!response.ok) {
      throw new Error('Failed to fetch tokens');
    }

    const tokens = await response.json();
    console.log('🌐 Received tokens from API:', tokens.length, tokens);
    return tokens;
  } catch (error) {
    console.error('🌐 Error fetching tokens:', error);
    return [];
  }
}

// API function to search for specific tokens
async function searchTokens(query: string): Promise<Token[]> {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to search tokens');
    }

    const tokens = await response.json();
    return tokens;
  } catch (error) {
    console.error('Error searching tokens:', error);
    return [];
  }
}

// Skeleton Loading Component
function TokenCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-lg p-4 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
          <div>
            <div className="h-5 bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-4 bg-gray-800 rounded w-16"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-5 bg-gray-700 rounded w-20 mb-1"></div>
          <div className="h-4 bg-gray-800 rounded w-16"></div>
        </div>
      </div>
      
      {/* Description skeleton */}
      <div className="mb-4">
        <div className="h-4 bg-gray-800 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-800 rounded w-3/4"></div>
      </div>
      
      {/* Market data skeleton */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="h-3 bg-gray-800 rounded w-16 mb-1"></div>
          <div className="h-4 bg-gray-700 rounded w-12"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-800 rounded w-16 mb-1"></div>
          <div className="h-4 bg-gray-700 rounded w-12"></div>
        </div>
      </div>

      {/* Contract address skeleton */}
      <div className="mb-4">
        <div className="h-3 bg-gray-800 rounded w-24 mb-1"></div>
        <div className="h-8 bg-gray-800 rounded"></div>
      </div>

      {/* Status badge skeleton */}
      <div className="flex justify-between items-center pt-3 border-t border-green-500/20">
        <div className="h-6 bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  );
}

function TokenCard({ token, onCopySuccess }: { token: Token, onCopySuccess?: (message: string) => void }) {
  const [copied, setCopied] = useState(false);
  
  const formatAge = (dateString: string) => {
    const now = new Date();
    const tokenDate = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - tokenDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const isPositive = token.change24h > 0;
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(2);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopySuccess?.('Contract address copied to clipboard!');
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      onCopySuccess?.('Failed to copy contract address');
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-green-500/20 rounded-lg p-4 hover:border-green-400/40 hover:from-gray-800 hover:to-gray-900 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 transform hover:scale-[1.02] animate-fade-in">
      {/* Header with Image and Basic Info */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-110">
            {token.imageUrl ? (
              <Image 
                src={token.imageUrl} 
                alt={token.symbol} 
                width={48} 
                height={48} 
                className="w-12 h-12 rounded-full object-cover transition-transform duration-200" 
                unoptimized
              />
            ) : (
              <span className="text-white font-semibold text-lg">{token.symbol.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg transition-colors duration-200">{token.name}</h3>
            <p className="text-gray-400 text-sm transition-colors duration-200">{token.symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white font-semibold transition-all duration-200">${token.price.toFixed(6)}</p>
          <p className={`text-sm font-medium transition-all duration-200 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
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
        <div className="flex items-center justify-between bg-gradient-to-r from-black to-gray-900 rounded px-2 py-1 border border-green-500/20">
          <p className="text-gray-300 text-xs font-mono truncate mr-2">
            {token.contractAddress}
          </p>
          <button 
            onClick={() => copyToClipboard(token.contractAddress)}
            className={`text-xs transition-all duration-200 ${
              copied 
                ? 'text-green-400 scale-110' 
                : 'text-gray-400 hover:text-green-400 hover:scale-105'
            }`}
            title={copied ? "Copied!" : "Copy CA"}
          >
            <FontAwesomeIcon 
              icon={copied ? faCheck : faCopy} 
              className="w-3 h-3" 
            />
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
                className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-200 border border-green-500/20 hover:border-green-400/50"
                title="Website"
              >
                <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-gray-300 hover:text-green-300" />
              </a>
            )}
            {token.socials.twitter && (
              <a 
                href={token.socials.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-200 border border-green-500/20 hover:border-blue-500/50"
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
                className="w-8 h-8 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center hover:from-gray-700 hover:to-gray-800 transition-all duration-200 border border-green-500/20 hover:border-blue-500/50"
                title="Telegram"
              >
                <FontAwesomeIcon icon={faTelegram} className="w-4 h-4 text-blue-300 hover:text-blue-200" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className="flex justify-between items-center pt-3 border-t border-green-500/20">
        <span className={`px-2 py-1 rounded text-xs font-medium flex items-center space-x-1 ${
          token.status === 'bonded' 
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30' 
            : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
        }`}>
          <FontAwesomeIcon 
            icon={token.status === 'bonded' ? faLink : faStar} 
            className="w-3 h-3" 
          />
          <span>{token.status === 'bonded' ? 'Bonded' : 'New'}</span>
        </span>
        {token.isBonded && (
          <span className="text-xs text-green-400" title="Token has completed bonding curve">
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
  const [filter, setFilter] = useState<'all' | 'new' | 'bonded' | 'mooning'>('all');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Token[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: '', show: false });

  // Toast notification function
  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: '', show: false }), 3000);
  };

  // Simple effect for initial load
  useEffect(() => {
    const loadTokens = async () => {
      try {
        const response = await fetch('/api/tokens');
        if (response.ok) {
          const data = await response.json();
          setTokens(data);
          setLoading(false);
          setIsInitialLoad(false);
        }
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };
    
    loadTokens();
  }, []);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchTokens(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const displayTokens = searchQuery.trim() ? searchResults : tokens;
  const filteredTokens = displayTokens.filter(token => {
    if (filter === 'all') return true;
    if (filter === 'mooning') return token.marketCap >= 1000000; // Above $1M
    return token.status === filter;
  });

  // Show skeleton loading only on initial load
  if (loading && isInitialLoad) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header with skeleton */}
        <header className="border-b border-green-500/20 bg-gradient-to-r from-black to-gray-900 sticky top-0 z-50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src="/bags.jpg"
                      alt="bagsdex logo"
                      width={32}
                      height={32}
                      className="rounded-lg border border-green-500/30"
                    />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    bagsdex
                  </h1>
                </div>
                <nav className="hidden md:flex space-x-6">
                  <div className="h-5 bg-gray-700 rounded w-20 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-16 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-18 animate-pulse"></div>
                  <div className="h-5 bg-gray-700 rounded w-20 animate-pulse"></div>
                </nav>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-4 bg-gray-700 rounded w-12 animate-pulse"></div>
              </div>
            </div>
            <div className="h-12 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </header>

        {/* Main Content with Skeleton */}
        <main className="max-w-6xl mx-auto px-4 py-6">
          <div className="mb-6 flex justify-between items-center">
            <div className="h-6 bg-gray-700 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-40 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <TokenCardSkeleton key={index} />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-green-500/20 bg-gradient-to-r from-black to-gray-900 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Image
                    src="/bags.jpg"
                    alt="bagsdex logo"
                    width={32}
                    height={32}
                    className="rounded-lg border border-green-500/30"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  bagsdex
                </h1>
              </div>
              <nav className="hidden md:flex space-x-6">
                <button 
                  onClick={() => setFilter('all')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'all' ? 'text-green-400' : 'text-gray-400 hover:text-green-300'}`}
                >
                  <FontAwesomeIcon icon={faCoins} className="w-3 h-3" />
                  <span>All Tokens</span>
                </button>
                <button 
                  onClick={() => setFilter('new')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'new' ? 'text-green-400' : 'text-gray-400 hover:text-green-300'}`}
                >
                  <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
                  <span>New</span>
                </button>
                <button 
                  onClick={() => setFilter('bonded')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'bonded' ? 'text-green-400' : 'text-gray-400 hover:text-green-300'}`}
                >
                  <FontAwesomeIcon icon={faLink} className="w-3 h-3" />
                  <span>Bonded</span>
                </button>
                <button 
                  onClick={() => setFilter('mooning')}
                  className={`text-sm font-medium transition-colors flex items-center space-x-1 ${filter === 'mooning' ? 'text-green-400' : 'text-gray-400 hover:text-green-300'}`}
                >
                  <FontAwesomeIcon icon={faTrophy} className="w-3 h-3" />
                  <span>Mooning</span>
                </button>
              </nav>
            </div>
            
            {/* Live Update Indicator */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${updating ? 'bg-yellow-400 animate-pulse scale-110' : 'bg-green-400'}`}></div>
                <span className={`text-xs transition-colors duration-300 ${updating ? 'text-yellow-400' : 'text-gray-400'}`}>
                  {updating ? 'Updating...' : 'Live'}
                </span>
              </div>
              {lastUpdate && (
                <span className="text-xs text-gray-500 transition-opacity duration-300">
                  Last: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center bg-gradient-to-r from-gray-900 to-black border border-green-500/20 rounded-lg px-4 py-3 focus-within:border-green-400/50 transition-colors">
              <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search tokens by name, symbol, or contract address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="ml-2 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>
              )}
              {isSearching && (
                <div className="ml-2">
                  <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
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
            <h2 className="text-lg font-semibold text-white transition-all duration-300">
              {filteredTokens.length} Tokens
            </h2>
            <span className="text-sm text-gray-400 transition-all duration-300">
              {searchQuery.trim() ? `Search: "${searchQuery}"` : `(${filter === 'all' ? 'All' : filter === 'new' ? 'New' : filter === 'bonded' ? 'Bonded' : 'Mooning'})`}
            </span>
            {updating && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">Updating...</span>
              </div>
            )}
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
            className="w-full bg-gradient-to-r from-gray-900 to-black border border-green-500/20 rounded-lg px-3 py-2 text-white focus:border-green-400 focus:outline-none transition-all duration-200"
          >
            <option value="all">All Tokens</option>
            <option value="new">New</option>
            <option value="bonded">Bonded</option>
            <option value="mooning">Mooning (1M+)</option>
          </select>
        </div>

        {/* Token Grid with smooth transitions */}
        <div className={`transition-opacity duration-300 ${updating ? 'opacity-90' : 'opacity-100'}`}>
          {filteredTokens.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                {searchQuery.trim() ? 'No tokens found matching your search' : 'No tokens found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTokens.map((token, index) => (
                <div
                  key={token.id}
                  className="transform transition-all duration-300 ease-out"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <TokenCard token={token} onCopySuccess={showToast} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-500/20 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              Real-time token data from Solana blockchain via bags.fm
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg border border-green-400/20 transform transition-all duration-300 ease-out animate-fade-in z-50">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
