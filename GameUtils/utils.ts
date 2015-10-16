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
    }

    /*
    *根据图片名据创建位图
    */
    export function createBitmapByName(name:string):egret.Bitmap
    {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        result.anchorX = result.anchorY = 0.5;
        return result;
    }

    /*
    *创建文字
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
     * 创建矩形框
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
     * 数字上飘动画
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
     * 本地文件存储
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