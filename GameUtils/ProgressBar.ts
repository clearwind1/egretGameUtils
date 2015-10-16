/**
 * 进度条类
 * Created by pior on 15/10/8.
 */

module GameUtil
{
    export class ProgressBar extends egret.DisplayObjectContainer
    {

        private progressbar: egret.Bitmap;
        private mPercent: number = 100;

        public constructor(imagename:string,x:number,y:number,rect:egret.Rectangle,anchorX:number = 0,anchorY:number = 0.5)
        {
            super();
            this.init(imagename,x,y,rect,anchorX,anchorY);
        }

        private init(imagename:string,x:number,y:number,rect:egret.Rectangle,anchorX:number,anchorY:number):void
        {
            this.progressbar = GameUtil.createBitmapByName(imagename);
            this.addChild(this.progressbar);
            this.progressbar.x = x;
            this.progressbar.y = y;
            this.progressbar.scale9Grid = rect;
            this.progressbar.anchorX = anchorX;
            this.progressbar.anchorY = anchorY;
        }

        public setbarX(x:number):void
        {
            this.progressbar.x = x;
        }

        public setbarY(y:number):void
        {
            this.progressbar.y = y;
        }

        public setPercent(percent:number):void
        {
            if(percent < 0) return;

            this.mPercent = percent;
            this.updateWidth();
        }
        public getPercent():number
        {
            return this.mPercent;
        }

        private updateWidth():void
        {
            this.progressbar.width = this.progressbar.texture.textureWidth*this.mPercent;
        }
    }
}