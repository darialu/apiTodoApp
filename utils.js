const crypto = require("crypto");

exports.sha1 = data =>
  crypto
    .createHash("sha1")
    .update(data, "binary")
    .digest("hex");
