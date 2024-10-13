const validator = require('../helpers/validate');

// VALIDATORJS DOCS --> https://www.npmjs.com/package/validatorjs (Great resource to learn the available rules)

const saveTeam = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    foundationDate: 'required|date',
    website: 'required|url',
    nationalCups: 'required|integer',
    internationalCups: 'required|integer',
    stadiumName: 'required|string',
    city: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTeam
};