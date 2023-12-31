import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import PhotoBg from "../../images/photo-bg.png";
import AddImg from "../../images/add.png";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginFocused, setLoginFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [overlayHeight, setOverlayHeight] = useState(549);
  const [selectedImage, setSelectedImage] = useState(null);

  const navigation = useNavigation();

  const handleLoginChange = (text) => {
    setLogin(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (!login || !email || !password || !selectedImage) {
      Alert.alert("Попередження", "Заповніть всі поля!");
    } else if (!isValidEmail(email)) {
      Alert.alert("Попередження", "Введіть дійсну адресу електронної пошти");
    } else {
      const userData = {
        login,
        email,
        password,
        selectedImage,
      };

      navigation.navigate("Home", {
        screen: "PostsScreen",
        params: { userData },
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleKeyboardShow = (event) => {
    if (Platform.OS === "ios") {
      setOverlayHeight(549 + event.endCoordinates.height);
    } else {
      setOverlayHeight(549 + 50);
    }
  };

  const handleKeyboardHide = () => {
    setOverlayHeight(549);
  };

  const handleImageSelection = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Дозвіл на доступ до медіа-бібліотеки відхилено.");
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <ImageBackground source={PhotoBg} style={styles.background}>
            <View style={[styles.overlay, { height: overlayHeight }]}>
              <View style={styles.wrap}>
                {selectedImage ? (
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <TouchableOpacity onPress={handleImageSelection}>
                    <Image source={AddImg} style={styles.image} />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.title}>Реєстрація</Text>
              <View style={styles.wrapper}>
                <TextInput
                  style={[styles.input, isLoginFocused && styles.inputFocused]}
                  placeholder="Логін"
                  onChangeText={handleLoginChange}
                  value={login}
                  onFocus={() => setLoginFocused(true)}
                  onBlur={() => setLoginFocused(false)}
                />
                <TextInput
                  style={[styles.input, isEmailFocused && styles.inputFocused]}
                  placeholder="Адреса електронної пошти"
                  onChangeText={handleEmailChange}
                  value={email}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[
                      styles.passwordInput,
                      isPasswordFocused && styles.inputFocused,
                    ]}
                    placeholder="Пароль"
                    secureTextEntry={!showPassword}
                    onChangeText={handlePasswordChange}
                    value={password}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
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

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.button}>Зареєструватись</Text>
              </TouchableOpacity>
              <View style={styles.entranceContainer}>
                <Text style={styles.entrance}>Вже є акаунт?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text
                    style={[
                      styles.entrance,
                      { marginLeft: 8, textDecorationLine: "underline" },
                    ]}
                  >
                    Увійти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  selectedImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    alignSelf: "center",
    marginBottom: 32,
    resizeMode: "cover",
  },

  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    position: "relative",
    flex: 0,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#FFFFFF",
  },

  wrap: {
    position: "absolute",
    top: -60,
    alignSelf: "center",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },

  image: {
    position: "absolute",
    top: "7%",
    left: "89%",
    transform: [{ translateY: 80 }],
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
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    color: "black",
    fontSize: 16,
  },

  inputFocused: {
    borderColor: "#FF6C00",
  },

  passwordContainer: {
    position: "relative",
  },

  passwordInput: {
    height: 50,
    paddingLeft: 16,
    paddingBottom: 15,
    paddingTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    color: "black",
    fontSize: 16,
    paddingRight: 40,
  },

  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    paddingHorizontal: 16,
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

  entrance: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  entranceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegistrationScreen;
