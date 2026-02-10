import React from 'react';

const MetricCard = ({ title, amount, subtext, icon: Icon, variant = 'cyan' }) => {
    const colorClass = variant === 'cyan' ? 'text-neon-cyan' : 'text-neon-violet';
    const shadowClass = variant === 'cyan' ? 'hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]' : 'hover:shadow-[0_0_20px_rgba(157,0,255,0.3)]';
    const bgClass = variant === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-violet';

    return (
        <div className={`glass-card relative overflow-hidden group ${shadowClass} border border-white/5`}>
            <div className={`absolute top-4 right-4 p-2 opacity-20 group-hover:opacity-50 transition-all duration-500`}>
                {Icon && <Icon size={40} className={colorClass} />}
            </div>
            <div className="relative z-10">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
                <div className="flex items-end gap-2 mb-2">
                    <span className={`text-3xl font-bold text-white drop-shadow-lg`}>{amount}</span>
                </div>
                {subtext && <p className="text-xs text-gray-500 font-medium">{subtext}</p>}
            </div>
            {/* Decorative bar */}
            <div className={`absolute bottom-0 left-0 w-full h-1 bg-white/5`}>
                <div className={`h-full ${bgClass} w-1/3 group-hover:w-full transition-all duration-700 ease-in-out`}></div>
            </div>
        </div>
    );
};

export default MetricCard;
