from pymongo import MongoClient
from keys import atlas_key
client = MongoClient(atlas_key) # throw the atlas connection string into this bitch, yeet
db = client.hacknyu2020

users = db.users # has the blacklists and transactions.
stores = db.stores # stores
items = db.items # Items. Their names and UPCs
categories = db.categories # Item categories

# Database access and Operations/

# =======================
# User Centric Operations
#========================

# email: str - the users email
# first_name: str - the users first name
# last_name: str - the users last name
# password: password - user's chosen password. Hopefully we can just store a hash or some shit
def makeUser(email, first_name, last_name, password_hash, public_key, private_key):
    #bop

    new_user = { "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "password_hash": password_hash,
                "public_key": public_key,
                "private_key": private_key, 
                "blacklist_items": { },
                "blacklist_categories": { },
                "transactions": [] }


    try:
        result = users.insert_one(new_user)
        print(result.inserted_id)
        return result.inserted_id
    except:
        return "Insertion Issue"



# not fully sure what that something is - if its the user's id or the user document itself
def getUser(email):

    user = users.find_one({"email": email})
    return user

# timestamp - date, or a string
# user_id - the Id of the given user, to pull/insert into their transactions
# cost_balance - number, the total of items actually purchased
# savings_balance - number, the total of the items not purchased
# vendor - string - the vendor or store where the transaction was made
# items_purchased - array of dicts/jsons/maps containing {upc, item_name, unit_cost, total_cost}
# unpurchased_items - an array of dicts/jsons/maps containing {upc, item_name, unit_cost, total_cost}
def addTransaction(user_id, timestamp, cost_balance, savings_balance, vendor, items_purchased, unpurchased_items):
    # also bop

    # constant thoughts
    # head infinite


    # There is a reality to face
    # the upc API has items names and categories
    # the 

    new_transaction = {
        "user_id": user_id,
        "timestamp": timestamp,
        "cost_balance": cost_balance,
        "savings_balance": savings_balance,
        "vendor": vendor,
        "items_purchased": items_purchased, # not exactly
        "unpurchased_items": unpurchased_items
    }

    users.transactions.append(new_transaction)

# user: user document - the user in question
# item_id: item document id - the item id of the given item document
def addBlacklistItem(user, item_id):
    # bop the third

    user.blacklist_items[item_id]


# user: above ditto
# category_id: the category doc id - the objectid of the given category document
def addBlacklistCategory(user, category_id):
    # bop the fourth
    user.blacklist_categories[category_id]

def isItemBlacklisted(user, item_id):
    pass
    # bop four point 33
    


# user: above ditto
# item_id: above ditto
def removeBlacklistItem(user, item_id):
    # bop five
    del user.blacklist_items[item_id]

# user: above ditto
# category_id: above ditto
def removeBlacklistCategory(user, category_id):
    # hexabop
    del user.blacklist_categories[category_id]


# ============
# Item Centric
# ============

# name: str -  the item's name, examples being "Aunt Jemima Original Pancake & Waffle Mix - 1 lb", or "Funko POP! Star Wars - The Child (Baby Yoda)"
# upcs: a dict of strs - a dictionary of strings representing the upcs associated with the given item
def addItem(name, upcs, categories):
    # septabop


    new_item = {
        "name": name,
        "upcs": upcs,
        "categories": categories 
    }

    items.insert_one(new_item)


# =============
# Store Centric
# =============



# NOTE: (wew vscode lit that up) uh basically rn it only takes name, but I'm sure theres more fields we may need that can be later attached
# manually or otherwise.
# -----
# name: str - the name of the given store
def addStore(name):
    # 
    # восим боп

    if stores.find_one({"name": name}):
        print("Can't INSERT store, already exists!")
    else:
        new_store = {
            "name": name,
            "items": {} # she a map since it might be more logical to have that (perhaps) O(1) here.
        }

# store: store doc - the actual store document from the DB.
# item_id: object id - the object id of the item to be added.
# price: number - the price of the item at the time
def addStoreItem(store, item_id, price):
    # nine bop
    # Bind an item's object id and price, add to the store's item... map or container
    store.items[item_id] = price
    

# ================
# Category Centric
# ================

# name: str - The category, in string form (instead of conceptual/abstract form0)
def addCategory(name):

    name = name.lower()
    if categories.find_one({"name": name}):
        print("Can't INSERT category, already exists!")
    else:
        new_category = {
            "name": name
        }

        categories.insert_one(new_category)

# NOTE: Name may not be the best way to search. Still figuring out the exact use case.
def getCategory(name):
    category = categories.find_one({"name": name})
    return category

