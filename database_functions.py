from pymongo import MongoClient
from keys import atlas_key
client = MongoClient(atlas_key) # throw the atlas connection string into this bitch, yeet
db = client.hacknyu2020

users = db.users # has the blacklists and transactions.
stores = db.stores 
items = db.items

# Database access and Operations/

# =======================
# User Centric Operations
#========================

# email: str - the users email
# first_name: str - the users first name
# last_name: str - the users last name
# password: password - user's chosen password. Hopefully we can just store a hash or some shit
def makeUser(email, first_name, last_name, password):
    #bop

    new_user = { "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "blacklist_items": { },
                "blacklist_categories": { },
                "transactions": [] }


    users.insert_one(new_user)


# not fully sure what that something is - if its the user's id or the user document itself
def getUser(something):

    user = users.find_one({"something":something})
    return user

# user: user object  - the user themself
# items: list of item documents 
# total: number - the total of the transacton
# store_id: the id of the store the user bought their stuff at.
def addTransaction(user, items, total, store_id):
    # also bop

    # Items comes assembled
    # total comes calculated
    # constant thoughts
    # head infinite


    # consider that items may be:

    new_transaction = {
        "store": store,
        "items": items,
        "total": total
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

# user: above ditto
# item_id: above ditto
def removeBlacklistItem(user, item_id):
    # bop five
    del user.blacklist_items[item_id]

# user: above ditto
# category_id: above ditto
def removeBlacklistCategory(user, category):
    # hexabop



# ============
# Item Centric
# ============

# name: str -  the item's name, examples being "Aunt Jemima Original Pancake & Waffle Mix - 1 lb", or "Funko POP! Star Wars - The Child (Baby Yoda)"
# upcs: a dict of strs - a dictionary of strings representing the upcs associated with the given item
def addItem(name, upcs):
    # septabop
    new_item = {
        "name": name,
        "upcs": upcs
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
    # восим боп

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
    


