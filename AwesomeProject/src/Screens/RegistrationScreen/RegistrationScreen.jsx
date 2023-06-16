import {
  View,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
} from "react-native";
import PhotoBg from "../../images/photo-bg.png";
import AddImg from "../../images/add.png";
const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={PhotoBg} style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.wrap}></View>
          <Image source={AddImg} style={styles.image}></Image>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.wrapper}>
            <TextInput style={styles.input} placeholder="Логін"></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            ></TextInput>
            <TextInput style={styles.input} placeholder="Пароль"></TextInput>
          </View>

          <Text style={styles.text}>Показати</Text>

          <Text style={styles.button}> Зареєструватись </Text>
          <Text style={styles.entrance}>Вже є акаунт? Увійти</Text>
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
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },

  overlay: {
    position: "relative",
    flex: 0,
    height: 549,
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
    top: "5%",
    left: "67%",
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

  text: {
    position: "absolute",
    right: 30,
    bottom: 217,
    color: "#1B4371",
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
});
export default RegistrationScreen;
