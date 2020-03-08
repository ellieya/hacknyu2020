import React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './screens/Landing';
import Home from './screens/Home';
import InStoreMode from './screens/InStoreMode';
import Budgeting from './screens/Budgeting';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import styles from './styles';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect } from "react-redux";
import ActualApp from "./ActualApp";





const store = createStore(
  reducer
  );


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ActualApp/>
      </Provider>
    )
  }
}

export default App;

