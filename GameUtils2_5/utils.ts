/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{

    //游戏配置
    export class GameConfig
    {
        public static IP:string = "springmeeting.sxd55.com";        //http连接地址
        public static bRunFPS:boolean = false;              //是否显示FPS

        //场景转换
        public static NullAction:number = 0;            //无动画
        public static CrossLeft:number = 1;             //从左往右
        public static TransAlpha:number = 2;            //淡入淡出
        public static OpenDoor:number = 3;              //开门方式

    }

    /**
     * 创建矩形实心框
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param width {number} 长度
     * @param height {number} 高度
     * @param alpha {number} 透明度
     * @param color {number} 颜色
     * @returns {egret.Shape}
     */
    export function createRect(x:number,y:number,width:number,height:number,alpha:number=1,color:number=0x000000):egret.Shape
    {
        var shp:egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill(color,alpha);
        shp.graphics.drawRect(0,0,width,height);
        shp.graphics.endFill();
        return shp;
    }


    export function createCircle(x:number,y:number,r:number,alpha:number=1,color:number=0x000000):egret.Shape
    {
        var shp:egret.Shape = new egret.Shape();
        shp.x = x;
        shp.y = y;
        shp.graphics.beginFill( color, alpha);
        shp.graphics.drawCircle( 0, 0, r );
        shp.graphics.endFill();
        return shp;
    }

    /**
     * 将Object转化成 =& post字符串;
     * @param postData
     * @returns {string}
     */
    export function objectToString( postData ):string
    {
        var s = '';
        for( var key in postData )
        {
            var k_v = key + '=' + postData[key];
            s += k_v + '&';
        }
        s = s.substr( 0, s.length - 1 );
        return s;
    }

    /**
     * 正则表达式判断是否为中文
     * @param name
     * @returns {boolean}
     */
    export function isChineseName( name:string ):boolean
    {
        return /^[\u4e00-\u9fa5]+$/.test( name );
    }

    export function removeimag(name:string):string
    {

        name = name.replace(/^/, '');
        return name;
    }

    /**
     * 正则表达式判断是否为手机号码
     * @param num
     * @returns {boolean}
     */
    export function  isPhoneNum( num:string ):boolean
    {
        num = num.toUpperCase();
        return /^0\d{2,3}-?\d{7,11}$|^1\d{10}$/.test( num );
    }

    /**
     * 数字向上飘动动画（待改进，向指定地方移动）
     * @param thisObj
     * @param x
     * @param y
     * @param size
     * @param number
     * @param color
     */
    export function numberUpDisp(thisObj:any,x:number,y:number,size:number,number:string,color:number)
    {
        var textfiled:egret.TextField = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;

        thisObj.addChild(textfiled);

        textfiled.anchorOffsetX = 0.5*textfiled.width;
        textfiled.anchorOffsetY = 0.5*textfiled.height;

        egret.Tween.get(textfiled).to({y:y-40},700);
        egret.Tween.get(textfiled).to({alpha:0},700).call(function(){thisObj.removeChild(textfiled);},thisObj);
    }

    /**
     * 本地文件操作
     * @param key {string} 文件的关键字
     * @param data {string} 文件内容
     */
    export function saveLocalData(key:string,data:string)
    {
        egret.localStorage.setItem(key,data);
    }
    export function readLocalData(key:string)
    {
        egret.localStorage.getItem(key);
    }
    export function clearLocalData(key:string) {
        if (key != null) {
            egret.localStorage.removeItem(key);
        }
        else {
            egret.localStorage.clear();
        }

    }

    /**
     * 获取当前链接参数
     * @param name 参数名
     */
    export function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]); return null;
    }

}