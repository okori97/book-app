const modelError = (error, res) => {
  const validationError =
    error.errors[0].message || error.errors[0].ValidationErrorItem.message;

  validationError
    ? res.status(400).json({ error: `${validationError}` })
    : res.status(500).json({ error: error });
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
