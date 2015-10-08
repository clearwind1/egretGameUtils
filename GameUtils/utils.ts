/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{

    //游戏配置
    export class GameConfig
    {
        public static IP:string = "localhost:8080/";        //http连接地址
        public static bRunFPS:boolean = false;              //是否显示FPS
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

}