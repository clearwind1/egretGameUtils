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
        public btnImg: GameUtil.MyBitmap;
        private addImg: GameUtil.MyBitmap;

        private bScaleMode: boolean = false;
        private mScale: number = 0.9;

        private mTextField: GameUtil.MyTextField;

        private isActive: boolean = false;

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
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.backFun = backFun;
            this.btnImg = new GameUtil.MyBitmap(this.menuNormalTexture,0,0);
            this.addChild(this.btnImg);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.TouchBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.TouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.TouchEnd,this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.TouchCancel,this);
        }

        public setBackFun(backFun: Function):void
        {
            this.backFun = backFun;
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
         * 设置按钮图片
         * @param normal
         * @param select
         */
        public setButtonTexture(normal: string, select: string):void
        {
            this.menuNormalTexture = RES.getRes(normal);
            this.menuSelectTexture = RES.getRes(select);
            this.btnImg.setNewTexture(this.menuNormalTexture);
        }

        public addButtonImg(img:string,offx:number=0,offy:number=0):void
        {
            this.addImg = new GameUtil.MyBitmap(RES.getRes(img),offx,offy);
            this.addChild(this.addImg);
        }
        public setAddImgTexture(img:string)
        {
            this.addImg.setNewTexture(RES.getRes(img));
        }

        public addButtonText(text:string,size:number,offx:number=0,offy:number=0):void
        {
            if(this.btnImg.texture != null){
                //console.log("fdsafdsafdsa=====",this.btnImg.texture.$getTextureWidth()/2);
                this.mTextField = new GameUtil.MyTextField(offx,offy,size);//createTextField(this.btnImg.texture.$getTextureWidth()/2+offx,this.btnImg.texture.$getTextureHeight()/2+offy,20);
            }
            else
            {
                this.mTextField = new GameUtil.MyTextField(offx,offy,size);
            }

            this.mTextField.setText(text);
            this.addChild(this.mTextField);
        }
        public getBtnText():GameUtil.MyTextField
        {
            return this.mTextField;
        }

        public setBtnScale(scaleX:number,scaleY:number):void
        {
            this.btnImg.scaleX = scaleX;
            this.btnImg.scaleY = scaleY;
        }

        private TouchBegin(event:egret.TouchEvent):void
        {
            //console.log("touchbegin");
            this.btnImg.setNewTexture(this.menuSelectTexture);
            if(this.bScaleMode)
            {
                this.scaleX = this.scaleY = this.mScale;
            }

            this.isActive = true;
        }
        private TouchMove(event:egret.TouchEvent):void
        {
            //console.log("touchmove");
        }
        private TouchEnd(event:egret.TouchEvent):void
        {
            //console.log("touchend");
            this.btnImg.setNewTexture(this.menuNormalTexture);
            if(this.bScaleMode)
            {
                this.scaleX = this.scaleY = 1;
            }

            if(this.isActive){
                this.backFun.apply(this.thisObj,this.param);
            }

            this.isActive = false;

        }
        private TouchCancel(event:egret.TouchEvent):void
        {
            //console.log("touchcancel");
            this.btnImg.setNewTexture(this.menuNormalTexture);
            if(this.bScaleMode)
            {
                this.scaleX = this.scaleY = 1;
            }
            this.isActive = false;
        }
    }
}