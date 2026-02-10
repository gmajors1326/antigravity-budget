import React from 'react';
import { AlertTriangle, TrendingUp, CheckCircle, Target, BrainCircuit } from 'lucide-react';

const MissionControl = ({ data }) => {
    // Get latest data
    const current = data[data.length - 1]; // Feb
    const prev = data[data.length - 2];    // Jan

    // 1. Trend Analysis: Variable Expenses
    const categoriesToCheck = ['food', 'shopping', 'entertainment', 'misc'];
    const warnings = [];
    const wins = [];

    categoriesToCheck.forEach(cat => {
        const currVal = current.categories?.[cat] || 0;
        const prevVal = prev.categories?.[cat] || 0;
        const diff = currVal - prevVal;

        if (currVal > prevVal * 1.1 && currVal > 50) {
            warnings.push(`${cat.charAt(0).toUpperCase() + cat.slice(1)} drift detected: +$${diff.toFixed(0)} vs last month.`);
        } else if (currVal < prevVal * 0.9 && prevVal > 50) {
            wins.push(`Optimized ${cat}: Saved $${(prevVal - currVal).toFixed(0)} vs last month.`);
        }
    });

    // 2. High Gravity Alert (Debt)
    const highInterestDebt = 850; // MaxLend
    const apr = 1.25; // 125%
    const dailyInterest = (highInterestDebt * apr) / 365;

    // 3. Trajectory Forecast
    const monthlySurplus = current.gravity;
    const totalDebt = 850 + 1240; // MaxLend + Snap
    const monthsToFreedom = monthlySurplus > 0 ? (totalDebt / monthlySurplus).toFixed(1) : 'Infinity';

    return (
        <div className="glass-card mt-8 border-t-4 border-neon-cyan">
            <div className="flex items-center gap-3 mb-6">
                <BrainCircuit size={24} className="text-neon-cyan animate-pulse" />
                <h2 className="text-lg font-bold uppercase tracking-widest text-white">
                    Antigravity Intelligence
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sector 1: Threat Detection */}
                <div className="bg-white/5 p-4 rounded-xl border border-red-500/20">
                    <h3 className="text-red-400 text-xs font-bold uppercase mb-3 flex items-center gap-2">
                        <AlertTriangle size={14} /> Friction Detected
                    </h3>
                    <ul className="space-y-3">
                        <li className="text-xs text-gray-300 border-l-2 border-red-500 pl-3 py-1">
                            <span className="block font-bold text-white">MaxLend Singularity</span>
                            Burning <span className="text-red-400">${dailyInterest.toFixed(2)}/day</span> in purely frictional interest. Priority One: Eliminate.
                        </li>
                        {warnings.map((warn, i) => (
                            <li key={i} className="text-xs text-gray-300 border-l-2 border-orange-500 pl-3 py-1">
                                {warn}
                            </li>
                        ))}
                        {warnings.length === 0 && <li className="text-xs text-gray-500 italic">No category drift detected.</li>}
                    </ul>
                </div>

                {/* Sector 2: Performance Wins */}
                <div className="bg-white/5 p-4 rounded-xl border border-green-500/20">
                    <h3 className="text-green-400 text-xs font-bold uppercase mb-3 flex items-center gap-2">
                        <CheckCircle size={14} /> Thruster Efficiency
                    </h3>
                    <ul className="space-y-3">
                        <li className="text-xs text-gray-300 border-l-2 border-neon-cyan pl-3 py-1">
                            <span className="block font-bold text-white">Income Boost</span>
                            Direct deposit calibration stabilized at <span className="text-neon-cyan">$3,926/mo</span>.
                        </li>
                        {wins.map((win, i) => (
                            <li key={i} className="text-xs text-gray-300 border-l-2 border-green-500 pl-3 py-1">
                                {win}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sector 3: Strategic Projection */}
                <div className="bg-white/5 p-4 rounded-xl border border-neon-violet/20">
                    <h3 className="text-neon-violet text-xs font-bold uppercase mb-3 flex items-center gap-2">
                        <Target size={14} /> Trajectory Plot
                    </h3>

                    <div className="flex flex-col gap-4">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Time to Orbit (Debt Free)</p>
                            <div className="text-2xl font-bold text-white font-mono">
                                {monthsToFreedom} <span className="text-sm text-gray-500 font-sans font-normal">months</span>
                            </div>
                            <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
                                <div className="bg-neon-violet h-full" style={{ width: '45%' }}></div>
                            </div>
                        </div>

                        <div className="bg-black/40 p-3 rounded-lg">
                            <p className="text-xs text-gray-400 mb-1">Recommended Action</p>
                            <p className="text-xs text-white font-medium">
                                Apply <span className="text-neon-cyan font-bold">${(monthlySurplus * 0.8).toFixed(0)}</span> of current gravity (80%) to MaxLend balance immediately.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionControl;
