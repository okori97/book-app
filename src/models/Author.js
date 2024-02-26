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

  const authorModel = connection.define('Author', schema);
  return authorModel;
};

export default authorModel;
