/**
 * Created by pior on 16/1/19.
 */
module GameUtil
{
    export class MyTextField extends egret.TextField
    {
        private anchorX:number;
        private anchorY:number;

        public constructor(x:number,y:number,size:number,anchorX:number=0.5,anchorY:number=0.5)
        {
            super();
            this.init(x,y,size,anchorX,anchorY);
        }

        private init(x:number,y:number,size:number,anchorX:number,anchorY:number)
        {
            this.textColor = 0x000000;
            this.fontFamily = '楷体';
            this.$setX(x);
            this.$setY(y);
            this.$setSize(size);
            this.anchorX = anchorX;
            this.anchorY = anchorY;
        }

        public setText(text:string)
        {
            this.text = text;
            this.setanchorOff(this.anchorX,this.anchorY);
        }

        public setSize(size:number)
        {
            //console.log("size====",size,"this.$getHeight()======",this.$getHeight(),"any====",this.anchorY);
            this.size = size;
            this.setanchorOff(this.anchorX,this.anchorY);
        }

        public setanchorOff(anchorx:number,anchory:number)
        {
            this.anchorOffsetX = this.$getWidth()*anchorx;
            this.anchorOffsetY = this.$getHeight()*anchory;
        }

    }
}