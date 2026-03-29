$(document).ready(function() {
	//返回头部
	$(function(){
		$(window).scroll(function(){
			if($(window).scrollTop()>200)
			$('.back').fadeIn('slow');	
			else
			$('.back').fadeOut('slow');	
		})	
		$('.back').click(function(){
			$('html,body').animate({scrollTop:0},600);	
		})
	});
	
	//导航
	mh = $('body').height();
	fh = $('.header').height();
	
	$(window).scroll(function(e){
		s = $(document).scrollTop();	
		if(s > fh){
			$('.header').addClass('fixed-head');		
		}else{
			$('.header').removeClass('fixed-head');
		}
	});
	
	//导航
	$(function() {
        $(".nav li").hover(function() {
            $(this).children(".navbox").stop(true, true).slideDown(500);
        }, function() {
            $(this).children(".navbox").stop(true, true).slideUp(0);
        })
    });

	
	//语言
	$(function() {
		 $(".language .top span").click(function(){
			$(this).parent().next("p").slideToggle("fast")
			})
		 $(".language .content a").click(function() {
			$(this).parent().hide().prev().find("span").text($(this).text());
		});
	})
	
	//  = 启用 Phone Nav = 
	$("#mmenu").mmenu({
		"header": true,
		"iconPanels": true,
		"navbar":{
			"title": "盛联仕"
		},
		"navbars":{
			"position": "top",
			"content": [
				"prev",
                "title",
                "close"
			]
		},
		"offCanvas": {
            "position": "top"
       	},
       	"footer": {
       		"add":true,
       		"content":"(c) 2016"
       	},
       	//autoHeight: true, 自动高度
		//counters: true, //显示子栏目数目
		"extensions" : [
			/*"effect-zoom-menu",*/
			"pageshadow",
			"theme-white", 	//主题 theme-dark theme-black theme-white theme-light (default)
			/*"effect-slide-listitems"*/
		]
	});

	//通用标签切换
	$('.tabSwitch').each(function(index, element) {
		var obj = $(this);
		obj.find('.tabTit').children().on('click tab',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			if (obj.find('.tabBox').children().eq($(this).index()).length > 0)
				obj.find('.tabBox').children().hide().eq($(this).index()).show();
			if (obj.find('.tabBox2').children().eq($(this).index()).length > 0)
				obj.find('.tabBox2').children().hide().eq($(this).index()).show();
			
			return false;
		});
		obj.find('.tabTit .cur').trigger('tab');
	});

	$('.tabSwitchHover').each(function(index, element) {
		var obj = $(this);
		obj.find('.tabTit').children().on('mouseover tab',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			if (obj.find('.tabBox').children().eq($(this).index()).length > 0)
				obj.find('.tabBox').children().hide().eq($(this).index()).show();
			if (obj.find('.tabBox2').children().eq($(this).index()).length > 0)
				obj.find('.tabBox2').children().hide().eq($(this).index()).show();
			
			//return false;
		});
		obj.find('.tabTit .cur').trigger('tab');
	});
});


function CheckContact(o){
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);
	
	var msg = ''; layer.closeAll('tips');
	var username = obj.find('[name="username"]').val(); 
	var email = obj.find('[name="email"]').val();
	var mobile = obj.find('[name="mobile"]').val();
	var companyname = obj.find('[name="companyname"]').val();
	var mess = obj.find('[name="mess"]').val();

	if (username.length < 1 || username.length > 100){
		msg = '*请输入姓名\r';
		obj.find('[name="username"]').parents('li').inputError({'err': msg, 'tips': 3, tipsMore: true});
	}

	if (mobile.length <= 0){
		msg = '*请输入手机号码\r';
		obj.find('[name="mobile"]').parents('li').inputError({'err': msg, 'tips': 3, tipsMore: true});
	}else if (!CheckMobile(mobile)){
		msg = '*请输入正确的手机号码\r';
		obj.find('[name="mobile"]').parents('li').inputError({'err': msg, 'tips': 3, tipsMore: true});
	}

	if (email.length > 0 && !CheckEmail(email)){
		msg = '*请输入正确的电子邮箱\r';
		obj.find('[name="email"]').parents('li').inputError({'err': msg, 'tips': 3, tipsMore: true});
	}

	if (mess.length <= 0){
		msg = '*请输入问题描述\r';
		obj.find('[name="mess"]').parents('li').inputError({'err': msg, 'tips': 3, tipsMore: true});
	}
	

	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);
		
		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: ' ',
			dataType: 'json',
			cache: false,
			data: {username:username, mobile:mobile, email:email, companyname:companyname, mess:mess, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了！');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);
				
				if (json.errmsg == ''){
					layer.alert(json.msg, {icon: 1});
					
					o.reset();
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}
	
	return false;
}

