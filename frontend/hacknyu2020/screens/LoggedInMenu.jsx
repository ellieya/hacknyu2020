import React from 'react';
import Home from './Home';
import InStoreMode from './InStoreMode';
import Budgeting from './Budgeting';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogOut from './LogOut';

const Drawer = createDrawerNavigator();


export default function LoggedInMenu() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="In-Store Mode" component={InStoreMode} />
            {/* <Drawer.Screen name="Budgeting" component={Budgeting} /> */}
            <Drawer.Screen name="Log out" component={LogOut}/>
        </Drawer.Navigator>)
}



