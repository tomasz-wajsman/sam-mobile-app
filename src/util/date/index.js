import moment from 'moment';

const dtMask = 'YYYY-MM-DD HH:mm:SS';

const formatDateTime = dt => {
  return moment(dt).format(dtMask);
};

export default {
  formatDateTime
};