function CheckMobile(m){
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if (reg.test(m)) {
		return true;
	}
	
	return false;
}

function CheckEmail(m){
	var reg = /^([a-z0-9+_]|\-|\.)+@(([a-z0-9_]|\-)+\.)+[a-z]{2,6}$/;
	if (reg.test(m)) {
		return true;
	}
	
	return false;
}

function CheckSearch(o){
	obj = $(o);
	
	obj.find('[type="submit"]').attr('disabled',true);
	
	msg = '';
	
	searKey = obj.find('[name="searKey"]').val();
	if (searKey.length <= 0){
		msg += obj.find('[name="searKey"]').attr('placeholder')?obj.find('[name="searKey"]').attr('placeholder'):'请输入关键词\r';
	}
	
	if (msg.length){
		obj.find('[name="searKey"]').inputError({'err': msg, 'tips': 1});
		//layer.tips(msg, obj.find('[name="searKey"]'), {tips: [1, '#dd1721']});
		
		obj.find('[type="submit"]').attr('disabled',false);
		
		return false;
	}
	
	return true;
}

function CheckService(o){
	obj = $(o);
	
	obj.find('[type="submit"]').attr('disabled',true);
	
	msg = '';
	
	searKey = obj.find('[name="searKey"]').val();
	if (searKey.length <= 0){
		msg += obj.find('[name="searKey"]').attr('placeholder')?obj.find('[name="searKey"]').attr('placeholder'):'请输入关键词\r';
	}
	
	if (msg.length){
		obj.find('[name="searKey"]').inputError({'err': msg, 'tips': 1});
		//layer.tips(msg, obj.find('[name="searKey"]'), {tips: [1, '#dd1721']});
		
		obj.find('[type="submit"]').attr('disabled',false);
		
		return false;
	}else{
		$('#ajax_list').html('<h1 style="text-align: center; line-height:160px; font-weight:normal;">查询中...</h1>');
		$.ajax({
			type: 'POST',
			url: window.location.href,
			dataType: 'html',
			cache: false,
			data: {searKey:searKey, location:location.href, formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了！');
				return false;
			},
			success:function(data){
				$('[name="formhash"]').val($(data).find('[name="formhash"]').val());

				$('#ajax_list').html($(data).find('#ajax_list').html());

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}
	
	return false;
}

function CheckRencai(o){
	var obj = $(o);
	obj.find('[type="submit"]').attr('disabled',true);
	
	var msg = ''; layer.closeAll('tips');
	var username = obj.find('[name="username"]').val();
	var xingbie = obj.find('[name="xingbie"]').val();
	var mobile = obj.find('[name="mobile"]').val();
	var idcard = obj.find('[name="idcard"]').val();
	var age = obj.find('[name="age"]').val();
	var otherusername = obj.find('[name="otherusername"]').val();
	var guanxi = obj.find('[name="guanxi"]').val();
	var othermobile = obj.find('[name="othermobile"]').val();
	var xueli = obj.find('[name="xueli"]').val();
	var yixiang = obj.find('[name="yixiang"]').val();
	var yixiangmsg = obj.find('[name="yixiangmsg"]').val();
	var zhengshu = obj.find('[name="zhengshu"]').val();
	var zhengshumsg = obj.find('[name="zhengshumsg"]').val();

	if (username.length < 1 || username.length > 100){
		msg = '*请输入姓名\r';
		obj.find('[name="username"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}

	if (mobile.length <= 0){
		msg = '*请输入手机号码\r';
		obj.find('[name="mobile"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}else if (!CheckMobile(mobile)){
		msg = '*请输入正确的手机号码\r';
		obj.find('[name="mobile"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}

	if (!validateIdCard(idcard)){
		msg = '*请输入正确的身份证号码\r';
		obj.find('[name="idcard"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}

	if (otherusername.length < 1 || otherusername.length > 100){
		msg = '*请输入紧急联系人姓名\r';
		obj.find('[name="otherusername"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}
	if (guanxi.length < 1 || guanxi.length > 100){
		msg = '*请输入与本人关系\r';
		obj.find('[name="guanxi"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}
	if (othermobile.length <= 0){
		msg = '*请输入紧急联系人手机号码\r';
		obj.find('[name="othermobile"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}else if (!CheckMobile(othermobile)){
		msg = '*请输入正确的紧急联系人手机号码\r';
		obj.find('[name="othermobile"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}

	if (yixiang == 5 && yixiangmsg.length < 1){
		msg = '*请输入意向职位\r';
		obj.find('[name="yixiangmsg"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}
	if (zhengshu == 3 && zhengshumsg.length < 1){
		msg = '*请输入相关证书\r';
		obj.find('[name="zhengshumsg"]').inputError({'err': msg, 'tips': 2, tipsMore: true});
	}
	

	if (msg.length){
		obj.find('[type="submit"]').attr('disabled',false);
		
		return false;
	}else{
		$.ajax({
			type: 'POST',
			url: '/ajax',
			dataType: 'json',
			cache: false,
			data: {username:username, xingbie:xingbie, mobile:mobile, idcard:idcard, age:age, otherusername:otherusername, guanxi:guanxi, othermobile:othermobile, xueli:xueli, yixiang:yixiang, yixiangmsg:yixiangmsg, zhengshu:zhengshu, zhengshumsg:zhengshumsg, location:location.href, act:obj.find('[name="act"]').val(), formhash:obj.find('[name="formhash"]').val()},
			error: function(){
				alert('出错了！');
				return false;
			},
			success:function(json){
				$('[name="formhash"]').val(json.formhash);
				
				if (json.errmsg == ''){
					layer.alert(json.msg, {icon: 1});
					
					o.reset();
				}else{
					layer.alert(json.errmsg, {icon: 2});
				}

				obj.find('[type="submit"]').attr('disabled',false);
			}
		});
	}
	
	return false;
}

function validateIdCard(idCard) {  
    //15位和18位身份证号码的正则表达式  
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;  
    //如果通过该验证，说明身份证格式正确，但准确性还需计算  
    if (regIdCard.test(idCard)) {  
        if (idCard.length == 18) {  
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里  
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组  
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和  
            for (var i = 0; i < 17; i++) {  
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];  
            }  
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置  
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码  
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X  
            if (idCardMod == 2) {  
                if (idCardLast == "X" || idCardLast == "x") {  
                    return true;  
                    //alert("恭喜通过验证啦！");  
                } else {  
                    return false;  
                    //alert("身份证号码错误！");  
                }  
            } else {  
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码  
                if (idCardLast == idCardY[idCardMod]) {  
                    //alert("恭喜通过验证啦！");  
                    return true;  
                } else {  
                    return false;  
                    //alert("身份证号码错误！");  
                }  
            }  
        }  
    } else {  
        //alert("身份证格式不正确!");  
        return false;  
    }  
}  

jQuery.fn.extend({
	inputError: function(options) {
		return this.each(function() {
			new jQuery.inputError(this, options);
		});
	}
});
jQuery.inputError = function(inputobj, options) {
	var opt = options || {};
	opt.class = opt.class || 'inputerror';
	opt.err = opt.err || '';
	opt.tips = opt.tips || 2;
	opt.tipsMore = opt.tipsMore || false;

	var obj = $(inputobj);
	if (!obj.data('placeholder')){
		obj.data('data-placeholder', obj.attr('placeholder'));
		obj.attr('placeholder', opt.err?opt.err:obj.data('placeholder'));
	}
	obj.removeClass(opt.class).addClass(opt.class);
	//小tips
	layer.tips(opt.err, obj, {tips: [opt.tips, '#dd1721'], tipsMore: opt.tipsMore});

	obj.unbind('focus').focus(function(event) {
		$(this).removeClass(opt.class);
		//obj.attr('placeholder', obj.data('placeholder'));
	});
	obj.unbind('blur').blur(function(event) {
		$(this).removeClass(opt.class);
		obj.attr('placeholder', obj.data('placeholder'));
	});

	if (obj.get(0).tagName!='INPUT' && obj.get(0).tagName!='TEXTAREA' && !obj.data('bindClick')){
		obj.click(function(event) {
			$(this).removeClass(opt.class);
			obj.attr('placeholder', obj.data('placeholder'));
		});
		obj.children().click(function(){obj.click()});
		obj.data('bindClick',true);
	}
};


   //波浪动画
$(function() {
    var marqueeScroll = function(id1, id2, id3, timer) {
        var $parent = $("#" + id1);
        var $goal = $("#" + id2);
        var $closegoal = $("#" + id3);
        $closegoal.html($goal.html());
        function Marquee() {
            if (parseInt($parent.scrollLeft()) - $closegoal.width() >= 0) {
                $parent.scrollLeft(parseInt($parent.scrollLeft()) - $goal.width());
            } else {
                $parent.scrollLeft($parent.scrollLeft() + 1);
            }
        }
        setInterval(Marquee, timer);
    }

    var marqueeScroll1 = new marqueeScroll("marquee-box", "wave-list-box1", "wave-list-box2", 20);
    var marqueeScroll2 = new marqueeScroll("marquee-box3", "wave-list-box4", "wave-list-box5", 40);

});

