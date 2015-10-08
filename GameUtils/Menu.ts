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
        private param:any[];//回调参数
        private thisObj;
        private btnImg: egret.Bitmap;

        private bScaleMode: boolean = false;

        public constructor(context: any, normal: string, select: string, backFun: Function = null,param:any[] = null)
        {
            super();
            this.thisObj = context;
            this.param = param;
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

        public setScaleMode():void
        {
            this.bScaleMode = true;
        }

        private TouchBegin(event:egret.TouchEvent):void
        {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
            if(this.bScaleMode)
            {
                this.btnImg.scaleX = this.btnImg.scaleY = 0.9;
            }
        }
        private TouchMove(event:egret.TouchEvent):void
        {
            //console.log("touchmove");
        }
        private TouchEnd(event:egret.TouchEvent):void
        {
            //console.log("touchend");
            this.btnImg.texture = this.menuNormalTexture;
            if(this.bScaleMode)
            {
                this.btnImg.scaleX = this.btnImg.scaleY = 1;
            }

            this.backFun.apply(this.thisObj,this.param);

        }
        private TouchCancel(event:egret.TouchEvent):void
        {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
            if(this.bScaleMode)
            {
                this.btnImg.scaleX = this.btnImg.scaleY = 1;
            }
        }
    }
}