import request from './request';
import reply from './reply';

export default {
  request: frame => request(window, frame),
  reply: reply(window),
};
