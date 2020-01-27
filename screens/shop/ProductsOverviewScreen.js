import React from "react";
import { FlatList, Platform } from "react-native";
import { connect } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import { addToCart } from "../../store/actions/cartActions";
import HeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = ({ products, navigation, addToCart }) => {
  return (
    <FlatList
      data={products}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetails={() => {
            navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title
            });
          }}
          onAddToChart={() => addToCart(itemData.item)}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: "All Products",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.os === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    )
  };
};

const mapStateToProps = state => ({
  products: state.products.availableProducts
});

export default connect(mapStateToProps, { addToCart })(ProductsOverviewScreen);
