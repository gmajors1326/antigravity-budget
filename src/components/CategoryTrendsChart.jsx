import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const CategoryTrendsChart = ({ data }) => {
    // Transform data for chart
    const chartData = data.map(item => ({
        month: item.month,
        Housing: item.categories?.housing || 0,
        Food: item.categories?.food || 0,
        Auto: item.categories?.auto || 0,
        Bills: item.categories?.bills || 0,
        Misc: item.categories?.misc || 0,
        Shopping: item.categories?.shopping || 0
    }));

    return (
        <div className="glass h-96 w-full rounded-2xl p-6 relative overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6 z-10 relative">
                <h3 className="text-gray-200 text-sm font-bold uppercase tracking-widest">
                    Category Trajectories
                </h3>
            </div>

            <ResponsiveContainer width="100%" height="85%">
                <LineChart data={chartData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis
                        dataKey="month"
                        stroke="#ffffff40"
                        tick={{ fontSize: 12, fill: '#ffffff60' }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#ffffff40"
                        tick={{ fontSize: 12, fill: '#ffffff60' }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'rgba(5, 5, 5, 0.9)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                        }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="circle" />

                    <Line type="monotone" dataKey="Housing" stroke="#00f3ff" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Food" stroke="#9d00ff" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Auto" stroke="#ffeb3b" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Bills" stroke="#4caf50" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="Shopping" stroke="#ff9800" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryTrendsChart;
