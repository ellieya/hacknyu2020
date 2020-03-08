import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, Button } from 'react-native';
import styles from './../styles';


const LandingStack = createStackNavigator();

class Landing extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <Text>Landing</Text>
                <Button title="Register"
                onPress= {() => this.props.navigation.navigate("Onboarding")}
                />
                <Button title="Login"
                onPress= {() => this.props.navigation.navigate("Login")}
                />
            </View>
        )
    }
}

export default Landing;