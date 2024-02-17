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

  const options = {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  };

  const genreModel = connection.define('Genre', schema, options);
  return genreModel;
};

export default genreModel;
