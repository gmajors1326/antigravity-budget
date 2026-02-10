import React, { useState } from 'react';
import { X, Save, Edit2 } from 'lucide-react';

const CATEGORIES = [
    'housing', 'auto', 'bills', 'business', 'entertainment',
    'food', 'health', 'home', 'misc', 'shopping', 'travel', 'uncategorized'
];

const DataEditor = ({ isOpen, onClose, data, onUpdate }) => {
    if (!isOpen) return null;

    const [localData, setLocalData] = useState(data);

    const handleCategoryChange = (index, category, value) => {
        const newData = JSON.parse(JSON.stringify(localData)); // Deep copy
        const val = Number(value);

        // Ensure categories object exists
        if (!newData[index].categories) newData[index].categories = {};

        // Update category value
        newData[index].categories[category] = val;

        // Recalculate Mass (Total Expenses)
        const totalMass = Object.values(newData[index].categories).reduce((sum, curr) => sum + (Number(curr) || 0), 0);
        newData[index].mass = totalMass;

        // Recalculate Gravity (Income - Mass)
        newData[index].gravity = newData[index].income - totalMass;

        setLocalData(newData);
    };

    const handleIncomeChange = (index, value) => {
        const newData = [...localData];
        const val = Number(value);
        newData[index] = { ...newData[index], income: val };

        // Recalculate Gravity
        newData[index].gravity = val - newData[index].mass;

        setLocalData(newData);
    };

    const handleSave = () => {
        onUpdate(localData);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <div className="bg-obsidian border border-white/10 rounded-2xl w-full max-w-7xl shadow-[0_0_50px_rgba(0,243,255,0.1)] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h2 className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
                        <Edit2 size={20} className="text-neon-cyan" /> Trajectory Configuration
                    </h2>
                    <div className="flex gap-4">
                        <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 rounded-lg transition-all font-bold uppercase tracking-wider text-xs hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                            <Save size={16} /> Save Changes
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="overflow-auto p-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-white/10">
                                <th className="p-4 sticky left-0 bg-obsidian z-10 border-r border-white/10">Month</th>
                                <th className="p-4 text-neon-cyan bg-obsidian z-10 border-r border-white/10 min-w-[120px]">Income</th>
                                {CATEGORIES.map(cat => (
                                    <th key={cat} className="p-4 min-w-[100px] border-b border-white/10">{cat}</th>
                                ))}
                                <th className="p-4 text-neon-violet border-l border-white/10 bg-obsidian sticky right-24 z-10">Mass</th>
                                <th className="p-4 text-white border-l border-white/10 bg-obsidian sticky right-0 z-10">Gravity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {localData.map((item, index) => (
                                <tr key={index} className="group hover:bg-white/5 transition-colors border-b border-white/5">
                                    <td className="p-4 font-mono text-white font-bold sticky left-0 bg-obsidian group-hover:bg-[#111] border-r border-white/10 shadow-[5px_0_10px_-5px_rgba(0,0,0,0.5)]">
                                        {item.month}
                                    </td>
                                    <td className="p-2 border-r border-white/10 bg-obsidian group-hover:bg-[#111]">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 text-xs">$</span>
                                            <input
                                                type="number"
                                                value={item.income}
                                                onChange={(e) => handleIncomeChange(index, e.target.value)}
                                                className="w-full bg-neon-cyan/5 border border-neon-cyan/20 rounded py-1 pl-5 pr-1 text-neon-cyan font-mono text-sm focus:border-neon-cyan outline-none text-right"
                                            />
                                        </div>
                                    </td>

                                    {CATEGORIES.map(cat => (
                                        <td key={cat} className="p-2">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={item.categories?.[cat] || 0}
                                                    onChange={(e) => handleCategoryChange(index, cat, e.target.value)}
                                                    className="w-full bg-transparent border border-white/5 rounded py-1 px-1 text-gray-400 font-mono text-xs focus:border-white/30 outline-none text-right focus:text-white transition-colors hover:bg-white/5"
                                                />
                                            </div>
                                        </td>
                                    ))}

                                    <td className="p-4 font-mono text-neon-violet font-bold text-right border-l border-white/10 bg-obsidian group-hover:bg-[#111] sticky right-24">
                                        ${item.mass.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </td>
                                    <td className={`p-4 font-mono font-bold text-right border-l border-white/10 bg-obsidian group-hover:bg-[#111] sticky right-0 ${item.gravity >= 0 ? 'text-white' : 'text-red-500'}`}>
                                        ${item.gravity.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-8 p-4 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
                        <h3 className="text-neon-cyan font-bold uppercase text-xs tracking-widest mb-2">Tips</h3>
                        <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                            <li>"Housing" includes estimated rent/mortgage derived from your totals (approx $1400).</li>
                            <li>Editing any category cell automatically recalculates Mass and Gravity.</li>
                            <li>Scroll horizontally to see all expense categories.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataEditor;
