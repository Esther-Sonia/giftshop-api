// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

// Use default middlewares (logger, static, cors, etc)
server.use(middlewares);

// Add custom routes before JSON Server router
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}));

// To handle POST, PUT and PATCH you need to use a body-parser
server.use(jsonServer.bodyParser);

// Custom middleware for authentication (example)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use the router
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});