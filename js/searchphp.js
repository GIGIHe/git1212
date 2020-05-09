var onswitch = false
// 
var shenfen_include = function(item, target) {
		if(item == target) {
			return true
		} else {
			return false
		}
}

// 学历：
var xueli_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
}
}
//培养方式：
var culture_include = function(item, target) {
		if(item == target) {
			return true
		} else {
			return false
		}
}
// 年龄：
var age_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}

// 户籍
var province_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}
// 毕业院校
var xuexiao_include = function(item, target) {
	if(item == target) {
		return true
	} else {
		return false
	}
}

var zhuanye_include = function(item, target) {
	if(onswitch) {
		return true
	} else {
		if(target.indexOf(item) != -1) {
			return true
		} else {
			return false
		}
	}
}
var clickfn = function() {
	var attr = [];
	var num = [];
	var shenfen = $('#shenfen').val()
	var zhuanye = $('#zhuanye').val()
	var xueli = $('#xueli').val()
	var culture = $('#culture').val()
	var age = $('#age').val()
	var province = $('#province').val()
	var xuexiao = $('#xuexiao').val()
	
	if(province == "") {
		
		return;
	}
	if(xuexiao == "") {
		
		return;
	}
	if(shenfen == "") {
		alert('请选择身份！')
		return;
	}

	if(culture == "") {
		alert('请选择培养方式！')
		
		return;
	}
	if(xueli == "") {
		alert('请选择学历！') 
		
		return;
	}
	
	if(age == "") {
		alert('请填写年龄！') 
		 
		return;
	}
	if(zhuanye == "专业不限") {
		alert('请选择专业！')
		 
		return;
	}
	console.log(province,xuexiao,shenfen,culture,xueli,age,zhuanye)
	$.each(datalist, function(idx, obj) {
		if(
			shenfen_include(shenfen, obj.item04) &&
			zhuanye_include(zhuanye, obj.item07) &&
			xueli_include(xueli, obj.item05) &&
			culture_include(culture, obj.item06) &&
			age_include(age, obj.item08) &&
			xuexiao_include(xuexiao, obj.item03)&&
			province_include(province, obj.item02)
			) {
			obj.data_index = idx;
			num.push(obj.data_index);
			attr.push(obj);
		}	
	});
	var formbox_top = $(".formbox").offset().top + 500+'px';
	$('html,body').animate({scrollTop:formbox_top},1800);
	// console.log(attr)
	$('.res_tit').show()
	templateHtml(attr)
	console.log(attr)
	// window.LS.set('res_data', JSON.stringify(attr));
	// window.location.href="./component/result.html"
}
var templateHtml = function(attr){
	if(attr.length>0){
		attr.forEach(el => {
			 if(el.item01 == "国家公务员"){
				 $("#list li").eq(0).fadeIn()
			 }
			 if(el.item01 == "北京公务员"){
				 $("#list li").eq(1).fadeIn()
			 }
			 if(el.item01 == "银行"){
				 $("#list li").eq(2).fadeIn()
			 }
			 if(el.item01 == "社区"){
				 $("#list li").eq(3).fadeIn()
			 }
			 if(el.item01 == "考研"){
				 $("#list li").eq(4).fadeIn()
			 }
			 if(el.item01 == "军队文职"){
				 $("#list li").eq(5).fadeIn()
			 }
			 if(el.item01 == "国企"){
				 $("#list li").eq(6).fadeIn()
			 }
			 if(el.item01 == "遴选"){
				 $("#list li").eq(7).fadeIn()
			 }
			 if(el.item01 == "事业单位"){
				 $("#list li").eq(8).fadeIn()
			 }
			 if(el.item01 == "选调生"){
				 $("#list li").eq(9).fadeIn()
			 }
			 if(el.item01 == "教师招聘"){
				 $("#list li").eq(10).fadeIn()
			 }
			 if(el.item01 == "教师资格"){
				 $("#list li").eq(11).fadeIn()
			 }
			 if(el.item01 == "医疗"){
				 $("#list li").eq(12).fadeIn()
			 }
		 });
	 }else{
		$("#list li.no_res").fadeIn()
	 }
}
$(function(){
	$('.res_tit,#list li').hide()
	$(".search_ul li a").click(function(){
        $(this).addClass("show").siblings().removeClass("show");
		this.parentNode.children[0].value = this.innerText;
	})
	$('#submit').click(function() {
		$('.res_tit,#list li').hide()
		if(window.LS.get('userInfo')){
			if(($('#zhuanye').val() == '专业不限') && ($(".item_check_zy").hasClass('active')) == false) {
				alert('请选择专业！')
				return false;
			} else {
				clickfn()
			}
		}else{
			alert('请先登录！')
			setTimeout(() => {
				window.location.href = './component/login.html'+window.location.search
			}, 1000);
		}
		
	
		// if(window.LS.get('userInfo')){
		// 	// clickfn()
		// 	if(($('#zhuanye').val() == '') && ($(".item_check_zy").hasClass('active')) == false) {
		// 		alert('请选择专业！')
		// 		return false;
		// 	} else {
		// 		clickfn()
		// 	}
		// }
		// else{
		// 	if(M.dialog9){
		// 		return M.dialog9.show();
		// 	}
		// 	M.dialog9 = jqueryAlert({
		// 		'title'   : '中公教育',
		// 		'content' : '未登录，请先登录',
		// 		'modal'   : true,
		// 		'buttons' :{
		// 			'登录' : function(){
		// 				M.dialog9.close();
		// 				window.location.href = "./component/login.html"
		// 			},
		// 			'关闭' : function(){
		// 				M.dialog9.close();
		// 			}
		// 		}
		// 	})
		// }
		
	})
	// 专业按钮
	$('#zhuanye').blur(function() {
		if(($(this).val() != '') && ($(".item_check_zy").hasClass('active') == true)) {
			$(".item_check_zy").removeClass('active')
		}
	})
	
	$(".item_check_zy").click(function() {
	  $(this).toggleClass('active');
	  onswitch = !onswitch;
		if($(this).hasClass('active')) {
			$('#zhuanye').attr('disabled', true);
			$('#zhuanye').val('');
		} else {
			$('#zhuanye').attr('disabled', false);
		}
	})
	// 考试说明
	$('.direction_close,.direction_know').click(function() {
		$('.zg_direction').hide();
		$('.zg_cover').hide();
	})
	if(!window.sessionStorage.getItem('zg_direction')){
		$('.zg_direction').fadeIn();
		$('.zg_cover').fadeIn();
		//首页弹窗出现，使用sessionStorage加入缓存状态
		window.sessionStorage.setItem('zg_direction','true')
	  }	
})