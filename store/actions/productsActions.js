import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT
} from "./types";
import Product from "../../models/product";

export const deleteProduct = productId => async (dispatch, getState) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-c1e9b.firebaseio.com/products/${productId}.json?auth=${token}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  dispatch({ type: DELETE_PRODUCT, pId: productId });
};

export const fetchProducts = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;
  try {
    const response = await fetch(
      "https://rn-shop-c1e9b.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: loadedProducts,
      userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
    });
  } catch (err) {
    throw err;
  }
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  const response = await fetch(
    `https://rn-shop-c1e9b.firebaseio.com/products.json?auth=${token}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: userId
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
      price,
      ownerId: userId
    }
  });
};

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-c1e9b.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl
      })
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

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
