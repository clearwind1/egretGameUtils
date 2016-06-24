/**
 * Created by pior on 16/6/24.
 */
class SoundPlayer
{
    private soundname: string;
    private times: number;
    public constructor(soundname:string,times:number=1)
    {
        this.soundname = soundname;
        this.times = times;
        this.startload();
    }

    private startload()
    {
        var self:any = this;
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.addEventListener(egret.Event.COMPLETE, function loadOver(event:egret.Event) {
            var sound:egret.Sound = loader.data;
            sound.play(0,self.times);
        }, this);
        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
        loader.load(new egret.URLRequest("resource/sound/"+this.soundname));
    }

}