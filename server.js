var http = require('http');
var url = require('url');
var fs = require('fs');

var info = [
    { name: "banner-01", url: "http://127.0.0.1:8081/images/banner-01.png" },
    { name: "banner-02", url: "http://127.0.0.1:8081/images/banner-01.png" }
];
var newsList = [
    { id: 1, title: '这是新闻咨询', recordTime: new Date().toLocaleString(), clCount: '10', img: 'https://img.yzcdn.cn/vant/cat.jpeg' ,content:'我为 Raspberry Pi 附加组件（通常称为连接在顶部的硬件——HAT）创建了软件库，而且无论好坏，Pi 上的规范语言都是 Python。对于初学者来说，Python 通常被认为是一种相当友好的语言，并且由于整个社区都参与了项目、示例、指南和工具，因此，我没有理由背道而驰。但这并不是说我不喜欢 Python。它很可能是我最不讨厌的编程语言。我刚刚发布了 Python 库来部署字体，用于驱动 LCD、OLED 和 eInk 显示器的示例代码。使用命名空间包和入口点非常有趣，让我解决了字体问题，并且我的方法可以被社区共享使用。'},
    { id: 2, title: '这是新闻咨询第二项', recordTime: new Date().toLocaleString(), clCount: '1', img: 'https://img.yzcdn.cn/vant/cat.jpeg' ,content:'我为 Raspberry Pi 附加组件（通常称为连接在顶部的硬件——HAT）创建了软件库，而且无论好坏，Pi 上的规范语言都是 Python。对于初学者来说，Python 通常被认为是一种相当友好的语言，并且由于整个社区都参与了项目<img src="https://img.yzcdn.cn/vant/cat.jpeg"/>、示例、指南和工具，因此，我没有理由背道而驰。但这并不是说我不喜欢 Python。它很可能是我最不讨厌的编程语言。我刚刚发布了 Python 库来部署字体，用于驱动 LCD、OLED 和 eInk 显示器的示例代码。使用命名空间包和入口点非常有趣，让我解决了字体问题，并且我的方法可以被社区共享使用。' }
];
http.createServer(function (request, response) {
    console.log('Server Request at http://127.0.0.1:8081 /' + new Date().toLocaleString());
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');

    if (request.url.indexOf('.png') > 0) {
        fs.readFile(request.url.substr(1), function (err, data) {
            if (err) {
                response.statusCode = 404;
                response.setHeader('Content-Type', 'text/text;charset=UTF-8');
                response.end('失败');
            } else {
                response.setHeader('Content-Type', 'image/png');
                response.write(data);
                response.end();
            }
        });
    } else if (request.url.indexOf('newsList') > 0) {
        var array = [];
        for (let index = 0; index < 30; index++) {
            for (let index = 0; index < newsList.length; index++) {
                array.push(newsList[index]);
            }
        }
        var result = {
            status: '0',
            newsList: array
        };
        var count = Number(new URL('http://' + request.headers.host + request.url).searchParams.get('count'));
        if ((3 * (count + 1)) >= array.length) {
            result.status = 1;
        }
        result.newsList = array.slice(3 * count, 3 * (count + 1));
        response.write(JSON.stringify(result));
        response.end();
    } else if (request.url.indexOf('newsInfo') > 0) {
        var id = Number(new URL('http://' + request.headers.host + request.url).searchParams.get('id'));

        response.write(JSON.stringify(newsList.filter(info=>info.id==id)));
        response.end();
    }else {
            response.write(JSON.stringify(info));
            response.end();
        }


    }).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

