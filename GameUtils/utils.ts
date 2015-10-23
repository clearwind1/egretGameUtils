/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{

    //游戏配置
    export class GameConfig
    {
        public static IP:string = "localhost:8080/";        //http连接地址
        public static bRunFPS:boolean = true;              //是否显示FPS

        //场景转换
        public static NullAction:number = 0;            //无动画
        public static CrossLeft:number = 1;             //从左往右
        public static TransAlpha:number = 2;            //淡入淡出
    }

    /**
     * 创建一张位图
     * @param name {string} 位图文件名
     * @returns {egret.Bitmap} 位图
     */
    export function createBitmapByName(name:string):egret.Bitmap
    {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorX = result.anchorY = 0.5;
        return result;
    }

    /**
     * 创建文字
     * @param x {number} x轴坐标
     * @param y {number} y轴坐标
     * @param size {number} 大小
     * @param anchorX {number} X轴锚点
     * @param anchorY {number} Y轴锚点
     * @param align {string} 对齐方式
     * @returns {egret.TextField} 文字
     */
    export function createTextField(x:number,y:number,size:number,anchorX:number=0.5,anchorY:number=0.5,align:string="center"):egret.TextField
    {
        var textfiled:egret.TextField = new egret.TextField();
        textfiled.x = x;
        textfiled.y = y;
        textfiled.anchorX = anchorX;
        textfiled.anchorY = anchorY;
        textfiled.size = size;
        textfiled.textAlign = align;
        return textfiled;
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
     * 数字向上飘动动画
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
        textfiled.anchorX = 0.5;
        textfiled.anchorY = 0.5;
        textfiled.size = size;
        textfiled.textAlign = "center";
        textfiled.textColor = color;
        textfiled.text = number;

        thisObj.addChild(textfiled);

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
    export function clearLocalData(key:string)
    {
        if(key != null)
        {
            egret.localStorage.removeItem(key);
        }
        else
        {
            egret.localStorage.clear();
        }

    }

}