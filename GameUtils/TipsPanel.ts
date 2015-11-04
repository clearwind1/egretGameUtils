/**
 * 提示框
 * Created by pior on 15/10/28.
 */

module GameUtil
{
    export class TipsPanel extends egret.DisplayObjectContainer
    {
        private textsize:number = 30;
        private tipText:string;
        private tipbg:egret.Bitmap;
        private text:egret.TextField;
        private tipImg:string;
        private bDisappear:boolean;
        private disSecond:number;

        public mStageW = egret.MainContext.instance.stage.stageWidth;
        public mStageH = egret.MainContext.instance.stage.stageHeight;

        public constructor(tipimg:string,tipText:string,disp:boolean=false,sec:number=1200)
        {
            super();
            this.tipText = tipText;
            this.tipImg = tipimg;
            this.bDisappear = disp;
            this.disSecond = sec;

            this.init();
        }
        public init():void
        {
            if(!this.bDisappear) {
                var coverbg:egret.Shape = GameUtil.createRect(0, 0, 480, 800, 0.4);
                this.addChild(coverbg);
                this.touchEnabled = true;
            }

            this.tipbg = createBitmapByName(this.tipImg);
            this.tipbg.x = this.mStageW/2;
            this.tipbg.y = this.mStageH/2;
            this.addChild(this.tipbg);

            this.showtip();
            if(!this.bDisappear)
            {
                this.showbutton();
            }
            else
            {
                var tw = egret.Tween.get(this);
                tw.to({alpha:0},this.disSecond).call(this.close,this);
            }

        }

        private showtip():void
        {
            this.text = createTextField(this.mStageW/2,this.mStageH/2,this.textsize);
            this.text.text = this.tipText;
            this.addChild(this.text);
        }
        public setTextwidth(width:number):void
        {
            this.text.width = width;
        }
        public setTextSize(size:number):void
        {
            this.text.size = size;
        }

        private showbutton():void
        {
            var surebtn:Menu = new Menu(this,"acceptBtn_png","acceptBtn_png",this.close);
            surebtn.x = this.mStageW/2;
            surebtn.y = this.mStageH/2 + this.tipbg.texture.textureHeight/2;
            this.addChild(surebtn);
            surebtn.setScaleMode();
        }

        private close():void
        {
            this.parent.removeChild(this);
        }

    }
}