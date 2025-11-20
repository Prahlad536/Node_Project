module.exports = (sequelize, DataTypes) => {
    const Register = sequelize.define("register", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull : false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false
      }
   
    });
    return Register;
  };