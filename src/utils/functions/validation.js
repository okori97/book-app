const modelError = ({ errors }, res) => {
  let errorMessage;

  errorMessage = handleMultipleErrors(errors, errorMessage);
  errorMessage
    ? res.status(400).json({ error: `${errorMessage}` })
    : res.status(500).json({ error: errors });
};

const isContentTypeJson = (req) => {
  let isTypeJson;
  if (!req.is('application/json') && req.is('application/json') !== null) {
    isTypeJson = false;
  } else {
    isTypeJson = true;
  }
  return isTypeJson;
};

const requestError = (res) => {
  return res.status(400).json({ error: 'Bad request' });
};

export { modelError, isContentTypeJson, requestError };
function handleMultipleErrors(errors, errorMessage) {
  errorMessage = [];
  if (errors.length > 1) {
    errors.map((error) => {
      errorMessage.push(error.path);
    });
  } else {
    errors.map((error) => {
      errorMessage.push(error.message);
    });
  }
  errorMessage.length > 1
    ? (errorMessage = 'Please input a valid ' + errorMessage.join(' and '))
    : (errorMessage = errorMessage.join());
  return errorMessage;
}
