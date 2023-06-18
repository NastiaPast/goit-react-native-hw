import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhotoBg from "../../images/photo-bg.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailBorderColor, setEmailBorderColor] = useState("#E8E8E8");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#E8E8E8");
  const [showPassword, setShowPassword] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(489);

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (email === "" || password === "") {
      Alert.alert("Попередження", "Будь ласка, заповніть всі поля.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(
        "Попередження",
        "Введіть дійсну адресу електронної пошти."
      );
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
    setEmail("");
    setPassword("");
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleKeyboardShow = (event) => {
    if (Platform.OS === "ios") {
      setOverlayHeight(489 + event.endCoordinates.height);
    } else {
      setOverlayHeight(489 + 30);
    }
  };

  const handleKeyboardHide = () => {
    setOverlayHeight(489);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={PhotoBg}>
          <KeyboardAvoidingView
            style={styles.overlayContainer}
            behavior={Platform.OS === "ios" ? "padding" : null}
          >
            <View style={[styles.overlay, { height: overlayHeight }]}>
              <Text style={styles.title}>Увійти</Text>

              <View style={styles.wrapper}>
                <TextInput
                  style={[styles.input, { borderColor: emailBorderColor }]}
                  placeholder="Адреса електронної пошти"
                  onChangeText={handleEmailChange}
                  onFocus={() => setEmailBorderColor("#FF6C00")}
                  onBlur={() => setEmailBorderColor("#E8E8E8")}
                  value={email}
                />
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[styles.input, { borderColor: passwordBorderColor }]}
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    onChangeText={handlePasswordChange}
                    onFocus={() => setPasswordBorderColor("#FF6C00")}
                    onBlur={() => setPasswordBorderColor("#E8E8E8")}
                    value={password}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={togglePasswordVisibility}
                  >
                    <Text style={styles.showPasswordButtonText}>
                      {showPassword ? "Приховати" : "Показати"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.registr}>
                  Немає акаунту? Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    position: "relative",
    flex: 0,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 32,
    letterSpacing: 0.8,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
  },
  wrapper: {
    position: "relative",
    display: "flex",
    gap: 16,
    marginBottom: 43,
  },
  input: {
    height: 50,
    paddingLeft: 16,
    paddingBottom: 15,
    paddingTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    color: "black",
    fontSize: 16,
  },
  passwordInputContainer: {
    position: "relative",
  },
  showPasswordButton: {
    position: "absolute",
    right: 12,
    bottom: 16,
  },
  showPasswordButtonText: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  button: {
    height: 51,
    paddingBottom: 16,
    paddingTop: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  registr: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;
