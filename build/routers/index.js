"use strict";
var compose = require('koa-compose');
var glob = require('glob');
var resolve = require('path').resolve;
var registerRouter_all = function () {
    var routers = [];
    glob
        .sync(resolve(__dirname, './', '**/*.js'))
        .filter(function (value) { return value.indexOf('index.js') === -1; })
        .map(function (router) {
        routers.push(require(router).routes());
        routers.push(require(router).allowedMethods());
    });
    return compose(routers);
};
module.exports = registerRouter_all;
