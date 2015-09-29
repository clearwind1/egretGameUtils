/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{

    export function getIP():string
    {
        var IP:string = "192.168.0.1";
        IP = "httpbin.org/";
        return IP;
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