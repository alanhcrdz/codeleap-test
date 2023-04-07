import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../screens/SignUp';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

const StackRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='SignUp' component={SignUp} options={{
                headerTitle: 'Sign Up',
            }} />
            <Stack.Screen name='MainScreen' component={MainScreen} options={{
                headerTitle: 'Code Leap Network',
                headerTintColor: "#FFF",
                headerStyle: {
                    backgroundColor: "#7695EC",
                }
            }} />
        </Stack.Navigator>
    )
}

export default StackRoutes;