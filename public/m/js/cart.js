

$(function () {
    var data = {};
    $.ajax({
        url: '/cart/queryCart',
        type: 'get',
        success: function (msg) {
            console.log(msg);
            data = msg;
            var html = template('cartTpl', { res: msg });
            $("#cartBox").html(html);
        }
    });

    $('#cartBox').on('click', '.choose', function () {
        var l1 = $("#cartBox .choose").length;//所有的复选框，不包括全选按钮
        var l2 = $("#cartBox .choose:checked").length;//所有选中的复选框
        // console.log("all checkbox size="+l1);
        // console.log("checked checkbox size="+l2);
        if (l1 == l2) {
            $("#checkAll").prop("checked", true);
        } else {
            $("#checkAll").prop("checked", false);
        }
        var checkeds = $(".choose:checked");
        var t = getPrice(checkeds);
        $("#total").html(t);
    });
    $("#cartBox").on("click", '#checkAll', function () {
        var isChecked = $("#checkAll").prop("checked");
        $("#cartBox").find(".choose").prop("checked", isChecked);
        var chooses = $("#cartBox").find(".choose:checked");//所有选中状态的复选框，是一个数组
        // console.log(chooses);
        var r = getPrice(chooses);
        $("#total").html(r);
    });

    // 1. 点击编辑按钮，修改购物车页面弹出，并且把当前编辑商品的数据显示到页面上。
    $('.cartlist').on('click', '.delete-btn', function () {
        var li = $(this).parent().parent();
       });

    $('.cartlist').on("click", ".edit-btn", function () {
        var id = $(this).data('id');
        $('.mask').css('display', 'block');
        var goods = getDataById(data, id);
        console.log(goods);
        $(".sizeBox").css({ 'opacity': '1', 'transition': "all 1s" });
        var html = template('editGoods', goods);
        $('.sizeBox').html(html);
        var tmp = $('.sizeDetail').find('span');
        tmp.each(function (index, el) {
            if ($(el).text() == goods.size) {
                // console.log(1);
                $(el).addClass('active');

            }
        });
        var size = goods.size;
        var num = goods.num;
        $('.sizeBox').on('click', '.sizeDetail span', function () {
            $(this).addClass('active').siblings().removeClass('active');
            size = $(this).text();
            // console.log(size);
        });

        $('.sizeBox').on('click', '#reduce', function () {
            num = $('#num').val();
            num--;
            if (num < 1) {
                num = 1;
                mui.toast('受不了了，宝贝不能再少了');
            }
            $('#num').val(num);
        });

        $('.sizeBox').on('click', '#increase', function () {
            num = $('#num').val();
            // console.log(num);
            num++;
            // console.log(goods.productNum);
            if (num > goods.productNum) {
                num = goods.productNum;
                mui.toast('不能再多了');
            }
            $('#num').val(num);
        });
        $('.sizeBox').on('click', '#confirm', function () {
            $.ajax({
                url: '/cart/updateCart',
                type: 'post',
                data: {
                    id: id,
                    size: size,
                    num: num
                },
                success: function (msg) {
                    // console.log(msg);
                    location.reload();
                }
            });
        });

    });
    $('.cartlist').on('click', '#cancel', function () {
        $('.mask').css('opacity', '0');
        $('.sizeBox').css('opacity', '0');
        location.reload();
    });
    function getDataById(res, id) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].id == id) {
                return res[i];
            }
        }
    }


});
function getPrice(array) {//获取所有选中的复选框的价格，然后再计算选中状态的复选框的总和
    var price = 0;
    var num = 0;
    var tmpPrice = 0;//当前商品的总价
    var totalPrice = 0;//总价
    array.each(function (index, el) {
        price = Number($(this).parent().find('.price').text());//点击某一个复选框获取当前这个商品的价格
        num = Number($(this).parent().find('.sl').text());//当前商品的数量
        tmpPrice = price * num;
        // console.log(tmpPrice);
        totalPrice += tmpPrice;
    });
    return totalPrice;
}