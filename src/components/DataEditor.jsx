import React from 'react';
import { X, Save } from 'lucide-react';

const DataEditor = ({ isOpen, onClose, data, onUpdate }) => {
    if (!isOpen) return null;

    const handleChange = (index, field, value) => {
        const newData = [...data];
        const val = Number(value);
        newData[index] = { ...newData[index], [field]: val };

        // Auto-calculate Mass and Gravity
        // Mass = Fixed + Debt + Subs
        const fixed = field === 'fixed' ? val : (newData[index].fixed || 0);
        const debt = field === 'debt' ? val : (newData[index].debt || 0);
        const subs = field === 'subs' ? val : (newData[index].subs || 0);

        // If we're editing mass directly (for legacy compatibility or overall adjustment), let it override sub-components?
        // The user asked to "configure when Thrust changes Mass". 
        // Ideally we edit sub-components. If we only had one mass input, we'd lose details.
        // I will assume for now we prioritize the sub-components.

        newData[index].mass = fixed + debt + subs;
        newData[index].gravity = newData[index].income - newData[index].mass;

        onUpdate(newData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-5xl shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase">
                        Trajectory Configuration
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-7 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 text-center">
                        <div className="text-left">Month</div>
                        <div className="text-neon-cyan">Thrust (In)</div>
                        <div>Fixed Costs</div>
                        <div>Debt Svc</div>
                        <div>Subs</div>
                        <div className="text-neon-violet">Mass (Out)</div>
                        <div className="text-white">Gravity (Save)</div>
                    </div>

                    {data.map((item, index) => (
                        <div key={index} className="grid grid-cols-7 gap-2 items-center group hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="font-mono text-gray-300 font-bold text-sm">{item.month}</div>

                            <div className="relative">
                                <input
                                    type="number"
                                    value={item.income}
                                    onChange={(e) => handleChange(index, 'income', e.target.value)}
                                    className="w-full bg-black/50 border border-neon-cyan/30 rounded-lg py-1 px-2 text-neon-cyan font-mono text-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all text-right"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="number"
                                    value={item.fixed || 0}
                                    onChange={(e) => handleChange(index, 'fixed', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-1 px-2 text-gray-300 font-mono text-sm focus:border-white/30 outline-none transition-all text-right"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="number"
                                    value={item.debt || 0}
                                    onChange={(e) => handleChange(index, 'debt', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-1 px-2 text-gray-300 font-mono text-sm focus:border-white/30 outline-none transition-all text-right"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type="number"
                                    value={item.subs || 0}
                                    onChange={(e) => handleChange(index, 'subs', e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg py-1 px-2 text-gray-300 font-mono text-sm focus:border-white/30 outline-none transition-all text-right"
                                />
                            </div>

                            <div className="font-mono text-neon-violet font-bold text-right pr-2 text-sm">
                                ${item.mass.toLocaleString()}
                            </div>

                            <div className={`font-mono font-bold text-right pr-2 text-sm ${item.gravity >= 0 ? 'text-white' : 'text-red-500'}`}>
                                ${item.gravity.toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-6 border-t border-white/10 bg-white/5 flex justify-end">
                    <button
                        onClick={onClose}
                        className="flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 rounded-xl transition-all font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                    >
                        <Save size={18} />
                        Commit Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataEditor;
