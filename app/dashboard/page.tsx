'use client';

import { useState } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import {
  Wallet,
  TrendingUp,
  Shield,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Send,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  X,
  Fuel,
  Activity,
  Lock,
  Image as ImageIcon,
  BarChart3,
  MessageSquare
} from 'lucide-react';

// Mock data - Replace with real data from Space & Time / wagmi hooks
const mockData = {
  gasSpent: {
    total: 127.50,
    change: 12,
    trend: 'up' as const,
    sparkline: [45, 52, 48, 65, 58, 72, 68]
  },
  activityCount: {
    total: 156,
    period: 'Last 30 days',
    change: -5
  },
  securityRisks: {
    count: 3,
    severity: 'high' as const
  },
  recentTransactions: [
    {
      id: '1',
      type: 'swap',
      description: 'Swapped 1 ETH for 2,500 USDC',
      protocol: 'Uniswap',
      timestamp: '2 hours ago',
      gas: 2.34,
      icon: '🔄'
    },
    {
      id: '2',
      type: 'approval',
      description: 'Approved Uniswap Router',
      protocol: 'Uniswap V3',
      timestamp: 'Yesterday',
      gas: 1.20,
      icon: '✅',
      warning: true
    },
    {
      id: '3',
      type: 'transfer',
      description: 'Received 0.05 ETH',
      protocol: 'from 0x7a3b...',
      timestamp: '2 days ago',
      gas: 0,
      icon: '📥'
    }
  ],
  approvals: [
    {
      token: 'USDC',
      spender: 'Uniswap V3',
      amount: 'Unlimited',
      date: 'Jan 15',
      risk: 'high' as const
    },
    {
      token: 'DAI',
      spender: '1inch Router',
      amount: 'Unlimited',
      date: 'Jan 10',
      risk: 'high' as const
    },
    {
      token: 'USDT',
      spender: 'SushiSwap',
      amount: '1,000',
      date: 'Dec 20',
      risk: 'low' as const
    }
  ],
  gasChart: [
    { day: 'Mon', amount: 12 },
    { day: 'Tue', amount: 18 },
    { day: 'Wed', amount: 8 },
    { day: 'Thu', amount: 24 },
    { day: 'Fri', amount: 15 },
    { day: 'Sat', amount: 32 },
    { day: 'Sun', amount: 19 }
  ]
};

