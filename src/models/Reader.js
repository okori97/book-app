const ReaderModel = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          true: true,
          msg: 'Please input a name',
        },
        notEmpty: {
          true: true,
          msg: 'Please input a name',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: {
          args: true,
          msg: 'Please input a email',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please add a password',
        },
        len: {
          args: [9],
          msg: 'Password must be more than 8 characters',
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};

export default ReaderModel;
