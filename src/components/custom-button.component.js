import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FONTS, SIZES } from '../constants/theme';

// custom button to be reused in other screens
const CustomButton = ({
  title, 
  onPress,
   onDisable, 
   disabledStyle, 
   deleteStyle,
   cancelStyle,
   successStyle
  }) => {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    disabled={onDisable} 
    style={[styles.customButton, disabledStyle, deleteStyle, cancelStyle, successStyle]} 
    activeOpacity={0.7} 
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
    customButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 111,
        height: 32,
        marginTop: 16,
        borderRadius: 8,
        backgroundColor: '#7695EC'
    },
    buttonText: {
        color: "#fff",
        fontFamily: FONTS.medium,
        fontSize: SIZES.bodyLarge,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    greyDisabled: {

    }
})