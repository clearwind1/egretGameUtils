/**
 * Created by pior on 15/9/29.
 */
module GameUtil
{

    /**
     * 加载进度界面
     * Process interface loading
     */
    export class LoadingPanel extends GameUtil.BassPanel
    {
        private loadingView:LoadingUI;
        private loadingbar: egret.Bitmap;
        private loadedfun: Function;
        private thisObj: any;
        private imageUrl:string;

        public constructor(fun:Function,obj:any,url:string="loadingbar.png")
        {
            this.loadedfun = fun;
            this.thisObj = obj;
            this.imageUrl = "/resource/assets/" + url;
            super();
        }

        public init():void
        {
            RES.getResByUrl(this.imageUrl,this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);

        }
        private onComplete(event:any):void
        {

            this.y = this.mStageH - 200;
            var img: egret.Texture = <egret.Texture>event;
            this.loadingbar = new egret.Bitmap(img);
            this.loadingbar.anchorX = 0;
            var w:number = this.loadingbar.texture.textureWidth-8;
            var h:number = this.loadingbar.texture.textureHeight-8;
            var rect:egret.Rectangle = new egret.Rectangle(4,4,w,h);
            this.loadingbar.scale9Grid = rect;
            this.addChild(this.loadingbar);

            this.loadingbar.width = 10;

            //console.log("thiswidth=======",this.width);

            //egret.MainContext.instance.stage.addChild(this);

            this.loadingRes();
        }

        private loadingRes():void
        {
            //设置加载进度界面
            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);

            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/resource.json", "resource/");
        }

        /**
         * 配置文件加载完成,开始预加载preload资源组。
         * configuration file loading is completed, start to pre-load the preload resource group
         */
        private onConfigComplete(event:RES.ResourceEvent):void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload");
        }

        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        private onResourceLoadComplete(event:RES.ResourceEvent):void {
            if (event.groupName == "preload") {
                this.stage.removeChild(this.loadingView);
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

                if(GameUtil.GameConfig.bRunFPS)
                    egret.Profiler.getInstance().run();

                this.loadedfun.apply(this.thisObj);
            }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onResourceLoadError(event:RES.ResourceEvent):void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.onResourceLoadComplete(event);
        }

        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        private onResourceProgress(event:RES.ResourceEvent):void {
            if (event.groupName == "preload") {
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
                this.setPro(event.itemsLoaded/event.itemsTotal);
            }
        }

        public setPro(persend:number):void
        {
            this.loadingbar.width = this.loadingbar.texture.textureWidth*persend;
            //console.log("this.width=====",this.width);
        }

        public getPro():number
        {
            return this.loadingbar.width/this.loadingbar.texture.textureWidth;
        }

    }
}