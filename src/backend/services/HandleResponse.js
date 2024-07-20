const handleResponse = (value, res) => {
  if (value?.error) {
    res.status(500);
    return res.json(value);
  }
  return res.json(value?.value);
};

const ResultError = ({ error }) => {
  return { error, isValid: false };
};

const ResultOk = (value) => ({ value, isValid: true });

module.exports = { handleResponse, ResultError, ResultOk };
