import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function OnboardingIndex() {
  const [checking, setChecking] = useState(true);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("hasSeenOnboarding").then((value) => {
      if (value === "true") setSeen(true);
      setChecking(false);
    });
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (seen) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(onboarding)/step1" />;
}
