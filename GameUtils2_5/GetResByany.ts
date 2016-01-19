/**
 * Created by pior on 15/12/22.
 */

module GameUtil
{
    export class GetResByany extends egret.DisplayObjectContainer {
        private imgUrl:string;
        private imag:egret.Bitmap;
        private imgwidth:number;
        private imgheight:number;

        public constructor(url:string, imgwidth:number = 0, imgheight:number = 0) {
            super();
            this.imgUrl = url;
            this.imgwidth = imgwidth;
            this.imgheight = imgheight;
            this.init();
        }

        private init():void {
            RES.getResAsync(this.imgUrl, this.comp, this);
        }

        private comp(data:any):void {
            this.imag = new egret.Bitmap();
            this.imag.texture = <egret.Texture>data;
            this.addChild(this.imag);

            if (this.imgwidth != 0) {
                this.imag.width = this.imgwidth;
            }
            if (this.imgheight != 0) {
                this.imag.height = this.imgheight;
            }
            this.imag.anchorOffsetX = this.imgwidth/2;
            this.imag.anchorOffsetY = this.imgheight/2;
        }
    }
}