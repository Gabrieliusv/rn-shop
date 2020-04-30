import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";
import Colors from "../../constants/colors";
import { addToCart } from "../../store/actions/cartActions";

const ProductDetailScreen = ({ route, products, addToCart }) => {
  const productId = route.params.productId;
  const product = products.find((prod) => prod.id === productId);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to cart'
          onPress={() => addToCart(product)}
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
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.productTitle,
  };
};

const mapStateToProps = (state) => ({
  products: state.products.availableProducts,
});

export default connect(mapStateToProps, { addToCart })(ProductDetailScreen);
