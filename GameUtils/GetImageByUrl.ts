/**
 * 获取网络图片
 * Created by pior on 15/11/13.
 */

module GameUtil
{
    export class GetImageByUrl extends egret.DisplayObjectContainer
    {
        private imgUrl:string;
        private imag: egret.Bitmap;
        private imgwidth: number;
        private imgheight:number;

        public constructor(url:string,imgwidth:number = 0,imgheight:number = 0)
        {
            super();
            this.imgUrl = url;
            this.imgwidth = imgwidth;
            this.imgheight = imgheight;
            this.init();
        }

        private init():void
        {
            RES.getResByUrl(this.imgUrl,this.comp,this,RES.ResourceItem.TYPE_IMAGE);
        }
        private comp(data:any):void
        {
            this.imag = new egret.Bitmap();
            this.imag.texture = <egret.Texture>data;
            this.imag.anchorX = this.imag.anchorY = 0.5;
            this.addChild(this.imag);

            if(this.imgwidth != 0){
                this.imag.width = this.imgwidth;
            }
            if(this.imgheight != 0){
                this.imag.height = this.imgheight;
            }

        }

        public getimg():egret.Bitmap
        {
            return this.imag;
        }
    }
}