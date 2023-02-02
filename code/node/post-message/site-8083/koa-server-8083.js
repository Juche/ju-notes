const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const app = new Koa();
// app.use(static(__dirname + '/static'));
// 使用根目录下的 index.html 文件
app.use(static(__dirname + "/"));
const router = new Router();
router.get("/getUser", (ctx) => {
  console.log(`🚀 ~ CORS Request...`);
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8081');
  // ctx.set("Access-Control-Allow-Origin", "*");
  let obj = {
    name: "Juching",
    age: 30,
  };
  ctx.body = obj;
});
// 通过后端服务器配置来允许跨域
// 也可以通过在前端正向代理来处理跨域请求
// 或者通过 nginx 在服务器端做正向代理
app.use(async (ctx, next) => {
    // 服务器收到请求以后，检查Origin/Method/Headers字段以后，确认允许跨源请求，就可以做出响应
  // 不携带cookie请求可以用*，如果有携带cookie请求必须指定域名
  ctx.set("Access-Control-Allow-Origin", "*");
  // 设置所允许的HTTP请求方法
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // 必需字段,使用逗号分隔服务器支持的所有头信息字段
  ctx.set(
    "Access-Control-Allow-Headers",
    "x-requested-with, accept, origin, content-type"
  );
  // 是否允许发送Cookie(默认 Cookie 不包括在CORS请求之中)
  ctx.set("Access-Control-Allow-Credentials", true);

  await next();
});
app.use(router.routes());
app.listen(8083);
console.log(`🚀 ~ 服务已启动: 127.0.0.1:8083`)
