import { SIGNUP, LOGIN } from "./types";

export const signup = (email, password) => async dispatch => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFDv-NXFGZYolOY93gdBAM-N9RbOLDxAs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = response.json();
  console.log(resData);

  dispatch({ type: SIGNUP });
};

export const login = (email, password) => async dispatch => {
  const response = await fetch(
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFDv-NXFGZYolOY93gdBAM-N9RbOLDxAs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  const resData = response.json();
  console.log(resData);

  dispatch({ type: LOGIN });
};
