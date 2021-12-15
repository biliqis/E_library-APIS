
module.exports.useBodyValidator = (schema) => {
    return async (req, res, next) => {
      try {
        const data = await schema
          .unknown(false)
          .validateAsync(req.body, { stripUnknown: true });
        req.body = data;
        next();
      } catch (e) {
        const message = e.message;
        return res.status(400).send({message:message})
      }
    };
  };
  
  module.exports.useQueryValidator = schema => {
      return async (req, res, next) => {
        try {
          const data = await schema
            .unknown(false)
            .validateAsync(req.query, { stripUnknown: true });
          req.query = data;
          next();
        } catch (e) {
          const message = e.details[0].message;
          return next(new BaseError(message, 400));
        }
      };
    };