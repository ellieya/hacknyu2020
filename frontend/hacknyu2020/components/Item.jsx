import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import styles from './../styles';

export default class Item extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            priceTotal: this.props.priceTotal,
            pricePer: this.props.pricePer,
            qty: this.props.qty,
            upc: this.props.upc
        }
    }

    render() {
        return (
            <View style={styles.buttonInline}>
                <Text>{this.state.name.toUpperCase().slice(0, 12)}</Text>
                <Text>{'$' + (Number.parseFloat(this.state.pricePer).toFixed(2))}</Text>
                <Text>{this.state.qty}</Text>
                <Text>{'$' + (Number.parseFloat(this.state.priceTotal).toFixed(2))}</Text>
            </View>
        )
    }
}

