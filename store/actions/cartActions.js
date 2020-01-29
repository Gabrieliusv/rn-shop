import { ADD_TO_CHART, REMOVE_FROM_CHART } from "./types";

export const addToCart = product => {
  return { type: ADD_TO_CHART, product: product };
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CHART, id: productId };
};
