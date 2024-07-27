const withLimit = function (query) {
  return {
    limit: query?.limit || 20,
    offset: query?.offset || 0,
  };
};

module.exports = { withLimit };
