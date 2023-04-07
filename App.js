import React from 'react';
import Routes from './src/routes/index.routes';
import { useFonts } from '@expo-google-fonts/roboto';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';





export default function App() {

  //* load Roboto fonts
  let [fontsloaded] = useFonts({
    RobotoRegular: require('./src/assets/fonts/Roboto-Regular.ttf'),
    RobotoMedium: require('./src/assets/fonts/Roboto-Medium.ttf'),
    RobotoBold: require('./src/assets/fonts/Roboto-Bold.ttf'),
  });


  if (!fontsloaded) {
    return null
  }
  return (
    <Provider store={store} >
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>


  );
}


