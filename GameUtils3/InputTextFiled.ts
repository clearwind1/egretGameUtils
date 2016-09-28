/**
 * Created by pior on 15/12/30.
 */
module GameUtil
{
    export class InputTextFiled extends GameUtil.MyTextField
    {
        private baseText: string;
        private baseTextAlpha: number;
        private basetextsize: number;
        private sourcesize: number;

        public constructor(x:number,y:number,size:number,width:number,height:number,anchorX:number=0.5,anchorY:number=0.5)
        {
            super(x,y,size,anchorX,anchorY);
            this.width = width;
            this.height = size;
            this.type = egret.TextFieldType.INPUT;
            this.baseText = "";

            this.addEventListener(egret.FocusEvent.FOCUS_IN, this.onFocusIn, this);
            this.addEventListener(egret.FocusEvent.FOCUS_OUT,this.onFocusOut,this);
        }

        public setBaseText(basetext:string,alpha:number)
        {
            this.baseText = basetext;
            this.baseTextAlpha = alpha;
            this.setText(this.baseText);
            this.alpha = this.baseTextAlpha;

            //console.log("height=====",this.anchorOffsetY);
        }

        public setBaseTextSize(size:number,sourcesize:number)
        {
            this.basetextsize = size;
            this.sourcesize = sourcesize;
            if(this.text == this.baseText){
                this.setSize(this.basetextsize);
                this.height = size;
            }
        }

        private onFocusIn(event:egret.FocusEvent):void
        {
            //console.log("focusein");
            if(this.text == this.baseText)
            {
                this.setText("");
                this.height = this.sourcesize;
                this.setSize(this.sourcesize);
                this.alpha = 1;
            }
        }

        private onFocusOut(event:egret.FocusEvent):void
        {
            //console.log("focuseout");
            if(this.text == "")
            {
                this.setText(this.baseText);
                this.alpha = this.baseTextAlpha;
                this.height = this.basetextsize;
                this.setSize(this.basetextsize);
            }

            //console.log("outheight=====",this.anchorOffsetY);
        }
    }
}