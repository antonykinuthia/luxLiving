import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { useFonts  } from "expo-font";
import { useEffect } from "react";
import GlobalProvider from "@/lib/global-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [ fontsLoaded ] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
  });

  useEffect(() => {
    if(fontsLoaded){
       SplashScreen.hideAsync();
    }
  
  }, [fontsLoaded])

  if(!fontsLoaded) return null;
  
  return (
    <GlobalProvider>
      <GestureHandlerRootView>
        <Stack screenOptions={{ headerShown: false}}/>
      </GestureHandlerRootView>
    </GlobalProvider>
    ) 
    
}
