环境：node,mysql,redis,mongodb;
依赖：
    安装koa:npm i koa  -S;
    全局安装koa脚手架:npm install koa-generator -g;
创建项目：
    koa2 -e 项目名称;    注：-e指的是使用es语法创建模板;
安装依赖：
    npm install;
改造为支持TS：
    1.重新整理文件（新建src文件夹，将routes，bin目录移动至src目录下，作为ts编译的入口，将app.js也移入到src目录，将bin下的www文件重命名为www.js）
    2.创建并配置tsconfig.json文件（使用tsc -init，会在当前目录创建tsconfig.json文件，修改配置文件）
    3.安装TS（npm i typescript -D）
    4.修改package.json文件（先安装项目启动所需依赖两个的文件：nodemon，concurrently：npm i nodemon concurrently -D，增加对应的scripts脚本命令）
    5.修改app.js文件内容（引入path模块，修改静态文件以及模板文件目录）
    6.修改app.js为app.ts并安装类型支持（npm install @types/node --save）
    注：参考https://www.icode9.com/content-4-766399.html
配置eslint:
    1.npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin;npm i -D eslint-plugin-vue;npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    2.配置.ellintrc.js
    3.按需配置prettier
安装其他依赖：
    1.安装koa-session（npm install koa-session --save）
    2.安装ejs（npm install ejs --save）
    3.安装Koa2的koa-multer（npm install --save multer）
    4.安装node.js的mysql模块（npm install --save mysql）
    5.安装mongodb（npm install mongodb --save）
    6.安装koa2-cors（npm install --save koa2-cors）
    7.安装koa-socket模块（npm i -S koa-socket）
    8.安装koa-compress中间件（npm install koa-compress --save）
    9.安装koa-socket（npm i -S koa-socket）
整合路由
    1.安装依赖（npm install koa-compose -D）
    2.路由合并优化
封装Mysql:
封装MongoDB:
封装Redis:
封装Logger:
    1.安装log4js(npm install log4js -S)



    