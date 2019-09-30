// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 全部分区
  router.get('/post-category', async ctx => {
    await app.render(ctx.req, ctx.res, '/post-category', ctx.query);
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
