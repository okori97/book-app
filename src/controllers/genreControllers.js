export const createGenre = async (req, res, next) => {
  console.log('Second controller works');
  console.log('Second: ', req.body);
  next();
};
