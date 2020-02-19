import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";

import Colors from "../../constants/colors";
import CartItem from "../../components/shop/CartItem";
import { removeFromCart } from "../../store/actions/cartActions";
import { addOrder } from "../../store/actions/orderActions";
import Card from "../../components/UI/Card";

const CartScreen = ({ cart, removeFromCart, addOrder }) => {
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
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cart.totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          color={Colors.primary}
          title='Order Now'
          disabled={cartItems.length === 0}
          onPress={() => addOrder(cartItems, cart.totalAmount)}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={itemData => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable
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
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { removeFromCart, addOrder })(
  CartScreen
);
