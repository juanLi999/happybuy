$(function () {
    $("#search").click(function () {
        var keywords = $('#text').val();
        // console.log(keywords);
        if (!keywords) {
            alert("请输入搜索关键字");
            return;
        }
        if(keywords){
			// 将用户输入的关键字存到数组中
			keyArr.push(keywords);
			// 将关键字数组存储在本地
			localStorage.setItem('keyArr', JSON.stringify(keyArr));
			location.href = "search-result.html?keyword=" + keywords;
		}else{
			// 用户没有输入关键字
			alert('请输入要搜索的商品关键字');
        }
    });

    var keyArr = [];

	if(localStorage.getItem('keyArr')){

		keyArr = JSON.parse(localStorage.getItem('keyArr'));

		var html = template('history', { result: keyArr })
        // console.log(html);
		$('#historybox').html(html);
    }
    $("#clearHistory").click(function() {
        $('#historybox').html("");
        localStorage.removeItem("keyArr");
    });
});