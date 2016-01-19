/**
 * Created by pior on 15/12/30.
 */
module GameUtil
{
    export class InputTextFiled extends egret.TextField
    {
        private baseText: string;
        private baseTextAlpha: number;
        private basetextsize: number;
        private sourcesize: number;

        public constructor()
        {
            super();
            this.init();

            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onFocusOut,this);
        }

        private init()
        {
            this.baseText = "";
        }

        public setBaseText(basetext:string,alpha:number)
        {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.text = this.baseText;
            this.alpha = this.baseTextAlpha;
        }

        public setBaseTextSize(size:number,sourcesize:number)
        {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            this.size = this.basetextsize;
        }

        private onFocusIn(event:egret.FocusEvent):void
        {
            //console.log("focusein");
            if(this.text == this.baseText)
            {
                this.text = "";
                this.size = this.sourcesize;
                this.alpha = 1;
            }
        }

        private onFocusOut(event:egret.FocusEvent):void
        {
            //console.log("focuseout");
            if(this.text == "")
            {
                this.text = this.baseText;
                this.alpha = this.baseTextAlpha;
                this.size = this.basetextsize;
            }
        }
    }
}