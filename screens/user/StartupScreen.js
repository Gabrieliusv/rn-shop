import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import Colors from "../../constants/colors";
import { connect } from "react-redux";

import { authenticate } from "../../store/actions/authActions";

const StartupScreen = ({ navigation, authenticate }) => {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const expiration = new Date(expirationDate);

      if (expiration <= new Date() || !token || !userId) {
        navigation.navigate("Auth");
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime();

      navigation.navigate("Shop");
      authenticate(userId, token, expirationTime);
    };
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size='large' color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default connect(null, { authenticate })(StartupScreen);
