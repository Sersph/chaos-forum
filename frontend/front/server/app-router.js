// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 帖子详情
  router.get('/p/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/post/detail', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });
};
