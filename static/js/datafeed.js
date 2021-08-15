import { makeApiRequest, parseFullSymbol, generateSymbol, makemarketrequest,getwbnb } from './helper.js';
// import { subscribeOnStream, unsubscribeFromStream } from './streamin.js';
// const lastBarsCache = new Map();

// ...


let i =0;
async function getAllSymbols() {
    const data = await makeApiRequest('data/v3/all/exchanges');
    let allSymbols = [];

    for (const exchange of configurationData.exchanges) {
        const pairs = data.Data[exchange.value].pairs;
        for (const leftPairPart of Object.keys(pairs)) {
            const symbols = pairs[leftPairPart].map(rightPairPart => {
                const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
                return {
                    symbol: symbol.short,
                    full_name: symbol.full,
                    description: symbol.short,
                    exchange: exchange.value,
                    type: 'crypto',
                };
            });
            allSymbols = [...allSymbols, ...symbols];
        }
    }
    return allSymbols;
}

const configurationData = {
    supported_resolutions: ['1','2','3','4','5','9','10','15','20', '1D', '1W'],

    exchanges: [
        {
            value: 'Bitfinex',
            name: 'Bitfinex',
            desc: 'Bitfinex',
        },
        {
            // `exchange` argument for the `searchSymbols` method, if a user selects this exchange
            value: 'Kraken',

            // filter name
            name: 'Kraken',

            // full exchange name displayed in the filter popup
            desc: 'Kraken bitcoin exchange',
        },
    ],
    symbols_types: [
        {
            name: 'crypto',

            // `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
            value: 'crypto',
        },
        // ...
    ],
};

export default {
     getall:(base_currency,qoute_currency,name,symbol)=> {
         return {
            onReady: (callback) => {
                console.log('[onReady]: Method call');
                setTimeout(() => callback(configurationData));
        
            },
            searchSymbols: async (
                userInput,
                exchange,
                symbolType,
                onResultReadyCallback
            ) => {
                console.log('[searchSymbols]: Method call');
                const symbols = await getAllSymbols();
                const newSymbols = symbols.filter(symbol => {
                    const isExchangeValid = exchange === '' || symbol.exchange === exchange;
                    const isFullSymbolContainsInput = symbol.full_name
                        .toLowerCase()
                        .indexOf(userInput.toLowerCase()) !== -1;
                    return isExchangeValid && isFullSymbolContainsInput;
                });
                onResultReadyCallback(newSymbols);
            },
            resolveSymbol: async (
                symbolName,
                onSymbolResolvedCallback,
                onResolveErrorCallback
            ) => {
                console.log('[resolveSymbol]: Method call', symbolName);
                // const symbols = await getAllSymbols();
                // const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
                // if (!symbolItem) {
                //     console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
                //     onResolveErrorCallback('cannot resolve symbol');
                //     return;
                // }
                const symbolInfo = {
               
                    session: '24x7',
                    timezone: "America/New_York",
                    exchange: name,
                    minmov: 1,
                    pricescale: 10000000,
                    has_intraday: true,
                    has_no_volume: false,
                    has_weekly_and_monthly: false,
                    
                
                    supported_resolutions: configurationData.supported_resolutions,
                
                   
                    data_status: 'streaming',
                };
        
                console.log('[resolveSymbol]: Symbol resolved', symbolName,symbolInfo);
                onSymbolResolvedCallback(symbolInfo);
            },
            getBars:  (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
                console.log(periodParams,"dfdfdfdfdfdfdfdfdfdfdf")
                 const { from, to, firstDataRequest } = periodParams;
                 console.log(from,to,firstDataRequest,"ddddfdsdsdsdsd")
                // console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
                 const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
                 
                // const urlParameters = {
                //     e: parsedSymbol.exchange,
                //     fsym: parsedSymbol.fromSymbol,
                //     tsym: parsedSymbol.toSymbol,
                //     toTs: to,
                //     limit: 2000,
                // };
                // const query = Object.keys(urlParameters)
                //     .map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
                //         .join('&');
                try {
                    // const data = await makeApiRequest(`data/histoday?${query}`);
                    // if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
                    //     // "noData" should be set if there is no data in the requested period.
                    //     onHistoryCallback([], { noData: true });
                    //     return;
                    // }
                    // let bars = [];
                    // data.Data.forEach(bar => {
                    //     if (bar.time >= from && bar.time < to) {
                    //         bars = [...bars, {
                    //             time: bar.time * 1000,
                    //             low: bar.low,
                    //             high: bar.high,
                    //             open: bar.open,
                    //             close: bar.close,
                    //         }];
                    //     }
                    // });
                    console.log(resolution,"dfdfdf")
                    i++;
                    let r = resolution
                    if(r=="1D"){
                        r=1440
                    }
             


                    let bars = []
                    makemarketrequest(base_currency,qoute_currency,r,symbol,to).then(async (result)=>{
                       
                     
                            function getUniqueListBy(arr, key) {
                                return [...new Map(arr.map(item => [item[key], item])).values()]
                            }
                            function toTimestamp(strDate){
                                
                                var datum = Date.parse(Number(strDate));
                                console.log(datum, strDate)
                                return datum;
                            }
                      
                                console.log(result,".................................................................")
                               let us = await getwbnb()
                               console.log(us)
                               result.data.ethereum.dexTrades.forEach((element,i) => {
                                   //console.log(e.wbnb.usd,"dfdfdfdfdfdfdfdfdf;;;;;;;")
                                    //console.log(toTimestamp(element['timeInterval']['minute']),i)
                                    //console.log(element['time']*1000)
                                    //console.log(String(element['timeInterval']['minute'],element['maximum_price']).split(" ")[0], element['minimum_price'],element['close_price'] )
                                   //= bars.push({ "time":element['time']*1000, "open": (Number(element['open'])), "high": (element['high']), "low":(element['low']), "close":(Number(element['close'])),"volume":(Number(element['volumeto'])) })
                                 
                                    bars = [...bars, { "time":parseInt((new Date(`${element['timeInterval']['minute']}`).getTime() ).toFixed(0)), "open": (parseFloat(element['open'])*us.wbnb.usd), "high": parseFloat(element['high'])*us.wbnb.usd, "low":parseFloat(element['low'])*us.wbnb.usd, "close":(parseFloat(element['close'])*us.wbnb.usd),"volume":(Number(element['volume'])) }];
                                
                                   // bars.push({ "time":toTimestamp(`${element['timeInterval']['minute']}`), "open": Math.round(Number(element['open_price'])*e.wbnb.usd), "high": Math.round(element['maximum_price']*e.wbnb.usd), "low":Math.round(element['minimum_price']*e.wbnb.usd), "close":Math.round(Number(element['close_price'])*e.wbnb.usd),"volume":Math.round(Number(element['volume'])) })
                                });
                           
             
                                console.log(bars)
                                // if (firstDataRequest) {
                                //     lastBarsCache.set(symbolInfo.full_name, { ...bars[bars.length - 1] });
                                // }
                                // console.log(`[getBars]: returned ${bars.length} bar(s)`);
                                console.log(`[getBars]: returned ${bars.length} bar(s)`);
                                onHistoryCallback(bars, { noData: false });    
             
                    })
              

          
                } catch (error) {
                    console.log('[getBars]: Get error', error);
                    onErrorCallback(error);
                }
            },
            subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscribeUID, onResetCacheNeededCallback) => {
                console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
             
            },
            unsubscribeBars: (subscriberUID) => {
                console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
               
            },

            
         }
        
    }
    
};





