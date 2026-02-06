// Load TradingView Widget
new TradingView.widget({
    "autosize": true,
    "symbol": "NSE:NIFTY",
    "interval": "5",
    "timezone": "Asia/Kolkata",
    "theme": "dark",
    "style": "1",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "container_id": "tradingview_widget"
});

// Simulate Live Nifty Price
function simulatePrice() {
    const priceEl = document.getElementById('nifty-price');
    let base = 22450.75;
    
    setInterval(() => {
        let change = (Math.random() * 4 - 2).toFixed(2);
        base = (parseFloat(base) + parseFloat(change)).toFixed(2);
        priceEl.innerText = `NIFTY 50: ${base}`;
        priceEl.className = change >= 0 ? "text-green-400 font-mono" : "text-red-400 font-mono";
    }, 2000);
}

simulatePrice();
