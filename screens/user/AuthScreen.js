import React, { useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { signup } from "../../store/actions/authActions";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/colors";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = ({ signup }) => {
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const handleSignup = () => {
    signup(formState.inputValues.email, formState.inputValues.password);
  };

  const handleInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-Mail'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={handleInputChange}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password.'
              onInputChange={handleInputChange}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              <Button
                title='Login'
                color={Colors.primary}
                onPress={handleSignup}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title='Switch to Sing Up'
                color={Colors.secondary}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default connect(null, { signup })(AuthScreen);
