/**
 * 等待响应
 * Created by pior on 15/11/11.
 */

module GameUtil
{
    export class WaitServerPanel extends GameUtil.BassPanel
    {

        private coverBg: egret.Shape;
        private curalpha: number;
        public constructor(alpha:number = 0)
        {
            this.curalpha = alpha;
            super();
        }

        public init()
        {
            this.coverBg = GameUtil.createRect(0,0,this.mStageW,this.mStageH,this.curalpha);
            this.addChild(this.coverBg);

            this.touchEnabled = true;

            var img: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('welcomeball_png'),this.mStageW/2,this.mStageH/2);
            img.setScale(0.5);
            this.addChild(img);

            egret.Tween.get(img,{loop:true}).to({rotation:359},1000);

        }

        public setAlpha(aplha:number):void
        {
            this.coverBg.alpha = aplha;
        }
    }
}