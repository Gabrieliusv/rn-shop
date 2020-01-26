import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from "react-native";

import { connect } from "react-redux";
import Colors from "../../constants/colors";

const ProductDetailScreen = ({ navigation, products }) => {
  const productId = navigation.getParam("productId");
  const product = products.find(prod => prod.id === productId);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to chart'
          onPress={() => {}}
        />
      </View>
      <Text style={styles.price}>{product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300
  },
  actions: {
    marginVertical: 20,
    alignItems: "center"
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20
  }
});

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("productTitle")
  };
};

const mapStateToProps = state => ({
  products: state.products.availableProducts
});

export default connect(mapStateToProps)(ProductDetailScreen);
