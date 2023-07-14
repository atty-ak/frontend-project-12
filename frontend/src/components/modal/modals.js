import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const Modal = ({ type, channel }) => {
  switch (type) {
    case 'unactive':
      return '';
    case 'add':
      return <Add />;
    case 'remove':
      return <Remove channelId={channel.id} />;
    case 'rename':
      return <Rename channel={channel} />;
    default:
      throw new Error('Unexpected modal type');
  }
};

export default Modal;
