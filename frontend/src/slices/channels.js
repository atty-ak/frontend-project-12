import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...initialState,
    curChannel: 1,
  },
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setCurChannel: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.curChannel = payload;
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    renameChannel: channelsAdapter.updateOne,
  },
});

export const {
  addChannels, addChannel, setCurChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
