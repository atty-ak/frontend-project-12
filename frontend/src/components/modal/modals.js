import Add from './Add';

const modals = {
  add: <Add />,
};

export default (modalName) => modals[modalName];
