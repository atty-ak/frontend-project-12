import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
  },
});

export const { addChannels, addChannel } = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
