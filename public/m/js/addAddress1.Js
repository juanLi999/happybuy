
$(function () {
    var isEdit = getParams(location.href, 'isEdit');
    if (isEdit == '1') {//编辑
        if (sessionStorage.getItem('editAddress')) {
            var address = JSON.parse(sessionStorage.getItem('editAddress'));
            // var html = template('addressList', address);
            $('[name="username"]').val(address.recipients);
            $("#selectCity").val(address.address);
            $('[name="detail"]').val(address.addressDetail);
            $('[name ="postCode"]').val(address.postCode);
        }
    }

    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    $("#selectCity").on("click", function () {
        picker.show(function (selectItems) {
            //selectItems是选中的地址项
            console.log(selectItems);
            $("#selectCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text);
        });
    });
    // console.log(address);
    $("#addAddress").click(function () {
        var city = $("#selectCity").val();
        var addressDetail = $('[name="detail"]').val();
        var recipients = $('[name="username"]').val();
        var postCode = $('[name ="postCode"]').val();
        if (isEdit == '1') { //这个地方isEdit是字符串。。
            // var url = "/address/updateAddress";
            // data.id = address.id;//要通过id号才能修改指定的地址项
            $.ajax({
                url: '/address/updateAddress',
                type: 'post',
                data: {
                    address: city,
                    addressDetail: addressDetail,
                    recipients: recipients,
                    postcode: postCode,
                    id : address.id
                },
                success: function(msg){
                    if (msg.success) {
                        mui.toast('修改成功');
                        location.href='address.html';
                    }
                }
            });
        }else {
            $.ajax({
                url: '/address/addAddress',
                type: 'post',
                data: {
                    address: city,
                    addressDetail: addressDetail,
                    recipients: recipients,
                    postcode: postCode,
                    // id : address.id
                },
                success: function(msg){
                    if (msg.success) {
                        mui.toast('添加地址成功');
                        location.href='address.html';
                    }
                }
            });
        }
    });
});