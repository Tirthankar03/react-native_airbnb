import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TransitionPresets } from '@react-navigation/stack';
// import { StackNavigationOptions } from '@react-navigation/stack';

//-------------------------------------------------------------
import {
  // Import the creation function
  createStackNavigator,
  // Import the types
  StackNavigationOptions,
} from "@react-navigation/stack";

import { withLayoutContext } from "expo-router";

const { Navigator } = createStackNavigator();

// This can be used like `<JsStack />`
// export const JsStack = withLayoutContext(Navigator);


//-------------------------------------------------------------


// import {
//   // Import the creation function
//   createStackNavigator,
//   // Import the types
//   StackNavigationOptions,
// } from "@react-navigation/stack";

// import { withLayoutContext } from "expo-router";

// const { Navigator } = createStackNavigator();

// This can be used like `<JsStack />`
export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator
>(Navigator);


//-------------------------------------------------------------


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'mon': require('../assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'mon-b': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
      <Stack>

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />


        <Stack.Screen
        name="home"
        options={{
          // Hide the header for all other routes.
          headerShown: false,
        }}
      />



        <Stack.Screen name="(modals)/login" options={{ 
          presentation: 'modal',
          animation: 'slide_from_bottom',
          title: 'Log in or sign up',
        }} />



              <JsStack.Screen
        name="modal"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
          ...TransitionPresets.ModalPresentationIOS,
        } }
      />


      
      </Stack>
  );
}
