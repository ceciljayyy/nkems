import { ExpenseByCategorySummary, useGetDashboardMetricsQuery } from '@/state/api';
import { TrendingUp } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

type ExpenseSums = {
    [category: string]: number;
};

const colours = ["#00C49F", "#A020F0", "#FF8042", "#0088FE", "#FF6384"];

const CardExpenseSummary = () => {
    const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
    
    const expenseSummary = dashboardMetrics?.expenseSummary?.[0];

    const expenseByCategorySummary = dashboardMetrics?.expenseByCategorySummary || [];

    const expenseSums = expenseByCategorySummary.reduce((acc: ExpenseSums, item: ExpenseByCategorySummary) => {
        const category = item.category + "Expenses";
        const amount = parseInt(item.amount, 10) || 0; // Fallback to 0
        if (!acc[category]) acc[category] = 0;
        acc[category] += amount;
        return acc;
    }, {});

    const expenseCategories = Object.entries(expenseSums).map(([name, value]) => ({
        name,
        value,
    }));
    const totalExpenses = expenseCategories.reduce((acc, category) => acc + category.value, 0);
    const formattedTotalExpenses = totalExpenses.toFixed(2);

    // Log data for debugging
    console.log("expenseCategories:", expenseCategories);
    console.log("totalExpenses:", totalExpenses);

    return (
        <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
            {isLoading ? (
                <div className="m-5 text-center">Loading...</div>
            ) : expenseCategories.length > 0 ? (
                <>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Expense Summary</h2>
                        <div className="h-[1px] bg-gray-300 shadow-[0_2px_4px_1px_rgba(0,0,0,0.1)] "></div>
                    </div>
                    <div className="xl:flex justify-between pr-7">
                        <div className="relative basis-3/5" style={{ minHeight: "150px" }}>
                            <ResponsiveContainer width="100%" height={140}>
                                <PieChart>
                                    <Pie
                                        data={expenseCategories}
                                        innerRadius={50}
                                        outerRadius={60}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                    >
                                        {expenseCategories.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={colours[index % colours.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Overlay div moved outside ResponsiveContainer */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="font-bold text-xl">${formattedTotalExpenses}</span>
                            </div>
                        </div>

                        {/* LABELS */}
                        <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
                            {expenseCategories.map((entry, index) => (
                                <li key={`legend-${index}`} className="flex items-center text-xs">
                                    <span
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: colours[index % colours.length] }}
                                    ></span>
                                    {entry.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* FOOTER */}
                    <div>
                        <hr /> {/* Unchanged, no shadow */}
                        {expenseSummary && (
                            <div className="mt-1 flex justify-between items-center px-7">
                                <div className="pt-2">
                                    <p className="text-xs">
                                        Average:{" "}
                                        <span className="font-semibold">
                                            ${expenseSummary.totalExpenses.toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                                <span className="flex items-center mt-2">
                                    <TrendingUp className="mr-2 text-green-500" />
                                    30%
                                </span>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <div className="m-5 text-center">No expense data available</div>
            )}
        </div>
    );
};

export default CardExpenseSummary;