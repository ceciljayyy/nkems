import { useGetDashboardMetricsQuery } from '@/state/api';
import numeral from 'numeral';
import React from 'react';
import GhanaCediIcon from '../{components}/Icons/ghCediIcon';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CardPurchaseSummary = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  const purchaseData = dashboardMetrics?.purchaseSummary || [];
  const lastDataPoint = purchaseData.length > 0 ? purchaseData[purchaseData.length - 1] : null;

  return (
    <div className="row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white p-5 rounded-lg shadow-lg h-full">
      {isLoading ? (
        <div className="m-5 text-center">Loading...</div>
      ) : (
        <div className="flex flex-col h-full">
          {/* HEADER SECTION */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Purchase Summary</h2>
            <div className="h-[1px] bg-gray-300 shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] mx-[-1.25rem]"></div>
          </div>

          {/* BODY SECTION */}
          <div className="mb-4 mt-5">
            <p className="text-xs text-gray-400">Purchased</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">
                {lastDataPoint ? (
                  <>
                    <GhanaCediIcon className="w-6 h-6 inline mr-1" />
                    {numeral(lastDataPoint.totalPurchased).format('0.00a')}
                  </>
                ) : (
                  '0'
                )}
              </p>
              {lastDataPoint && (
                <p
                  className={`text-sm flex ml-3 ${
                    lastDataPoint.changePercentage! < 0 ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {lastDataPoint.changePercentage! < 0 ? (
                    <TrendingUp className="w-5 h-5 mr-1" />
                  ) : (
                    <TrendingDown className="w-5 h-5 mr-1" />
                  )}
                  {Math.abs(lastDataPoint.changePercentage!)}%
                </p>
              )}
            </div>
          </div>

          {/* CHART SECTION */}
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={purchaseData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    });
                  }}
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value) => `₵${Number(value).toLocaleString('en')}`}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    });
                  }}
                  contentStyle={{
                    backgroundColor: 'var(--tooltip-bg)',
                    color: 'var(--tooltip-color)',
                    border: 'none',
                    borderRadius: '4px',
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={{ stroke: 'black', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPurchaseSummary;