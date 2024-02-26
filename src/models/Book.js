const BookModel = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please input a title',
        },
        notEmpty: {
          true: true,
          msg: 'Please input a valid title name',
        },
      },
    },
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};

export default BookModel;
