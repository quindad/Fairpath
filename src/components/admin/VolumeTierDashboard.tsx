import { TrendingUp, DollarSign, Target, Zap, ArrowUp } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  getCurrentTier, 
  getNextTierInfo, 
  calculateMonthlyRevenue,
  calculateYearlyProjection,
  formatCurrency,
  formatPercent,
  getTierColor,
  SINGLEKEY_TIERS
} from '../../utils/volumeTierCalculator';

interface VolumeTierDashboardProps {
  currentMonthReports: number;
  previousMonthReports: number;
}

export default function VolumeTierDashboard({ 
  currentMonthReports,
  previousMonthReports
}: VolumeTierDashboardProps) {
  const tierInfo = getNextTierInfo(currentMonthReports);
  const revenue = calculateMonthlyRevenue(currentMonthReports);
  const growthRate = previousMonthReports > 0 
    ? ((currentMonthReports - previousMonthReports) / previousMonthReports) 
    : 0;
  
  // Calculate progress to next tier
  const progressToNextTier = tierInfo.nextTier 
    ? ((currentMonthReports - tierInfo.currentTier.minReports) / 
       (tierInfo.nextTier.minReports - tierInfo.currentTier.minReports)) * 100
    : 100;

  return (
    <div className="space-y-6">
      {/* Current Tier Overview */}
      <Card className="bg-gradient-to-br from-[#A8F32C]/20 via-[#121212] to-[#121212] border-[#A8F32C] p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-sm text-white/60 mb-2">SingleKey Volume Tier</div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl">Tier {tierInfo.currentTier.tier}: {tierInfo.currentTier.name}</h2>
              <Badge className={`${getTierColor(tierInfo.currentTier.tier)} border`}>
                Active
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60 mb-1">This Month</div>
            <div className="text-3xl text-[#A8F32C]">{currentMonthReports}</div>
            <div className="text-xs text-white/40">reports</div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-white/60 mb-1">SingleKey Cost</div>
            <div className="text-2xl text-white">
              {formatCurrency(tierInfo.currentTier.costPerReport)}
            </div>
            <div className="text-xs text-white/40">per report</div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-[#A8F32C]/30">
            <div className="text-sm text-white/60 mb-1">Platform NET</div>
            <div className="text-2xl text-[#A8F32C]">
              {formatCurrency(tierInfo.currentTier.platformNet)}
            </div>
            <div className="text-xs text-[#A8F32C]">per application</div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-white/60 mb-1">Profit Margin</div>
            <div className="text-2xl text-white">
              {formatPercent(tierInfo.currentTier.profitMargin)}
            </div>
            <div className="text-xs text-white/40">of revenue</div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-white/60 mb-1">Monthly NET</div>
            <div className="text-2xl text-white">
              {formatCurrency(revenue.platformNet)}
            </div>
            <div className="text-xs text-white/40">after SingleKey</div>
          </div>
        </div>
      </Card>

      {/* Progress to Next Tier */}
      {tierInfo.nextTier && (
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-[#A8F32C]" />
            <h3 className="text-xl">Progress to {tierInfo.nextTier.name} Tier</h3>
          </div>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/60">
                {currentMonthReports} / {tierInfo.nextTier.minReports} reports
              </span>
              <span className="text-sm text-[#A8F32C]">
                {tierInfo.reportsToNextTier} to go
              </span>
            </div>
            <Progress value={progressToNextTier} className="h-2" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-[#A8F32C]/10 rounded-lg p-4 border border-[#A8F32C]/30">
              <div className="text-sm text-white/60 mb-1">Next Tier Cost</div>
              <div className="text-2xl text-[#A8F32C]">
                {formatCurrency(tierInfo.nextTier.costPerReport)}
              </div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <ArrowUp className="h-3 w-3 rotate-180" />
                {formatCurrency(tierInfo.currentTier.costPerReport - tierInfo.nextTier.costPerReport)} savings
              </div>
            </div>

            <div className="bg-[#A8F32C]/10 rounded-lg p-4 border border-[#A8F32C]/30">
              <div className="text-sm text-white/60 mb-1">Next Tier NET</div>
              <div className="text-2xl text-[#A8F32C]">
                {formatCurrency(tierInfo.nextTier.platformNet)}
              </div>
              <div className="text-xs text-green-400 flex items-center gap-1">
                <ArrowUp className="h-3 w-3" />
                {formatCurrency(tierInfo.nextTier.platformNet - tierInfo.currentTier.platformNet)} increase
              </div>
            </div>

            <div className="bg-[#A8F32C]/10 rounded-lg p-4 border border-[#A8F32C]/30">
              <div className="text-sm text-white/60 mb-1">Monthly Savings at Next Tier</div>
              <div className="text-2xl text-[#A8F32C]">
                {formatCurrency(tierInfo.monthlySavingsAtNextTier)}
              </div>
              <div className="text-xs text-white/40">vs current rate</div>
            </div>
          </div>
        </Card>
      )}

      {/* All Tiers Comparison */}
      <Card className="bg-[#121212] border-white/10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="h-6 w-6 text-[#A8F32C]" />
          <h3 className="text-xl">All Volume Tiers</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          {SINGLEKEY_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className={`rounded-lg p-4 border ${
                tier.tier === tierInfo.currentTier.tier
                  ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                  : 'bg-black/30 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Badge className={`${getTierColor(tier.tier)} border text-xs`}>
                  Tier {tier.tier}
                </Badge>
                {tier.tier === tierInfo.currentTier.tier && (
                  <Badge className="bg-[#A8F32C] text-black border-0 text-xs">
                    Current
                  </Badge>
                )}
              </div>

              <div className="mb-3">
                <div className="text-white mb-1">{tier.name}</div>
                <div className="text-xs text-white/60">
                  {tier.minReports}{tier.maxReports ? `-${tier.maxReports}` : '+'} reports/mo
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/60">Cost:</span>
                  <span className="text-white">{formatCurrency(tier.costPerReport)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">NET:</span>
                  <span className="text-[#A8F32C]">{formatCurrency(tier.platformNet)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Margin:</span>
                  <span className="text-white">{formatPercent(tier.profitMargin)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Growth Metrics */}
      <Card className="bg-[#121212] border-white/10 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-[#A8F32C]" />
          <h3 className="text-xl">Growth Metrics</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-white/60 mb-1">Month-over-Month Growth</div>
            <div className={`text-2xl ${growthRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {growthRate >= 0 ? '+' : ''}{formatPercent(growthRate * 100)}
            </div>
            <div className="text-xs text-white/40">
              {previousMonthReports} → {currentMonthReports} reports
            </div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-white/60 mb-1">Total SingleKey Costs</div>
            <div className="text-2xl text-white">
              {formatCurrency(revenue.singleKeyCosts)}
            </div>
            <div className="text-xs text-white/40">this month</div>
          </div>

          <div className="bg-black/50 rounded-lg p-4 border border-[#A8F32C]/30">
            <div className="text-sm text-white/60 mb-1">Net Profit This Month</div>
            <div className="text-2xl text-[#A8F32C]">
              {formatCurrency(revenue.platformNet)}
            </div>
            <div className="text-xs text-[#A8F32C]">after all costs</div>
          </div>
        </div>
      </Card>

      {/* 12-Month Projection */}
      {tierInfo.nextTier && (
        <Card className="bg-[#121212] border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="h-6 w-6 text-[#A8F32C]" />
            <h3 className="text-xl">12-Month Projection</h3>
            <Badge className="bg-white/5 text-white/60 border-white/10">
              Assuming {formatPercent(growthRate * 100)} monthly growth
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-sm text-white/60 pb-3">Month</th>
                  <th className="text-right text-sm text-white/60 pb-3">Reports</th>
                  <th className="text-right text-sm text-white/60 pb-3">Tier</th>
                  <th className="text-right text-sm text-white/60 pb-3">NET/Month</th>
                  <th className="text-right text-sm text-white/60 pb-3">Cumulative</th>
                </tr>
              </thead>
              <tbody>
                {calculateYearlyProjection(currentMonthReports, growthRate).slice(0, 6).map((month) => (
                  <tr key={month.month} className="border-b border-white/5">
                    <td className="py-3 text-white">Month {month.month}</td>
                    <td className="py-3 text-right text-white">{month.reports}</td>
                    <td className="py-3 text-right">
                      <Badge className={`${getTierColor(month.tier.tier)} border text-xs`}>
                        T{month.tier.tier}
                      </Badge>
                    </td>
                    <td className="py-3 text-right text-[#A8F32C]">
                      {formatCurrency(month.platformNet)}
                    </td>
                    <td className="py-3 text-right text-white">
                      {formatCurrency(month.cumulativeNet)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center text-sm text-white/60">
            Showing first 6 months • Full projection available in exports
          </div>
        </Card>
      )}
    </div>
  );
}
