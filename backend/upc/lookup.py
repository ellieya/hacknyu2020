import urllib.request, json
import sys

def search_upc(upc):
    input = "https://api.upcitemdb.com/prod/trial/lookup?upc=" + upc 
    with urllib.request.urlopen(input) as url:
        data = json.loads(url.read().decode())
        if len(data.get('items')) != 0:
            return data.get('items')[0]
        else:
            raise "NOTFOUND"

def get_images(upc_data):
    return upc_data.get('images')


def get_category(upc_data):
    return upc_data.get('category')


def get_offers(upc_data):
    return upc_data.get('offers')

def get_price_in_store(upc_data, store_name):
    offers = upc_data.get('offers')
    for offer in offers:
        if store_name in offer.get('merchant'):
            return offer.get("price")

def get_cheapest_price_data(upc_data):
    offers = upc_data.get('offers')
    min_price = sys.maxsize
    for offer in offers:
        if offer.get('price') < min_price and offer.get("price") != 0:
            item = offer
    return item
        
