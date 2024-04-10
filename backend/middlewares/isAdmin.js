export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "Admin") {
      next();
    } else {
      return next(new ErrorHandler("Not authorized as an admin", 403));
    }
  };
  