// // Make requests to CryptoCompare API
// export async function makeApiRequest(path) {
// 	try {
// 		const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
//         console.log(`https://min-api.cryptocompare.com/${path}`,"dfdfdfdfdf")
// 		return response.json();
// 	} catch (error) {
// 		throw new Error(`CryptoCompare request error: ${error.status}`);
// 	}
// }

// // Generate a symbol ID from a pair of the coins
// export function generateSymbol(exchange, fromSymbol, toSymbol) {
// 	const short = `${fromSymbol}/${toSymbol}`;
// 	return {
// 		short,
// 		full: `${exchange}:${short}`,
// 	};
// }

// export function parseFullSymbol(fullSymbol) {
// 	const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
// 	if (!match) {
// 		return null;
// 	}

// 	return {
// 		exchange: match[1],
// 		fromSymbol: match[2],
// 		toSymbol: match[3],
// 	};
//}



// Make requests to CryptoCompare API



export async function makeApiRequest(path) { 
    try {
        const response = await fetch(`https://min-api.cryptocompare.com/${path}`);
        let k = response.json()
        console.log(k,"dfdf")
        return k;
    } catch(error) {
        throw new Error(`CryptoCompare request error: ${error.status}`);
    }
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function get_date() {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 45)
    today.toDateString()
    yesterday.toDateString()
    return {'yesterday':formatDate(yesterday),"today":formatDate(today) }

}


export function getwbnb(){
    return new Promise((resolve, reject)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        console.log("fffffffffffffffffffffff")
    
        fetch("https://api.coingecko.com/api/v3/simple/price?ids=wbnb&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false", requestOptions).then((response)=>{
            let k = response.json()
            resolve(k)
        })

    })
}


export function makemarketrequest(base_currency,qoute_currency,resolution,symbol,to){
    return new Promise((resolve, reject)=>{
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");
    
        // var raw = JSON.stringify({
        //     "query": "{ethereum(network: bsc) {dexTrades(options: {limit: 2000,asc: \"timeInterval.minute\"},date: {since:\""+get_date()['yesterday']+"\",till:\""+get_date()['today']+"\"},             baseCurrency: {is: \""+qoute_currency+"\"},              quoteCurrency: {is: \""+base_currency+"\"}) {                 timeInterval {                     minute(count: "+resolution+")                 }                 baseCurrency {                     symbol                     address                 }                 baseAmount                 quoteCurrency {                     symbol                     address                 }                 quoteAmount                                 trades: count                 tradeAmount(in: USDT)                 quotePrice                 volume: quoteAmount                 maximum_price: quotePrice(calculate: maximum)                 minimum_price: quotePrice(calculate: minimum)                 open_price: minimum(of: block get: quote_price)                 close_price: maximum(of: block get: quote_price)                 }             }         }"
        // });
    
        // var requestOptions = {
        //     method: 'POST',
        //     headers: myHeaders,
        //     body: raw,
        //     redirect: 'follow'
        // };
        // console.log("fffffffffffffffffffffff")
    
        // fetch("/chart", requestOptions).then((response)=>{
        //     let k = response.json()
        //     resolve(k)
        // })
	//	alert("base="+base_currency+"qou="+qoute_currency)
	var myHeaders = new Headers();
    myHeaders.append("X-API-Key", "BQY5beSeoIOk4UtS3QOomyrJGgjaYGJY");
     myHeaders.append("Content-Type", "application/json");
console.log(qoute_currency,"dddd")
var graphql = JSON.stringify({
  query: "{\n  ethereum(network: bsc) {\n    dexTrades(\n      options: {asc: \"timeInterval.minute\"}\n      exchangeAddress: {is: \"0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73\"}\n      baseCurrency: {is: \""+qoute_currency+"\"}\n      quoteCurrency: {is: \"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c\"}\n      tradeAmountUsd: {gt: 10}\n    ) {\n      timeInterval {\n        minute(count: 15, format: \"%Y-%m-%dT%H:%M:%SZ\")\n      }\n      volume: quoteAmount\n      high: quotePrice(calculate: maximum)\n      low: quotePrice(calculate: minimum)\n      open: minimum(of: block, get: quote_price)\n      close: maximum(of: block, get: quote_price)\n    }\n  }\n}\n\n",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://graphql.bitquery.io", requestOptions)
  .then(response => response.json())
  .then(result => resolve(result))
  .catch(error => console.log('error', error));
		
	
		//    var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        //   };
          
        //   fetch("/new_chart", requestOptions)
        //     .then(response => response.json())
        //     .then(result => resolve(result))
        //     .catch(error => console.log('error', error));

        // var requestOptions = {
        //     method: 'GET',
        //     redirect: 'follow'
        //   };
          
        //   fetch("https://min-api.cryptocompare.com/data/v2/histominute?fsym="+symbol+"&tsym=USD&aggregate="+resolution+"&toTs="+to+"&limit=2000", requestOptions)
        //     .then(response => response.json())
        //     .then(result => resolve(result))
        //     .catch(error => console.log('error', error));

    })
}

// Generate a symbol ID from a pair of the coins
export function generateSymbol(exchange, fromSymbol, toSymbol) {
    const short = `${fromSymbol}/${toSymbol}`;
    return {
        short,
        full: `${exchange}:${short}`,
    };
}

export function parseFullSymbol(fullSymbol) {
    console.log("/////////////////////////////////////")
    const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/);
    console.log(match, fullSymbol,"ffff d" )
    if (!match) {
        return null;
    }

    return { exchange: match[1], fromSymbol: match[2], toSymbol: match[3] };
}