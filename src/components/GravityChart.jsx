import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const GravityChart = ({ data }) => {
    return (
        <div className="glass h-96 w-full rounded-2xl p-6 relative overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6 z-10 relative">
                <h3 className="text-gray-200 text-sm font-bold uppercase tracking-widest">
                    <span className="text-neon-cyan">Captured Gravity</span> vs <span className="text-neon-violet">Heavy Mass</span>
                </h3>
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan/50 animate-pulse"></div> Net Assets
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-violet/50"></div> Debt Load
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-neon-violet/5 to-transparent pointer-events-none"></div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gravityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="massGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9d00ff" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#9d00ff" stopOpacity={0} />
                        </linearGradient>
                    </defs>
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
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                        }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#00f3ff"
                        strokeWidth={2}
                        fill="url(#gravityGradient)"
                        animationDuration={2000}
                    />
                    <Area
                        type="monotone"
                        dataKey="mass"
                        stackId="2"  // Separate stack or overlapping? "vs" implies comparison.
                        // Actually, "Captured Gravity" is Savings. "Mass" is Debt/Expenses.
                        // Usually simpler to compare total Income vs Expenses.
                        // Or Debt vs Net Worth.
                        // I'll reconfigure: Income (Cyan area) and Expenses (Violet area).
                        // The gap is "Captured Gravity".
                        stroke="#9d00ff"
                        strokeWidth={2}
                        fill="url(#massGradient)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GravityChart;
