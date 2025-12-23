import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "@/assets/styles/auth.styles.js";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  // 🔴 NEW
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const [error, setError] = useState("");

  // ===============================
  // SIGN IN STEP 1 (EMAIL + PASSWORD)
  // ===============================
  const onSignInPress = async () => {
    console.log("button pressed!");
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        // 🟢 normal login (kalau 2FA mati)
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
        return;
      }

      // 🔴 NEW: EMAIL CODE FLOW
      if (signInAttempt.status === "needs_second_factor") {
        await signIn.prepareSecondFactor({
          strategy: "email_code",
        });

        setPendingVerification(true);
        return;
      }

      // ❌ CASE LAIN (JARANG KEJADI)
      console.log("Unhandled sign-in status:", signInAttempt.status);
    } catch (err) {
      if (err.errors?.[0].code === "form_password_incorrect") {
        setError("Password is incorrect. Please try again.");
      } else if (err.errors?.[0].code === "form_identifier_not_found") {
        setError("Couldn't find your account. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // ===============================
  // SIGN IN STEP 2 (VERIFY EMAIL CODE)
  // ===============================
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const res = await signIn.attemptSecondFactor({
        strategy: "email_code",
        code,
      });

      if (res.status === "complete") {
        await setActive({ session: res.createdSessionId });
        router.replace("/");
      }
    } catch (err) {
      setError("Kode salah atau expired 😭");
    }
  };

  // ===============================
  // VERIFY SCREEN (MIRIP SIGN UP)
  // ===============================
  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Check your email 📧</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TextInput
          style={[styles.verificationInput, error && styles.errorInput]}
          value={code}
          placeholder="Enter email code"
          placeholderTextColor="#9A8478"
          onChangeText={setCode}
        />

        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraScrollHeight={30}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/spendio/Sign In.png")}
          style={styles.illustration}
        />
        <Text style={styles.title}>Welcome back</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.expense} />
            </TouchableOpacity>
          </View>
        ) : null}
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          placeholderTextColor="#9A8478"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={[styles.input, error && styles.errorInput]}
          value={password}
          placeholder="Enter password"
          placeholderTextColor="#9A8478"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account?</Text>
          <Link href="/sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
