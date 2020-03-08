import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from './../styles';
import BarcodeScanner from './BarcodeScanner';

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
            itemsList: []
        }


    }

    onScanned = (data) => {
        //Look up item

        //Check if on DNW List

        //Push onto items list
        let tempItemsList = this.state.itemsList;
        tempItemsList.push({
            
            upc: data
        });

        //Update state
        this.setState({
            mode: "cart",
            itemsList: tempItemsList
        })
    }

    printItemsList = (data) => {
        let itemsArr = [];
        for (let i = 0; i < this.state.itemsList.length; i++) {
            itemsArr.push(<Text>{this.state.itemsList[i]}</Text>);
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
                        <Button title="Cheat the system"
                            onPress={
                                this.setState({
                                    mode: "cart"
                                })
                            }
                        />
                    </View>
                )
            case "cart":
                return (
                    <View style={styles.container}>
                        {this.printItemsList()}
                        <Button title="Scan"
                            onPress={() => {
                                this.setState({
                                    mode: "scan"
                                })
                            }}
                        />
                        <Button title="Checkout"
                            onPress={() => {
                                this.setState({
                                    mode: "checkout"
                                })
                            }} />
                    </View>
                )
            case "scan":
                return (
                    <BarcodeScanner action={this.onScanned} />

                )
            case "checkout":
                return (
                    <View style={styles.container}>
                        <Text>Checkout</Text>
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