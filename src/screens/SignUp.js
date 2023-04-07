import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { FONTS, SIZES } from '../constants/theme';
import { TextInput, Dialog } from 'react-native-paper';
import CustomButton from '../components/custom-button.component';
import CustomDialog from '../components/custom-dialog.component';
import { useNavigation } from '@react-navigation/native';


const SignUp = ({navigation}) => {
    const [username, setUsername] = useState("");

    // * username string
    const myUsername = "Alan";

    const handleSubmit = (username) => {

        navigation.navigate('MainScreen', {
            username,
            myUsername
        });
        setUsername("");
    }

    const disabled = {
        backgroundColor: '#EEE',
    }

    return (
        <View style={styles.container}>
            <View style={styles.card} >
                <Text style={styles.cardTitle}>Welcome to CodeLeap network!</Text>
                <Text style={styles.cardText}>Please enter your username</Text>
                <TextInput
                    value={username}
                    placeholder='John Doe' mode='outlined' style={styles.input} label={'John Doe'}
                    onChangeText={(username) => setUsername(username)}
                />
                <View style={{ alignSelf: 'flex-end' }} >
                    <CustomButton
                        disabledStyle={!username ? disabled : null}
                        onDisable={!username ? true : false}
                        onPress={() => handleSubmit(username)} title={'Enter'} />
                </View>

            </View>
            
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 16,
        backgroundColor: '#fff'
    },
    cardTitle: {
        fontFamily: FONTS.bold,
        fontSize: SIZES.h1,
        lineHeight: 25.78,
        fontWeight: '700'
    },
    cardText: {
        fontFamily: FONTS.regular,
        fontSize: SIZES.bodyLarge,
        fontWeight: '400',
        marginTop: 24
    },
    input: {
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderColor: '#000',

    },

})
export default SignUp;