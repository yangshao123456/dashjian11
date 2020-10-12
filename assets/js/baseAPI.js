$.ajaxPrefilter(function (options) {
    // console.log(123)
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 设置headers请求
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.
            message === '身份认证失败!') {
            // 强制清空token
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})