import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './screens/Landing';
import Home from './screens/Home';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import styles from './styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { connect } from "react-redux";
import { userUpdateBasicInformation, userUpdateLoginStatus } from './redux/actions';
import LoggedInMenu from './screens/LoggedInMenu';




const Stack = createStackNavigator();


//For debugging purposes only, remove in final build
function TableOfContents({ navigation }) {
    return (
        <View style={styles.container}>
            <Button title="Landing"
                onPress={() => navigation.navigate("Landing")}
            />
            <Button title="Home"
                onPress={() => navigation.navigate("LoggedInMenu")}
            />
            <Button title="In-store Mode"
                onPress={() => navigation.navigate("InStoreMode")}
            />
            <Text style={styles.h1}>May not be implemented</Text>
            <Button title="Budgeting"
                onPress={() => navigation.navigate("Budgeting")}
            />
        </View>
    );
}

class ActualApp extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {this.props.user.loginStatus ? <Stack.Screen name="Home" component={LoggedInMenu} /> : <Stack.Screen name="Landing" component={Landing} />}
                    <Stack.Screen name="Table of Contents" component={TableOfContents} />{/* comment this line out for final release */}
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                    {/* <Stack.Screen name="InStoreMode" component={InStoreMode} /> */}
                    {/* <Stack.Screen name="Budgeting" component={Budgeting} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps)
    (ActualApp);
