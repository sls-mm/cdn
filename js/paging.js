$(function () {
 
   
     var canshu = window.location.href.split("=")[1];
     const url = new URL(window.location.href);

// 获取参数
console.log(url.searchParams.get("search")); 
console.log(url.searchParams.get("pitch"));

     if(canshu==""||window.location.href.indexOf("search")==-1)
  {


     var $oResultBox = $('#resultBox');
    var books = data.books;

    $('#paging').paging({
        nowPage: 1, allPages: Math.ceil(data.count / 20), displayPage: 21, callBack: function (now) {
            var currentPages = now * 20 < books.length ? 20: books.length - (now - 1) *20;
           
            $oResultBox.html('');
            for (var i = 0; i < currentPages; i++) {
                var num = (now - 1) * 20 + i;
                var create_dl = $('<div></div>');
                var  _html = 
                  '<div class="hb_a"><div class="b_men"><a href='+books[num].url+
                  ' class="s22" style=""><p style="text-align: center;color:white;">'+books[num].title+
                  ' Series</br>'+books[num].type+'</p>'+'<p style="float:left;font-size: 0.8rem;color:white;">'+'<span style="font-size: 1rem;font-weight:bold;">Features</span><br>Current Rating：'+
                    books[num].current+'<br>Number of Positions：'+books[num].poles+'<br>Applicable wires：'+books[num].wirerange+'<br>Alternative：'+books[num].equivalent+'<br></p></a>'+
                   '<div class="bm_con"><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/more.svg">&nbspMore +</a></div><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf1.svg">&nbspDrawing</a></div><div class="bm_l"><a href='+books[num].url+
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf1.svg">&nbspSPEC</a></div></div></div>'+
                   '<p class="hc_tit s22" style="text-align: center;color:white;background-image: url(./templates/2019/images/pt_bggreen.png);">'+books[num].title+
                  ' Series</br>'+books[num].type+'</p><div class="hb_i"><img src='+books[num].imgurl+' alt='+books[num].type+'/></div></div>'


                       

                
                $oResultBox.append(_html);
            }
        }
    });
   

  }

 

else {
var $oResultBox = $('#resultBox');
    var books = data.books;
    $oResultBox.html('');  
    if(canshu.indexOf(',')!=-1){
        var can= canshu.split(",");
        console.log(can);
        for(var k = 0; k < can.length; k++){
 for (var i = 0; i < data.count; i++) {
      
        if(books[i].pitch.indexOf(can[k])!=-1||books[i].pitchs.indexOf(can[k])!=-1||books[i].title.indexOf(can[k])!=-1||books[i].types.indexOf(can[k])!=-1||books[i].type.indexOf(can[k])!=-1||books[i].equivalent.toLowerCase().indexOf(can[k].toLowerCase())!=-1){
                var num = i;
                var create_dl = $('<div></div>');
                
               var  _html = 
                  '<div class="hb_a"><div class="b_men"><a href='+books[num].url+
                  ' class="s22" style=""><p style="text-align: center;color:white;">'+books[num].pitchs+
                  '</br>33'+books[num].type+'</p>'+'<p style="float:left;font-size: 0.8rem;color:white;">'+'Features<br>'+
                    books[num].current+'<br>'+books[num].poles+'<br>'+books[num].wirerange+'<br>'+books[num].equivalent+'<br></p></a>'+
                   '<div class="bm_con"><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/more11.png">More +</a></div><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">Drawing</a></div><div class="bm_l"><a href='+books[num].url+
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">SPEC</a></div></div></div>'+
                   '<p class="hc_tit s22" style="text-align: center;color:white;background-image: url(./templates/2019/images/pt_bggreen.png);">'+books[num].pitchs+
                  '</br>'+books[num].type+'</p><div class="hb_i"><img src='+books[num].imgurl+' alt='+books[num].type+'/></div></div>'


                       

                
                $oResultBox.append(_html);

            }
        }

        }

    }

   
  else{
  
     for (var i = 0; i < data.count; i++) {
      
        if(books[i].pitch.indexOf(canshu)!=-1||books[i].pitchs.indexOf(canshu)!=-1||books[i].title.indexOf(canshu)!=-1||books[i].typel.indexOf(canshu)!=-1||books[i].types.indexOf(canshu)!=-1
            ||books[i].type.indexOf(canshu)!=-1){
                var num = i;
                var create_dl = $('<div></div>');
                
            var  _html = 
                  '<div class="hb_a"><div class="b_men"><a href='+books[num].url+
                  ' class="s22" style=""><p style="text-align: center;color:white;">'+books[num].pitchs+
                  '</br>11'+books[num].type+'</p>'+'<p style="float:left;font-size: 0.8rem;color:white;">'+'Features<br>'+
                    books[num].current+'<br>'+books[num].poles+'<br>'+books[num].wirerange+'<br>'+books[num].equivalent+'<br></p></a>'+
                   '<div class="bm_con"><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/more11.png">More +</a></div><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">Drawing</a></div><div class="bm_l"><a href='+books[num].url+
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">SPEC</a></div></div></div>'+
                   '<p class="hc_tit s22" style="text-align: center;color:white;background-image: url(./templates/2019/images/pt_bggreen.png);">'+books[num].pitchs+
                  '</br>'+books[num].type+'</p><div class="hb_i"><img src='+books[num].imgurl+' alt='+books[num].type+'/></div></div>'


                       

                
                $oResultBox.append(_html);
               
            }
                  for(var j = 0; j < books[i].equivalent.toLowerCase().split(' ').join('/').split('/').length; j++) {
                    var  searchvalue=canshu.toLowerCase();
                    // if(searchvalue.indexOf("molex")!=-1&&searchvalue!='molex'){
                    //     searchvalue=searchvalue.replace('molex','');
                    // }
        if(books[i].equivalent.toLowerCase().split(' ').join('/').split('/')[j].indexOf(searchvalue)!=-1&&books[i].equivalent!=''){
                var num = i;
                var create_dl = $('<div></div>');
                
             var  _html = 
                  '<div class="hb_a"><div class="b_men"><a href='+books[num].url+
                  ' class="s22" style=""><p style="text-align: center;color:white;">'+books[num].pitchs+
                  '</br>22'+books[num].type+'</p>'+'<p style="float:left;font-size: 0.8rem;color:white;">'+'Features<br>'+
                    books[num].current+'<br>'+books[num].poles+'<br>'+books[num].wirerange+'<br>'+books[num].equivalent+'<br></p></a>'+
                   '<div class="bm_con"><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/more11.png">More +</a></div><div class="bm_l"><a href='+books[num].url+ 
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">Drawing</a></div><div class="bm_l"><a href='+books[num].url+
                   ' class="bm_u s14"><img src="./templates/2019/images/pdf.svg">SPEC</a></div></div></div>'+
                   '<p class="hc_tit s22" style="text-align: center;color:white;background-image: url(./templates/2019/images/pt_bggreen.png);">'+books[num].pitchs+
                  '</br>'+books[num].type+'</p><div class="hb_i"><img src='+books[num].imgurl+' alt='+books[num].type+'/></div></div>'


                       

                
                $oResultBox.append(_html);

            }

           } 
            
           
          }


         
         

 }
 




}

   
if(canshu=='battery')
       {
       $('.spa_fen').html('电池连接器');

}



// window.onload=function(){


// }
})


