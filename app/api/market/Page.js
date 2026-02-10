"use client";
import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { Zap, Activity, BarChart3, Settings } from 'lucide-react';

export default function Dashboard() {
    const chartContainerRef = useRef();
    const [signals, setSignals] = useState([]);

    useEffect(() => {
        // Chart Setup
        const chart = createChart(chartContainerRef.current, {
            layout: { background: { color: '#0d1117' }, textColor: '#d1d4dc' },
            grid: { vertLines: { color: '#1f2937' }, horzLines: { color: '#1f2937' } },
            width: chartContainerRef.current.clientWidth,
            height: 450,
        });
        const candleSeries = chart.addCandlestickSeries({ upColor: '#23d160', downColor: '#ff3860' });

        // TradeX Logic Function
        const checkTradeX = (data) => {
            const { open, low, ltp, vwap } = data;
            if (open === low && ltp > vwap) {
                setSignals(prev => [{name: 'RELIANCE', msg: 'STRONG BUY', price: ltp}, ...prev.slice(0, 10)]);
            }
        };

        // Real-time update simulation
        const interval = setInterval(async () => {
            // Yahan hum upar wale API route se data lenge
            // candleSeries.update({...})
        }, 1000);

        return () => { clearInterval(interval); chart.remove(); };
    }, []);

    return (
        <div className="flex h-screen bg-[#0d1117] text-gray-300 font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-[#161b22] border-r border-[#30363d] p-6 space-y-6">
                <div className="text-green-400 font-bold text-xl flex items-center gap-2"><Zap /> PULSE PRO</div>
                <nav className="space-y-4">
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"><Activity size={20}/> Dashboard</div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"><BarChart3 size={20}/> TradeX Scanners</div>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer"><Settings size={20}/> Settings</div>
                </nav>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 grid grid-cols-4 gap-4 overflow-hidden">
                <div className="col-span-3 bg-[#161b22] border border-[#30363d] rounded-xl p-4">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-semibold">NIFTY 50 LIVE</h2>
                        <div className="text-2xl text-green-400 font-mono">22,145.20</div>
                    </div>
                    <div ref={chartContainerRef} />
                </div>

                <div className="col-span-1 space-y-4">
                    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 text-center">
                        <h3 className="mb-3">Option Clock</h3>
                        <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center m-auto shadow-[0_0_20px_rgba(35,209,96,0.2)]">
                            <span className="font-bold text-green-500">BULLISH</span>
                        </div>
                    </div>

                    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-4 h-[300px] overflow-y-auto">
                        <h3 className="border-b border-gray-700 pb-2 mb-2">TradeX Alerts</h3>
                        {signals.map((s, i) => (
                            <div key={i} className="flex justify-between py-2 border-b border-gray-800 text-sm">
                                <span>{s.name}</span>
                                <span className="text-green-400">{s.msg} @ {s.price}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
