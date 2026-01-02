import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, TrendingUp, DollarSign, Award, Download, RefreshCw,
  AlertCircle, CheckCircle, Clock, Database, Server, Activity
} from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface Analytics {
  users: {
    total: number;
    incarcerated: number;
    released: number;
    placed: number;
    releasing30Days: number;
    releasing60Days: number;
    releasing90Days: number;
  };
  offers: {
    total: number;
    pending: number;
    accepted: number;
    hires: number;
  };
  revenue: {
    placementFees: number;
    wotcFees: number;
    total: number;
  };
  wotc: {
    totalCreditsGenerated: number;
    fairpathRevenue: number;
    creditsProcessed: number;
  };
  facilities: Record<string, number>;
  sync: {
    lastSyncTime: string;
    totalSyncs: number;
  };
}

interface SystemHealth {
  status: 'healthy' | 'warning' | 'error';
  lastSync: string;
  hoursSinceLastSync: number;
  totalUsers: number;
  totalSyncs: number;
  timestamp: string;
}

export function PrereleaseAdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch analytics
      const analyticsRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/prerelease/admin/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const analyticsData = await analyticsRes.json();
      
      // Fetch health
      const healthRes = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a6daf7a5/prerelease/admin/health`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const healthData = await healthRes.json();
      
      if (analyticsData.success) setAnalytics(analyticsData.data);
      if (healthData.success) setHealth(healthData.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 60 seconds
    if (autoRefresh) {
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const exportToCSV = (data: any, filename: string) => {
    // Convert data to CSV
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map((row: any) => 
      Object.values(row).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${Date.now()}.csv`;
    a.click();
  };

  const exportToJSON = (data: any, filename: string) => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${Date.now()}.json`;
    a.click();
  };

  const exportAnalyticsReport = () => {
    if (!analytics) return;
    
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalUsers: analytics.users.total,
        totalRevenue: analytics.revenue.total,
        totalHires: analytics.offers.hires,
        totalWOTCCredits: analytics.wotc.totalCreditsGenerated
      },
      users: analytics.users,
      offers: analytics.offers,
      revenue: analytics.revenue,
      wotc: analytics.wotc,
      facilities: analytics.facilities,
      sync: analytics.sync
    };
    
    exportToJSON(report, 'prerelease-analytics-report');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#A8F32C] mb-2">
              FairPath Prerelease Admin
            </h1>
            <p className="text-gray-400">
              Real-time monitoring and analytics for the jail tablet app
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setAutoRefresh(!autoRefresh)}
              className="border-[#A8F32C] text-[#A8F32C]"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
              {autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}
            </Button>
            
            <Button
              onClick={fetchData}
              className="bg-[#A8F32C] text-black hover:bg-[#8CD423]"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Now
            </Button>
            
            <Button
              onClick={exportAnalyticsReport}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* System Health Status */}
        {health && (
          <Card className="bg-gray-900 border-gray-800 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Server className="h-6 w-6 text-[#A8F32C]" />
                  <CardTitle className="text-white">System Health</CardTitle>
                </div>
                
                <Badge 
                  variant={health.status === 'healthy' ? 'default' : 'destructive'}
                  className={health.status === 'healthy' ? 'bg-[#A8F32C] text-black' : ''}
                >
                  {health.status === 'healthy' ? (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-1" />
                  )}
                  {health.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Last Sync</p>
                  <p className="text-white">
                    {health.lastSync !== 'Never' 
                      ? new Date(health.lastSync).toLocaleString()
                      : 'Never'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Hours Since Sync</p>
                  <p className="text-white font-mono">{health.hoursSinceLastSync}h</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Users</p>
                  <p className="text-white font-mono">{health.totalUsers}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Syncs</p>
                  <p className="text-white font-mono">{health.totalSyncs}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Last Updated</p>
                  <p className="text-white text-sm">
                    {new Date(health.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Stats */}
        {analytics && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Total Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#A8F32C] mb-2">
                    {analytics.users.total}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Incarcerated:</span>
                      <span className="text-white">{analytics.users.incarcerated}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Released:</span>
                      <span className="text-white">{analytics.users.released}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Placed:</span>
                      <span className="text-white">{analytics.users.placed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Job Offers */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Job Offers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#A8F32C] mb-2">
                    {analytics.offers.total}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Pending:</span>
                      <span className="text-yellow-400">{analytics.offers.pending}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Accepted:</span>
                      <span className="text-blue-400">{analytics.offers.accepted}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Hires:</span>
                      <span className="text-green-400">{analytics.offers.hires}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#A8F32C] mb-2">
                    ${analytics.revenue.total.toLocaleString()}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Placement Fees:</span>
                      <span className="text-white">${analytics.revenue.placementFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>WOTC Fees:</span>
                      <span className="text-white">${analytics.revenue.wotcFees.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WOTC Credits */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    WOTC Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold text-[#A8F32C] mb-2">
                    ${analytics.wotc.totalCreditsGenerated.toLocaleString()}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>FairPath Revenue:</span>
                      <span className="text-white">${analytics.wotc.fairpathRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Credits Processed:</span>
                      <span className="text-white">{analytics.wotc.creditsProcessed}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Release Timeline */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-[#A8F32C]" />
                  Upcoming Releases
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Candidates releasing soon - employers are being notified automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-900/20 border border-red-800 rounded-lg">
                    <div className="text-5xl font-bold text-red-400 mb-2">
                      {analytics.users.releasing30Days}
                    </div>
                    <div className="text-sm text-gray-400">Releasing in 30 Days</div>
                    <div className="text-xs text-red-400 mt-2">URGENT - Job offers needed</div>
                  </div>
                  
                  <div className="text-center p-6 bg-yellow-900/20 border border-yellow-800 rounded-lg">
                    <div className="text-5xl font-bold text-yellow-400 mb-2">
                      {analytics.users.releasing60Days}
                    </div>
                    <div className="text-sm text-gray-400">Releasing in 60 Days</div>
                    <div className="text-xs text-yellow-400 mt-2">Moderate priority</div>
                  </div>
                  
                  <div className="text-center p-6 bg-green-900/20 border border-green-800 rounded-lg">
                    <div className="text-5xl font-bold text-green-400 mb-2">
                      {analytics.users.releasing90Days}
                    </div>
                    <div className="text-sm text-gray-400">Releasing in 90 Days</div>
                    <div className="text-xs text-green-400 mt-2">Planning phase</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities Breakdown */}
            <Card className="bg-gray-900 border-gray-800 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#A8F32C]" />
                    Facilities Breakdown
                  </CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C]"
                    onClick={() => exportToJSON(analytics.facilities, 'facilities-data')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <CardDescription className="text-gray-400">
                  User distribution across correctional facilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analytics.facilities).map(([facility, count]) => {
                    const percentage = ((count / analytics.users.total) * 100).toFixed(1);
                    return (
                      <div key={facility}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm">{facility}</span>
                          <span className="text-gray-400 text-sm">
                            {count} users ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-[#A8F32C] h-2 rounded-full transition-all"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Data Export Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Download className="h-5 w-5 text-[#A8F32C]" />
                  Data Exports
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Download comprehensive data reports for analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                    onClick={() => exportToJSON(analytics.users, 'users-data')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Users Data (JSON)
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                    onClick={() => exportToJSON(analytics.offers, 'offers-data')}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Offers Data (JSON)
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                    onClick={() => exportToJSON(analytics.revenue, 'revenue-data')}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Revenue Data (JSON)
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                    onClick={() => exportToJSON(analytics.wotc, 'wotc-data')}
                  >
                    <Award className="h-4 w-4 mr-2" />
                    WOTC Data (JSON)
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-[#A8F32C] text-[#A8F32C] hover:bg-[#A8F32C] hover:text-black"
                    onClick={() => exportToJSON(analytics.facilities, 'facilities-data')}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Facilities Data (JSON)
                  </Button>
                  
                  <Button
                    className="bg-[#A8F32C] text-black hover:bg-[#8CD423]"
                    onClick={exportAnalyticsReport}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Full Report (JSON)
                  </Button>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">
                    <strong className="text-white">Note:</strong> All exports include timestamps and are suitable for:
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1 ml-4">
                    <li>• Investor presentations and board meetings</li>
                    <li>• Grant applications and impact reports</li>
                    <li>• Research partnerships and academic studies</li>
                    <li>• Government compliance and reporting</li>
                    <li>• Internal analytics and trend analysis</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
