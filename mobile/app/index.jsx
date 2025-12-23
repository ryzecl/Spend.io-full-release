import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import { useAuth } from "@clerk/clerk-expo";

SplashScreen.preventAutoHideAsync();

export default function AppEntry() {
  const [isReady, setIsReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    const prepare = async () => {
      // 🔧 TEMPORARY: Reset onboarding untuk testing - HAPUS NANTI!
      //   await AsyncStorage.removeItem("hasSeenOnboarding");

      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      if (seen === "true") {
        setHasSeenOnboarding(true);
      }

      // Tampilkan splash selama 2.5 detik
      await new Promise((resolve) => setTimeout(resolve, 2500));

      await SplashScreen.hideAsync();
      setIsReady(true);
    };

    prepare();
  }, []);

  // Tampilkan splash screen kustom selagi loading
  if (!isReady || !isLoaded) {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/spendio/icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.appName}>Spendio</Text>
          <Text style={styles.version}>VERSION 1.1</Text>
        </View>
      </View>
    );
  }

  // Flow routing
  if (!hasSeenOnboarding) {
    return <Redirect href="/(onboarding)/step1" />;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(root)" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
  appName: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2B3A5B",
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: "#8E99A4",
    letterSpacing: 1,
  },
});
