/**
 * Created by pior on 16/3/22.
 */


class SharePage extends egret.DisplayObjectContainer
{

    private desctext: string = '盛讯小游戏--粽粽大作战';

    public constructor()
    {
        super();
    }
    /**
     * 获取签名分享
     */
    public getSignPackage() {

        var urllocal:string = encodeURIComponent(window.location.href.split('#')[0]);

        //console.log("url=====", urllocal);
        var parma:Object = {
            url: urllocal
        }
        GameUtil.Http.getinstance().send(parma,"/weixinshare/share",this.share,this,"spring.gamexun.com");
        //GameUtil.Http.getinstance().send(parma,"/jssdk/config",this.share,this,'api.sztc.gamexun.com')
    }
    private share(data:any):void
    {
        console.log("data======",data);

        //this.shareTip();

        //alert("id==="+data['appId']+"\ntimestamp==="+data['timestamp']+"\nnonceStr==="+data['noncestr']+"\nsign==="+data['sign']);

        //........................................................
        //基本配置
        //配置参数
        wx.config({
            debug: false,
            appId: data['appId'],
            timestamp: Number(data['timestamp']),
            nonceStr: data['noncestr'],
            signature: data['sign'],
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]
        });

        //下面可以加更多接口,可自行扩展
        this.getWeiXinShareTimeline();//分享朋友圈
        this.getWeiXinShareAppMessage();
    }

    public setdesctext(text:string)
    {
        this.desctext = text;
        this.getWeiXinShareAppMessage();
        this.getWeiXinShareTimeline();
    }

    /**
     * 获取微信分享到朋友圈
     */
    private getWeiXinShareTimeline() {

        var self:any = this;
        var bodyMenuShareTimeline = new BodyMenuShareTimeline();
        bodyMenuShareTimeline.title = this.desctext;
        bodyMenuShareTimeline.link = 'http://savequyuan.h5.gamexun.com/';
        bodyMenuShareTimeline.imgUrl = 'http://savequyuan.h5.gamexun.com/shareicon.png';
        bodyMenuShareTimeline.trigger = ()=> {
            // alert('用户点击分享到朋友圈');
        };
        bodyMenuShareTimeline.success = ()=> {
            //alert('已分享');
            //window[ 'weChat' ]();
            //alert('已分享')
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareTimeline.cancel = ()=> {
            //alert('已取消');
            // window[ 'weChat' ]();
            //self.closesharetip();
        };
        bodyMenuShareTimeline.fail = (res)=> {
            //alert(JSON.stringify(res));
        };
        wx.onMenuShareTimeline(bodyMenuShareTimeline);
        //alert('已注册获取“分享到朋友圈”状态事件');
    }
    /**
     * 获取微信分享到朋友
     */
    private getWeiXinShareAppMessage(){

        var self: any = this;

        var bodyMenuShareAppMessage = new BodyMenuShareAppMessage();
        bodyMenuShareAppMessage.title = '盛讯小游戏--粽粽大作战';
        bodyMenuShareAppMessage.desc = this.desctext;
        bodyMenuShareAppMessage.link = 'http://savequyuan.h5.gamexun.com/';
        bodyMenuShareAppMessage.imgUrl = 'http://savequyuan.h5.gamexun.com/shareicon.png';
        bodyMenuShareAppMessage.trigger = ()=> {
            // alert('用户点击发送给朋友');
        };
        bodyMenuShareAppMessage.success = ()=> {
            //alert('已分享');
            //self.closesharetip();
            //self.sharesuccess();
        };
        bodyMenuShareAppMessage.cancel = ()=> {
            //alert('已取消');
            //self.closesharetip();

        };
        bodyMenuShareAppMessage.fail = (res)=> {
            // alert(JSON.stringify(res));
        };
        wx.onMenuShareAppMessage(bodyMenuShareAppMessage);
        // alert('已注册获取“发送给朋友”状态事件');
    }

    private static inst: SharePage;
    public static _i(): SharePage
    {
        if(this.inst == null)
        {
            this.inst = new SharePage();
        }

        return this.inst;
    }

}