// 导出所有页面的对应的路由
module.exports = (router, app) => {
  // 首页
  router.get('/', async ctx => {
    await app.render(ctx.req, ctx.res, '/home', ctx.query);
    ctx.respond = false;
  });

  // 文章详情
  router.get('/article/detail/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/article/detail', {
      id: ctx.params.id
    });
    ctx.respond = false;
  });
};
