import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import githubService from '../services/githubService';


export const searchUsers = createAsyncThunk(
  'users/searchUsers',
  async (query, thunkAPI) => {
    const response = await githubService.searchUsers(query);
    return response.items;
  }
);


export const fetchUserDetails = createAsyncThunk(
  'users/fetchUserDetails',
  async (username, thunkAPI) => {
    const response = await githubService.getUserDetails(username);
    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    selectedUser: null,
    loading: false,
    error: null,
    userDetailsLoading: false,
    searchText: '',       
  },
  reducers: {
    clearSelectedUser(state) {
      state.selectedUser = null;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    clearUsers(state) {
      state.list = [];
      state.searchText = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.userDetailsLoading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userDetailsLoading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.userDetailsLoading = false;
        state.error = action.error.message;
      });
  }
});




export const { clearSelectedUser, setSearchText, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
