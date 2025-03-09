import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingUp } from 'lucide-react'; // Importing TrendingDown from lucide-react
import GhanaCediIcon from '../{components}/Icons/ghCediIcon';

const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  const salesData = data?.salesSummary || [];
  const [timeframe, setTimeframe] = useState('weekly');

  const totalValueSum = salesData.reduce((acc, curr) => acc + curr.totalValue, 0) || 0;
  const averageChangePercentage =
    salesData.reduce((acc, curr) => acc + (curr.changePercentage ?? 0), 0) /
    (salesData.length || 1);

  const highestValueData = salesData.reduce(
    (acc, curr) => (curr.totalValue > acc.totalValue ? curr : acc),
    { salesSummaryId: '', totalValue: 0, changePercentage: 0, date: '' }
  );

  const highestValueDate = highestValueData?.date
    ? new Date(highestValueData.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl h-full">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : isError ? (
        <div className="m-5">Failed to fetch data</div>
      ) : (
        <div className="flex flex-col h-full">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Sales Summary</h2>
          <div className="h-[1px] bg-gray-300 shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)]"></div>
          <div className="flex justify-between items-center px-7 mt-4">
            <div>
              <h3 className="text-lg font-medium mb-1">Sales</h3>
              <span className="text-gray-400 block mb-1">Value</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-2xl font-extrabold">
                  <GhanaCediIcon className="w-6 h-6" />
                  <span className="ml-0.5">
                    {(totalValueSum / 1_000_000).toLocaleString('en', {
                      maximumFractionDigits: 2,
                    })}
                    m
                  </span>
                </span>
                <span className="flex items-center text-green-500 text-sm">
                  <TrendingUp className="w-4 h-4" /> {/* Replaced DownTrendIcon with TrendingDown */}
                  <span className="ml-1">{averageChangePercentage.toFixed(2)}%</span>
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="timeframe" className="mr-2 font-medium">
                Timeframe:
              </label>
              <select
                id="timeframe"
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="flex-grow px-7">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => (value / 1_000_000).toFixed(0) + 'm'}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
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
                <Bar
                  dataKey="totalValue"
                  fill="#4F46E5"
                  barSize={30}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center mt-6 text-sm px-7 pb-5">
            <p>
              {salesData.length}{' '}
              {timeframe === 'daily' ? 'days' : timeframe === 'weekly' ? 'weeks' : 'months'}
            </p>
            <p>
              Highest Sales Date: <span className="font-bold">{highestValueDate}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardSalesSummary;