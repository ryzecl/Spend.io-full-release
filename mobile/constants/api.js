import { Platform } from "react-native";

const ENV_API_URL = process.env.EXPO_PUBLIC_API_URL;

export const API_URL =
  ENV_API_URL ||
  (Platform.OS === "android"
    ? "http://10.0.2.2:5001/api"
    : "http://localhost:5001/api");
