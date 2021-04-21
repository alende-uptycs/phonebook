module.exports.check = (req, res, next) => {
  const path = req.originalUrl.split("?")[0];

  if (path === "/search") {
    if (req.query.name === undefined) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.send({
        status: "Malformed Request",
        description: "'name' expected in query",
      });
    } else next();
  } else if (path === "/add") {
    if (req.query.name === undefined) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.send({
        status: "Malformed Request",
        description: "'name' expected in query",
      });
    } else if (req.query.phonenumber === undefined) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.send({
        status: "Malformed Request",
        description: "'phonenumber' expected in query",
      });
    } else next();
  } else next();
};
