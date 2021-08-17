import Datafeed from './datafeed.js';
// alert(document.getElementById("address").value)
var widget = new TradingView.widget({
    symbol: document.getElementById("sname").value, // default symbol
    interval: '15', // default interval
    fullscreen:true,
    container: document.getElementById("tv_chart_container"),
    datafeed: Datafeed.getall("DFDFDFDFDF",document.getElementById("address").value,document.getElementById("sname").value,document.getElementById("name").value),
    theme:"Dark",
    library_path: '../charting_library/',
    autosize: true,
    overrides: {
     "paneProperties.background": "#131722",
     "paneProperties.vertGridProperties.color": "#363c4e",
     "paneProperties.horzGridProperties.color": "#363c4e",
     "symbolWatermarkProperties.transparency": 90,
     "scalesProperties.textColor" : "#AAA",
     "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
     "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
    }
});
// transaction...........................




////////////////////////////////////////////////



