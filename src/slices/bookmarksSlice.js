import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const add = createAsyncThunk('bookmarks/add', async countryCode => {
  return new Promise(resolve =>
    setTimeout(() => resolve(countryCode.toLowerCase()), 2000)
  );
});

export const remove = createAsyncThunk(
  'bookmarks/remove',
  async countryCode => {
    return new Promise(resolve =>
      setTimeout(() => resolve(countryCode.toLowerCase()), 2000)
    );
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: {
    data: [],
  },
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

export const selectBookmarks = state => state.bookmarks.data;

export const reducer = bookmarksSlice.reducer;

export default bookmarksSlice;
