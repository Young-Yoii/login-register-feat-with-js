import express from 'express';
import path from 'path';

const viewsRouter = express.Router();

viewsRouter.use('/', serveStatic('home'));
viewsRouter.use('/register', serveStatic('register'));
// viewsRouter.use('/login', serveStatic('login'));
// viewsRouter.use('/admin-category', serveStatic('admin-category'));
// viewsRouter.use('/admin-user', serveStatic('admin-user'));
// viewsRouter.use('/admin-orders', serveStatic('admin-orders'));

// viewsRouter.use('/product', serveStatic('product'));
// viewsRouter.use('/cart', serveStatic('cart'));
// viewsRouter.use('/shipping', serveStatic('shipping'));
// viewsRouter.use('/edit', serveStatic('edit'));
// viewsRouter.use('/orderlist', serveStatic('orderlist'));

viewsRouter.use('/', serveStatic(''));

function serveStatic(resource) {
  const resourcePath = path.join(__dirname, `../views/${resource}`);
  const option = { index: `${resource}.html` };

  return express.static(resourcePath, option);
}

export { viewsRouter };