// import {
// 	makeApiRequest,
// 	generateSymbol,
// 	parseFullSymbol,
// } from './helper.js';
// import {
// 	subscribeOnStream,
// 	unsubscribeFromStream,
// } from './streamin.js';

// const lastBarsCache = new Map();

// const configurationData = {
// 	supported_resolutions: ['1','2','3','4','15','1D', '1W', '1M'],
// 	exchanges: [{
// 		value: 'Bitfinex',
// 		name: 'Bitfinex',
// 		desc: 'Bitfinex',
// 	},
// 	{
// 		// `exchange` argument for the `searchSymbols` method, if a user selects this exchange
// 		value: 'Kraken',

// 		// filter name
// 		name: 'Kraken',

// 		// full exchange name displayed in the filter popup
// 		desc: 'Kraken bitcoin exchange',
// 	},
// 	],
// 	symbols_types: [{
// 		name: 'crypto',

// 		// `symbolType` argument for the `searchSymbols` method, if a user selects this symbol type
// 		value: 'crypto',
// 	},
// 		// ...
// 	],
// };

// async function getAllSymbols() {
// 	const data = await makeApiRequest('data/v3/all/exchanges');
// 	let allSymbols = [];

// 	for (const exchange of configurationData.exchanges) {
// 		const pairs = data.Data[exchange.value].pairs;

// 		for (const leftPairPart of Object.keys(pairs)) {
// 			const symbols = pairs[leftPairPart].map(rightPairPart => {
// 				const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
// 				return {
// 					symbol: symbol.short,
// 					full_name: symbol.full,
// 					description: symbol.short,
// 					exchange: exchange.value,
// 					type: 'crypto',
// 				};
// 			});
// 			allSymbols = [...allSymbols, ...symbols];
// 		}
// 	}
// 	return allSymbols;
// }

// export default {
// 	onReady: (callback) => {
// 		console.log('[onReady]: Method call');
// 		setTimeout(() => callback(configurationData));
// 	},

