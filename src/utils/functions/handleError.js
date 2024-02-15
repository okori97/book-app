const handleError = (error, res) => {
  const validationError =
    error.errors[0].message || error.errors[0].ValidationErrorItem.message;

  validationError
    ? res.status(400).json({ error: `${validationError}` })
    : res.status(500).json({ error: error });
};

export default handleError;
