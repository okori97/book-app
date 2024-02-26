const authorModel = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please input a author name',
        },
        notEmpty: {
          true: true,
          msg: 'Please input a valid author name',
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

  const authorModel = connection.define('Author', schema, options);
  return authorModel;
};

export default authorModel;
