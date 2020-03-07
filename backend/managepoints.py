from stellar_sdk import Server, Keypair, TransactionBuilder, Network

#Methonds in this file will throw a BadRequestError put all these functions in try except

def give_points(receiver_public_key, num_points, memo=""):
    #source is distributor
    source_secret_key = "SAYXYT5RUQUACLIEGU57FXC66DSUZY7JXKJPFLH3266ADRZUHWOWIBPR"
    
    source_keypair = Keypair.from_secret(source_secret_key)
    source_public_key = source_keypair.public_key
    
    server = Server(horizon_url="https://horizon-testnet.stellar.org")

    source_account = server.load_account(source_public_key)
    base_fee = server.fetch_base_fee()

    # if you want to submit to the public network, please use `Network.PUBLIC_NETWORK_PASSPHRASE`.

    if memo == "":
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )
    
    else:
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .add_text_memo(memo)
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )

    transaction.sign(source_keypair)
    print(transaction.to_xdr())
    response = server.submit_transaction(transaction)
    print(response)


def transfer_points(source_secret_key ,receiver_public_key, num_points, memo=""):
    #source is distributor
    
    source_keypair = Keypair.from_secret(source_secret_key)
    source_public_key = source_keypair.public_key
    
    server = Server(horizon_url="https://horizon-testnet.stellar.org")

    source_account = server.load_account(source_public_key)
    base_fee = server.fetch_base_fee()

    # if you want to submit to the public network, please use `Network.PUBLIC_NETWORK_PASSPHRASE`.

    if memo == "":
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )
    
    else:
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .add_text_memo(memo)
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )

    transaction.sign(source_keypair)
    print(transaction.to_xdr())
    response = server.submit_transaction(transaction)
    print(response)


def spend_points(source_secret_key, num_points, memo=""):
    #source is distributor
    
    source_keypair = Keypair.from_secret(source_secret_key)
    source_public_key = source_keypair.public_key

    receiver_public_key = "GCSGUSA6FQ4SKSNKS2ULB6GEQPJKZAKGD6EVZ2HMZXKR3JMXGBIUXR6P"
    
    server = Server(horizon_url="https://horizon-testnet.stellar.org")

    source_account = server.load_account(source_public_key)
    base_fee = server.fetch_base_fee()

    # if you want to submit to the public network, please use `Network.PUBLIC_NETWORK_PASSPHRASE`.

    if memo == "":
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )
    
    else:
        transaction = (
        TransactionBuilder(
            source_account=source_account,
            network_passphrase=Network.TESTNET_NETWORK_PASSPHRASE,
            base_fee=base_fee,
        )
            .append_payment_op(receiver_public_key, str(num_points), "SAVEPOINTS", "GDG4SRXHATOQPRDAMK45YHL42N3RMQ6UJYAS2ETJQ2I5XZYSIQLCSGV6")
            .add_text_memo(memo)
            .set_timeout(30)  # Make this transaction valid for the next 30 seconds only
            .build()
        )

    transaction.sign(source_keypair)
    print(transaction.to_xdr())
    response = server.submit_transaction(transaction)
    print(response)