import React from "react";
import { View, Text, Flatlist, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import Colors from "../../constants/colors";

const CartScreen = ({ cart }) => {
  const cartItems = [];
  for (const key in cart.items) {
    cartItems.push({
      productId: key,
      productTitle: cart.items[key].productTitle,
      productPrice: cart.items[key].productPrice,
      quantity: cart.items[key].quantity,
      sum: cart.items[key].sum
    });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${cart.totalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.primary}
          title='Order Now'
          disabled={cartItems.length === 0}
        />
      </View>
      <Text>CART ITEMS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white"
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(CartScreen);
