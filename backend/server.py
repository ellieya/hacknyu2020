import flask
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# what is needed




@app.route('/', methods=['GET'])
def landing():
    return 


@app.route('/dashboard', methods=['GET'])
def dashboard():
    return



# Expected Parameters
# email: str
# password: str
# password2: str - For validation of the first password
# first_name: str - For flavor text really
# last_name: str - ditto
@app.route('/signup', methods=['POST', 'GET'])
def signup():
    # Could dict map this but does it really matter?
    if request.method == 'POST':
        req_data = request.get_json()
        # Do stuff with that info, like do the input validation and then add the user to the DB
        return json.dumps({"message": "Signup Complete"})
    if request.method == 'GET':
        # prolly just display the page?
        bottom_text = "bottomtext"
    return

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        req_data = request.get_json()
        # Again do stuff with the info passed in
        return json.dumps({"message": "Loggin in!"}) # This may not even be the way to do it but we will figure it out
    return

# Expected Arguments
# timestamp - date, or a string
# user_id - the Id of the given user, to pull/insert into their transactions
# cost_balance - number, the total of items actually purchased
# savings_balance - number, the total of the items not purchased
# vendor - string - the vendor or store where the transaction was made
# items_purchased - array of dicts/jsons/maps containing {upc, item_name, unit_cost, total_cost}
# unpurchased_items - an array of dicts/jsons/maps containing {upc, item_name, unit_cost, total_cost}
@app.route('/transaction', methods=['POST'])
def sendTransaction():
    req_data = request.get_json()

    
    return
    
app.run()