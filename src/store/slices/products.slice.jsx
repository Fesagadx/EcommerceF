import { createSlice } from '@reduxjs/toolkit';

import { setIsLoading } from './isLoading.slice';

import axios from 'axios';

export const productsSlice = createSlice({
  name: 'product',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      return action.payload;
    }
  }
})

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/products`)
  //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => {
      dispatch(setProduct(resp.data));
    })
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1500);
    });
}

export const getFilterProducts = (e) => (dispatch) => {
  dispatch(setIsLoading(true))
  axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/products`)
  //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => dispatch(setProduct(resp.data.filter(product => product.title.toLowerCase().includes(e)))))
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1500);
    });
}

export const getFilterPrice = (data) => (dispatch) => {
  axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/products`)
  //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products`)
    .then(resp => dispatch(setProduct(resp.data.filter(product => (parseInt(product.price)) >= data.priceOne && (parseInt(product.price) <= data.priceTwo)))))
    .catch(error => console.log(error));

}
export const filterCategoriesThunk = (id) => (dispatch) => {
  dispatch(setIsLoading(true));
  axios.get(`https://backendfesagadxecommerceapi.onrender.com/api/v1/products/?categories=${id}`)
  //axios.get(`https://e-commerce-api.academlo.tech/api/v1/products/?category=${id}`)
    .then(resp => dispatch(setProduct(resp.data)))
    .catch(error => console.log(error))
    .finally(() => {
      setTimeout(() => {
        dispatch(setIsLoading(false));
      }, 1500);
    });
}

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;