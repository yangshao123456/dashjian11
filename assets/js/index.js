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
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
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
getUserInfo();