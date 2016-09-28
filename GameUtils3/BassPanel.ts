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
        private static nextScene:egret.DisplayObjectContainer = null;
        private static MainStage:egret.Stage = null;

        /**
         * 初始化场景类
         * @param stage
         */
        public static init(stage:egret.Stage):void
        {
            this.MainStage = stage;
        }

        /**
         * 切换场景
         * @param scene {egret.DisplayObjectContainer} 所要切换到的场景
         * @param transtype {number} 切换场景时的动画类型
         * @param duration {number} 切换场景的时间
         */
        public static runscene(scene:egret.DisplayObjectContainer,transtype:number=GameConfig.NullAction,duration:number=800):void
        {

            if(this.curScene == null)
            {
                //console.log("curscenenull");
                this.curScene = scene;

                this.MainStage.addChild(this.curScene);
                return;
            }

            if(transtype == GameConfig.NullAction)
            {
                //console.log("curscenenullaction");
                if(this.curScene != null)
                {
                    this.MainStage.removeChild(this.curScene);
                }

                this.curScene = scene;

                this.MainStage.addChild(this.curScene);
                return;
            }
            else
            {
                this.nextScene = scene;
                this.MainStage.addChild(this.nextScene);

                //场景动画
                if(transtype == GameConfig.TransAlpha)
                {
                    this.nextScene.alpha = 0;

                    egret.Tween.get(this.curScene).to({alpha:0},duration);
                    egret.Tween.get(this.nextScene).to({alpha:1},duration);
                }
                if(transtype == GameConfig.CrossLeft)
                {
                    this.nextScene.x = -this.MainStage.stageWidth;

                    egret.Tween.get(this.curScene).to({x:this.MainStage.stageWidth},duration);
                    egret.Tween.get(this.nextScene).to({x:0},duration);
                }
                if(transtype == GameConfig.OpenDoor)
                {
                    //console.log("cursceneopendoor");
                }

                var local = this;
                egret.setTimeout(function(){
                    local.MainStage.removeChild(local.curScene);
                    local.curScene = local.nextScene;
                },this,duration);

            }
        }

    }
}