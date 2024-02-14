const handleError = (error, res) => {
  console.error(error);
  return res.status(500).json({ error: error });
};

export default handleError;
