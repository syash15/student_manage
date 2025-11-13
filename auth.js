const jwt = require('jsonwebtoken');
module.exports = (roles=[]) => (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
    if (roles.length && !roles.includes(data.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
