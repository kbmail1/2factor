function daysBetweenDates(begin, end) {
  var beginDate = new Date(begin);
  var endDate = new Date(end);
  var diff = endDate.getTime() - beginDate.getTime();
  return Math.floor(diff / 1000 / 60 / 60 / 24);
}
