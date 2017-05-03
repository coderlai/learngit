var crypto = require('crypto');
module.exports.md5 = function (data) {
  var result = crypto.createHash('md5').update(data).digest('hex');
  return result;
};
