/**
 * 基础面板类
 * Created by pior on 15/9/28.
 */
module GameUtil
{
    export class BassPanel extends egret.DisplayObjectContainer
    {

        public mStageW = egret.MainContext.instance.stage.stageWidth;
        public mStageH = egret.MainContext.instance.stage.stageHeight;

        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        }
        private onAddToStage(event:egret.Event):void
        {
            this.init();
        }
        public init():void
        {

        }
    }

    /*
     *场景类
     */
    export class GameScene
    {
        private static curScene:egret.DisplayObjectContainer = null;
        private static MainStage:egret.Stage = null;

        public static init(stage:egret.Stage):void
        {
            this.MainStage = stage;
        }
        public static runscene(scene:egret.DisplayObjectContainer):void
        {
            if(this.curScene != null)
            {
                this.MainStage.removeChild(this.curScene);
            }

            this.curScene = scene;

            this.MainStage.addChild(this.curScene);
        }

    }
}