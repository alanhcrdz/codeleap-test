import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Modal,
    Portal,
} from 'react-native-paper';


const CustomDialog = ({ children, isVisible, onDismiss, isDismissable }) => {

    // * Modal style
    const containerStyle = {
        backgroundColor: "#fff",
        padding: 24,
        width: 328,
        borderRadius: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'center',
    };



    return (
            <Portal >
                <Modal 
                dismissable={isDismissable}
                visible={isVisible} 
                onDismiss={onDismiss} 
                contentContainerStyle={containerStyle}>
                   {children}
                </Modal>
            </Portal>

    )
}


export default CustomDialog;