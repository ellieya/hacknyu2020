import requests

from stellar_sdk import Keypair, Server, TransactionBuilder, Network

def make_account():
    keypair = Keypair.random()

    print("Public Key: " + keypair.public_key)
    print("Secret Seed: " + keypair.secret)

    server = Server(horizon_url="https://horizon-testnet.stellar.org")


    url = 'https://friendbot.stellar.org'
    response = requests.get(url, params={'addr': keypair.public_key})
    print(response)

    source_keypair = Keypair.from_secret(keypair.secret)
    source_public_key = source_keypair.public_key
    source_account = server.load_account(source_public_key)
    base_fee = server.fetch_base_fee()



    transaction = (
    TransactionBuilder(
        source_account=source_account,
        network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
        base_fee=base_fee,
    )
        .append_change_trust_op("SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
        .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
        .build()
    )

    transaction.sign(source_keypair)
    print(transaction.to_xdr())
    response = server.submit_transaction(transaction)
    #print(response)


    return keypair.public_key, keypair.secret
