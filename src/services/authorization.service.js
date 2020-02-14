exports.authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    }

    return res.status(401);
  };
};
