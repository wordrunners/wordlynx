import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '@/store/store';
import {
  Leaders,
  Leader,
  LeaderBoard,
  LeaderPayload
} from '@/types';
import { leaderboardAPI, teamName } from '@/api/leaderboardApi';

const ratingFieldName = 'score';

const initialState: LeaderBoard = {
  leaders: [],
  activeLeader: -1,
  loading: false,
  error: null,
};

export const fetchLeaderboard = createAsyncThunk(
  'leaderBoard/fetchLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      const response = await leaderboardAPI.getLeaderboard({
        ratingFieldName,
        cursor: 0,
        limit: 100,
      });

      return response;
    } catch (error) {
      return rejectWithValue('Error fetching data')
    }
  }
);

export const addUserToLeaderboard = createAsyncThunk(
  'leaderBoard/addUserToLeaderboard',
  async (data: LeaderPayload, { rejectWithValue }) => {
    try {
      await leaderboardAPI.addUserToLeaderboard({
        data,
        ratingFieldName,
        teamName,
      });
    } catch (error) {
      return rejectWithValue('Error sending data')
    }
  }
);
const setError = (state: any, action: PayloadAction) => {
  state.loading = false;
  state.error = action.payload;
};

export const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLeaders: (state, action: PayloadAction<Leaders>) => {
      state.leaders = action.payload;
    },
    setActiveLeader: (state, action: PayloadAction<number>) => {
      state.activeLeader = action.payload;
    },
    addLeader: (state, action: PayloadAction<Leader>) => {
      const candidate = action.payload;
      state.leaders.push(candidate)
    },
  },
  extraReducers: {
    [fetchLeaderboard.pending.type]: state => {
      state.loading = true;
      state.error = null;
    },
    [fetchLeaderboard.fulfilled.type]: (state, action: PayloadAction<Leaders>) => {
      state.loading = false;
      state.leaders = action.payload;
    },
    [fetchLeaderboard.rejected.type]: setError,

    [addUserToLeaderboard.pending.type]: state => {
      state.loading = true;
      state.error = null;
    },
    [addUserToLeaderboard.fulfilled.type]: state => {
      state.loading = false;
    },
    [addUserToLeaderboard.rejected.type]: setError,
  }
});

export const { setLeaders, addLeader, setActiveLeader } = leaderBoardSlice.actions;

export const selectLeaders = (state: RootState) => state.leaderBoard.leaders;
export const selectActiveLeader = (state: RootState) => state.leaderBoard.activeLeader;

export default leaderBoardSlice.reducer;
