// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 用户注册
  router.get('/account/sign-up', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/sign-up');
    ctx.respond = false;
  });

  // 用户登录
  router.get('/account/sign-in', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/sign-in');
    ctx.respond = false;
  });

  // 全部分区
  router.get('/post/category/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/post/category', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });

  // 帖子详情
  router.get('/post/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });
};
