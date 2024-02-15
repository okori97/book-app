export const BookModel = (connection, DataTypes) => {
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
    author: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please input an author name',
        },
        notEmpty: {
          true: true,
          msg: 'Please input a valid author name',
        },
      },
    },
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};
