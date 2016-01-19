/**
 * 滚动框
 * Created by pior on 15/11/3.
 */
module GameUtil
{
    /**
     * 创建一个滚动框
     */
    export class ScrollView extends egret.DisplayObjectContainer
    {
        private scrollview: egret.ScrollView;
        private content: egret.DisplayObjectContainer;

        public constructor(swidth:number,sheight:number,speed:number=0.5)
        {
            super();
            this.scrollview = new egret.ScrollView();
            this.content = new egret.DisplayObjectContainer();
            this.addChild(this.scrollview);
            this.scrollview.width = swidth;
            this.scrollview.height = sheight;
            this.scrollview.scrollSpeed = speed;

            this.init();
        }

        private init():void
        {
            this.scrollview.setContent(this.content);
        }

        /**
         * 添加滚动元素
         * @param item {any} 元素
         */
        public putItem(item:any):void
        {
            this.content.addChild(item);
        }

        public clearItem():void
        {
            this.content.removeChildren();
        }

        public getScorllTop():number
        {
            return this.scrollview.scrollTop;
        }

        public setScorllTop(value:number):void
        {
            this.scrollview.scrollTop = value;
        }

    }
}