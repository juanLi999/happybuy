
$(function () {
    var address = null;
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (msg) {
            console.log(msg);
            address = msg;
            var html = template('addressList', { res: msg });
            $("#address-box").html(html);
        }
    });
    $("#address-box").on('click', '.delete-btn', function () {
        var li = $(this).parent().parent();
        var id = $(this).data('id');
        mui.confirm("确认要删除吗?", function (message) {
            // console.log(id);
            // console.log(li);
            console.log(message);
            if (message.index == 1) {
              
                $.ajax({
                    url: ' /address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (msg) {
                        console.log(msg);
                        mui.toast('删除成功');
                        location.reload();
                    }
                })
            } else {
                mui.swipeoutClose(li[0]);
            }

        });
    });
    $("#address-box").on('click', '.edit-btn', function () {
        var li = $(this).parent().parent();
        var id = $(this).data('id');
        for (var i = 0; i < address.length; i++) {
           
            if (address[i].id == id) {
               
                sessionStorage.setItem('editAddress', JSON.stringify(address[i]));        
                // 终止循环 
                break;
            }  console.log("edit......");
            // location.href = "addAddress.html?isEdit=1";
            //这段代码如果在循环里面，当循环找到目标值后就直接跳出循环了，所以这段代码也不会执行了
        }
        location.href = "addAddress.html?isEdit=1";
    });
});