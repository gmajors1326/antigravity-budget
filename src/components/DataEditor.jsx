import React from 'react';
import { X, Save } from 'lucide-react';

const DataEditor = ({ isOpen, onClose, data, onUpdate }) => {
    if (!isOpen) return null;

    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: Number(value) };
        // Recalculate gravity if income/mass changes
        if (field === 'income' || field === 'mass') {
            newData[index].gravity = newData[index].income - newData[index].mass;
        }
        onUpdate(newData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-2xl shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase">
                        Start Trajectory Data
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 space-y-4">
                    <div className="grid grid-cols-4 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        <div>Month</div>
                        <div>Thrust (Income)</div>
                        <div>Mass (Expenses)</div>
                        <div>Gravity (Savings)</div>
                    </div>

                    {data.map((item, index) => (
                        <div key={index} className="grid grid-cols-4 gap-4 items-center group hover:bg-white/5 p-2 rounded-lg transition-colors">
                            <div className="font-mono text-neon-cyan font-bold">{item.month}</div>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    value={item.income}
                                    onChange={(e) => handleChange(index, 'income', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg py-2 pl-6 pr-2 text-white font-mono focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
                                />
                            </div>

                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                <input
                                    type="number"
                                    value={item.mass}
                                    onChange={(e) => handleChange(index, 'mass', e.target.value)}
                                    className="w-full bg-black border border-white/10 rounded-lg py-2 pl-6 pr-2 text-white font-mono focus:border-neon-violet focus:ring-1 focus:ring-neon-violet outline-none transition-all"
                                />
                            </div>

                            <div className="font-mono text-gray-300 pl-2">
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
