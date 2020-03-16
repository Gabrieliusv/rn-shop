import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT
} from "./types";
import Product from "../../models/product";

export const deleteProduct = productId => async dispatch => {
  await fetch(
    `https://rn-shop-c1e9b.firebaseio.com/products/${productId}.json`,
    {
      method: "DELETE"
    }
  );

  dispatch({ type: DELETE_PRODUCT, pId: productId });
};

export const fetchProducts = () => async dispatch => {
  try {
    const response = await fetch(
      "https://rn-shop-c1e9b.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProduct = [];

    for (const key in resData) {
      loadedProduct.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: loadedProduct
    });
  } catch (err) {
    throw err;
  }
};

export const createProduct = (
  title,
  description,
  imageUrl,
  price
) => async dispatch => {
  const response = await fetch(
    "https://rn-shop-c1e9b.firebaseio.com/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price
      })
    }
  );

  const resData = await response.json();

  dispatch({
    type: CREATE_PRODUCT,
    productData: {
      id: resData.name,
      title,
      description,
      imageUrl,
      price
    }
  });
};

export const updateProduct = (
  id,
  title,
  description,
  imageUrl
) => async dispatch => {
  await fetch(`https://rn-shop-c1e9b.firebaseio.com/products/${id}.json`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl
    })
  });

  dispatch({
    type: UPDATE_PRODUCT,
    pId: id,
    productData: {
      title,
      description,
      imageUrl
    }
  });
};
