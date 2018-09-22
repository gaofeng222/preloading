(function($){
    function PreLoad(imgs,options){
        this.imgs = ( typeof imgs === "string" ) ? [imgs] : imgs;
        this.opts = $.extend({},PreLoad.DEFAULT,options);

        this._unoredered();
    }
    PreLoad.DEFAULT = {
        each : null, //每张图片加载完毕后执行
        all : null//所有图片加载完毕后执行
    }
    PreLoad.prototype._unoredered = function(){
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs,function(i,src){
            if(typeof src != 'string'){
                return;
            }
            var imgObject = new Image();
            $(imgObject).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len-1){
                   opts.all && opts.all();
                }
                count++;
            })
            imgObject.scr = src;
        })
    }
    $.extend({
        preload : function(imgs,opts){
            new PreLoad(imgs,opts)
        }
    })
})(jQuery)