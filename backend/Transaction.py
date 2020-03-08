from lookup import *
from database_functions import *
from managepoints import *

class Transaction:
    def __init__(self, user_id, upc_purchased, upc_rejected, merchant=""):
        self.public_key = getPublicKey(user_id) 
        self.upc_purchesed = upc_purchased #array comes in [0] -> upc [1] -> number 
        self.upc_rejected = upc_rejected  #array comes in [0] -> upc [1] -> number 
        self.merchant = merchant
        self.items_purchased = self.get_items(upc_purchased)        
        self.items_saved = self.get_items(upc_rejected)
        


    def get_items(self, upc_list):
        output_list = []
        for upc in upc_list:
            sublist = [] # [0] -> upc [1] -> name [2] -> cost 
            sublist.append(upc[0])
            upc_data = search_upc(upc[0])
            sublist.append(get_name(upc_data))
            cost = get_price_in_store(upc_data, self.merchant)
            if cost is None or cost == 0:
                cost = get_cheapest_price_data(upc_data)
            sublist.append(cost)
            sublist.append(upc[1])
            sublist.append(get_images(upc_data))
            output_list.append(sublist)
        return output_list

    def post_transaction(self):
        money_saved = 0
        for item in self.items_saved:
            money_saved += int(item[2])
        give_points(self.public_key, money_saved*10)
