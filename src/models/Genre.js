const genreModel = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Please input a genre',
        },
        notEmpty: {
          args: true,
          msg: 'Please input a valid genre',
        },
      },
    },
  };

  const genreModel = connection.define('Genre', schema);
  return genreModel;
};

export default genreModel;
