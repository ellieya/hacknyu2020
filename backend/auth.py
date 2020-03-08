from password import hash_password, verify_password
from makeaccount import make_account
from database_functions import getUser

def sign_up(password1, password2):
    if password1 != password2:
        raise Exception("Password Mismatch")
    hashed_pass = hash_password(password1)
    keys = make_account() #keys[0] -> public key keys[1] -> private key
    return hashed_pass, keys 

def login(email, password):
    user = getUser(email)
    result = verify_password(user["passwordHash"], password)
    if not result:
        raise Exception("Wrong email/password combination")
    return True
    
