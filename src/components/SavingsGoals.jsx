import React, { useState } from 'react';
import { Plane, Car, Plus, Trash2, Target, Calendar } from 'lucide-react';

const INITIAL_GOALS = [
    { id: 1, name: 'Hawaii 2026', target: 5000, current: 1200, contribution: 200, icon: Plane },
    { id: 2, name: 'New SUV', target: 35000, current: 5000, contribution: 0, icon: Car },
];

const SavingsGoals = ({ currentGravity }) => {
    const [goals, setGoals] = useState(INITIAL_GOALS);
    const [isAdding, setIsAdding] = useState(false);
    const [newGoal, setNewGoal] = useState({ name: '', target: '', current: '', contribution: '' });

    const handleAddGoal = () => {
        if (!newGoal.name || !newGoal.target) return;

        const goal = {
            id: Date.now(),
            name: newGoal.name,
            target: Number(newGoal.target),
            current: Number(newGoal.current) || 0,
            contribution: Number(newGoal.contribution) || 0,
            icon: Target // Default icon
        };

        setGoals([...goals, goal]);
        setNewGoal({ name: '', target: '', current: '', contribution: '' });
        setIsAdding(false);
    };

    const handleDelete = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const totalMonthlyContribution = goals.reduce((sum, g) => sum + g.contribution, 0);
    const remainingGravity = currentGravity - totalMonthlyContribution;

    return (
        <div className="glass-card relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-neon-cyan/5 rounded-full blur-[60px] pointer-events-none"></div>

            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2 relative z-10">
                <Target size={18} className="text-neon-cyan" /> Warp Gates (Goals)
            </h3>

            <div className="space-y-6 relative z-10">
                {goals.map(goal => {
                    const percent = Math.min(100, (goal.current / goal.target) * 100);
                    const remaining = goal.target - goal.current;
                    const monthsLeft = goal.contribution > 0 ? Math.ceil(remaining / goal.contribution) : '∞';

                    return (
                        <div key={goal.id} className="group">
                            <div className="flex justify-between items-end mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-white/5 text-neon-cyan border border-white/5 group-hover:border-neon-cyan/30 transition-colors">
                                        <goal.icon size={18} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{goal.name}</h4>
                                        <p className="text-xs text-gray-400">
                                            {goal.contribution > 0 ? (
                                                <span className="text-neon-cyan flex items-center gap-1">
                                                    <div className="w-1 h-1 bg-neon-cyan rounded-full animate-pulse"></div>
                                                    Funding: ${goal.contribution}/mo
                                                </span>
                                            ) : (
                                                <span className="text-gray-600">Paused</span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-mono font-bold text-sm">${goal.current.toLocaleString()} <span className="text-gray-500 text-xs">/ ${goal.target.toLocaleString()}</span></p>
                                    {goal.contribution > 0 && (
                                        <p className="text-[10px] text-gray-500 flex items-center justify-end gap-1 mt-1">
                                            <Calendar size={10} /> ETA: {monthsLeft} months
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <div
                                    className="h-full bg-gradient-to-r from-neon-cyan to-blue-500 shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all duration-1000"
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}

                {/* Add New Goal Interface */}
                {isAdding ? (
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 animate-in fade-in zoom-in duration-300">
                        <div className="space-y-3">
                            <input
                                type="text"
                                placeholder="Goal Name"
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-neon-cyan outline-none"
                                value={newGoal.name}
                                onChange={e => setNewGoal({ ...newGoal, name: e.target.value })}
                            />
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="Target $"
                                    className="w-1/2 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-neon-cyan outline-none"
                                    value={newGoal.target}
                                    onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                                />
                                <input
                                    type="number"
                                    placeholder="Current $"
                                    className="w-1/2 bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-neon-cyan outline-none"
                                    value={newGoal.current}
                                    onChange={e => setNewGoal({ ...newGoal, current: e.target.value })}
                                />
                            </div>
                            <input
                                type="number"
                                placeholder="Monthly Contrib. $"
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-neon-cyan outline-none"
                                value={newGoal.contribution}
                                onChange={e => setNewGoal({ ...newGoal, contribution: e.target.value })}
                            />
                            <div className="flex gap-2 mt-2">
                                <button onClick={handleAddGoal} className="flex-1 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan py-2 rounded text-xs font-bold uppercase transition-colors">Confirm</button>
                                <button onClick={() => setIsAdding(false)} className="px-3 hover:bg-white/10 text-gray-400 rounded transition-colors"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full py-3 border border-dashed border-white/20 rounded-xl text-gray-500 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                        <Plus size={16} /> Init New Sequence
                    </button>
                )}

                {/* Summary Stats */}
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-gray-500">Total Goal Allocations</span>
                    <span className="text-neon-cyan font-mono font-bold">${totalMonthlyContribution}/mo</span>
                </div>
                {remainingGravity < 0 && (
                    <div className="mt-2 text-center">
                        <span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-1 rounded border border-red-500/20">
                            Warning: Goals exceed available Gravity
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavingsGoals;
