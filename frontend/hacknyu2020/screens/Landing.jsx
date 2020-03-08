import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button, Image } from 'react-native';
import styles from './../styles';


const LandingStack = createStackNavigator();

class Landing extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('./../img/logo.png')}/>
                <View style={styles.buttonInline}>
                    <Button style={styles.button} title="Register"
                        onPress={() => this.props.navigation.navigate("Onboarding")}
                    />
                    <Button style={styles.button} title="Login"
                        onPress={() => this.props.navigation.navigate("Login")}
                    />
                </View>
            </View>
        )
    }
}

export default Landing;