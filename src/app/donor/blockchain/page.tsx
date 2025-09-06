"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  Shield,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Download,
  Copy,
  Eye,
  Zap,
  Lock,
  Globe,
  Activity
} from "lucide-react";

interface BlockchainTransaction {
  id: string;
  hash: string;
  blockNumber: number;
  timestamp: string;
  from: string;
  to: string;
  amount: string;
  projectName: string;
  status: 'confirmed' | 'pending' | 'failed';
  confirmations: number;
  gasUsed: string;
  beneficiaries: number;
}

export default function BlockchainLedger() {
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null);
  const [searchHash, setSearchHash] = useState('');
  const [isLive, setIsLive] = useState(true);

  // Simulate live blockchain updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        // Simulate new transaction
        console.log('New blockchain transaction detected...');
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isLive]);

  const transactions: BlockchainTransaction[] = [
    {
      id: 'tx_001',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      blockNumber: 18945672,
      timestamp: '2024-01-22 14:30:25',
      from: '0xDonorFoundation2024',
      to: '0xWaterProjectGulshan',
      amount: '৳500,000',
      projectName: 'Clean Water Initiative - Gulshan',
      status: 'confirmed',
      confirmations: 247,
      gasUsed: '0.0023 ETH',
      beneficiaries: 2500
    },
    {
      id: 'tx_002',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890ab',
      blockNumber: 18945658,
      timestamp: '2024-01-20 09:15:42',
      from: '0xDonorFoundation2024',
      to: '0xStreetLightsDhanmondi',
      amount: '৳300,000',
      projectName: 'LED Street Light Installation',
      status: 'confirmed',
      confirmations: 1205,
      gasUsed: '0.0019 ETH',
      beneficiaries: 1800
    },
    {
      id: 'tx_003',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcd',
      blockNumber: 18945645,
      timestamp: '2024-01-18 16:45:18',
      from: '0xDonorFoundation2024',
      to: '0xParkDevelopmentUttara',
      amount: '৳750,000',
      projectName: 'Community Park Development',
      status: 'confirmed',
      confirmations: 1876,
      gasUsed: '0.0031 ETH',
      beneficiaries: 4200
    },
    {
      id: 'tx_004',
      hash: '0x4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      blockNumber: 18945689,
      timestamp: '2024-01-22 15:22:10',
      from: '0xGovernmentTreasury',
      to: '0xEmergencyWaterRepair',
      amount: '৳150,000',
      projectName: 'Emergency Water Main Repair',
      status: 'pending',
      confirmations: 3,
      gasUsed: '0.0015 ETH',
      beneficiaries: 500
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400';
      case 'pending': return 'text-amber-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, transparent 98%, #22c55e 100%),
            linear-gradient(180deg, transparent 98%, #22c55e 100%)
          `,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Flowing data streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Vertical data streams */}
        <div className="absolute left-10 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/30 to-transparent animate-pulse"></div>
        <div className="absolute left-32 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute right-20 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/25 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute right-48 top-0 w-px h-full bg-gradient-to-b from-transparent via-green-400/15 to-transparent animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-green-400/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/10" asChild>
                <a href="/donor">
                  <ArrowLeft className="h-4 w-4" />
                </a>
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-400 animate-pulse" />
                  BLOCKCHAIN LEDGER
                </h1>
                <p className="text-green-300/80 text-sm">Immutable transaction verification system</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">LIVE SYNC</span>
              </div>
              <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/10">
                <Download className="h-4 w-4 mr-1" />
                EXPORT
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Search Interface */}
        <div className="mb-8 bg-green-400/5 border border-green-400/20 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400/60" />
              <input
                type="text"
                placeholder="ENTER TRANSACTION HASH OR BLOCK NUMBER..."
                className="w-full bg-black/50 border border-green-400/30 rounded px-10 py-2 text-green-400 placeholder-green-400/50 focus:border-green-400 focus:outline-none"
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
              />
            </div>
            <Button className="bg-green-500 hover:bg-green-600 text-black font-bold">
              VERIFY
            </Button>
          </div>
        </div>

        {/* Network Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">18,945,689</div>
            <div className="text-green-300/80 text-sm">CURRENT BLOCK</div>
          </div>
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">100%</div>
            <div className="text-green-300/80 text-sm">VERIFIED</div>
          </div>
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">2.3s</div>
            <div className="text-green-300/80 text-sm">AVG BLOCK TIME</div>
          </div>
          <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400 mb-1">₿ 0.0023</div>
            <div className="text-green-300/80 text-sm">AVG GAS FEE</div>
          </div>
        </div>

        {/* Transaction Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
              <Activity className="h-5 w-5 animate-pulse" />
              LIVE TRANSACTION STREAM
            </h2>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`text-green-400 hover:bg-green-400/10 ${isLive ? 'bg-green-400/20' : ''}`}
                onClick={() => setIsLive(!isLive)}
              >
                {isLive ? 'PAUSE' : 'RESUME'}
              </Button>
              <Button variant="ghost" size="sm" className="text-green-400 hover:bg-green-400/10">
                <Filter className="h-4 w-4 mr-1" />
                FILTER
              </Button>
            </div>
          </div>

          {/* Transaction Matrix */}
          <div className="space-y-2">
            {transactions.map((tx, index) => (
              <div 
                key={tx.id}
                className="bg-green-400/5 border border-green-400/20 rounded-lg p-4 hover:bg-green-400/10 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedTx(tx)}
              >
                <div className="flex items-center justify-between">
                  {/* Transaction Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          tx.status === 'confirmed' ? 'bg-green-400' :
                          tx.status === 'pending' ? 'bg-amber-400 animate-pulse' : 'bg-red-400'
                        }`}></div>
                        <span className="text-green-300 text-sm">BLOCK #{tx.blockNumber.toLocaleString()}</span>
                      </div>
                      <span className="text-green-400/60 text-xs">{tx.timestamp}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-green-300/60 text-xs mb-1">HASH:</div>
                        <div className="font-mono text-green-400 truncate group-hover:text-green-300">
                          {tx.hash.substring(0, 20)}...
                        </div>
                      </div>
                      <div>
                        <div className="text-green-300/60 text-xs mb-1">PROJECT:</div>
                        <div className="text-green-400 truncate">{tx.projectName}</div>
                      </div>
                      <div>
                        <div className="text-green-300/60 text-xs mb-1">AMOUNT:</div>
                        <div className="text-green-400 font-bold">{tx.amount}</div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="text-right space-y-2">
                    <div className={`text-sm font-bold ${getStatusColor(tx.status)}`}>
                      {tx.status.toUpperCase()}
                    </div>
                    <div className="text-green-300/60 text-xs">
                      {tx.confirmations} confirmations
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(tx.hash);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-green-400 hover:bg-green-400/20"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Progress bar for pending transactions */}
                {tx.status === 'pending' && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-green-300/60 mb-1">
                      <span>CONFIRMATION PROGRESS</span>
                      <span>{tx.confirmations}/12</span>
                    </div>
                    <div className="w-full bg-green-400/20 rounded-full h-1">
                      <div 
                        className="bg-green-400 h-1 rounded-full transition-all duration-500"
                        style={{ width: `${(tx.confirmations / 12) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Network Statistics */}
        <div className="mt-12 bg-green-400/5 border border-green-400/20 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-400 mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            NETWORK STATISTICS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">247</div>
              <div className="text-green-300/80 text-sm">TOTAL TRANSACTIONS</div>
              <div className="text-green-400/60 text-xs mt-1">This month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">৳12.5M</div>
              <div className="text-green-300/80 text-sm">TOTAL VALUE</div>
              <div className="text-green-400/60 text-xs mt-1">Transferred</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">45,231</div>
              <div className="text-green-300/80 text-sm">BENEFICIARIES</div>
              <div className="text-green-400/60 text-xs mt-1">Lives impacted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-green-300/80 text-sm">UPTIME</div>
              <div className="text-green-400/60 text-xs mt-1">Network reliability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-black border border-green-400/30 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-green-400">TRANSACTION DETAILS</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-green-400 hover:bg-green-400/10"
                onClick={() => setSelectedTx(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6 font-mono">
              {/* Transaction Hash */}
              <div>
                <div className="text-green-300/60 text-xs mb-2">TRANSACTION HASH:</div>
                <div className="bg-green-400/10 border border-green-400/30 rounded p-3 break-all">
                  <span className="text-green-400">{selectedTx.hash}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-2 h-6 w-6 p-0 text-green-400"
                    onClick={() => copyToClipboard(selectedTx.hash)}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Block Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-green-300/60 text-xs mb-2">BLOCK NUMBER:</div>
                  <div className="text-green-400 font-bold">{selectedTx.blockNumber.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-green-300/60 text-xs mb-2">TIMESTAMP:</div>
                  <div className="text-green-400">{selectedTx.timestamp}</div>
                </div>
                <div>
                  <div className="text-green-300/60 text-xs mb-2">STATUS:</div>
                  <div className={`font-bold ${getStatusColor(selectedTx.status)}`}>
                    {selectedTx.status.toUpperCase()}
                  </div>
                </div>
                <div>
                  <div className="text-green-300/60 text-xs mb-2">CONFIRMATIONS:</div>
                  <div className="text-green-400 font-bold">{selectedTx.confirmations}</div>
                </div>
              </div>

              {/* Project Information */}
              <div>
                <div className="text-green-300/60 text-xs mb-2">PROJECT:</div>
                <div className="text-green-400 font-bold text-lg">{selectedTx.projectName}</div>
                <div className="text-green-300/80 text-sm mt-1">{selectedTx.beneficiaries.toLocaleString()} beneficiaries impacted</div>
              </div>

              {/* Transaction Flow */}
              <div>
                <div className="text-green-300/60 text-xs mb-3">TRANSACTION FLOW:</div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xs font-bold">FROM</span>
                    </div>
                    <div className="flex-1 bg-green-400/10 border border-green-400/30 rounded p-2">
                      <div className="text-green-400 text-sm break-all">{selectedTx.from}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-black text-xs font-bold">{selectedTx.amount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                      <span className="text-green-400 text-xs font-bold">TO</span>
                    </div>
                    <div className="flex-1 bg-green-400/10 border border-green-400/30 rounded p-2">
                      <div className="text-green-400 text-sm break-all">{selectedTx.to}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gas Information */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-green-300/60 text-xs mb-2">GAS USED:</div>
                  <div className="text-green-400">{selectedTx.gasUsed}</div>
                </div>
                <div>
                  <div className="text-green-300/60 text-xs mb-2">NETWORK:</div>
                  <div className="text-green-400">ETHEREUM MAINNET</div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-green-400/10 border border-green-400/30 rounded p-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-green-400 font-bold">CRYPTOGRAPHICALLY VERIFIED</div>
                <div className="text-green-300/80 text-xs mt-1">Immutable • Transparent • Auditable</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

