const get400Error = ({ errors }, res) => {
  const errorMessage = handleMultipleErrors(errors);

  if (errorMessage) {
    res.status(400).json({ error: `${errorMessage}` });
  } else {
    res.status(500).json({ error: errors });
  }
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

const get404Error = (model) => {
  return { error: `Sorry, No ${model}(s) found` };
};

const requestError = (res) => {
  return res.status(400).json({ error: 'Bad request' });
};

function handleMultipleErrors(errors) {
  let errorMessage = [];

  /**
   if more than one error, then grab error type ( e.g 'password') and push it to array
  or simply add single error message to array
   */

  if (errors.length > 1) {
    errors.map((error) => {
      errorMessage.push(error.path);
    });
  } else {
    errors.map((error) => {
      errorMessage.push(error.message);
    });
  }

  if (errorMessage.length > 1) {
    // turn array of mutiple errors into sentence and make a string
    errorMessage = 'Please input a valid ' + errorMessage.join(' and ');
  } else {
    // convert array of single error message to string
    errorMessage = errorMessage.join();
  }

  return errorMessage;
}

export { get400Error, isContentTypeJson, requestError, get404Error };
