import React from "react";
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
} from "react-native";
import PhotoBg from "../../images/photo-bg.png";
const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={PhotoBg}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Увійти</Text>

          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            />
            <TextInput style={styles.input} placeholder="Пароль" />
          </View>
          <Text style={styles.text}>Показати</Text>
          <Text style={styles.button}>Увійти</Text>

          <Text style={styles.registr}>Немає акаунту? Зареєструватися</Text>
        </View>
      </ImageBackground>
    </View>
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

  overlay: {
    position: "relative",
    flex: 0,
    height: 489,
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
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderStyle: "solid",
    color: "black",
    fontSize: 16,
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

  registr: {
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },

  text: {
    position: "absolute",
    right: 30,
    bottom: 283,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
});

export default LoginScreen;
