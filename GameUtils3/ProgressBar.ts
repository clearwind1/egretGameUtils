/**
 * 进度条类
 * Created by pior on 15/10/8.
 */

module GameUtil
{
    export class ProgressBar extends egret.DisplayObjectContainer
    {

        private progressbar: GameUtil.MyBitmap;
        private mPercent: number = 100;

        /**
         * 创建一个进度条
         * @param imagename {string} 进度条图片文件名
         * @param x {number} 进度条X轴坐标
         * @param y {number} 进度条Y轴坐标
         * @param rect {egret.Rectangle} 进度条的九宫格矩形
         * @param anchorX {number} X轴锚点
         * @param anchorY {number} Y轴锚点
         */
        public constructor(imagename:string,x:number,y:number,rect:egret.Rectangle,anchorX:number = 0,anchorY:number = 0.5)
        {
            super();
            this.init(imagename,x,y,rect,anchorX,anchorY);
        }

        private init(imagename:string,x:number,y:number,rect:egret.Rectangle,anchorX:number,anchorY:number):void
        {
            this.progressbar = new GameUtil.MyBitmap(RES.getRes(imagename),x,y);
            this.addChild(this.progressbar);
            this.progressbar.scale9Grid = rect;
            this.progressbar.setanchorOff(anchorX,anchorY);
        }

        /**
         * 设置进度条X轴坐标
         * @param x
         */
        public setbarX(x:number):void
        {
            this.progressbar.x = x;
        }

        /**
         * 设置进度条Y轴坐标
         * @param y
         */
        public setbarY(y:number):void
        {
            this.progressbar.y = y;
        }

        /**
         * 设置进度条百分比
         * @param percent {number} 进度条百分比
         */
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

        /**
         * 更新显示进度条
         */
        private updateWidth():void
        {
            this.progressbar.width = this.progressbar.texture.textureWidth*this.mPercent;
        }
    }
}