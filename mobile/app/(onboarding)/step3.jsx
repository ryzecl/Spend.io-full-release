import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function Onboarding3() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/spendio/icon.png")}
          style={styles.headerLogo}
          contentFit="contain"
        />
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => router.replace("/(onboarding)/auth")}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <View style={styles.blobBackground} />
        <Image
          source={require("@/assets/images/spendio/ob3.png")}
          style={styles.illustration}
          contentFit="contain"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>You Don't Track Your Spending?</Text>
        <Text style={styles.description}>
          When you don't write down your expenses, it becomes hard to understand
          where your money goes.
        </Text>
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(onboarding)/auth")}
        >
          <Ionicons name="arrow-forward" size={24} color="#fff" />
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  skipButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#2B3A5B",
  },
  skipText: {
    color: "#2B3A5B",
    fontSize: 14,
    fontWeight: "600",
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
    height: height * 0.45,
    backgroundColor: "#D9DEE4",
    borderRadius: 200,
    transform: [{ scaleX: 1.2 }],
  },
  illustration: {
    width: width * 0.75,
    height: height * 0.4,
    zIndex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 32,
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
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2B3A5B",
    justifyContent: "center",
    alignItems: "center",
  },
});
