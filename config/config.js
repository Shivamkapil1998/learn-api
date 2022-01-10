const env = require("./env.json");

exports.config = function () {
  const node_env = process.env.NODE_ENV;
  return env[node_env];
};
