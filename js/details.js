$(document).ready(function () {
    var str = window.location.href;
    
    var arrstr = window.location.href.split("=")
    
    var canshu = window.location.href.split("=")[1];
    // Mobile Nav toggle
 var books = data.books;
    
    
 
 
 
 function getEnglishChars(str) {
  const input = typeof str === 'string' ? str : String(str);
  // 匹配英文字母和空格，拼接结果（无匹配时返回空）
  return (input.match(/[a-zA-Z\s]/g) || []).join('');
}
   // 初始化变量
        let mainSwiper, thumbnailSwiper;
        let mainSlides = '';
        let thumbnailSlides = '';

        // 获取URL参数（如：http://xxx.com/?id=abc → "abc"）
        function getUrlParam() {
            try {
                // 分割URL获取参数部分（兼容哈希模式）
                const paramValue = window.location.href.split("=")[1];
                return paramValue ? paramValue.toLowerCase() : '';
            } catch (e) {
                console.error('获取URL参数失败：', e);
                return '';
            }
        }

        // 处理数据并生成轮播项（只处理符合条件的books）
        function processDataAndGenerateSlides() {
            // 获取URL参数作为匹配条件
            const targetName = getUrlParam();
            if (!targetName) {
                $('.mypic').html('<div class="no-data">未找到匹配的参数</div>');
                return;
            }

            // 外层循环：遍历data.count
            for (let i = 0; i < data.count; i++) {
                // 安全检查：确保books[i]存在且有name属性
                if (!books || !books[i] || !books[i].name) continue;

                // 核心条件：只处理name匹配的项（不区分大小写）
                if (books[i].name.toLowerCase() !== targetName) {
                    continue; // 不匹配则跳过当前项
                }

                // 1. 添加当前books[i]的主图
                const mainImgUrl = books[i].imgurl;
                if (mainImgUrl) {
                    const slideHtml = `
                        <div class="swiper-slide">
                            <img src="${mainImgUrl}" alt="${books[i].name}" />
                        </div>
                    `;
                    mainSlides += slideHtml;
                    thumbnailSlides += slideHtml;
                }

                // 2. 内层循环：遍历member数组
                if (books[i].member && books[i].member.length) {
                    for (let j = 0; j < books[i].member.length; j++) {
                        const memberImgUrl = `${books[i].img}${books[i].member[j]}.png`;
                        const memberSlideHtml = `
                            <div class="swiper-slide">
                                <img src="${memberImgUrl}" alt="${books[i].name}-${books[i].member[j]}" />
                            </div>
                        `;
                        mainSlides += memberSlideHtml;
                        thumbnailSlides += memberSlideHtml;
                    }
                }
            }

            // 处理无匹配数据的情况
            if (!mainSlides) {
                $('.mypic').html('<div class="no-data">未找到匹配的图片</div>');
                $('.mypic2').html('');
                return;
            }

            // 一次性添加到DOM
            $('.mypic').html(mainSlides);
            $('.mypic2').html(thumbnailSlides);

            // 更新总数显示
            const total = $('.mypic .swiper-slide').length;
            $('.total-slides').text(total);
        }

        // 初始化轮播（只有在有数据时才初始化）
        function initSwipers() {
            const totalSlides = $('.mypic .swiper-slide').length;
            if (totalSlides === 0) return;

            // 缩略图轮播
            thumbnailSwiper = new Swiper('.thumbnail-swiper', {
                slidesPerView: 3,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.thumbnail-swiper .swiper-button-next',
                    prevEl: '.thumbnail-swiper .swiper-button-prev',
                },
                watchSlidesProgress: true
            });

            // 主轮播（与缩略图联动）
            mainSwiper = new Swiper('.main-swiper', {
                slidesPerView: 1,
                navigation: {
                    nextEl: '.main-swiper .swiper-button-next',
                    prevEl: '.main-swiper .swiper-button-prev',
                },
                thumbs: {
                    swiper: thumbnailSwiper
                },
                on: {
                    slideChange: function() {
                        $('.current-slide').text(this.activeIndex + 1);
                    }
                }
            });
        }

        // 初始化放大镜
        function initMagnifier() {
            const $container = $('.main-swiper-container');
            const $magnifier = $('.magnifier');

            $container.mousemove(function(e) {
                const $activeImg = $('.main-swiper .swiper-slide-active img');
                if (!$activeImg.length) return;

                const containerOffset = $(this).offset();
                const x = e.pageX - containerOffset.left;
                const y = e.pageY - containerOffset.top;
                const imgSrc = $activeImg.attr('src');
                const containerWidth = $(this).width();
                const containerHeight = $(this).height();

                let magX = x - $magnifier.width() / 2;
                let magY = y - $magnifier.height() / 2;
                magX = Math.max(0, Math.min(magX, containerWidth - $magnifier.width()));
                magY = Math.max(0, Math.min(magY, containerHeight - $magnifier.height()));

                $magnifier.css({
                    left: `${magX}px`,
                    top: `${magY}px`,
                    backgroundImage: `url(${imgSrc})`,
                    backgroundSize: `${containerWidth * 2}px ${containerHeight * 2}px`,
                    backgroundPosition: `-${x * 2}px -${y * 2}px`,
                    display: 'block'
                });
            }).mouseleave(function() {
                $magnifier.hide();
            });
        }

        // 页面加载完成后执行
        $(document).ready(function() {
            processDataAndGenerateSlides();
            initSwipers();
            initMagnifier();
        });


 
   
       for (var i = 0; i < data.count; i++) {
        if(books[i].name.toLowerCase()==canshu.toLowerCase()){
            // let htmlpic="";
            // htmlpic+='<div class="swiper-slide"><img src='+books[i].imgurl+ ' /></div>';
            
            // $(".mypic").html(htmlpic);
            // $(".mypic2").html(htmlpic);
            // for (var j = 0; j < books[i].member.length; j++) {
            // var html="";
            // html+='<div class="swiper-slide"><img src='+books[i].img +books[i].member[j]+'.png /></div>';
            
            // $(".mypic").append(html);
            // $(".mypic2").append(html);
            //  } 
             

        // $(".total-slides").html(books[i].member.length);
           for (var j = 0; j < books[i].member.length; j++) {
            
          
            var html="";
            html+='<li><a href='+'../'+books[i].pdfurl1 +' download><img style="width: 32px;height: 32px;" src="./templates/2019/images//pdf.png" /> '+ 'Product Series drawings（产品系列图纸）</a></li>';
            html+='<div style="margin-bottom: 20px;"></div>';
            html+='<li><a href='+'../'+books[i].pdfurl1 +' download><img style="width: 32px;height: 32px;" src="./templates/2019/images//pdf.png" /> '+ 'Package drawings（包装规范）</a></li>';
            html+='<div style="margin-bottom: 20px;"></div>';
            html+='<li><a href='+'../'+books[i].pdfurl1 +' download><img style="width: 32px;height: 32px;" src="./templates/2019/images//pdf.png" /> '+ 'SPEC（规格书）</a></li>';
            $(".pro-links").html(html);
            var html="";
            html+='<span>'+ books[i].title +'&nbsp Series</span>';
            $(".product-details .product-name").html(html);
            $(".breadcrumb-tree .active").html(html);
            var html="";
            // html+='<div class="wrapper"><canvas width="390" height="390"></canvas></div>';
            html+='<img src='+books[i].imgurl +' />';
            $("#product-main-img .product-preview").html(html);
            $(".small-img").html(html);
            var html="";
            html+='<a href='+'../'+ books[i].typeurl +' style="color:#15ae2f; font-size: 1.25rem;font-weight: bold;" >'+ books[i].pitchs+ '&nbsp'+books[i].type  +'</a>';
            
             $(".product-links").html(html);
             var path='';
             path+='../img/canshu/'+ books[i].name.toLowerCase().replace("-","") +'.png';
            $(".product-details img").attr('src',path);
            var html="";
         
            html+='<img src='+books[i].imgurl +' width='+'500' +'height='+'500'+'alt=' +'web design'+' />';
            $("#ex1").html(html);    
            var html="";
         
            html+='<div class="table-container"><table class="complex-tab">';
         
          html+='<thead><tr><th colspan="2">Specifications（基本参数）</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Number of Positions（位数）</strong></td>';
          html+='<td>'+books[i].poles+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Alternative（相容性）</strong></td>';
          html+='<td>'+books[i].equivalent+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Product drawings（产品图纸）</strong></td>';
          html+='<td style="padding: 8px; border: 1px solid #ccc;color: #15AE2F;"><i class="fa fa-download " ><a href='+books[i].pdfurl1+'target="_blank" rel="noopener noreferrer" style="color: #15AE2F;">&nbsp;'+books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF'+'</a></td>';
          html+='</tr>';
          $(".product-spec").html(html);    


          if(books[i].poles.indexOf(";")!=-1&&books[i].row=='1'){
              var  ppoles=books[i].poles.split(";")[0];
              var  ppoles1=books[i].poles.split(";")[1];
              var  ppoles2=books[i].poles.split(";")[2];
            }
          if(books[i].poles.indexOf(";")==-1&&books[i].row=='1'){
            var  ppoles=books[i].poles.split(";")[0];
           }
           if(books[i].row=='1'||books[i].row=='2'||books[i].row=='3'){
            var  ppoles=books[i].poles.split(";")[0];
           }

           if(books[i].row=='1'){
            var  prow='';
            
           }
           if(books[i].row=='2'){
            var  prow='2*';
           }
          
          if(books[i].row=='3'){
            var  prow='3*';
           }
          
            if(books[i].name.indexOf("DOUBLE")!=-1){
            var  pname=books[i].name.replace("DOUBLE","");
            var ptype="";
           }
          if(books[i].name.indexOf("-H")!=-1){
            var  pname=books[i].name.replace("-H","");
            var ptype="";
           }
           if(books[i].name.indexOf("-C")!=-1){
            var  pname=books[i].name.replace("-C","");
            var ptype="";
           }
           if(books[i].name.indexOf("LK")!=-1||books[i].name.indexOf("ZK")!=-1||books[i].name.indexOf("DK")!=-1||books[i].name.indexOf("XK")!=-1){
                var  pname=books[i].name.split("-")[0];
                var ptype=books[i].name.split("-")[1];
           }
            if(books[i].name.indexOf("DOUBLE")==-1&&books[i].name.indexOf("-H")==-1&&books[i].name.indexOf("-C")==-1&&books[i].name.indexOf("LK")==-1&&books[i].name.indexOf("ZK")==-1&&books[i].name.indexOf("DK")==-1&&books[i].name.indexOf("XK")==-1){
            var  pname=books[i].name;
            var ptype="";
           } 
          
          
        if(books[i].member[j].startsWith('S')&&books[i].member[j]=='S'){
             
          var html="";
          html+='<li class="clearfix"><div class="result-thumb-col"><div class="container"><div class="bq"></div>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><img  src='+books[i].img +books[i].member[j]+'.png'+' alt=""></a></div>';
          html+='<p class="dettitle">Retainer-'+ books[i].pitchs +' Pitchs，TPA Retainer</p>';
          html+='<div class="pn-caption" ><span style="display: block;margin-bottom:0.6rem;">Part No.（料号）:' +' </span><div style="background-color: orange;width: auto; display: inline-block;color:#fff;padding:3px;border-radius: 3px;">'+books[i].title+'-S'+'<span id="resultDisplays'+j+'" ></span></div></div>'+'<ul class="down"><li>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><i class="fa fa-download fa-2x" ><span> Product drawings&nbsp;&nbsp;PDF</span></i></a></li><li>';
          html+='<a href='+ '../'+books[i].pdfurl1 +' target="_blank"><i class="fa fa-download fa-2x" ><span> '+ books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF</span>';
          html+='</i></a></li></ul></div>';
          html+='<div class="table-container"><table class="complex-table">';
         
           html+='<thead><tr><th colspan="2">规格参数</th><th colspan="2">材料/电气参数</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Product System（产品系统）</strong></td>';
          html+='<td>'+books[i].type+'</td>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Style（类别）</strong></td>';
          html+='<td>'+'Retainer（锁片）'+'</td>';
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Row Option（排数）</strong></td>';
          html+='<td><select class="dynamic-select" id="rows'+j+'Select" >';
          html+='<option value='+books[i].rowb[1]+'>'+books[i].rowb[0]+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Number of Positions（位数）</strong></td>';
          html+='<td><select class="dynamic-select" id="poles'+j+'Select" >';
          for (var l = 0; l < books[i].pole.length; l++) {;
          html+='<option value='+books[i].pole[l]+'>'+books[i].pole[l]+'</option>';}
          html+='</select></td>';
          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          
          html+='</tr>';
          html+='<tr>';
           html+='<td><strong>Orientation（方向）</strong></td>';
          html+='<td>'+books[i].orientb+'</td>';

          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Color（颜色）</strong></td>';
          html+='<td><select class="dynamic-select" id="colors'+j+'Select" >';
          for (var l = 0; l < books[i].colorb.length; l++) {;
          html+='<option value='+books[i].colorc[l]+'>'+books[i].colorb[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Material-Resin（树脂材质）</strong></td>';
          html+='<td><select class="dynamic-select" id="maters'+j+'Select" >';
          for (var l = 0; l < books[i].matera.length; l++) {
          html+='<option value='+books[i].smatera[l]+'>'+books[i].smaterb[l]+'</option>';}
          html+='</select></td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special No.（结构特征）</strong></td>';
          html+='<td><select class="dynamic-select" id="specials'+j+'Select" >';
          for (var l = 0; l < books[i].scodeb.length; l++) {
          html+='<option value='+books[i].scodec[l]+'>'+books[i].scodeb[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Packaging（包装）</strong></td>';
          html+='<td>'+books[i].packb[1]+'</td>';
          html+='</tr>';
          
          html+='<tfoot><tr><td colspan="4" class="note">注：可以根据选项选择对应的料号</td></tr></tfoot>';



          $(".search-pro .mydet").append(html);
          
            // 1. 通过字符串拼接生成对应ID
            const rowsId = `rows${j}Select`;    
            const polesId = `poles${j}Select`;  
            const specialsId = `specials${j}Select`;    
            const matersId = `maters${j}Select`;  
            const colorsId = `colors${j}Select`; 
            const resultsId = `resultDisplays${j}`;    
            
            // 2. 获取对应元素
            const rowsElem = document.getElementById(rowsId);
            const polesElem = document.getElementById(polesId);
            const specialsElem = document.getElementById(specialsId);
            const matersElem = document.getElementById(matersId);
            const colorsElem = document.getElementById(colorsId);
            const resultsElem = document.getElementById(resultsId);
            
        
            

        function updateResults() {
            
                resultsElem.textContent = `${rowsElem.value}${polesElem.value}${specialsElem.value}${matersElem.value}${colorsElem.value}`;
          
              }

        rowsElem.addEventListener('change', updateResults);
        polesElem.addEventListener('change', updateResults);
        specialsElem.addEventListener('change', updateResults);
        matersElem.addEventListener('change', updateResults);
        colorsElem.addEventListener('change', updateResults);
        
        updateResults(); // 初始化显示

        }
 
         

        if(books[i].member[j].startsWith('T')){
               if(books[i].member[j].includes('M')){
            
            var htmt='"M">Male（公）';
            var gendert='Male';
            var orientt='"">Vertical(180°)';
            }
            else if(books[i].member[j].includes('V')){
            
            var htmt='"M">Male（公）';
            var gendert='Male';
            var orientt='"V">Vertical(180°)';
            }
            else if(books[i].member[j].includes('F')){
               
               var htmt='"F">Female（母）';
               var gendert='Female';
               var orientt='"">Vertical(180°)';
            }
            else if(books[i].member[j].includes('R')){
               
               var htmt='"F">Female（母）';
               var gendert='Female';
               var orientt='"R">Right Angle(90°)';
            }
           else{
           var htmt='"F">Female（母）';
               var gendert='Female';
               var orientt='"">Vertical(180°)';
           }    
          var html="";
          html+='<li class="clearfix"><div class="result-thumb-col"><div class="container"><div class="bq"></div>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><img  src='+books[i].img +books[i].member[j]+'.png'+' alt=""></a></div>';
          html+='<p class="dettitle">Terminal-'+ books[i].pitchs +' Pitchs，'+gendert+' Terminal</p>';
          html+='<div class="pn-caption" ><span style="display: block;margin-bottom:0.6rem;">Part No.（料号）:' +' </span><div style="background-color: orange;width: auto; display: inline-block;color:#fff;padding:3px;border-radius: 3px;">'+books[i].title+'-T'+'<span id="resultDisplayt'+j+'" ></span></div></div>'+'<ul class="down"><li>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><i class="fa fa-download fa-2x" ><span> Product drawings&nbsp;&nbsp;PDF</span></i></a></li><li>';
          html+='<a href='+ '../'+books[i].pdfurl1 +' target="_blank"><i class="fa fa-download fa-2x" ><span> '+ books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF</span>';
          html+='</i></a></li></ul></div>';
          html+='<div class="table-container"><table class="complex-table">';
         
          html+='<thead><tr><th colspan="2">规格参数</th><th colspan="2">材料/电气参数</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Product System（产品系统）</strong></td>';
          html+='<td>'+books[i].type+'</td>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Style（类别）</strong></td>';
          html+='<td>'+'Terminal（端子）'+'</td>';
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Gender（性别）</strong></td>';
          html+='<td><select class="dynamic-select" id="gendert'+j+'Select" >';
          html+='<option value='+htmt+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          

          html+='<td><strong>Orientation（方向）</strong></td>';
          html+='<td><select class="dynamic-select" id="orientt'+j+'Select" >';
          html+='<option value='+orientt+'</option>';
          html+='</select></td>'; 

          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Applicable wires（适用电线范围）</strong></td>';
          html+='<td>'+books[i].wirerange+'</td>';
          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>线径（O.D.）</strong></td>';
          html+='<td>'+books[i].wireod+'</td>';
          html+='<td><strong>Material-Contact（触点材质）</strong></td>';
           html+='<td><select class="dynamic-select" id="materialt'+j+'Select" >';
          for (var l = 0; l < books[i].materpin_tb.length; l++) {;
          html+='<option value='+books[i].materpin_ta[l]+'>'+books[i].materpin_tb[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Mounting Method（安装方式）</strong></td>';
          html+='<td>'+books[i].mountd+'</td>';
          html+='<td><strong>Plating（电镀类型）</strong></td>';
          html+='<td><select class="dynamic-select" id="finisht'+j+'Select" >';
          for (var l = 0; l < books[i].tmaterb.length; l++) {;
          html+='<option value='+books[i].tmatera[l]+'>'+books[i].tmaterb[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special No.（结构特征）</strong></td>';
          html+='<td><select class="dynamic-select" id="specialt'+j+'Select" >';
          for (var l = 0; l < books[i].specialb.length; l++) {;
          html+='<option value='+books[i].specialc[l]+'>'+books[i].specialb[l]+'</option>';}
          html+='</select></td>'; 

          html+='<td><strong>Plating Method（电镀方法）</strong></td>';
          html+='<td><select class="dynamic-select" id="platmt'+j+'Select" >';
          for (var l = 0; l < books[i].platmb.length; l++) {;
          html+='<option value='+books[i].platmc[l]+'>'+books[i].platmb[l]+'</option>';}
          html+='</select></td>'; 

          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special Model（特别型号）</strong></td>';
          html+='<td><select class="dynamic-select" id="scodet'+j+'Select" >';
          for (var l = 0; l < books[i].scodeb.length; l++) {;
          html+='<option value='+books[i].scodec[l]+'>'+books[i].scodeb[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Packaging（包装）</strong></td>';
          html+='<td>'+books[i].packb[0]+'</td>';
          html+='</tr>';
          html+='<tfoot><tr><td colspan="4" class="note">注：可以根据选项选择对应的料号</td></tr></tfoot>';
            

          $(".search-pro .mydet").append(html);
          // 1. 通过字符串拼接生成对应ID
            const gendertId = `gendert${j}Select`;    
            const materialtId = `materialt${j}Select`;  
            const finishtId = `finisht${j}Select`;
            const specialtId = `specialt${j}Select`;    
            const platmtId = `platmt${j}Select`;  
            const scodetId = `scodet${j}Select`; 
            const orienttId = `orientt${j}Select`; 
            const resulttId = `resultDisplayt${j}`;  

            
            // 2. 获取对应元素
            const gendertElem = document.getElementById(gendertId);
            const materialtElem = document.getElementById(materialtId);
            const finishtElem = document.getElementById(finishtId);
            const specialtElem = document.getElementById(specialtId);
            const platmtElem = document.getElementById(platmtId);
            const scodetElem = document.getElementById(scodetId);
            const resulttElem = document.getElementById(resulttId);
            const orienttElem = document.getElementById(orienttId);
            
        
            

        function updateResultt() {
            
                resulttElem.textContent = `${gendertElem.value}${orienttElem.value}${specialtElem.value}${materialtElem.value}${finishtElem.value}${platmtElem.value}${scodetElem.value}`;
          
              }

        gendertElem.addEventListener('change', updateResultt);
        materialtElem.addEventListener('change', updateResultt);
        finishtElem.addEventListener('change', updateResultt);
        specialtElem.addEventListener('change', updateResultt);
        platmtElem.addEventListener('change', updateResultt);
        scodetElem.addEventListener('change', updateResultt);
        orienttElem.addEventListener('change', updateResultt);
        
        updateResultt(); // 初始化显示

        }
   if(books[i].member[j].startsWith('C')){
            if(books[i].member[j].includes('F')){
               
               var htmt='"F">Female（母）';
               var genderc='Female,';
               var scodedd='"">Ordinay（普通的）';
            }
              else if(books[i].member[j].includes('E')){
            
            var htmt='"M">Male（公）';
            var genderc='Male,';
            var scodedd='"E">With Ears（带耳）';
            }
            else if(books[i].member[j].includes('T')){
            
            var htmt='"M">Male（公）';
            var genderc='Male,';
            var scodedd='"T">Through-hole Type（通孔型）';
            }
              else if(books[i].member[j].includes('V')){
            
            var htmt='"M">Male（公）';
            var genderc='Male,';
            var scodedd='"V">180° Type（直插型）';
            }
            else if(books[i].member[j].includes('S')){
            
            var htmt='"M">Male（公）';
            var genderc='Male,';
            var scodedd='"S">SMT Type（贴板型）';
            }
            else {
            
            var htmt='"M">Male（公）';
            var genderc='Male,';
            var scodedd='"">Ordinay（普通的）';
            }
           
          var html="";
          html+='<li class="clearfix"><div class="result-thumb-col"><div class="container"><div class="bq"></div>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><img  src='+books[i].img +books[i].member[j]+'.png'+' alt=""></a></div>';
          html+='<p class="dettitle">Housing-'+ books[i].pitchs +' Pitchs，'+genderc+' IDC Housing</p>';
          html+='<div class="pn-caption" ><span style="display: block;margin-bottom:0.6rem;">Part No.（料号）:' +' </span><div style="background-color: orange;width: auto; display: inline-block;color:#fff;padding:3px;border-radius: 3px;">'+books[i].title+'-C'+'<span id="resultDisplayc'+j+'" ></span></div></div>'+'<ul class="down"><li>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><i class="fa fa-download fa-2x" ><span> Product drawings&nbsp;&nbsp;PDF</span></i></a></li><li>';
          html+='<a href='+ '../'+books[i].pdfurl1 +' target="_blank"><i class="fa fa-download fa-2x" ><span> '+ books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF</span>';
          html+='</i></a></li></ul></div>';
          html+='<div class="table-container"><table class="complex-table">';
         
          html+='<thead><tr><th colspan="2">规格参数</th><th colspan="2">材料/电气参数</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Product System（产品系统）</strong></td>';
          html+='<td>'+books[i].type+'</td>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Style（类别）</strong></td>';
          html+='<td>Plug（插头）</td>';
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Gender（性别）</strong></td>';
          html+='<td><select class="dynamic-select" id="genderc'+j+'Select" >';
          html+='<option value='+htmt+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Row Option（排数）</strong></td>';
          html+='<td><select class="dynamic-select" id="rowc'+j+'Select" >';
          html+='<option value='+books[i].rowb[1]+'>'+books[i].rowb[0]+'</option>';
          html+='</select></td>'; 

          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Number of Positions（位数）</strong></td>';
          html+='<td><select class="dynamic-select" id="polec'+j+'Select" >';
          for (var l = 0; l < books[i].pole.length; l++) {;
          html+='<option value='+books[i].pole[l]+'>'+books[i].pole[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Orientation（方向）</strong></td>';
          html+='<td>'+books[i].orientb+'</td>';
          html+='<td><strong>Material-Contact（触点材质）</strong></td>';
           html+='<td><select class="dynamic-select" id="materialpc'+j+'Select" >';
          for (var l = 0; l < books[i].materpin_tb.length; l++) {;
          html+='<option value='+books[i].materpin_ta[l]+'>'+books[i].materpin_tb[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Applicable wires（适用电线范围）</strong></td>';
          html+='<td>'+books[i].wirerange+'</td>';
          html+='<td><strong>Plating（电镀类型）</strong></td>';
          html+='<td><select class="dynamic-select" id="finishc'+j+'Select" >';
          for (var l = 0; l < books[i].tmaterb.length; l++) {;
          html+='<option value='+books[i].tmatera[l]+'>'+books[i].tmaterb[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>线径（O.D.）</strong></td>';
          html+='<td>'+books[i].wireod+'</td>';

          html+='<td><strong>Material-Resin（树脂材质）</strong></td>';
           html+='<td><select class="dynamic-select" id="materialc'+j+'Select" >';
          for (var l = 0; l < books[i].hmaterb.length; l++) {;
          html+='<option value='+books[i].hmatera[l]+'>'+books[i].hmaterb[l]+'</option>';}
          html+='</select></td>'; 
          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Color（颜色）</strong></td>';
          html+='<td><select class="dynamic-select" id="colorc'+j+'Select" >';
          for (var l = 0; l < books[i].colorb.length; l++) {;
          html+='<option value='+books[i].colorc[l]+'>'+books[i].colorb[l]+'</option>';}
          html+='</select></td>';  
          html+='<td><strong>Mounting Method（安装方式）</strong></td>';
          html+='<td>IDC</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special Model（特别型号）</strong></td>';
          html+='<td><select class="dynamic-select" id="scodec'+j+'Select" >';
          
          html+='<option value='+scodedd+'</option>';
          html+='</select></td>';
          html+='<td><strong>Packaging（包装）</strong></td>';
          html+='<td>'+books[i].packb[0]+'</td>';
          html+='</tr>';
          html+='<tfoot><tr><td colspan="4" class="note">注：可以根据选项选择对应的料号</td></tr></tfoot>';
            

          $(".search-pro .mydet").append(html);
          // 1. 通过字符串拼接生成对应ID
            const gendercId = `genderc${j}Select`;
            const polecId = `polec${j}Select`;
            const rowcId = `rowc${j}Select`;    
            const materialcId = `materialc${j}Select`;  
            const finishcId = `finishc${j}Select`;
            const materialpcId = `materialpc${j}Select`;    
            const colorcId = `colorc${j}Select`;  
            const scodecId = `scodec${j}Select`; 
            const resultcId = `resultDisplayc${j}`;    
            
            // 2. 获取对应元素
            const gendercElem = document.getElementById(gendercId);
            const polecElem = document.getElementById(polecId);
            const rowcElem = document.getElementById(rowcId);
            const materialcElem = document.getElementById(materialcId);
            const finishcElem = document.getElementById(finishcId);
            const materialpcElem = document.getElementById(materialpcId);
            const colorcElem = document.getElementById(colorcId);
            const scodecElem = document.getElementById(scodecId);
            const resultcElem = document.getElementById(resultcId);
            
        
            

        function updateResultc() {
            
                resultcElem.textContent = `${rowcElem.value}${polecElem.value}${gendercElem.value}${materialcElem.value}${finishcElem.value}${colorcElem.value}${scodecElem.value}`;
          
              }

        gendercElem.addEventListener('change', updateResultc);
        polecElem.addEventListener('change', updateResultc);
        rowcElem.addEventListener('change', updateResultc);
        materialcElem.addEventListener('change', updateResultc);
        finishcElem.addEventListener('change', updateResultc);
        materialpcElem.addEventListener('change', updateResultc);
        colorcElem.addEventListener('change', updateResultc);
        scodecElem.addEventListener('change', updateResultc);
        
        updateResultc(); // 初始化显示

        }



    if(books[i].member[j].startsWith('H')&&!books[i].member[j].startsWith('W')){

            if(books[i].member[j].includes('M-E')){
            var htm=',With Ears';
            var htma='"E">With Ears（带耳）';
            var htmb='"M">Male（公）';
            var htmc='Male';
            var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-W')){
               var htm= ',With Wing';
               var htma='"W">With Wing（带翅膀）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-L')){
               var htm= ',With Lock';
               var htma='"L">With Lock（带扣）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-B')){
               var htm= ',With Bump';
               var htma='"B">With Bump（带凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-K')){
               var htm= ',With Hole-side Bump';
               var htma='"K">With Hole-side Bump（带孔侧凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-G')){
               var htm= ',With Outer Bump';
               var htma='"G">With Outer Bump（带外侧凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-A')){
               var htm= ',Half-back With Bump';
               var htma='"A">Half-back With Bump（半靠背带凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-R')){
               var htm= ',Short-back With Bump';
               var htma='"R">Short-back With Bump（短靠背带凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-U')){
               var htm= ',With Low Bump';
               var htma='"U">With Low Bump（带低凸点）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-D')){
               var htm= ',With Link Stopper';
               var htma='"D">With Link Stopper（带挡块）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-H')){
                var htm= ',With Sliding';
                var htma='"H">With Sliding（滑轨式）';
                var htmb='"M">Male（公）';
                var htmc='Female';
                var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('M-C')){
                var htm= ',With Card slot';
                var htma='"C">With Card slot（卡式）';
                var htmb='"M">Male（公）';
                var htmc='Female';
                var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="HR"){
               var htm= ',Right Angle Down Type';
               var htma='"R">With Right Angle Down Type（弯型向下）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Right Angle(90°)'
            }
            else if(books[i].member[j].includes('U')&&books[i].member[j]=="HU"){
               var htm= ',Right Angle Up Type';
               var htma='"U">With Right Angle Up Type（弯型向上）';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var orienth='Right Angle(90°)'
            }
            else if(books[i].member[j].includes('M')){
                var htm=""; 
                var htma='"">Ordinay（普通的）';
                var htmb='"M">Male（公）';
                var htmc='Male';
                var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('F-L')){
                var htm= ',With Lock';
                var htma='"L">With Lock（带扣）';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var orienth='Vertical(180°)'
            }
            
            else if(books[i].member[j].includes('F-W')){
                var htm=',With Wing'; 
                var htma='"W">With Wing（带翅膀）';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var orienth='Vertical(180°)'
            }
            else if(books[i].member[j].includes('F')&&books[i].member[j]=="HF"){
                var htm=""; 
                var htma='"">Ordinay（普通的）';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var orienth='Vertical(180°)'
            }
            else{
                var htm=""; 
                var htma='"">Ordinay（普通的）';
                var htmb='"M">Male（公）';
                var htmc='Male';
                var orienth='Vertical(180°)'
            }

          var html="";
          html+='<li class="clearfix"><div class="result-thumb-col"><div class="container"><div class="bq"></div>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><img  src='+books[i].img +books[i].member[j]+'.png'+' alt=""></a></div>';
          html+='<p class="dettitle">Housing-'+ books[i].pitchs +' Pitchs，'+htmc+' Housing';
          
          html+=htm+'</p>';
          html+='<div class="pn-caption" ><span style="display: block;margin-bottom:0.6rem;">Part No.（料号）:'+' </span><div style="background-color: orange;width: auto; display: inline-block;color:#fff;padding:3px;border-radius: 3px;">'+books[i].title+'-H'+'<span id="resultDisplay'+j+'" ></span></div></div>'+'<ul class="down"><li>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><i class="fa fa-download fa-2x" ><span> Product drawings&nbsp;&nbsp;PDF</span></i></a></li><li>';
          html+='<a href='+ '../'+books[i].pdfurl1 +' target="_blank"><i class="fa fa-download fa-2x" ><span> '+ books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF</span>';
          html+='</i></a></li></ul></div>';
          html+='<div class="table-container"><table class="complex-table">';
         
          html+='<thead><tr><th colspan="2">规格参数</th><th colspan="2">材料/电气参数</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Product System（产品系统）</strong></td>';
          html+='<td>'+books[i].type+'</td>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Style（类别）</strong></td>';
          html+='<td>'+'Housing（胶壳）'+'</td>';
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Gender（性别）</strong></td>';
          html+='<td><select class="dynamic-select" id="gender'+j+'Select" >';
          html+='<option value='+htmb+'</option>';
          html+='</select></td>'; 
          

          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Row Option（排数）</strong></td>';
          html+='<td><select class="dynamic-select" id="row'+j+'Select" >';
          html+='<option value='+books[i].rowb[1]+'>'+books[i].rowb[0]+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Number of Positions（位数）</strong></td>';
          html+='<td><select class="dynamic-select" id="pole'+j+'Select" >';
          for (var l = 0; l < books[i].pole.length; l++) {;
          html+='<option value='+books[i].pole[l]+'>'+books[i].pole[l]+'</option>';}
          html+='</select></td>'; 

          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Orientation（方向）</strong></td>';
          html+='<td>'+orienth+'</td>';
          html+='<td><strong>Material-Resin（树脂材质）</strong></td>';
          html+='<td><select class="dynamic-select" id="mater'+j+'Select" >';
          for (var l = 0; l < books[i].hmatera.length; l++) {
          html+='<option value='+books[i].hmatera[l]+'>'+books[i].hmaterb[l]+'</option>';}
          html+='</select></td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Color（颜色）</strong></td>';
          html+='<td><select class="dynamic-select" id="color'+j+'Select" >';
          for (var l = 0; l < books[i].colorb.length; l++) {;
          html+='<option value='+books[i].colorc[l]+'>'+books[i].colorb[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Packaging（包装）</strong></td>';
          html+='<td>'+books[i].packb[1]+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special No.（结构特征）</strong></td>';
          html+='<td><select class="dynamic-select" id="special'+j+'Select" >';
          html+='<option value='+htma+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>'+'</strong></td>';
          html+='<td>'+'</td>';
          html+='</tr>';
          html+='<tfoot><tr><td colspan="4" class="note">注：可以根据选项选择对应的料号</td></tr></tfoot>';




          $(".search-pro .mydet").append(html);
          

            // 1. 通过字符串拼接生成对应ID
            const rowaId = `row${j}Select`;    
            const poleaId = `pole${j}Select`;  
            const genderaId = `gender${j}Select`;
            const specialaId = `special${j}Select`;    
            const materaId = `mater${j}Select`;  
            const coloraId = `color${j}Select`; 
            const resultaId = `resultDisplay${j}`;    
            
            // 2. 获取对应元素
            const rowaElem = document.getElementById(rowaId);
            const poleaElem = document.getElementById(poleaId);
            const genderaElem = document.getElementById(genderaId);
            const specialaElem = document.getElementById(specialaId);
            const materaElem = document.getElementById(materaId);
            const coloraElem = document.getElementById(coloraId);
            const resultaElem = document.getElementById(resultaId);
            
        
            

        function updateResult() {
            
                resultaElem.textContent = `${rowaElem.value}${poleaElem.value}${genderaElem.value}${specialaElem.value}${materaElem.value}${coloraElem.value}`;
          
              }

        rowaElem.addEventListener('change', updateResult);
        poleaElem.addEventListener('change', updateResult);
        genderaElem.addEventListener('change', updateResult);
        specialaElem.addEventListener('change', updateResult);
        materaElem.addEventListener('change', updateResult);
        coloraElem.addEventListener('change', updateResult);
        
        updateResult(); // 初始化显示


           }   
    
    if(books[i].member[j].startsWith('W')&&!books[i].member[j].startsWith('H')){

            if(books[i].member[j].includes('RS')&&books[i].member[j]=="WRS"){
                var htm= ','+'Right angle(90°),SMT'; 
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'

            }
            else if(books[i].member[j].includes('RS')&&books[i].member[j]=="WRS-H"){
                var htm= ','+'Right angle(90°),With Harpoon,SMT'; 
                var htma='<option value='+'"H">With Harpoon（带鱼叉）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'

            }
            else if(books[i].member[j].includes('RS')&&books[i].member[j]=="WRS-L"){
                var htm= ','+'Right angle(90°),With Lock,SMT'; 
                var htma='<option value='+'"L">With Lock（带扣）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'

            }
            else if(books[i].member[j].includes('RS')&&books[i].member[j]=="WRS-P"){
                var htm= ','+'Right angle(90°),With Post,SMT'; 
                var htma='<option value='+'"P">With Post（带柱）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'

            }
             else if(books[i].member[j].includes('RS')&&books[i].member[j]=="WRS-C"){
                var htm= ','+'Right angle(90°),With CPA,SMT'; 
                var htma='<option value='+'"C">With CPA'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'

            }


            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WRM"){
               var htm= ','+'Right angle(90°),Through hole';
               var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
               var htmb='"M">Male（公）';
               var htmc='Male';
               var htmd='"R">Right angle(90°)';
               var htme='"">Through hole（通孔焊接）';
               var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WRF"){
               var htm= ','+'Right angle(90°),Through hole';
               var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
               var htmb='"F">Female（母）';
               var htmc='Female';
               var htmd='"R">Right angle(90°)';
               var htme='"">Through hole（通孔焊接）';
               var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR"){
                var htm= ','+'Right angle(90°),Through hole';
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-G"){
                var htm= ','+'Right angle(90°),With High Type,Through hole';
                var htma='<option value='+'"G">With High Type（高型）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-N"){
                var htm= ','+'Right angle(90°),With Link Stopper,Through hole';
                var htma='<option value='+'"N">With Link Stopper（带挡板）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-L"){
                var htm= ','+'Right angle(90°),With Lock ,Through hole';
                var htma='<option value='+'"L">With Lock（带扣）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }

            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-H"){
                var htm= ','+'Right angle(90°),With Harpoon,Through hole';
                var htma='<option value='+'"H">With Harpoon（带鱼叉）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-P"){
                var htm= ','+'Right angle(90°),With Post,Through hole';
                var htma='<option value='+'"P">With Post（带柱）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WR-J"){
                var htm= ','+'Right angle(90°),Box Header,Through hole';
                var htma='<option value='+'"J">Box Header（简牛）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"R">Right angle(90°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-J"){
                var htm= ','+'Vertical(180°),Box Header,Through hole';
                var htma='<option value='+'"J">Box Header（简牛）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-L"){
                var htm= ','+'Vertical(180°),With Lock,Through hole';
                var htma='<option value='+'"L">With Lock（带扣）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-P"){
                var htm= ','+'Vertical(180°),With Post,Through hole';
                var htma='<option value='+'"P"With Post（带柱）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
             }
             else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-G"){
                var htm= ','+'Vertical(180°),With High Type,Through hole';
                var htma='<option value='+'"G">With High Type（高型）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"">Through hole（通孔焊接）';
                 var htmf='<td>Socket（插座）</td>'
             }
            
            else if(books[i].member[j].includes('VS')&&books[i].member[j]=="WVS"){
               var htm= ','+'Vertical(180°),SMT';
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"S">SMT';
                var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVS-J"){
                var htm= ','+'Vertical(180°),Box Header,SMT';
                var htma='<option value='+'"J">Box Header（简牛）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'
            }
             else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVS-L"){
                var htm= ','+'Vertical(180°),With Lock,SMT';
                var htma='<option value='+'"L">With Lock（带扣）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                 var htmd='"V">Vertical(180°)';
                 var htme='"S">SMT';
                 var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVMS"){
               var htm= ','+'Vertical(180°),SMT';
        if(books[i].scodeb[0].length==1)
               { 
                var htma='<option value='+books[i].scodec[0]+'>'+books[i].scodeb[0]+'</option>';}
                else{
                      var  htma='';
                for (var l = 0; l < books[i].scodeb[0].length; l++) {
          htma+='<option value='+books[i].scodec[0][l]+'>'+books[i].scodeb[0][l]+'</option>';}
                
            }
                var htmb='"M">Male（公）';
                var htmc='Male';
                var htmd='"V">Vertical(180°)';
                var htme='"S">SMT';
                var htmf='<td>Plug（插头）</td>'
            }
           
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVFS"){
               var htm= ','+'Vertical(180°),SMT';
               if(books[i].scodeb[1].length==1)
               { 
                var htma='<option value='+books[i].scodec[1]+'>'+books[i].scodeb[1]+'</option>';}
                else{
               
                    var  htma='';
                for (var l = 0; l < books[i].scodeb[1].length; l++) {
          htma+='<option value='+books[i].scodec[1][l]+'>'+books[i].scodeb[1][l]+'</option>';}
                
            }
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"S">SMT';
                var htmf='<td>Socket（插座）</td>'
            }

             else if(books[i].member[j].includes('R')&&books[i].member[j]=="WRMS"){
               var htm= ','+'Right angle(90°),SMT';
        if(books[i].scodeb[2].length==1)
               { 
                var htma='<option value='+books[i].scodec[2]+'>'+books[i].scodeb[2]+'</option>';}
                else{
                      var  htma='';
                for (var l = 0; l < books[i].scodeb[2].length; l++) {
          htma+='<option value='+books[i].scodec[2][l]+'>'+books[i].scodeb[2][l]+'</option>';}
                
            }
                var htmb='"M">Male（公）';
                var htmc='Male';
                var htmd='"R">Right angle(90°)';
                var htme='"S">SMT';
                var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('R')&&books[i].member[j]=="WRFS"){
               var htm= ','+'Right angle(90°),SMT';
        if(books[i].scodeb[3].length==1)
               { 
                var htma='<option value='+books[i].scodec[3]+'>'+books[i].scodeb[3]+'</option>';}
                else{
                      var  htma='';
                for (var l = 0; l < books[i].scodeb[3].length; l++) {
          htma+='<option value='+books[i].scodec[3][l]+'>'+books[i].scodeb[3][l]+'</option>';}
                
            }
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"R">Right angle(90°)';
                var htme='"S">SMT';
                var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('VS')&&books[i].member[j]=="WVS-H"){
               var htm= ','+'Vertical(180°),With Harpoon,SMT';
                var htma='<option value='+'"H">With Harpoon（带鱼叉）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"S">SMT';
                var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVM"){
                var htm= ','+'Vertical(180°),Through hole'; 
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"M">Male（公）';
                var htmc='Male';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVM-F"){
                var htm= ','+'Vertical(180°),Through hole'; 
                var htma='<option value='+'"F">Press-Fit（免焊式）'+'</option>';
                var htmb='"M">Male（公）';
                var htmc='Male';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WVF"){
                var htm= ','+'Vertical(180°),Through hole'; 
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Plug（插头）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV"){
                var htm= ','+'Vertical(180°),Through hole';
                var htma='<option value='+'"">Ordinay（普通的）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-H"){
                var htm= ','+'Vertical(180°),With Harpoon,Through hole';
                var htma='<option value='+'"H">With Harpoon（带鱼叉）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Socket（插座）</td>'
            }
            else if(books[i].member[j].includes('V')&&books[i].member[j]=="WV-S"){
                var htm= ','+'Vertical(180°),Adapter,Through hole';
                var htma='<option value='+'"S">Adapter（适配器）'+'</option>';
                var htmb='"F">Female（母）';
                var htmc='Female';
                var htmd='"V">Vertical(180°)';
                var htme='"">Through hole（通孔焊接）';
                var htmf='<td>Socket（插座）</td>'
            }
          var html="";
          html+='<li class="clearfix"><div class="result-thumb-col"><div class="container"><div class="bq"></div>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><img  src='+books[i].img +books[i].member[j]+'.png'+' alt=""></a></div>';
          html+='<p class="dettitle">Socket,-'+ books[i].pitchs +' Pitchs，'+htmc+' Socket';
          
          html+=htm+'</p>';
          html+='<div class="pn-caption" ><span style="display: block;margin-bottom:0.6rem;">Part No.（料号）:'+' </span><div style="background-color: orange;width: auto; display: inline-block;color:#fff;padding:3px;border-radius: 3px;">'+books[i].title+'-W'+'<span id="resultDisplayw'+j+'" ></span></div></div>'+'<ul class="down"><li>';
          html+='<a href='+ '../'+books[i].pdfurl1.replace(".",books[i].member[j]+".") +' target="_blank"><i class="fa fa-download fa-2x" ><span> Product drawings&nbsp;&nbsp;PDF</span></i></a></li><li>';
          html+='<a href='+ '../'+books[i].pdfurl1 +' target="_blank"><i class="fa fa-download fa-2x" ><span> '+ books[i].title.substring(0,5) +'&nbsp;Series&nbsp;&nbsp;PDF</span>';
          html+='</i></a></li></ul></div>';
          html+='<div class="table-container"><table class="complex-table">';
         
          html+='<thead><tr><th colspan="2">规格参数</th><th colspan="2">材料/电气参数</th></tr></thead><tbody>';
          html+='<tr>';
          html+='<td><strong>Product System（产品系统）</strong></td>';
          html+='<td>'+books[i].type+'</td>';
          html+='<td><strong>Current Rating（电流能力）</strong></td>';
          html+='<td>'+books[i].current+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Style（类别）</strong></td>';
          html+=htmf;
          html+='<td><strong>Voltage Rating（电压能力）</strong></td>';
          html+='<td>'+books[i].voltage+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Gender（性别）</strong></td>';
          html+='<td><select class="dynamic-select" id="genderw'+j+'Select" >';
          html+='<option value='+htmb+'</option>';
          html+='</select></td>'; 
          



          html+='<td><strong>Contact Resistance（接触电阻）</strong></td>';
          html+='<td>'+books[i].resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Pitch（中心间距）</strong></td>';
          html+='<td>'+books[i].pitchs+'</td>';
          html+='<td><strong>Insulation Resistance（绝缘电阻）</strong></td>';
          html+='<td>'+books[i].ins_resistance+'</td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Row Option（排数）</strong></td>';
          html+='<td><select class="dynamic-select" id="roww'+j+'Select" >';
          html+='<option value='+books[i].rowb[1]+'>'+books[i].rowb[0]+'</option>';
          html+='</select></td>'; 
          html+='<td><strong>Withstand Voltage（耐电压）</strong></td>';
          html+='<td>'+books[i].withstanding_voltage+'</td>';
          
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Number of Positions（位数）</strong></td>';
          html+='<td><select class="dynamic-select" id="polew'+j+'Select" >';
          for (var l = 0; l < books[i].pole.length; l++) {;
          html+='<option value='+books[i].pole[l]+'>'+books[i].pole[l]+'</option>';}
          html+='</select></td>'; 

          html+='<td><strong>Operating Temperature Range（工作温度范围）</strong></td>';
          html+='<td>'+books[i].temperature+'</td>';
          
          html+='</tr>';
          html+='<tr>';
          
          html+='<td><strong>Orientation（方向）</strong></td>';
          html+='<td><select class="dynamic-select" id="orientw'+j+'Select" >';
          html+='<option value='+htmd+'</option>';
          html+='</select></td>'; 

          html+='<td><strong>Material-Resin（树脂材质）</strong></td>';
          html+='<td><select class="dynamic-select" id="materw'+j+'Select" >';
          for (var l = 0; l < books[i].wmatera.length; l++) {
          html+='<option value='+books[i].wmatera[l]+'>'+books[i].wmaterb[l]+'</option>';}
          html+='</select></td>';
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Mounting Method（安装方式）</strong></td>';
          html+='<td><select class="dynamic-select" id="mountw'+j+'Select" >';
          html+='<option value='+htme+'</option>';
          html+='</select></td>'; 

          html+='<td><strong>Plating（电镀类型）</strong></td>';
          html+='<td><select class="dynamic-select" id="finishw'+j+'Select" >';
          for (var l = 0; l < books[i].materc.length; l++) {
          html+='<option value='+books[i].materc[l]+'>'+books[i].materd[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Color（颜色）</strong></td>';
          html+='<td><select class="dynamic-select" id="colorw'+j+'Select" >';
          for (var l = 0; l < books[i].colord.length; l++) {;
          html+='<option value='+books[i].colore[l]+'>'+books[i].colord[l]+'</option>';}
          html+='</select></td>'; 
          html+='<td><strong>Packaging（包装）</strong></td>';
          
          html+='<td><select class="dynamic-select" id="packw'+j+'Select" >';
          for (var l = 0; l < books[i].wpacka.length; l++) {
          html+='<option value='+books[i].wpackb[l]+'>'+books[i].wpacka[l]+'</option>';}
          html+='</select></td>'; 
          html+='</tr>';
          html+='<tr>';
          html+='<td><strong>Special No.（结构特征）</strong></td>';
          html+='<td><select class="dynamic-select" id="specialw'+j+'Select" >';
          html+=htma;
          html+='</select></td>'; 
          html+='<td><strong>'+'</strong></td>';
          html+='<td>'+'</td>';
          html+='</tr>';

          
          html+='<tfoot><tr><td colspan="4" class="note">注：可以根据选项选择对应的料号</td></tr></tfoot>';




          $(".search-pro .mydet").append(html);
          

            // 1. 通过字符串拼接生成对应ID
            const rowwId = `roww${j}Select`;    
            const polewId = `polew${j}Select`;  
            const genderwId = `genderw${j}Select`;
            const finishwId = `finishw${j}Select`;    
            const materwId = `materw${j}Select`; 
            const mountwId = `mountw${j}Select`;  
            const colorwId = `colorw${j}Select`; 
            const orientwId = `orientw${j}Select`;
            const specialwId = `specialw${j}Select`; 
            const packwId = `packw${j}Select`; 
            const resultwId = `resultDisplayw${j}`;    
            
            // 2. 获取对应元素
            const rowwElem = document.getElementById(rowwId);
            const polewElem = document.getElementById(polewId);
            const genderwElem = document.getElementById(genderwId);
            const finishwElem = document.getElementById(finishwId);
            const materwElem = document.getElementById(materwId);
            const colorwElem = document.getElementById(colorwId);
            const mountwElem = document.getElementById(mountwId);
            const orientwElem = document.getElementById(orientwId);
            const specialwElem = document.getElementById(specialwId);
            const packwElem = document.getElementById(packwId);
            const resultwElem = document.getElementById(resultwId);
            
        
            

        function updateResultw() {
            
                resultwElem.textContent = `${rowwElem.value}${polewElem.value}${genderwElem.value}${orientwElem.value}${mountwElem.value}${specialwElem.value}${finishwElem.value}${materwElem.value}${colorwElem.value}${packwElem.value}`;
          
              }

        rowwElem.addEventListener('change', updateResultw);
        polewElem.addEventListener('change', updateResultw);
        genderwElem.addEventListener('change', updateResultw);
        finishwElem.addEventListener('change', updateResultw);
        materwElem.addEventListener('change', updateResultw);
        colorwElem.addEventListener('change', updateResultw);
        specialwElem.addEventListener('change', updateResultw);
        orientwElem.addEventListener('change', updateResultw);
        mountwElem.addEventListener('change', updateResultw);
        packwElem.addEventListener('change', updateResultw);
        updateResultw(); // 初始化显示


           }   
      
  
       
        



        }
        }

     }
 
                                                  
})

 