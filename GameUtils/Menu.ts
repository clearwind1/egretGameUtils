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
        private mScale: number = 0.9;

        private mTextField: egret.TextField;

        /**
         * 创建菜单按钮类
         * @param context {any} 按钮所在stage
         * @param normal {string} 按钮普通状态下的图片文件名
         * @param select {string} 按钮选中状态下的图片文件名
         * @param backFun {Function} 按钮绑定的事件函数
         * @param param {any[]} 按钮绑定的事件函数的参数
         */
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

            this.mTextField = createTextField(this.btnImg.texture.textureWidth/2,this.btnImg.texture.textureHeight/2,20);
            this.mTextField.text = "";
            this.addChild(this.mTextField);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.TouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.TouchEnd,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.TouchCancel,this);
        }

        /**
         * 设置按钮的缩放模式，按钮状态只做缩放时可使用
         * @param scale {number} 缩放大小
         */
        public setScaleMode(scale:number = 0.9):void
        {
            this.bScaleMode = true;
            this.mScale = scale;
        }

        /**
         * 设置按钮文字
         * @param text {string} 文字
         * @param size {number} 文字大小
         * @param color {number} 文字颜色
         * @param stroke {number} 文字描边大小
         * @param strokeColor {number} 文字描边颜色
         */
        public setTextField(text:string,size:number = 20,color:number = 0x000000,stroke:number = 0,strokeColor:number = 0x000000):void
        {
            this.mTextField.text = text;
            this.mTextField.size = size;
            this.mTextField.textColor = color;
            this.mTextField.stroke = stroke;
            this.mTextField.strokeColor = strokeColor;
        }

        private TouchBegin(event:egret.TouchEvent):void
        {
            //console.log("touchbegin");
            this.btnImg.texture = this.menuSelectTexture;
            if(this.bScaleMode)
            {
                this.scaleX = this.scaleY = this.mScale;
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
                this.scaleX = this.scaleY = 1;
            }

            this.backFun.apply(this.thisObj,this.param);

        }
        private TouchCancel(event:egret.TouchEvent):void
        {
            //console.log("touchcancel");
            this.btnImg.texture = this.menuNormalTexture;
            if(this.bScaleMode)
            {
                this.scaleX = this.scaleY = 1;
            }
        }
    }
}