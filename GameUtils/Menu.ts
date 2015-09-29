/**
 * 菜单，按钮类
 * Created by pior on 15/9/28.
 */
module GameUtil
{
    /*
     *创建按钮
     */
    export class Menu extends egret.DisplayObjectContainer
    {
        private menuNormalTexture:egret.Texture = null;
        private menuSelectTexture:egret.Texture = null;
        private backFun: Function;
        private param = { context: null, data: null };//回调参数
        private btnImg: egret.Bitmap;

        public constructor(context: any, normal: string, select: string, backFun: Function = null)
        {
            super();
            this.param = context;
            this.init(normal,select,backFun);
        }

        private init(normal: string, select: string, backFun: Function = null)
        {

            this.anchorX = this.anchorY = 0.5;

            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new egret.Bitmap();
            this.btnImg.texture = this.menuNormalTexture;
            this.addChild(this.btnImg);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.TouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.TouchEnd,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.TouchCancel,this);
        }

        private TouchBegin(event:egret.TouchEvent):void
        {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
        }
        private TouchMove(event:egret.TouchEvent):void
        {
            //console.log("touchmove");
        }
        private TouchEnd(event:egret.TouchEvent):void
        {
            //console.log("touchend");
            this.btnImg.texture = this.menuNormalTexture;

            this.backFun.apply(this.param.context,[this.param.data]);

        }
        private TouchCancel(event:egret.TouchEvent):void
        {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
        }
    }
}