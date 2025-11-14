import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosRequestDB } from '@/Core'
import {
  ADD_BOARD_ROUTE,
  GET_BOARDS_ROUTE,
  ADD_COMMENT_ROUTE,
  GET_COMMENTS_ROUTE,
  ADD_LIKE_ROUTE,
  GET_LIKES_ROUTE,
} from './routes'
import {
  AddLike,
  AddComment,
  AddBoard
} from './types'

export const addBoard = createAsyncThunk(
  ADD_BOARD_ROUTE,
  async (data: AddBoard, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(ADD_BOARD_ROUTE, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)

export const getBoards = createAsyncThunk(
  GET_BOARDS_ROUTE,
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequestDB.get(GET_BOARDS_ROUTE)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error fetching data')
    }
  }
)

export const addComment = createAsyncThunk(
  ADD_COMMENT_ROUTE,
  async (data: AddComment, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(ADD_COMMENT_ROUTE, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)
export const getComments = createAsyncThunk(
  GET_COMMENTS_ROUTE,
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(GET_COMMENTS_ROUTE, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)

export const addLike = createAsyncThunk(
  ADD_LIKE_ROUTE,
  async (data: AddLike, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(ADD_LIKE_ROUTE, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)

export const getLikes = createAsyncThunk(
  GET_LIKES_ROUTE,
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await axiosRequestDB.post(GET_LIKES_ROUTE, data)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Error sending data')
    }
  }
)