;(function ($, window, document, undefined) {
    var Paging = function (elem, options) {
        var self = this;
        this.$oPaging = elem;
        this.$oFirst = this.$oPaging.find('.first');
        this.$oLast = this.$oPaging.find('.last');
        this.$oPrev = this.$oPaging.find('.prev');
        this.$oNext = this.$oPaging.find('.next');
        this.$oList = this.$oPaging.find('.list');
        this.$aItem = this.$oList.find('li');
        this.$oGo = this.$oPaging.find('.go');
        this.$oGo_text = this.$oGo.find('input');
        this.$oGo_btn = this.$oGo.find('button');
        this.defaults = {nowPage: 1, allPages: 10, displayPage: 5};
        this.opts = $.extend({}, this.defaults, options);
        this.nowPage = this.opts.nowPage;
        this.allPages = this.opts.allPages;
        this.displayPage = this.opts.displayPage > this.allPages ? this.opts.displayPage = this.allPages : this.opts.displayPage;
        this.iNum = this.nowPage;
        this.min_halfPage = Math.floor(this.displayPage / 2);
        this.big_halfPage = Math.ceil(this.displayPage / 2);
    };
    Paging.prototype = {
        clickFn: function () {
            this.cleanClassName();
            this.setPaging(this.iNum);
            this.detectionPage(this.iNum);
            this.opts.callBack && this.opts.callBack(this.iNum);
            scrollTo('#divtop',0,300);
        }, cleanClassName: function () {
            this.$aItem.removeClass('cur');
        }, detectionPage: function (currentPage) {
            if (currentPage >= this.big_halfPage + 1) {
                this.$oFirst.removeClass('disable');
            } else {
                this.$oFirst.addClass('disable');
            }
            if ((this.allPages - currentPage) >= this.big_halfPage) {
                this.$oLast.removeClass('disable');
            } else {
                this.$oLast.addClass('disable');
            }
            if (currentPage > 1) {
                this.$oPrev.removeClass('disable');
            } else {
                this.$oPrev.addClass('disable');
            }
            if (currentPage < this.allPages) {
                this.$oNext.removeClass('disable');
            } else {
                this.$oNext.addClass('disable');
            }
        }, setPaging: function (currentPage) {
            this.$aItem = this.$oList.find('li');
            for (var i = 1; i <= this.displayPage; i++) {
                if (currentPage <= this.min_halfPage) {
                    this.$aItem.eq(i - 1).text(i).attr('index', '#' + i);
                    for (var j = 1; j <= this.min_halfPage; j++) {
                        if (currentPage === j && i === j) {
                            this.$aItem.eq(i - 1).addClass('cur');
                        }
                    }
                } else if ((this.allPages - currentPage) < this.min_halfPage) {
                    var nowNum = this.allPages - this.displayPage + i;
                    this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);
                    for (var j = 0; j < this.min_halfPage; j++) {
                        if ((this.allPages - currentPage) === j && i === this.displayPage - j) {
                            this.$aItem.eq(i - 1).addClass('cur');
                        }
                    }
                } else {
                    var nowNum = currentPage - this.big_halfPage + i;
                    if (i === this.big_halfPage) {
                        this.$aItem.eq(i - 1).addClass('cur');
                    }
                    this.$aItem.eq(i - 1).text(nowNum).attr('index', '#' + nowNum);
                }
            }
        }, initalPaging: function () {
            for (var i = 1; i <= this.displayPage; i++) {
                var $create_li = $('<li></li>');
                $create_li.text(i).attr('index', '#' + i);
                this.$oList.append($create_li);
            }
            if (this.allPages <= this.displayPage) {
                this.$aItem.eq(this.nowPage - 1).addClass('cur');
            } else {
                this.$oGo.css({display: 'inline-block'});
                this.$oGo_text.attr('placeholder', 'Total: ' + this.allPages);
            }
            this.setPaging(this.nowPage);
            this.detectionPage(this.nowPage);
        }, inital: function () {
            var self = this;
            this.initalPaging();
            this.opts.callBack && this.opts.callBack(this.iNum);
            this.$aItem.click(function () {
                if (!$(this).hasClass('cur')) {
                    self.iNum = parseInt($(this).attr('index').substring(1));
                    self.clickFn();
                }
            });
            this.$oFirst.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum = 1;
                    self.clickFn();
                }
            });
            this.$oLast.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum = self.allPages;
                    self.clickFn();
                }
            });
            this.$oPrev.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum--;
                    self.clickFn();
                }
            });
            this.$oNext.click(function () {
                if (!$(this).hasClass('disable')) {
                    self.iNum++;
                    self.clickFn();
                }
            });
            this.$oGo_btn.click(function () {
                var value = self.$oGo_text.val();
                var reg = new RegExp(/^[0-9]*[1-9][0-9]*$/);
                if (value !== '' && reg.test(value) && value <= self.allPages) {
                    self.iNum = parseInt(value);
                    self.clickFn();
                    self.$oGo_text.val('')
                } else {
                    self.$oGo_text.val('')
                }
            });
        }, constructor: Paging
    };
    $.fn.paging = function (options) {
        var paging = new Paging(this, options);
        return paging.inital();
    };
})(jQuery, window, document, undefined);