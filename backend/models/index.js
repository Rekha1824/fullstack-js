const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// SQLite DB
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Task model
const Task = sequelize.define('Task', {
  title: DataTypes.STRING,
  completed: { type: DataTypes.BOOLEAN, defaultValue: false }
});

User.hasMany(Task);
Task.belongsTo(User);

sequelize.sync();

module.exports = { sequelize, User, Task };
