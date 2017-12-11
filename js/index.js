/**
 * Created by createc on 2017/7/17.
 */

var swiperV = new Swiper('.swiper-container-v', {
    pagination: '.swiper-pagination-v',
    noSwipingClass : 'stop-swiping',
    paginationClickable: true,
    slidesPerView: 'auto',
});


var showGoods = function (name) {
    var swiperA = new Swiper('.swiper-container-a', {
        pagination: '.swiper-pagination-a',
        prevButton:'.left',
        nextButton:'.right,#next',
        onSlideChangeStart: function(swiper){
            var swiper = swiper;
            $.getJSON("data.json",function(data){
                var url = data['url'][name][swiper.activeIndex];
                $("#buyUrl").attr("href",url);
            });
        }
    });
}
function nextPage(name) {
    $("#showGoods").html("");//先清空
    $.getJSON("data.json",function(data){
        var url = data['url'][name][0];
        $("#buyUrl").attr("href",url);
        for(var i=0;i<data['img'][name].length;i++){
            var odiv = $("<div style='overflow: scroll;-webkit-overflow-scrolling: touch;' class='swiper-slide'>\
                            <img src='img/"+name+"/"+data['img'][name][i]+".jpg' alt=''>\
                        </div>");
            $("#showGoods").append(odiv);
        }
        showGoods(name);//swper函数
    });
    $(".banner").fadeOut(1000);
    $(".arrow-down").fadeOut(1000);
    swiperV.slideTo(1,1000,'fade');//切换到第一个slide，速度为1秒
    //产品系列追踪
    if(name=='mb'){_hmt.push(['_trackEvent', '产品系列', '面部', 'literature'])};
    if(name=='cb'){_hmt.push(['_trackEvent', '产品系列', '唇部', 'literature'])};
    if(name=='qs'){_hmt.push(['_trackEvent', '产品系列', '全身', 'literature'])};
    if(name=='yx'){_hmt.push(['_trackEvent', '产品系列', '腋下', 'literature'])};
    if(name=='fs'){_hmt.push(['_trackEvent', '产品系列', '防晒', 'literature'])};
    if(name=='xz'){_hmt.push(['_trackEvent', '产品系列', '卸妆', 'literature'])};
    if(name=='sb'){_hmt.push(['_trackEvent', '产品系列', '手部', 'literature'])};
}

//返回
$("#back").click(function () {
    window.location.reload();
    // $("#showGoods").html("");
    // swiperV.slideTo(0,1000,'fade');//切换到第一个slide，速度为1秒
});

//微信api操作
var url = window.location.href;
var appid;
var timestamp;
var nonceStr;
var signature;
$.ajax({
    url:'http://nivea.fphis.com/api/jsconfigure',
    type:'POST',
    async: false,
    data:{url:url},
    dataType: "json",
    success:function(data){
        appid = data['appId'];
        timestamp = data['timestamp'];
        nonceStr = data['nonceStr'];
        signature = data['signature'];
    }
})

wx.config({
    debug: false,
    appId: appid,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
        // 所有要调用的 API 都要加到这个列表中,,,,,
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "checkJsApi",
        "chooseImage",
        "uploadImage",
    ]
});
wx.ready(function () {
    wx.onMenuShareTimeline({
        title: 'NIVEA', // 分享标题
        link: "http://nivea.fphis.com/crm/nscpjs-n/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://nivea.fphis.com/crm/nscpjs-n/img/logo.png', // 分享图标
        success: function () {
            _hmt.push(['_trackEvent', '分享', '朋友圈', 'literature']);
        }
    });
    wx.onMenuShareAppMessage({
        title: 'NIVEA', // 分享标题
        desc: 'NIVEA女士产品介绍', // 分享描述
        link: "http://nivea.fphis.com/crm/nscpjs-n/index.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://nivea.fphis.com/crm/nscpjs-n/img/logo.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            _hmt.push(['_trackEvent', '分享', '朋友', 'literature']);
        },
        cancel: function () {

        }
    });
})
