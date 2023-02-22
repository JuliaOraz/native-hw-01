import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Platform,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

const initialDataForm = {
  login: "",
  email: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

export default function RegistrationScreen() {
  const [dataForm, setDataForm] = useState(initialDataForm);
  const [loginFocus, setLoginFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [fontsLoaded] = useFonts({
    "R-regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "R-medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "R-bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleRegistration = () => {
    console.log(dataForm);
    setDataForm(initialDataForm);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboardHide = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const handleFocus = (inputFocus) => {
    if (inputFocus === "") return;
    setKeyboardVisible(true);

    switch (inputFocus) {
      case "login":
        setLoginFocus(true);
        break;
      case "email":
        setEmailFocus(true);
        break;
      case "password":
        setPasswordFocus(true);
        break;
    }
  };

  const handleBlur = (inputFocus) => {
    if (inputFocus === "") return;
    switch (inputFocus) {
      case "login":
        setLoginFocus(false);
        break;
      case "email":
        setEmailFocus(false);
        break;
      case "password":
        setPasswordFocus(false);
        break;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.background}
          source={require("../assets/images/bg-auth.jpg")}
        >
          <KeyboardAvoidingView
            style={styles.contentContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <View
              style={{
                ...styles.formContainer,
                paddingBottom: isKeyboardVisible ? 16 : 42,
              }}
            >
              <Text style={styles.title}>Регистрация</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: loginFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: loginFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={dataForm.login}
                  onChangeText={(value) =>
                    setDataForm((prevState) => ({ ...prevState, login: value }))
                  }
                  placeholder="Логин"
                  onFocus={() => handleFocus("login")}
                  onBlur={() => handleBlur("login")}
                  keyboardType="default"
                  onSubmitEditing={keyboardHide}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: emailFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: emailFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={dataForm.email}
                  onChangeText={(value) =>
                    setDataForm((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адрес электронной почты"
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                  keyboardType="email-address"
                  onSubmitEditing={keyboardHide}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: passwordFocus ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: passwordFocus ? "#FFFFFF" : "#F6F6F6",
                  }}
                  value={dataForm.password}
                  onChangeText={(value) =>
                    setDataForm((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                  placeholder="Пароль"
                  onFocus={() => handleFocus("password")}
                  onBlur={() => handleBlur("password")}
                  secureTextEntry={!showPassword}
                  keyboardType="default"
                  onSubmitEditing={keyboardHide}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleShowPassword}
                  style={styles.showPasswordButton}
                >
                  <Text style={styles.showPasswordButtonText}>
                    {showPassword ? "Скрыть" : "Показать"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleRegistration}
                style={{
                  ...styles.registerButton,
                  display: isKeyboardVisible ? "none" : "flex",
                }}
              >
                <Text style={styles.registerButtonText}>
                  Зарегистрироваться
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  ...styles.loginLinkContainer,
                  display: isKeyboardVisible ? "none" : "flex",
                }}
              >
                <TouchableOpacity activeOpacity={0.8}>
                  <Text style={styles.loginLinkText}>
                    Уже есть аккаунт? Войти
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 16,
    paddingTop: 92,
    elevation: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 32,
    textAlign: "center",
    color: "#212121",
    fontFamily: "R-medium",
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    placeholderTextColor: "#BDBDBD",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#212121",
    fontFamily: "R-regular",
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  showPasswordButtonText: {
    color: "#1B4371",
    fontFamily: "R-regular",
  },
  registerButton: {
    backgroundColor: "#FF6C00",
    height: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "R-regular",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginLinkText: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "R-regular",
  },
});
