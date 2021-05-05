const compose = require('koa-compose')
const glob = require('glob')
const { resolve } = require('path')


const registerRouter_all = () => {
    let routers:any = [];
    glob.sync(resolve(__dirname, './', '**/*.js'))
        .filter((value:any) => (value.indexOf('index.js') === -1))
        .map((router:any) => {
            routers.push(require(router).routes())
            routers.push(require(router).allowedMethods())
        })
    return compose(routers)
}

module.exports = registerRouter_all