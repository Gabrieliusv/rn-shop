import { ADD_TO_CHART } from "./types";

export const addToCart = product => {
  return { type: ADD_TO_CHART, product: product };
};
