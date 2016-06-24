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
        private loadingbar: GameUtil.MyBitmap;
        private loadedfun: Function;
        private thisObj: any;
        private IsGif: boolean;
        private gifruncount: number;
        private gifTotalcount: number;
        private loadingbarOffX: number;
        private loadingbarOffY: number;

        private logo: GameUtil.MyBitmap;
        private shapimg: egret.Shape;

        public constructor(fun:Function,obj:any,offx=0,offy=0,isgif:boolean = false,gifTotal:number = 4)
        {
            this.loadedfun = fun;
            this.thisObj = obj;
            this.IsGif = isgif;
            this.gifTotalcount = gifTotal;
            this.loadingbarOffX = offx;
            this.loadingbarOffY = offy;
            super();
        }

        public init():void
        {
            //RES.getResByUrl(this.imageUrl,this.onComplete,this,RES.ResourceItem.TYPE_IMAGE);
            new GameUtil.LoadingLogopre(this.onComplete,this);
        }
        private onComplete(event:any):void
        {
            //console.log("onComplete");

            var shap: egret.Shape = GameUtil.createRect(0,0,this.mStageW,this.mStageH);
            this.addChild(shap);

            var loadingbg: GameUtil.MyBitmap = new GameUtil.MyBitmap(RES.getRes('loading_png'),0,0);
            loadingbg.setanchorOff(0,0);
            this.addChild(loadingbg);

            egret.Tween.get(loadingbg,{loop:true}).to({alpha:0.7},1000).to({alpha:1},1000);

            this.logo = new GameUtil.MyBitmap(RES.getRes('logo_png'),374,464);
            this.addChild(this.logo);
            this.shapimg = GameUtil.createRect(304,560,this.logo.width+20,this.logo.height+10);
            this.shapimg.$setAnchorOffsetY(this.logo.height+10);
            this.addChild(this.shapimg);
            this.logo.mask = this.shapimg;
            this.shapimg.y = 740;


            //Config to load process interface
            this.loadingView = new LoadingUI();
            this.loadingView.x = this.mStageW/2;
            this.loadingView.y = this.mStageH-100;
            this.addChild(this.loadingView);
            this.loadingView.anchorOffsetX = this.loadingView.width/2;

            if(this.IsGif){
                this.gifruncount = 0;
                this.loadingbar = new GameUtil.MyBitmap(RES.getRes("loadinggif0_png"),this.mStageW/2 + this.loadingbarOffX,this.mStageH/2 + this.loadingbarOffY);
                this.addChild(this.loadingbar);
                egret.setInterval(this.rungif,this,150);
            }
            else
            {
                this.loadingbar = new GameUtil.MyBitmap(RES.getRes("loadingbar_png"),this.loadingbarOffX,this.mStageH + 100);
                this.loadingbar.x = (this.mStageW-this.loadingbar.texture.textureWidth)/2;
                this.loadingbar.anchorOffsetX = 0;
                var w:number = this.loadingbar.texture.textureWidth-8;
                var h:number = this.loadingbar.texture.textureHeight-8;
                var rect:egret.Rectangle = new egret.Rectangle(4,4,w,h);
                this.loadingbar.scale9Grid = rect;
                this.addChild(this.loadingbar);
                this.loadingbar.width = 10;
            }

            this.loadingRes();

        }

        private rungif():void
        {
            this.gifruncount++;
            if(this.gifruncount >= this.gifTotalcount){
                this.gifruncount = 0;
            }
            this.loadingbar.setNewTexture(RES.getRes("loadinggif"+this.gifruncount+"_png"));
        }

        private loadingRes():void
        {
            //设置加载进度界面
            //初始化Resource资源加载库
            //initiate Resource loading library
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
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
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);


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

                if(!this.IsGif){
                    this.setPro(event.itemsLoaded/event.itemsTotal);
                }
                this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }

        public setPro(persend:number):void
        {
            this.loadingbar.width = this.loadingbar.texture.textureWidth*persend;
            this.shapimg.y = 740 - (180*persend);
            //console.log("this.width=====",this.width);
        }

        public getPro():number
        {
            return this.loadingbar.width/this.loadingbar.texture.textureWidth;
        }

    }
}