const objectId = (value) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return 'must be a valid mongo id';
  }
  return value;
};

module.exports = {
  objectId,
};
