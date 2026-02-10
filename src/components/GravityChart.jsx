import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';

const GravityChart = ({ data }) => {
    // Determine min/max for domain to show negative values clearly
    const minGravity = Math.min(...data.map(d => d.gravity));
    const isNegative = minGravity < 0;

    return (
        <div className="glass h-96 w-full rounded-2xl p-6 relative overflow-hidden bg-black/40 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6 z-10 relative">
                <h3 className="text-gray-200 text-sm font-bold uppercase tracking-widest">
                    <span className="text-neon-cyan">Thrust</span> vs <span className="text-neon-violet">Mass</span> & <span className="text-white">Gravity</span>
                </h3>
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan/50"></div> Income
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-violet/50"></div> Expenses
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-white/50 animate-pulse"></div> Gravity (Net)
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-neon-violet/5 to-transparent pointer-events-none"></div>

            <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="gravityGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="massGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9d00ff" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#9d00ff" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="netNegative" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
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
                        formatter={(value, name) => {
                            if (name === 'gravity') return [`$${value}`, 'Captured Gravity (Net)'];
                            if (name === 'income') return [`$${value}`, 'Thrust (Income)'];
                            if (name === 'mass') return [`$${value}`, 'Mass (Expesnes)'];
                            return [value, name];
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="income"
                        stackId="1"
                        stroke="#00f3ff"
                        strokeWidth={1}
                        fill="url(#gravityGradient)"
                        animationDuration={1500}
                        dot={false}
                    />
                    <Area
                        type="monotone"
                        dataKey="mass"
                        stackId="2"
                        stroke="#9d00ff"
                        strokeWidth={1}
                        fill="url(#massGradient)"
                        animationDuration={1500}
                        dot={false}
                    />
                    {/* Net Gravity Line - Independent scale */}
                    <Area
                        type="monotone"
                        dataKey="gravity"
                        stroke={minGravity < 0 ? "#ef4444" : "#ffffff"}
                        strokeWidth={3}
                        fill={minGravity < 0 ? "url(#netNegative)" : "url(#netGradient)"}
                        animationDuration={2000}
                        dot={{ r: 4, fill: '#fff' }}
                    />
                    {/* Reference line for 0 gravity */}
                    <ReferenceLine y={0} stroke="#ffffff30" strokeDasharray="3 3" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GravityChart;
