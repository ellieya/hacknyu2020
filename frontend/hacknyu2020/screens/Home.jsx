import React from 'react';
import { StyleSheet, Text, View, Button, Image} from 'react-native';
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
                    <View style={styles.pointsView}>
                        <Text style={styles.pointsText}>335</Text>
                    </View>
                    <Text style={styles.h1}> {this.props.user.info.loginMethod == "login" ? "Welcome back, " : "Welcome, "}{this.props.user.info.firstName}!</Text>
                    <View style={styles.dadJokeContainer}>
                        <Text style={styles.dadJoke}>{this.state.dadJoke}</Text>
                    </View>
                    <Image source={require('./../img/happycat.png')}/>
                    <Text style={styles.someSpace}>...aaanyways, slide in from the left to get started!</Text>
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