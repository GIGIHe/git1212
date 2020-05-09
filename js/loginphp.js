

//验证是否登录
function Islogin() {

}
$(function(){

	//获取验证码
$("#getyzm").click(function(event) {
	var phone = $("#phone").val();
	if (!phone) {
		alert('请输入手机号！');
		return false;
	}
	var phone_re = /^13[\d]{9}$|^14[5,7]{1}\d{8}$|^15[^4]{1}\d{8}$|^17[0-9]{1}\d{8}$|^18[\d]{9}$|^19[\d]{9}$/;
	if (!phone_re.test(phone)) {
		alert('请输入正确的手机号！')
		return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/sendmsg?actid=13060&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: {phone: phone},
		success: function(data) {
			if (data.status=="1") {
				alert('正在发送请稍后')
				var sec = 120;
				$("#getyzm").text(sec+'s');
				var timer = setInterval(function (){
					sec--;
					$("#getyzm").text(sec+'s');
					if (sec<1) {
						$("#getyzm").text('发送验证码');
						clearInterval(timer);
					}
				}, 1000);
			} else {
				alert(data.msg);
			}
		}
	});
});
// 注册
$("#zhuce").click(function() {
	// var formid = $("#zcformid").val();
	var username = $("#username").val();
	var Myphone = $("#phone").val();
	var yzm = $("#yzm").val();
	var kslx = $("#kslx").val();
	var pass = $("#pass").val();
	var re_pass = $("#re-pass").val();
	var data_source = window.location.href;
	var fenxiao = $("#fenxiao").val();
	var geneal = $("#geneal").val();
	var activity_name = '考试匹配系统';
	if(username == '') { //验证用户名号是否为空
		alert('请填写用户名！')
		return false;
	}
	if(Myphone == '') { //验证手机号是否为空秒
		
		alert('请填写手机号！')
		return false;
	}
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请填写正确的手机号！')
		return false;
	}
	if(yzm == '') { //验证码是否为空
		alert('请填写验证码！')
		return false;
	}
	if(kslx == '') { //验证码是否为空
		alert('请选择考试类型！')
		return false;
	}
	if(pass == '') { //验证码是否为空
		alert('请设置密码！')
		return false;
	}
     var len = pass.length 
	if(len<6||len>10) {
		alert('请设置6-10位的密码！')
		return false;
	}
	if(re_pass == '') { //验证码是否为空 
		alert('请输入确认密码！')
		return false;
	}
	if(pass !== re_pass){
		alert('密码不一致！')
		  return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { phone: Myphone},
		success: function(data) {
             if(data.status == 1){
				alert('此手机号已经注册！')
			 }else if(data.status == 2){
				$.ajax({
					url: 'http://zg99.offcn.com/index/chaxun/register?actid=13060&callback=?',
					type: 'GET',
					dataType: 'jsonp',
					data: {name: username, phone: Myphone, yzm: yzm,password:pass,data_source:data_source,fenxiao:fenxiao, geneal:geneal,activity_name:activity_name},
					success: function(data) {
						if (data.status=="1") {
							alert('注册成功，去登陆！')
							 setTimeout(() => {
								window.location.href='login.html'
							 }, 1000);
							return false;
						} else {
							alert(data.msg);
						}
					}
		
				})
			 }else {
				alert(data.msg);
			}
			}
		})
	
})
//登录
$("#submit").click(function() {
	var Myphone = $("#phone1").val();
	var pass = $('#pass1').val()
	if(Myphone == '') { //验证手机号是否为空
		alert('请输入手机号');
		return false;
	}
	if(pass == '') { //验证手机号是否为空
		alert('请输入密码'); 
		return false;
	}
	
	var reg = /^0?1[3456789]\d{9}$/; //手机号正则
	if(!reg.test(Myphone)) { //验证手机号是否正确
		alert('请输入正确的手机号！');
		
		return false;
	}
	$.ajax({
		url: 'http://zg99.offcn.com/index/chaxun/getphonestatus?actid=13060&callback=?',
		type: 'GET',
		dataType: 'jsonp',
		data: { phone: Myphone},
		success: function(data) {
             if(data.status == 1){
				// console.log(data)
				var user = data.user
				if(data.user.password === pass ){
					$.ajax({
						url: 'http://zg99.offcn.com/index/chaxun/longin?actid=13060&callback=?',
						type: 'GET',
						dataType: 'jsonp',
						data: {
							password:pass,
							phone: Myphone
						},
						success: function(data) {
							if (data.status=="1") {
								alert("登录成功");
								window.LS.set('userInfo',JSON.stringify(user))
								// window.history.go(-1)
							} else {
								alert("请先注册，再登录");
							}
						}
				
					})
				}else{
					alert('密码错误！')
				}
			 }else if(data.status == 2){
				alert('此手机号未注册！')
			 }else{
				alert('data.msg')
			 }
			}
		})
})
$("#pass_fgot").click(function(){
	window.location.href = './reset.html'+window.location.search
})
})

