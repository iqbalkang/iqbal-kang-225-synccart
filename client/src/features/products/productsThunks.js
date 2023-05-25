import { createAsyncThunk } from '@reduxjs/toolkit';
import customFetch from '../../utils/axios';

export const getAllProducts = createAsyncThunk('product/getAllProducts', async (_, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products`);
    return data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const getSingleProduct = createAsyncThunk('product/getSingleProduct', async (productId, thunkAPI) => {
  try {
    const { data } = await customFetch.get(`/products/${productId}`);
    return data.product;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const postProduct = createAsyncThunk('user/postProduct', async (body, thunkAPI) => {
  try {
    const { data } = await customFetch.post(`/products`, body, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const deleteProduct = createAsyncThunk('user/deleteProduct', async (product_id, thunkAPI) => {
  try {
    const { data } = await customFetch.delete(`/products/${product_id}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return data.message;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

export const editProduct = createAsyncThunk('user/editProduct', async ({ product_id, formObj }, thunkAPI) => {
  try {
    const { data } = await customFetch.put(`/products/${product_id}`, formObj, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    // return data.message
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
