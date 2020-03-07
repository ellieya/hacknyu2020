from password import hash_password
from makeaccount import make_account

def sign_up(password1, password2):
    if password1 != password2:
        raise "PASSMISSMATCH"
    hashed_pass = hash_password(password1)
    keys = make_account() #keys[0] -> public key keys[1] -> private key
    return hashed_pass, keys 

