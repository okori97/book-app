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
          msg: 'Please input a valid name',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please add a valid email address',
        },
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
          msg: 'Please input a password',
        },
        len: {
          args: [9],
          msg: 'Password must be more than 8 characters',
        },
      },
    },
  };

  const options = {
    hooks: {
      afterCreate: (reader) => {
        delete reader.dataValues.password;
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema, options);
  return ReaderModel;
};

export default ReaderModel;
