const express = require('express');

const app = express();
// global middlware function
app.use(express.json()); // express.json -> middleware function
// express.json() -> 帮我们把request里的body数据（json），转换为js object，并赋值给req.body

// app.use(xxxx);

function m1(req, res, next) {}

// function json() {
// return (req, res, next) =>{
//   next();
// }
// };
// app.use(json())
function foo(cb) {}

foo((req, res) => {});
foo(m1);
// express.json() -> cb function

// /books
app.use('/users', (req, res, next) => {});

// application   http method  (path, callback function -> route handler -> middleware function)
app.get('/users1', (req, res) => {
  // WebAPI server -> JSON data
  // res.status(201).json([1, 2, 3, 4]);
  // res.send([1,2,3,4]);
  res.sendStatus(204);
});

// route params
app.get('/users/:id/posts/:postId', (req, res) => {
  // const {id, postId} = req.params;
  res.json(req.params);
});

/**
 * 如何从request里取数据
 * 1. req.params (url中的变量)                      -> GET, PUT, DELETE, PATCH
 *    /users/:id  -> id
 * 2. req.query (query中的变量 query params)        -> GET
 *    /users?page=1  -> page
 * 3. req.body (body里面的数据)                      -> POST, PUT, PATCH
 *                      app.use(express.json())
 *
 * from headers (authorization)
 */
app.get('/users/:id', (req, res) => {
  res.json({ body: req.body, route: req.params, query: req.query });
});

// use -> 所有以/users开头的请求，不管任何http method
// app.use('/users',()=>{});

// app.all()

// app.post()
// app.delete()
// app.put()
// app.patch()

app.use((error, req, res, next) => {});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});

// example.com/
// example.com

// middlware chain
// error middleware chain

// app
app.get('/v1/users/:id', (req, res) => {});

const userRouter = express.Router();
app.use('/v1/users', userRouter);
userRouter.get('/:id', (req, res) => {});
