import React from 'react';
import { Text, View, Button, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import styles from './../styles';
import { connect } from "react-redux";
import { userUpdateLoginStatus, userUpdateBasicInformation } from './../redux/actions';
import Modal from 'react-native-modalbox';

class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 0,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            cpassword: "",
            buttonValue: "Next",
            confirmStageReached: false
        }

        this.stateToValidate = [
            ["firstName", "lastName"],
            ["email", "password", "cpassword"]
        ]
    }

    generatePasswordAsterisks(length) {
        let string = "";
        for (let i = 0; i < length; i++) {
            string.concat('*');
        }
        return string;
    }

    dataValidation() {
        console.log(this.stateToValidate);
        if (this.state.stage !== 2) {
            for (let attributeKey of this.stateToValidate[this.state.stage]) {
                if (this.state[attributeKey] === "") {
                    throw attributeKey.toUpperCase() + " should not be empty!";
                } else {
                    switch (attributeKey) {
                        case "password":
                            //Does the password meet length requirements?
                            if (this.state[attributeKey].length < 6)
                                throw "Password should be at least 6 characters!";
                            //Do the two passwords match?
                            else if (this.state["password"] !== this.state["cpassword"])
                                throw "Password and confirm password do not match.";
                            break;
                        default:
                            break;
                    }
                }
            }
        }

    }

    createContentForStage() {
        switch (this.state.stage) {
            case 0:
                return (
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <Text style={styles.h1}>{"\n"}What's your name?</Text>
                        <Text>First Name</Text>
                        <TextInput
                            autoCompleteType="name"
                            style={styles.input}
                            value={this.state.firstName}
                            onChangeText={text => this.setState({ firstName: text })}
                        />
                        <Text>Last Name</Text>
                        <TextInput
                            autoCompleteType="name"
                            style={styles.input}
                            value={this.state.lastName}
                            onChangeText={text => this.setState({ lastName: text })}
                        />
                    </KeyboardAvoidingView>
                );
            case 1:
                return (
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <Text style={styles.h1}>Hi {this.state.firstName}!{"\n"}Just need a little bit more information before we get started.</Text>
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
                        <Text>Confirm Password</Text>
                        <TextInput
                            autoCompleteType="password"
                            secureTextEntry={true}
                            style={styles.input}
                            value={this.state.cpassword}
                            onChangeText={text => this.setState({ cpassword: text })}
                        />
                    </KeyboardAvoidingView>
                );
            case 2:
                return (
                    <View style={styles.container}>
                        <Text>Does this information look correct?</Text>
                        <Text>First name: {this.state.firstName}</Text>
                        <Text>Last name: {this.state.lastName}</Text>
                        <Text>Email address: {this.state.email}</Text>
                    </View>
                )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.createContentForStage()}
                <View style={styles.buttonInline}>
                    <Button title={this.state.buttonValue}
                        onPress={() => {
                            try {
                                this.dataValidation()
                                if (this.state.stage === 2) {
                                    //This should display a modal
                                    this.props.userUpdateLoginStatus();
                                    this.props.userUpdateBasicInformation({
                                        email: this.state.email,
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                        loginMethod: "register"
                                    })
                                    this.props.navigation.popToTop();
                                } else {
                                    let newStageValue = this.state.stage + 1;
                                    this.setState({
                                        stage: newStageValue
                                    })

                                    if (newStageValue === 2) {
                                        this.setState({
                                            buttonValue: "Submit"
                                        })
                                    }
                                }
                            } catch (err) {
                                Alert.alert(
                                    'Error',
                                    err.toString()
                                )
                            }

                        }}
                    />
                </View>
            </View>
        )
    }
}

export default connect(
    null,
    { userUpdateLoginStatus, userUpdateBasicInformation }
)(Onboarding);