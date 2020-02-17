const Joi = require('@hapi/joi');

const SighInShcema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .not()
    .empty()
    .max(50)
    .required(),
  password: Joi.string()
    .not()
    .empty()
    .min(8)
    .max(24)
    .required(),
});

module.exports = {
  SighInShcema,
};
