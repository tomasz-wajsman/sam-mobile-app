import moment from 'moment';

const dtMask = 'YYYY-MM-DD HH:mm';

const formatDateTime = dt => {
  return moment(dt).format(dtMask);
};
const checkDateTime = dt => {
  const obj = moment(dt);
  return obj.isValid();
};
const unixToDate = unix => {
  return formatDateTime(unix);
};
const dateToUnix = dt => {
  return moment(`${dt}:00`).unix() * 1000;
};
const compareDates = (dt1, dt2) => {
  if (!checkDateTime(dt1) || !checkDateTime(dt2)) {
    return false;
  }
  const m1 = moment(dt1);
  const m2 = moment(dt2);
  if (m1.isBefore(m2)) {
    return -1;
  }
  if (m1.isAfter(m2)) {
    return 1;
  }
  return 0;
};

export default {
  formatDateTime,
  checkDateTime,
  unixToDate,
  dateToUnix,
  compareDates
};
