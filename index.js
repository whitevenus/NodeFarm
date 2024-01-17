// 加载Node中的核心模块
const fs = require("fs");
const http = require("http");
const url = require("url");
// 加载自定义模块（一般位于核心模块后面）
const replaceTemplate = require("./modules/replaceTemplate");

// 加载本地文件数据并解析为js内置数据结构（本地文件数据是JSON格式文件）
const data = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const productArr = JSON.parse(data);

// 加载HTML模版页面
const indexTemp = fs.readFileSync(`${__dirname}/template/index.html`, "utf-8");
const cardTemp = fs.readFileSync(`${__dirname}/template/card.html`, "utf-8");
const productTemp = fs.readFileSync(
  `${__dirname}/template/product.html`,
  "utf-8"
);

// 在本地构建Web服务器并监听8000端口
const server = http
  .createServer((req, res) => {
    // 获取请求路径以及请求参数
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === "/" || pathname === "/index") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      // 替换Card模版内容
      const cardHTML = productArr
        .map((el) => replaceTemplate(cardTemp, el))
        .join("");
      // 替换Index模版内容
      const output = indexTemp.replace("{{CARDSTEMPLATE}}", cardHTML);
      // 将替换后结果返回
      res.end(output);
    } else if (pathname === "/product") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      const product = productArr[query.id];
      const output = replaceTemplate(productTemp, product);
      res.end(output);
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1>Page not found!</h1>");
    }
  })
  .listen(8000, "127.0.0.1", () => {
    console.log("正在监听宿主机8000端口....");
  });
