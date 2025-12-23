import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";

const { width, height } = Dimensions.get("window");

const finishOnboarding = async (path) => {
  await AsyncStorage.setItem("hasSeenOnboarding", "true");
  router.replace(path);
};

export default function OnboardingAuth() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/spendio/icon.png")}
          style={styles.headerLogo}
          contentFit="contain"
        />
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.blobBackground} />
        <Image
          source={require("@/assets/images/spendio/ob4.png")}
          style={styles.illustration}
          contentFit="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Don't Worry, Spendio Is Here to Help!</Text>
        <Text style={styles.description}>
          Spendio helps you record and track every expense in one place!
        </Text>
      </View>

      {/* Auth Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => finishOnboarding("/(auth)/sign-up")}
        >
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => finishOnboarding("/(auth)/sign-in")}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  blobBackground: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.42,
    backgroundColor: "#D9DEE4",
    borderRadius: 200,
    transform: [{ scaleX: 1.2 }],
  },
  illustration: {
    width: width * 0.85,
    height: height * 0.42,
    zIndex: 1,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2B3A5B",
    marginBottom: 12,
    fontStyle: "italic",
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 12,
  },
  signUpButton: {
    backgroundColor: "#2B3A5B",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  signUpText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  signInButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#2B3A5B",
    alignItems: "center",
  },
  signInText: {
    color: "#2B3A5B",
    fontSize: 16,
    fontWeight: "600",
  },
});
