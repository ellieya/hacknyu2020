import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import styles from './../styles';
import BarcodeScanner from './BarcodeScanner';
import Item from './../components/Item';

class InStoreMode extends React.Component {

    constructor(props) {
        super(props);

        /**
         * Modes:
         * searching - looking for nearby store
         * scan - barcode scanning
         * cart
         * checkout
         * checkout success
         */
        this.state = {
            mode: "searching",
            store: "",
            onDNWList: false,
            itemsList: {},
            costBalance: 0,
            savingsBalance: 0
        }


    }

    onScanned = (data) => {
        //Look up item. If it is already there, we update. Otherwise we just store.
        let tempItemsList = this.state.itemsList;
        let addedPrice = (data === "024100940141" ? 0.99 : 1.49); //get this from backend

        //Check if on DNW List
        if (data === "070847034643" || data === "070847034643" || data === "010847034663" || data === "070847811169") {
            Alert.alert("It's on the DO NOT WANT list!",
                "Are you sure you want to purchase this item?",
                [
                    {
                        text: "Yes :(",
                        onPress: () => {

                        }
                    },
                    {
                        text: "No! :)",
                        onPress: () => {
                            Alert.alert("Awesome!", "SaveCoins obtained!")
                            this.setState({
                                savingsBalance: this.state.savingsBalance + (addedPrice * 10)
                            })
                        }
                    }
                ]
            );
        }
        else {
            if (tempItemsList[data]) {
                tempItemsList[data] = {
                    upc: data,
                    name: tempItemsList[data]["name"],
                    pricePer: tempItemsList[data]["pricePer"],
                    qty: tempItemsList[data]["qty"] + 1,
                    priceTotal: Number.parseFloat(tempItemsList[data]["priceTotal"]) + addedPrice
                }
            } else {
                tempItemsList[data] = {
                    upc: data,
                    name: (data === "024100940141" ? "CHEEZ-ITS" : "GOLDFISH"),
                    pricePer: (data === "024100940141" ? 0.99 : 1.49),
                    priceTotal: (data === "024100940141" ? 0.99 : 1.49),
                    qty: 1
                }
            }

            this.setState({
                costBalance: this.state.costBalance + addedPrice
            })
        }




        //Update state
        this.setState({
            mode: "cart",
            itemsList: tempItemsList
        })
    }

    printItemsList = () => {
        let itemsArr = [];
        for (let elementKey in this.state.itemsList) {
            itemsArr.push(<Item key={elementKey}
                upc={elementKey}
                name={this.state.itemsList[elementKey]["name"]}
                pricePer={this.state.itemsList[elementKey]["pricePer"]}
                priceTotal={this.state.itemsList[elementKey]["priceTotal"]}
                qty={this.state.itemsList[elementKey]["qty"]}
            />);
        }
        console.log(itemsArr);
        return itemsArr;
    }

    handleCheckout = () => {
        //send data to backend
    }

    render() {
        switch (this.state.mode) {
            case "searching":
                return (
                    <View style={styles.container}>
                        <Text>You don't seem to be close to a store right now...</Text>
                        <Text>We'll let you know when you are!</Text>
                        <View>
                            <Button title="Cheat the system"
                                onPress={
                                    this.setState({
                                        mode: "cart"
                                    })
                                }
                            />
                        </View>
                    </View>
                )
            case "cart":
                return (
                    <View style={styles.container}>
                        <Text style={styles.h1}>Cart</Text>
                        <View style={styles.cart}>
                            <View style={styles.buttonInline}>
                                <Text>PRODUCT NAME</Text>
                                <Text>UNIT $</Text>
                                <Text>QTY</Text>
                                <Text>TOTAL $</Text>
                            </View>
                            {this.printItemsList()}
                            <Text>Cost: ${this.state.costBalance.toFixed(2)}</Text>
                            <Text>SaveCoins: {this.state.savingsBalance.toFixed(2)}</Text>
                        </View>
                        <View style={styles.buttonInline}>
                            <Button title="Scan"
                                onPress={() => {
                                    this.setState({
                                        mode: "scan"
                                    })
                                }}
                            />
                            <Button title="Checkout"
                                onPress={() => {
                                    Alert.alert(`Checkout success!`,
                                    `Balance: \$${this.state.costBalance}\nSaveCoins: \$${this.state.savingsBalance}`)
                                }} />
                        </View>
                    </View>
                )
            case "scan":
                return (
                    <BarcodeScanner action={this.onScanned} barCodeTypes={["upc_ean"]} />

                )
            case "checkout":
                return (
                    <View style={styles.container}>
                        <Text>Checkout</Text>
                        <View style={styles.buttonInline}>
                            <Text>NAME</Text>
                            <Text>UNIT $</Text>
                            <Text>QTY</Text>
                            <Text>TOTAL $</Text>
                        </View>
                        {this.printItemsList()}
                        <Button title="Back to Cart"
                            onPress={() =>
                                this.setState({
                                    mode: "cart"
                                })
                            }
                        />
                        <Button title="Checkout"
                            onPress={() => this.handleCheckout()}
                        />
                    </View>
                )
            default:
                return (
                    <View>
                        <Text>??? You shouldn't be seeing this :(</Text>
                    </View>
                )
        }

    }
}

export default InStoreMode;