const orgAdminOnly = (req, res, next) => {
  // req.org should be the decoded token object (has role)
  if (req.org?.role?.toLowerCase() !== "admin") {
    return res.status(403).json({
      message: "Access denied. Organization admin only.",
    });
  }
  next();
};

export default orgAdminOnly;
