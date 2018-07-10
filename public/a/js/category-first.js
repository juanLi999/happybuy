
$(function () {
    var page = 1;
	var pagesize = 10;
    var totalPage = 0;
    
    $.ajax({
        url: ' /category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pagesize,
        },
        success: function (msg) {
            console.log(msg);
            totalPage = Math.ceil(msg.total / pagesize);
            var html = template('categoryFirstTpl', msg);
            $('#categoryFirstBox').html(html);
        }
    });
   
    $('#prev').click(function(){
        page--;
        if(page < 1) {
            page = 1;
            alert('已经是第一页');
            return;
        }
        $.ajax({
            url: ' /category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize,
            },
            success: function (msg) {
                console.log(msg);
                var html = template('categoryFirstTpl', msg);
                $('#categoryFirstBox').html(html);
            }
        });
    });
    $('#next').click(function(){
        page++;
        if( page > totalPage) {
           
            page = totalPage;
            alert('已经最后页');
            return;
        }
        $.ajax({
            url: ' /category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize,
            },
            success: function (msg) {
                console.log(msg);
                var html = template('categoryFirstTpl', msg);
                $('#categoryFirstBox').html(html);
            }
        });
    });

    $('#save').on('click', function () {
        var categoryName = $('[name="categoryFirstName"]').val();
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: {
                categoryName: categoryName
            },
            success: function (msg) {
                // console.log(msg);
                if(msg.success) {
                    alert('添加成功');
                    location.reload();
                }
            }
        });
    });
});