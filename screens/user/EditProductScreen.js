import React, { useEffect, useCallback, useReducer } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { connect } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import {
  updateProduct,
  createProduct
} from "../../store/actions/productsActions";
import Input from "../../components/UI/Input";

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

const EditProductScreen = ({
  navigation,
  userProducts,
  createProduct,
  updateProduct
}) => {
  const prodId = navigation.getParam("productId");
  const editedProduct = userProducts.find(prod => prod.id === prodId);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: ""
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false
    },
    formIsValid: editedProduct ? true : false
  });

  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        {
          text: "Okay"
        }
      ]);
      return;
    }
    if (editedProduct) {
      updateProduct(
        prodId,
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl
      );
    } else {
      createProduct(
        formState.inputValues.title,
        formState.inputValues.description,
        formState.inputValues.imageUrl,
        +formState.inputValues.price
      );
    }
    navigation.goBack();
  }, [prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: handleSubmit });
  }, [handleSubmit]);

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
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.title : ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            title='Image URL'
            errorText='Please enter a valid image url!'
            returnKeyType='next'
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.imageUrl : ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={handleInputChange}
              required
              min={0.1}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={handleInputChange}
            initialValue={editedProduct ? editedProduct.description : ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edt Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add'
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8
  }
});

const mapStateToProps = state => ({
  userProducts: state.products.userProducts
});

export default connect(mapStateToProps, { updateProduct, createProduct })(
  EditProductScreen
);
