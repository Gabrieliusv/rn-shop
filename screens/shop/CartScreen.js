import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cartActions";

const CartScreen = ({ cart, removeFromCart }) => {
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
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            onRemove={() => removeFromCart(itemData.item.productId)}
          />
        )}
      />
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

export default connect(mapStateToProps, { removeFromCart })(CartScreen);
