require("dotenv").config();

const { PORT, MONGODB_URl } = process.env;

module.exports = {
  port: PORT,
  mongoUrl: MONGODB_URl,
};
