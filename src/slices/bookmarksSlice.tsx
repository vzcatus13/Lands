import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const add = createAsyncThunk<string, string>(
  'bookmarks/add',
  async countryCode => {
    return new Promise(resolve =>
      setTimeout(() => resolve(countryCode.toLowerCase()), 2000)
    );
  }
);

export const remove = createAsyncThunk<string, string>(
  'bookmarks/remove',
  async countryCode => {
    return new Promise(resolve =>
      setTimeout(() => resolve(countryCode.toLowerCase()), 2000)
    );
  }
);

const initialState: { data: string[] } = { data: [] };

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(add.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.data = state.data.filter(bookmark => bookmark !== action.payload);
      });
  },
});

export const selectBookmarks = (state: RootState) => state.bookmarks.data;

export const reducer = bookmarksSlice.reducer;

export default bookmarksSlice;
