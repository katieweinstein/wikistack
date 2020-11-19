const Sequelize = require("sequelize");
const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});
const validator = require("validator");

const Page = db.define("page", {
  title: { type: Sequelize.STRING, allowNull: false },
  slug: { type: Sequelize.STRING, allowNull: false },
  content: { type: Sequelize.STRING, allowNull: false },
  status: Sequelize.ENUM("open", "closed"),
});

const User = db.define("user", {
  name: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
});

function urlify(string) {
  string = string.replace(/\s+/g, "_").replace(/\W/g, "");
}

Page.beforeCreate((pageInstance) => {
  pageInstance.slug = urlify(pageInstance.title);
});

module.exports = {
  db,
  Page,
  User,
};
