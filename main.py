from flask import Flask, render_template,send_from_directory,request
import requests
app = Flask(__name__)

@app.route('/dashboard')
def index():
    return render_template('dashboard.html')

@app.route('/live_charts')
def live_charts():
    address = request.args.get("address")
    url = "https://deep-index.moralis.io/api/token/ERC20/metadata?chain=bsc&chain_name=mainnet&addresses="+address
    headers = {
        'X-API-Key': 'ATCXADfk71ki9FT2mwIdBmjpk0ygigADgEw4ays1BpwOI0rT3jPJZzwjiNgUUYWW',
    }
    response = requests.request("GET", url=url, headers=headers)
    print(response.json()[0]["name"])

    address = request.args.get("address")
    url = "http://localhost:2000/?address="+address
    headers = {}
    capaddressresponse = requests.request("GET", url=url, headers=headers)

    print(capaddressresponse.json()["address"])
    url = "https://graphql.bitquery.io"
    payload = "{\"query\":\"{\\n          ethereum(network: bsc) {\\n            dexTrades(\\n              options: {desc: [\\\"block.height\\\", \\\"tradeIndex\\\"], limit: 10, offset: 0}\\n          \\n              baseCurrency: {is: \\\""+capaddressresponse.json()["address"]+"\\\"}\\n            ) {\\n              block {\\n                timestamp {\\n                  time(format: \\\"%Y-%m-%d %H:%M:%S\\\")\\n                }\\n                height\\n              }\\n              tradeIndex\\n              exchange {\\n                fullName\\n              }\\n              smartContract {\\n                address {\\n                  address\\n                  annotation\\n                }\\n              }\\n              baseAmount\\n              baseCurrency {\\n                address\\n                symbol\\n              }\\n              quoteAmount\\n              quoteCurrency {\\n                address\\n                symbol\\n              }\\n              transaction {\\n                hash\\n              }\\n            }\\n          }\\n        }\",\"variables\":{}}"
    headers = {
        'X-API-Key': 'BQY5beSeoIOk4UtS3QOomyrJGgjaYGJY',
        'Content-Type': 'application/json'
    }
    transaction = requests.request("POST", url, headers=headers, data=payload)

    # for itme in transaction.json()["data"]["ethereum"]["dexTrades"]:
    #     print(itme)

    return render_template('live_charts.html', address=address,info=response.json()[0], name=response.json()[0]["name"], capaddress=capaddressresponse.json()["address"])



@app.route('/stop_losses.html')
def stop_losses():
    return render_template('stop_losses.html', active_page="stop-loss")

@app.route('/rot/index')
def sep_chart():
    return render_template('index.html',address=request.args.get("address"),name=request.args.get("name")
                           ,sname=request.args.get("sname"))

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)
@app.route('/charting_library/<path:path>')
def send_js_chart(path):
    return send_from_directory('static/charting_library/charting_library', path)

@app.route('/sniper')
def sniper():
    return render_template('sniper.html', active_page="sniper")

@app.route('/swap_token.html')
def swap_token():
    return render_template('swap_token.html', active_page="swap_token")

@app.route('/summary.html')
def summary():
    return render_template('summary.html', active_page="summary")
if __name__ == "__main__":
    app.run(debug=True, port=3000)