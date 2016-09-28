/**
 * Created by pior on 16/3/14.
 */

class AdaptGamelayer extends GameUtil.BassPanel
{
    private maxheight: number;

    public constructor()
    {
        super();
    }

    public initlayer(maxheight:number)
    {
        this.maxheight = maxheight;
    }

    public putItme(child:egret.DisplayObject)
    {
        this.addChild(child);
    }

    public adpat(bscalex:boolean = true)
    {
        var sc: number = 1;
       // console.log('adh=====',this.$getHeight(),'maxh======',this.maxheight);
        if(this.$getHeight()> this.maxheight)
        {
            sc = this.maxheight/this.$getHeight();
            if(bscalex){
                this.scaleX = this.scaleY = sc;
            }
            else
            {
                this.scaleY = sc;
            }

        }

        var disw: number = (this.mStageW-this.$getWidth()*this.scaleX)/2;
        this.x = disw;
    }


    private static inst: AdaptGamelayer;
    public static _i(): AdaptGamelayer
    {
        if(this.inst == null){
            this.inst = new AdaptGamelayer();
        }

        return this.inst;
    }

}