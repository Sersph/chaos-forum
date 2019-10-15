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

  // 我的资料 - 个人中心
  router.get('/account/person/info', async ctx => {
    await app.render(ctx.req, ctx.res, '/account/person/info');
    ctx.respond = false;
  });

  // 帖子详情
  router.get('/post/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/post', {
      id: ctx.params.id,
      page: ctx.query.page
    });
    ctx.respond = false;
  });
};
