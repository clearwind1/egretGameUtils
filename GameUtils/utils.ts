/**
 * Created by yang on 15/9/20.
 */
module GameUtil
{
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

}