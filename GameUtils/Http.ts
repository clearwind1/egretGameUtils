/**
 * Created by pior on 15/9/29.
 * 封装egret Http类
 */

module GameUtil
{
    export class Http
    {
        private urlLoader: egret.URLLoader;
        private urlRequest: egret.URLRequest;
        private onLoader: Function;
        private thisObj: any;

        public constructor(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT)
        {
            this.init(reqMethod,dataFormat);
        }

        private init(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT):void
        {
            this.urlLoader = new egret.URLLoader();
            this.urlLoader.dataFormat = dataFormat;
            this.urlLoader.addEventListener( egret.Event.COMPLETE, this.loaded, this );

            this.urlRequest = new egret.URLRequest();
            this.urlRequest.method = reqMethod;
        }

        private loaded(event:egret.Event):void
        {
            this.urlLoader.removeEventListener(egret.Event.COMPLETE,this.loaded,this);

            var data:any = JSON.parse(this.urlLoader.data);
            if(this.onLoader != null)
            {
                this.onLoader.apply(this.thisObj,[data]);
            }
        }

        public send( param:any, file?:string, loaded:Function = null, thisObj:any = null):void
        {
            this.urlRequest.url = "Http://"+GameUtil.GameConfig.IP+file;
            this.onLoader = loaded;
            this.thisObj = thisObj;
            var urlVariables:egret.URLVariables = new egret.URLVariables( GameUtil.objectToString( param ) );
            this.urlRequest.data = urlVariables;
            this.urlLoader.addEventListener( egret.Event.COMPLETE, this.loaded, this );

            this.urlLoader.load( this.urlRequest );
        }

        private static _instance:Http;

        public static getinstance(reqMethod:string=egret.URLRequestMethod.POST,dataFormat:string=egret.URLLoaderDataFormat.TEXT):Http
        {
            if( null == Http._instance )
            {
                Http._instance = new Http(reqMethod,dataFormat);
            }
            return Http._instance;
        }

    }
}