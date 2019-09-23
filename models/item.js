module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    title: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  Item.associate = function (models) {
    // associations can be defined here
  };
  return Item;
};