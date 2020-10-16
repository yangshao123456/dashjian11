$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '', // 文章分类的 Id
        state: ''
    }
    initTable();
    initCate();
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total);
            }
        })
    }
    // initTable();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // console.log(first)
                // console.log(obj.curr)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: '/my/article/delete/' + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除文章失败！')
                        }
                        layer.msg('删除文章成功！')
                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }
                        initTable()
                    }
                })
                layer.close(index)
            })
    })
})