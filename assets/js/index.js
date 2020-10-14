$(function () {
    getUserInfo();

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function (index) {
                // 清空本地存储
                localStorage.removeItem('token');
                // 重新跳转到登录页面
                location.href = '/login.html';
                layer.close(index)
            })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('身份认证失败！')
            }
            renderAvatar(res.data)
        }
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.
        //         message === '身份认证失败!') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}
// getUserInfo();