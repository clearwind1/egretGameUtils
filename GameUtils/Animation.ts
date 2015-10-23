/**
 * 帧动画
 * Created by pior on 15/9/28.
 */
module GameUtil
{
    export class Animation extends egret.Bitmap
    {

        private textureName: string;
        private aWidth: number;
        private aHeight: number;
        private totalNumber: number;
        private currentNumber: number = 1;
        private countNumber: number = 0;
        private frameRate: number;
        private bLoopCount: number = 0;
        private endcallfun: Function = null;
        private thisObj: any = null;

        /**
         * 创建一个帧动画。
         * @param textureName {string} 帧动画文件名的前缀。
         * @param totalNumber {number} 总帧数。
         * @param frameRate {number} 帧率。
         */
        public constructor(textureName:string,totalNumber:number,frameRate:number)
        {
            super();
            this.textureName = textureName;
            this.texture = RES.getRes(textureName+"1");
            this.aWidth = this.texture.textureWidth;
            this.aHeight = this.texture.textureHeight;
            this.totalNumber = totalNumber;
            this.frameRate = frameRate;

            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        public init(event:egret.Event):void
        {

        }

        /**
         * 设置动画循环次数，参数小于0为无限循环
         * @param bloopcount {number}
         */
        public setLoop(bloopcount:number)
        {
            if(bloopcount == 0)
                bloopcount = 1;
            this.bLoopCount = bloopcount-1;
        }

        public play():void
        {
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterHandle,this);
        }

        private onEnterHandle(event:egret.Event):void
        {

            if(this.countNumber >= this.frameRate)
            {
                this.countNumber = 0;
                this.nextFrame();
            }
            else
            {
                this.countNumber++;
            }
        }

        public stop():void
        {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterHandle,this);
        }


        private nextFrame():void
        {
            this.currentNumber++;
            if(this.currentNumber >= this.totalNumber)
            {
                this.currentNumber = 1;

                if(this.bLoopCount == 0)
                {
                    this.stop();
                    if(this.endcallfun != null)
                        this.endcallfun.apply(this.thisObj);
                    this.parent.removeChild(this);
                    return;
                }
                else if(this.bLoopCount > 0)
                {
                    this.bLoopCount--;
                }

            }

            this.texture = RES.getRes(this.textureName+this.currentNumber);
        }

        /**
         * 动画播放完毕后要执行的函数
         * @param func {Function} 所要执行的函数
         * @param thisobj {any} 执行函数的stage
         */
        public setendcall(func:Function,thisobj:any):void
        {
            this.thisObj = thisobj;
            this.endcallfun = func;
        }

    }
}