// import { template } from "handlebars";

var page = 1;
var priceSort = 1;
var numSort = 1;
var keywords = getParams(location.href, 'keywords');
$(function () {
    // getData();
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                height: 50,//可选,默认50.触发下拉刷新拖动距离,
                auto: false,//可选,默认false.首次加载自动下拉刷新一次
                contentdown: "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                contentover: "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                contentrefresh: "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                callback: function () {
                    setTimeout(function() {
                        mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
                    },2000);
                } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData
            }
        }
    });
    $('#priceSort').on('tap', function () {
        console.log(111);
        priceSort = priceSort == 1 ? 2 : 1;
        $("#productBox").html("");
        page = 1;
        // mui('#refreshContainer').pullRefresh().refresh(true);
        getData();

    });
    $("#numSort").on('tap', function () {
        numSort = numSort == 1 ? 2 : 1;
        $("#productBox").html("");
        page = 1;
        $.ajax({
            url: '/product/queryProduct',
            type: 'get',
            data: {
                page: page++,
                pageSize: 4,
                proName: keywords,
                // price: priceSort
                num: numSort
            },
            success: function (res) {
                // console.log(res);
                if (res.data.length > 0) {
                    var html = template('productlist', res);
                    $("#productBox").append(html);
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(false);
                } else {
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);    
                }
            }
        });
    });
});


function getParams(url, name) {
    var params = location.search;
    // console.log(params);//?keyword=1111
    var keywordArr = params.split('?');
    //["", "keyword=1111"]
    var tmp = keywordArr[1];
    var keywords = tmp.split('=')[1];
    // console.log(keywords);//111
    return keywords;
}
function getData() {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: {
            page: page++,
            pageSize: 4,
            proName: keywords,
            price: priceSort
        },
        success: function (res) {
            console.log(res);
            if (res.data.length > 0) {
                var html = template('productlist', {list:res.data});
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                $("#productBox").append(html);               
            } else {
                mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
            }
        }
    });
}
