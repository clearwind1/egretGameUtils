/**
 * 单选按钮
 * Created by pior on 15/11/10.
 */

module GameUtil
{
    export class RadioButton extends egret.DisplayObjectContainer
    {

        private normalTexture: string;
        private selectTexture: string;

        private item: any[] = [];

        private curseltTag: number = 0;

        private itemCount: number = -1;

        public constructor(normalt:string,selectt:string)
        {
            super();

            this.normalTexture = normalt;
            this.selectTexture = selectt;

            this.init();
        }
        private init()
        {

        }

        public addItem(item:any,pox:number,poy:number):void
        {
            this.itemCount++;

            var itemcon: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
            var itembtn: GameUtil.Menu = new GameUtil.Menu(this,this.normalTexture,this.normalTexture,this.chooseButton,[this.itemCount]);
            itembtn.x = pox;
            itembtn.y = poy;
            itemcon.addChild(itembtn);
            item.x = pox + itembtn.width/2 + item.width/2;
            item.y = poy;
            itemcon.addChild(item);

            this.item.push(itembtn);
            this.addChild(itemcon);

            if(this.itemCount == 0)
            {
                itembtn.setButtonTexture(this.selectTexture,this.selectTexture);
            }
        }

        private chooseButton(tag:any):void
        {
            if(tag != this.curseltTag)
            {
                var itembtn: GameUtil.Menu = this.item[tag];
                itembtn.setButtonTexture(this.selectTexture,this.selectTexture);

                var lastbtn: GameUtil.Menu = this.item[this.curseltTag];
                lastbtn.setButtonTexture(this.normalTexture,this.normalTexture);

                this.curseltTag = tag;
            }

        }

        public getCurSelectTag():number
        {
            return this.curseltTag;
        }
    }
}