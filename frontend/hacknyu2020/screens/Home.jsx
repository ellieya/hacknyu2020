import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import styles from './../styles';
import { connect } from "react-redux";
import { userUpdateLoginStatus } from './../redux/actions';
import Loading from "./../components/Loading";



class Home extends React.Component {

    constructor(props) {
        super(props);
        this.dadJoke = "";
        this.state = {
            loading: true,
            dadJoke: ""
        }
    }

    async componentDidMount() {
        this.getDadJoke();
    }

    getDadJoke = async () => {
        let dadJoke = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json"
            }
        })
            .then(async (res) => {
                let json = await res.json();
                return json.joke;
            })

            this.setState({
                loading: false,
                dadJoke
            })

    }

    render() {
        if (this.state.loading) {
            return <Loading />
        } else {
            return (
                <View style={styles.container}>
                    <Text> {this.props.user.info.loginMethod == "login" ? "Welcome back, " : "Welcome, "}{this.props.user.info.firstName}!</Text>
                    <Text>{this.state.dadJoke}</Text>
                    <Text>...aaanyways, slide in from the left to get started!</Text>
                    <Button title="I want another terrible joke"
                        onPress={async () => {
                            this.setState({
                                loading: true
                            })
                            await this.getDadJoke();
                        }
                        } />
                </View >
            )
        }
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(
    mapStateToProps,
    { userUpdateLoginStatus }
)(Home);