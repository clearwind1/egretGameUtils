/**
 * 等待响应
 * Created by pior on 15/11/11.
 */

module GameUtil
{
    export class WaitServerPanel extends egret.DisplayObjectContainer
    {

        private coverBg: egret.Shape;
        public constructor(alpha:number = 0)
        {
            super();
            this.init(alpha);
        }

        private init(alpha:number):void
        {
            this.coverBg = GameUtil.createRect(0,0,640,1136,0);
            this.addChild(this.coverBg);

            this.touchEnabled = true;

        }

        public setAlpha(aplha:number):void
        {
            this.coverBg.alpha = aplha;
        }


        private static _instance: WaitServerPanel;
        public static getInstace(): WaitServerPanel
        {
            if(this._instance == null)
            {
                this._instance = new GameUtil.WaitServerPanel(0);
            }

            return this._instance;
        }

    }
}