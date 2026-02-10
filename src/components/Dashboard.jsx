import React, { useState } from 'react';
import { ArrowUpRight, TrendingDown, Zap, Trash2, CreditCard, Rocket, ShieldAlert, Edit2 } from 'lucide-react';
import MetricCard from './MetricCard';
import GravityChart from './GravityChart';
import DataEditor from './DataEditor';

const initialData = [
    { month: 'Sep', income: 4100, fixed: 1400, debt: 2400, subs: 100, mass: 3900, gravity: 200 },
    { month: 'Oct', income: 4100, fixed: 1300, debt: 2300, subs: 100, mass: 3700, gravity: 400 },
    { month: 'Nov', income: 4150, fixed: 1250, debt: 2150, subs: 90, mass: 3490, gravity: 660 },
    { month: 'Dec', income: 4300, fixed: 1250, debt: 1750, subs: 80, mass: 3080, gravity: 1220 },
    { month: 'Jan', income: 4100, fixed: 1200, debt: 1600, subs: 80, mass: 2880, gravity: 1220 },
    { month: 'Feb', income: 4100, fixed: 1200, debt: 1200, subs: 70, mass: 2470, gravity: 1630 }, // Current month
];

const Dashboard = () => {
    const [data, setData] = useState(initialData);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    // Get current month (last in array)
    const currentMonth = data[data.length - 1];
    const previousMonth = data[data.length - 2];

    // Calculate trust growth
    const trustGrowth = ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100;

    // Financials
    const income = currentMonth.income;
    const heavyMass = currentMonth.mass; // This now comes from manual input/history
    const capturedGravity = currentMonth.gravity;

    const handleUpdateData = (newData) => {
        setData(newData);
    };

    return (
        <div className="min-h-screen bg-obsidian text-white p-4 md:p-8 relative overflow-hidden font-sans selection:bg-neon-cyan selection:text-black">
            <DataEditor
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                data={data}
                onUpdate={handleUpdateData}
            />

            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-violet/5 rounded-full blur-3xl"></div>
                {/* Stars - could implement simple JS-based stars or CSS */}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            GREG & CANDICE BUDGET 2026
                        </h1>
                        <p className="text-neon-cyan text-xs md:text-sm tracking-[0.2em] uppercase mt-2 font-medium">
                            Defy the Pull of Debt
                        </p>
                    </div>
                    <div className="text-right hidden sm:block">
                        <p className="text-gray-500 text-xs uppercase mb-1">Current Trajectory</p>
                        <div className="flex items-center justify-end gap-2 text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)] cursor-pointer hover:text-white transition-colors" onClick={() => setIsEditorOpen(true)}>
                            <Rocket size={16} />
                            <span className="font-mono font-bold">ASCENDING</span>
                            <Edit2 size={12} className="ml-1 opacity-50" />
                        </div>
                    </div>
                </header>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative group" onClick={() => setIsEditorOpen(true)}>
                        <div className="absolute -inset-0.5 bg-neon-cyan/20 blur opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl"></div>
                        <MetricCard
                            title="Total Thrust"
                            amount={`$${income.toLocaleString()}`}
                            subtext={`${trustGrowth > 0 ? '+' : ''}${trustGrowth.toFixed(1)}% vs last month`}
                            icon={Zap}
                            variant="cyan"
                        />
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                            <Edit2 size={14} className="text-neon-cyan" />
                        </div>
                    </div>
                    <MetricCard
                        title="Heavy Mass"
                        amount={`$${heavyMass.toLocaleString()}`}
                        subtext="Warning: High friction"
                        icon={TrendingDown}
                        variant="violet"
                    />
                    <MetricCard
                        title="Captured Gravity"
                        amount={`$${capturedGravity.toLocaleString()}`}
                        subtext="Savings Rate: 58%"
                        icon={ArrowUpRight}
                        variant="cyan"
                    />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                    {/* Left Column: Visuals */}
                    <div className="lg:col-span-2 space-y-8">
                        <GravityChart data={data} />

                        {/* Debt Section */}
                        <div className="glass-card">
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                                <ShieldAlert size={18} className="text-neon-violet" /> Debt Singularities
                            </h3>
                            <div className="space-y-4">
                                <div className="bg-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center border border-white/5 hover:border-neon-violet/50 transition-colors group cursor-pointer hover:shadow-[0_0_15px_rgba(157,0,255,0.1)]">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="bg-neon-violet/10 p-3 rounded-lg text-neon-violet group-hover:bg-neon-violet/20 transition-colors">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white group-hover:text-neon-violet transition-colors">MaxLend</h4>
                                            <p className="text-xs text-gray-500">High Interest Loan</p>
                                        </div>
                                    </div>
                                    <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                                        <p className="text-white font-mono text-lg font-bold">$850.00</p>
                                        <p className="text-xs text-red-400 font-medium">125% APR</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center border border-white/5 hover:border-neon-violet/50 transition-colors group cursor-pointer hover:shadow-[0_0_15px_rgba(157,0,255,0.1)]">
                                    <div className="flex items-center gap-4 w-full sm:w-auto">
                                        <div className="bg-neon-violet/10 p-3 rounded-lg text-neon-violet group-hover:bg-neon-violet/20 transition-colors">
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white group-hover:text-neon-violet transition-colors">Snap Finance</h4>
                                            <p className="text-xs text-gray-500">Consumer Loan</p>
                                        </div>
                                    </div>
                                    <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                                        <p className="text-white font-mono text-lg font-bold">$1,240.00</p>
                                        <p className="text-xs text-red-400 font-medium">18% APR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-8">
                        {/* Subscription Bloat */}
                        <div className="glass-card h-full relative overflow-hidden flex flex-col">
                            <div className="absolute top-0 right-0 p-32 bg-neon-violet/5 blur-[80px] rounded-full pointer-events-none"></div>
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                                <Trash2 size={18} className="text-red-400" /> Subscription Bloat
                            </h3>

                            <div className="space-y-4 relative z-10 flex-grow">
                                <p className="text-xs text-gray-500 mb-4">Eliminate these to recover <span className="text-white font-bold text-base align-middle ml-1">$70.89/mo</span> of gravity.</p>

                                {[
                                    { name: 'OpenAI', cost: 20.00, icon: 'O' },
                                    { name: 'Wix', cost: 50.89, icon: 'W' }
                                ].map((sub, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-red-500/5 border border-red-500/10 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 transition cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-obsidian border border-white/5 flex items-center justify-center font-bold text-gray-500 group-hover:text-white transition-colors group-hover:border-white/20">
                                                {sub.icon}
                                            </div>
                                            <span className="text-sm font-medium text-gray-300 group-hover:text-white">{sub.name}</span>
                                        </div>
                                        <span className="font-mono text-red-400 group-hover:text-red-300 font-bold">-${sub.cost}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 relative z-10">
                                <button className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-200 text-sm font-bold uppercase tracking-wider transition-all hover:bg-red-500/20 hover:border-red-500/50 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] shadow-[0_0_10px_rgba(239,68,68,0.1)] flex items-center justify-center gap-2 group">
                                    <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                                    Jettison All
                                </button>
                            </div>
                        </div>

                        {/* Quick Actions / Tips */}
                        <div className="glass-card mt-6">
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-4">System Status</h3>
                            <div className="space-y-3 font-mono text-xs text-gray-500">
                                <div className="flex justify-between">
                                    <span>Gravity Well</span>
                                    <span className="text-green-400">Stable</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Escape Velocity</span>
                                    <span className="text-neon-cyan">84%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Next Payment</span>
                                    <span className="text-white">Feb 14</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
