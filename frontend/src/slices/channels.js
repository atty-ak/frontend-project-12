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
    addChannel: (state, { payload }) => {
      const newChannel = {
        id: state.ids.length + 1,
        ...payload,
      };
      channelsAdapter.addOne(state, newChannel);
      // eslint-disable-next-line no-param-reassign
      state.curChannel = newChannel.id; // Обновляем curChannel
    },
    setCurChannel: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.curChannel = payload;
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      // eslint-disable-next-line no-param-reassign
      state.curChannel = 1;
    },
    renameChannel: channelsAdapter.updateOne,
  },
});

export const {
  addChannels, addChannel, setCurChannel, removeChannel, renameChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);

export default channelsSlice.reducer;
