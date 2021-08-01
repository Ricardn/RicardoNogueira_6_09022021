//Import rateLimit.
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min.
  max: 100, //limit each IP to 100 requests per windows.
});

module.exports = limiter;
