import React from 'react';
import { connect } from "react-redux";
import { View } from 'react-native';
import { userUpdateLoginStatus } from './../redux/actions';

//There's definitely a better way to do this, figure out after hackathon
function LogOut(props){
    props.userUpdateLoginStatus();
    return (
        <View>

        </View>
    )    
}

export default connect(
    null,
    { userUpdateLoginStatus }
)(LogOut);