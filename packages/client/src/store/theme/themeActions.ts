import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ADD_THEME_ROUTE,
  GET_THEME_ROUTE,
  UPDATE_THEME_ROUTE,
} from './routes'

import { axiosRequestDB } from '@/Core'

export const fetchTheme = createAsyncThunk(
  ADD_THEME_ROUTE,
  async (data: { id: number }, thunkAPI) => {
    try {
      await axiosRequestDB.post(ADD_THEME_ROUTE, { userId: data.id })
      const userTheme = await axiosRequestDB.get(`${GET_THEME_ROUTE}${data.id}`)
      return userTheme.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)

export const changeTheme = createAsyncThunk(
  UPDATE_THEME_ROUTE,
  async (data: { userId: number; themeId: number }, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(UPDATE_THEME_ROUTE, data)
      return await response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)