// 	searchSymbols: async (
// 		userInput,
// 		exchange,
// 		symbolType,
// 		onResultReadyCallback,
// 	) => {
// 		console.log('[searchSymbols]: Method call');
// 		const symbols = await getAllSymbols();
// 		const newSymbols = symbols.filter(symbol => {
// 			const isExchangeValid = exchange === '' || symbol.exchange === exchange;
// 			const isFullSymbolContainsInput = symbol.full_name
// 				.toLowerCase()
// 				.indexOf(userInput.toLowerCase()) !== -1;
// 			return isExchangeValid && isFullSymbolContainsInput;
// 		});
// 		onResultReadyCallback(newSymbols);
// 	},

// 	resolveSymbol: async (
// 		symbolName,
// 		onSymbolResolvedCallback,
// 		onResolveErrorCallback,
// 	) => {
// 		console.log('[resolveSymbol]: Method call', symbolName);
// 		const symbols = await getAllSymbols();
// 		const symbolItem = symbols.find(({
// 			full_name,
// 		}) => full_name === symbolName);
// 		if (!symbolItem) {
// 			console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
// 			onResolveErrorCallback('cannot resolve symbol');
// 			return;
// 		}
// 		const symbolInfo = {
// 			ticker: symbolItem.full_name,
// 			name: symbolItem.symbol,
// 			description: symbolItem.description,
// 			type: symbolItem.type,
// 			session: '24x7',
// 			timezone: 'Etc/UTC',
// 			exchange: symbolItem.exchange,
// 			minmov: 1,
// 			pricescale: 100,
// 			has_intraday: true,
// 			has_no_volume: true,
// 			has_weekly_and_monthly: false,
// 			supported_resolutions: configurationData.supported_resolutions,
// 			volume_precision: 2,
// 			data_status: 'streaming',
// 		};

// 		console.log('[resolveSymbol]: Symbol resolved', symbolName);
// 		onSymbolResolvedCallback(symbolInfo);
// 	},

// 	getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
// 		const { from, to, firstDataRequest } = periodParams;
// 		console.log('[getBars]: Method call', symbolInfo, resolution, from, to);
// 		const parsedSymbol = parseFullSymbol(symbolInfo.full_name);
// 		let aggr =resolution
// 		if(String(resolution).includes("D")){
// 			aggr=String(resolution).replace("D","")
// 		}
// 		const urlParameters = {
// 			e: parsedSymbol.exchange,
// 			fsym: parsedSymbol.fromSymbol,
// 			tsym: parsedSymbol.toSymbol,
// 			toTs: to,
// 			limit: 2000,
// 			aggregate:aggr
// 		};
// 		const query = Object.keys(urlParameters)
// 			.map(name => `${name}=${encodeURIComponent(urlParameters[name])}`)
// 			.join('&');
		
		
// 		try {
// 			let data;
// 			if(String(resolution).includes("D")){
// 				 data = await makeApiRequest(`data/v2/histoday?${query}`);
// 			}
// 			else{
// 				 data = await makeApiRequest(`data/v2/histominute?${query}`);

// 			}
// 			if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
// 				// "noData" should be set if there is no data in the requested period.
// 				onHistoryCallback([], {
// 					noData: true,
// 				});
// 				return;
// 			}
// 			let bars = [];
// 			data.Data.Data.forEach(bar => {
// 				if (bar.time >= from && bar.time < to) {
// 					bars = [...bars, {
// 						time: bar.time * 1000,
// 						low: bar.low,
// 						high: bar.high,
// 						open: bar.open,
// 						close: bar.close,
// 					}];
// 				}
// 			});
// 			if (firstDataRequest) {
// 				lastBarsCache.set(symbolInfo.full_name, {
// 					...bars[bars.length - 1],
// 				});
// 			}
// 			console.log(`[getBars]: returned ${bars.length} bar(s)`);
// 			onHistoryCallback(bars, {
// 				noData: false,
// 			});
// 		} catch (error) {
// 			console.log('[getBars]: Get error', error);
// 			onErrorCallback(error);
// 		}
// 	},

// 	subscribeBars: (
// 		symbolInfo,
// 		resolution,
// 		onRealtimeCallback,
// 		subscribeUID,
// 		onResetCacheNeededCallback,
// 	) => {
// 		console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID);
// 		subscribeOnStream(
// 			symbolInfo,
// 			resolution,
// 			onRealtimeCallback,
// 			subscribeUID,
// 			onResetCacheNeededCallback,
// 			lastBarsCache.get(symbolInfo.full_name),
// 		);
// 	},

// 	unsubscribeBars: (subscriberUID) => {
// 		console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
// 		unsubscribeFromStream(subscriberUID);
// 	},
// };