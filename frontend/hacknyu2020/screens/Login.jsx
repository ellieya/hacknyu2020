import React from 'react';
import { Text, View, Button, TextInput, Alert } from 'react-native';
import styles from './../styles';
import { connect } from "react-redux";
import { userUpdateLoginStatus, userUpdateBasicInformation } from './../redux/actions';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleLogin = () => {
        //if failed
        //Alert.alert("Error", "Incorrect credentials. Try again!");

        let returnResult = {
            firstName: "Ellie",
            lastName: "Chen",
            email: "jiali.chen@cix.csi.cuny.edu"
        }

        //if success
        Alert.alert("Welcome back, " + returnResult.firstName + "!");
        this.props.userUpdateLoginStatus();
        this.props.userUpdateBasicInformation({
            firstName: returnResult.firstName,
            lastName: returnResult.lastName,
            email: returnResult.email,
            loginMethod: "login"
        })
        this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome back!</Text>
                <Text>Email</Text>
                <TextInput
                    autoCompleteType="email"
                    style={styles.input}
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <Text>Password</Text>
                <TextInput
                    autoCompleteType="password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })}
                />
                <Button title="Login"
                onPress = {this.handleLogin}
                />
            </View>
        )
    }
}


export default connect(
    null,
    { userUpdateLoginStatus, userUpdateBasicInformation }
)(Login);