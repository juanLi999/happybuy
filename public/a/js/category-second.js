

$(function () {
    var page = 1;
    var pagesize = 10;
    var totalPage = 0;

    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: page,
            pageSize: pagesize,
        },
        success: function (msg) {
            console.log(msg);
            totalPage = Math.ceil(msg.total / pagesize);
            var html = template('categorySecondTpl', msg);
            $('#categorySecondBox').html(html);
        }
    });
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (res) {
            var html = template("categoryFirstTpl", res);
            $('#categoryFirstBox').html(html);
        }
    });

    $('#prevBtn').click(function () {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页');
            return;
        }
        $.ajax({
            url: ' /category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize,
            },
            success: function (msg) {
                console.log(msg);
                var html = template('categorySecondTpl', msg);
                $('#categorySecondBox').html(html);
            }
        });
    });
    $('#nextBtn').click(function () {
        page++;
        if (page > totalPage) {

            page = totalPage;
            alert('已经最后页');
            return;
        }
        $.ajax({
            url: ' /category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pagesize,
            },
            success: function (msg) {
                console.log(msg);
                var html = template('categorySecondTpl', msg);
                $('#categorySecondBox').html(html);
            }
        });
    });

    var previewImg = "";

    // 上传图片
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data)
            console.log(data.result.picAddr);
            // 上传图片预览
            $('#preview').attr("src", data.result.picAddr);
            previewImg = data.result.picAddr;
        }
    });
    $('#save').on('click', function () {
        var categoryId = $("[name='categoryId']").val();

        var brandName = $("[name='brandName']").val();

        
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: previewImg,
                hot: 0
            },
            success: function (msg) {
                // console.log(msg);
                if (msg.success) {
                    alert('添加成功');
                    location.reload();
                }
            }
        });
    });

});