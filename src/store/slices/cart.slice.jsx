import { createSlice } from '@reduxjs/toolkit';

import { setIsLoading } from './isLoading.slice';

import axios from 'axios';

export const cartProducts = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }

  }
})

export const thunkCartGet = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get('https://backendfesagadxecommerceapi.onrender.com/api/v1/cart', {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`
           }
        })
    .then(res => {
      console.log(res)
      dispatch(setCart(res.data))
    })
    .catch(err => console.log(err))
    .finally(() => dispatch(setIsLoading(false)));
}

export const thunkCartPost = (body) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .post('https://backendfesagadxecommerceapi.onrender.com/api/v1/cart', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(() => dispatch(thunkCartGet()))
    .catch((resp) => console.log(resp))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartProducts.actions;

export default cartProducts.reducer;
