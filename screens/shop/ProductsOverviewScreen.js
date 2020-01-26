import React from "react";
import { FlatList } from "react-native";
import { connect } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ products, navigation }) => {
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
          onAddToChart={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
};

const mapStateToProps = state => ({
  products: state.products.availableProducts
});

export default connect(mapStateToProps)(ProductsOverviewScreen);
