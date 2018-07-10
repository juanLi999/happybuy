
$(function () {
    mui('.mui-numbox').numbox();
    var num = 0;
    var size = 0;
    var id = getParams(location.href, 'id');
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: { id: id },
        success: function (msg) {
            console.log(msg);
            var html = template('detailTpl', msg);
            $("#detailPro").html(html);
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    });
    $("#detailPro").on('click', '.size span', function () {
        $(this).addClass('active').siblings().removeClass('active');
        size = $(this).text();
        // console.log(size);
        // var spans = $(".size").find('span');
        // console.log(span);
        // for(var i = 0; i < spans.length; i++  {
        //     if()
        // })
    });

    $("#detailPro").on('click', '#increase', function () {
        num = $("#inpuText").val();
        console.log(num);
        var repNum = ($("#rep").text());//库存
        console.log(repNum);
        num++;
        if (num > repNum) {
            num = repNum;
        }
        $("#inpuText").val(num);
    });
    $("#detailPro").on('tap', '#reduce', function () {
        num = Number($("#inpuText").val());
        console.log(num);
        num--;
        if (num < 1) {
            num = 1;
            mui.toast('受不了了，不能再减少了');
        }
        $("#inpuText").val(num);
    });

    $("#detailPro").on("click", '#addCart', function () {
        console.log(1);
        if(size == 0 && num == 0) {
            mui.toast('请选择数量和尺码');
            return;
        }
        $.ajax({
            url: ' /cart/addCart',
            type: 'post',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function (msg) {
                console.log(msg);
                if(msg.error){
                    mui.toast('请先登录');
                }
                else if (msg.success) {
                    mui.toast('添加购物车成功');
                }
            }
        });
    });
    $("#detailPro").on('click','#cartList',function(){

    });

});