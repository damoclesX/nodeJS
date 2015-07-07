var url = require('url');
var fs = require('fs');
var jade = require('jade');
var config = require('./config');
var routers = {};

function router(req,res){
    var pathname = url.parse(req.url).pathname.split('/')[1];
    pathname = pathname?pathname:'index';
    //如果存在该路由
    if(pathname in routers){
        routers[pathname](req,res,pathname)
    }else{
        res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'});
        fs.readFile(config.tpl_url+'404.html',function(err,fd){
            if(!err){
                res.write(fd);
                res.end();
            }
        })
    }
}


routers.index = function(req,res,pathname){
    render(pathname,res,{title:'首页'})
}
routers.login = function(req,res,pathname){
    render(pathname,res,{title:'登录'})
}
routers.register = function(req,res,pathname){
    render(pathname,res,{title:'注册'})
}

function render(pathname,res,data){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write(jade.compileFile(config.tpl_url+pathname+config.tpl_extension)(data))
    res.end()
}
module.exports = router;

