/**
 * 提示框
 * Created by pior on 15/10/28.
 */

module GameUtil
{
    export class TipsPanel extends BassPanel
    {
        private textsize:number;
        private tipText:string;
        private tipbg:egret.Bitmap;
        private text:egret.TextField;

        public constructor(tipText:string,size:number=30)
        {
            this.tipText = tipText;
            this.textsize = size;
            super();
        }
        public init():void
        {
            this.tipbg = createBitmapByName("alertBg_png");
            this.tipbg.x = this.mStageW/2;
            this.tipbg.y = this.mStageH/2;
            this.addChild(this.tipbg);

            this.showtip();
            this.showbutton();
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