export default function DashboardPage() {
  const { address, isConnected } = useAccount();
  const [showAlert, setShowAlert] = useState(true);
  const [approvalsExpanded, setApprovalsExpanded] = useState(false);
  const [nftsExpanded, setNftsExpanded] = useState(false);
  const [analyticsExpanded, setAnalyticsExpanded] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('7D');
  const [showChat, setShowChat] = useState(false);

  // If wallet not connected, show connect prompt
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#023697] to-[#001d51] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Connect Your Wallet</h1>
          <p className="text-gray-600 mb-8">
            Connect your wallet to view your personalized crypto insights
          </p>
          <appkit-button />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#023697] to-[#001d51] rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CIPHER</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowChat(!showChat)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-xl font-medium transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4" />
                AI Chat
              </button>
              <appkit-button />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Alert Banner */}
        {showAlert && mockData.securityRisks.count > 0 && (
          <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    Security Alert: {mockData.securityRisks.count} risky approvals detected
                  </h3>
                  <p className="text-white/90 text-sm mb-3">
                    These contracts can spend your tokens without limit. Review and revoke unnecessary approvals.
                  </p>
                  <button 
                    onClick={() => setApprovalsExpanded(true)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 inline-flex items-center gap-2"
                  >
                    Review Approvals
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowAlert(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Hero Metrics - 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Gas Spent Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#023697] to-[#001d51] rounded-xl flex items-center justify-center">
                <Fuel className="w-6 h-6 text-white" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg ${
                mockData.gasSpent.trend === 'up' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {mockData.gasSpent.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {mockData.gasSpent.change}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Gas Spent</h3>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              ${mockData.gasSpent.total}
            </p>
            <p className="text-sm text-gray-500">↑ {mockData.gasSpent.change}% from last week</p>
            
            {/* Mini sparkline */}
            <div className="mt-4 flex items-end gap-1 h-8">
              {mockData.gasSpent.sparkline.map((value, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#023697] to-[#001d51] rounded-t opacity-60"
                  style={{ height: `${(value / Math.max(...mockData.gasSpent.sparkline)) * 100}%` }}
                />
              ))}
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg bg-gray-100 text-gray-700">
                <RefreshCw className="w-3 h-3" />
                Live
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Activity</h3>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {mockData.activityCount.total} <span className="text-lg text-gray-500">txs</span>
            </p>
            <p className="text-sm text-gray-500">{mockData.activityCount.period}</p>
            
            {/* Activity breakdown dots */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Swaps</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Transfers</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Approvals</span>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg bg-red-100 text-red-700">
                <AlertTriangle className="w-3 h-3" />
                High
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Security Risks</h3>
            <p className="text-4xl font-bold text-gray-900 mb-2">
              {mockData.securityRisks.count} <span className="text-lg text-gray-500">risks</span>
            </p>
            <button
              onClick={() => setApprovalsExpanded(true)}
              className="mt-4 w-full bg-gradient-to-r from-[#023697] to-[#001d51] text-white py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              Review Now
            </button>
          </div>
        </div>

        {/* Gas Spending Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Gas Spending Over Time</h2>
              <p className="text-sm text-gray-500">Track your transaction costs</p>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              {['7D', '30D', '90D', 'All'].map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    chartPeriod === period
                      ? 'bg-gradient-to-r from-[#023697] to-[#001d51] text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2">
            {mockData.gasChart.map((item, idx) => {
              const maxAmount = Math.max(...mockData.gasChart.map(d => d.amount));
              const height = (item.amount / maxAmount) * 100;
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative group">
                    <div
                      className="w-full bg-gradient-to-t from-[#023697] to-[#001d51] rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${height * 2}px` }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      ${item.amount}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Transaction Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-[#023697]" />
              <h2 className="text-lg font-bold text-gray-900">Transaction Breakdown</h2>
            </div>
            
            {/* Simple pie representation with bars */}
            <div className="space-y-3 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Swaps</span>
                  <span className="font-semibold text-gray-900">45%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Transfers</span>
                  <span className="font-semibold text-gray-900">30%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Approvals</span>
                  <span className="font-semibold text-gray-900">15%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Other</span>
                  <span className="font-semibold text-gray-900">10%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-xl text-gray-600 font-medium hover:border-[#023697] hover:text-[#023697] transition-all duration-200">
              View All Transactions
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-[#023697]" />
              <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            </div>

            <div className="space-y-4">
              {mockData.recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="group p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 cursor-pointer border border-transparent hover:border-[#023697]"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{tx.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{tx.description}</h4>
                        {tx.warning && (
                          <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md whitespace-nowrap">
                            <AlertTriangle className="w-3 h-3" />
                            Risk
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mb-2">via {tx.protocol}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">{tx.timestamp}</span>
                        <span className="text-xs font-medium text-gray-600">
                          Gas: ${tx.gas.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full flex items-center justify-center gap-2 py-3 mt-4 border-2 border-gray-200 rounded-xl text-gray-600 font-medium hover:border-[#023697] hover:text-[#023697] transition-all duration-200">
              View All Activity
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {/* Token Approvals */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setApprovalsExpanded(!approvalsExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">Token Approvals</h3>
                  <p className="text-sm text-gray-500">{mockData.approvals.length} active approvals</p>
                </div>
              </div>
              {approvalsExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            {approvalsExpanded && (
              <div className="border-t border-gray-200 p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                        <th className="pb-3 font-medium">Token</th>
                        <th className="pb-3 font-medium">Spender</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {mockData.approvals.map((approval, idx) => (
                        <tr key={idx} className="border-b border-gray-100 last:border-0">
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                🪙
                              </div>
                              <span className="font-medium text-gray-900">{approval.token}</span>
                            </div>
                          </td>
                          <td className="py-4 text-gray-600">{approval.spender}</td>
                          <td className="py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                              approval.risk === 'high' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {approval.risk === 'high' && <AlertTriangle className="w-3 h-3" />}
                              {approval.amount}
                            </span>
                          </td>
                          <td className="py-4 text-gray-600">{approval.date}</td>
                          <td className="py-4">
                            {approval.risk === 'high' ? (
                              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors">
                                Revoke
                              </button>
                            ) : (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* NFT Collection */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setNftsExpanded(!nftsExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">NFT Collection</h3>
                  <p className="text-sm text-gray-500">12 items</p>
                </div>
              </div>
              {nftsExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            {nftsExpanded && (
              <div className="border-t border-gray-200 p-6">
                <p className="text-gray-500 text-sm text-center py-8">
                  NFT gallery coming soon...
                </p>
              </div>
            )}
          </div>

          {/* Advanced Analytics */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <button
              onClick={() => setAnalyticsExpanded(!analyticsExpanded)}
              className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900">Advanced Analytics</h3>
                  <p className="text-sm text-gray-500">Deep insights & trends</p>
                </div>
              </div>
              {analyticsExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
            </button>

            {analyticsExpanded && (
              <div className="border-t border-gray-200 p-6">
                <p className="text-gray-500 text-sm text-center py-8">
                  Advanced analytics coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating AI Chat Button (Mobile) */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="sm:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full shadow-2xl flex items-center justify-center text-gray-900 hover:scale-110 transition-transform duration-200 z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* AI Chat Panel (Slide-in) */}
      {showChat && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
          <div className="bg-gradient-to-r from-[#023697] to-[#001d51] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">AI Assistant</h3>
                <p className="text-xs text-white/80">Ask about your wallet</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <p className="text-sm text-gray-600">
                  👋 Hi! I'm your crypto wallet assistant. Ask me anything about your transactions, gas spending, or security.
                </p>
              </div>
              
              {/* Example suggestions */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Try asking:</p>
                <button className="w-full text-left bg-white rounded-xl p-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  "How much gas did I spend this week?"
                </button>
                <button className="w-full text-left bg-white rounded-xl p-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  "Show me my risky token approvals"
                </button>
                <button className="w-full text-left bg-white rounded-xl p-3 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  "What were my largest transactions?"
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#023697] focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#023697] to-[#001d51] text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
