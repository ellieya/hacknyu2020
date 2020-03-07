import urllib.request, json 

def get_points(public_key):
    input = "https://horizon-testnet.stellar.org/accounts/" + public_key 
    with urllib.request.urlopen(input) as url:
        data = json.loads(url.read().decode())
        out = data.get('balances')
        for curr in out:
            if curr.get("asset_code") == "SAVEPOINTS":
                return curr.get('balance')
        return 0


