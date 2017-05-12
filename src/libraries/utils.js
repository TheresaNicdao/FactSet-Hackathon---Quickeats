function isObjectEmpty(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export {
  isObjectEmpty
};