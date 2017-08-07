/*! js-url - v2.4.0 - 2017-02-13 */!function(){var a=function(){function a(){}function b(a){return decodeURIComponent(a.replace(/\+/g," "))}function c(a,b){var c=a.charAt(0),d=b.split(c);return c===a?d:(a=parseInt(a.substring(1),10),d[a<0?d.length+a:a-1])}function d(a,c){for(var d=a.charAt(0),e=c.split("&"),f=[],g={},h=[],i=a.substring(1),j=0,k=e.length;j<k;j++)if(f=e[j].match(/(.*?)=(.*)/),f||(f=[e[j],e[j],""]),""!==f[1].replace(/\s/g,"")){if(f[2]=b(f[2]||""),i===f[1])return f[2];h=f[1].match(/(.*)\[([0-9]+)\]/),h?(g[h[1]]=g[h[1]]||[],g[h[1]][h[2]]=f[2]):g[f[1]]=f[2]}return d===a?g:g[i]}return function(b,e){var f,g={};if("tld?"===b)return a();if(e=e||window.location.toString(),!b)return e;if(b=b.toString(),f=e.match(/^mailto:([^\/].+)/))g.protocol="mailto",g.email=f[1];else{if((f=e.match(/(.*?)\/#\!(.*)/))&&(e=f[1]+f[2]),(f=e.match(/(.*?)#(.*)/))&&(g.hash=f[2],e=f[1]),g.hash&&b.match(/^#/))return d(b,g.hash);if((f=e.match(/(.*?)\?(.*)/))&&(g.query=f[2],e=f[1]),g.query&&b.match(/^\?/))return d(b,g.query);if((f=e.match(/(.*?)\:?\/\/(.*)/))&&(g.protocol=f[1].toLowerCase(),e=f[2]),(f=e.match(/(.*?)(\/.*)/))&&(g.path=f[2],e=f[1]),g.path=(g.path||"").replace(/^([^\/])/,"/$1").replace(/\/$/,""),b.match(/^[\-0-9]+$/)&&(b=b.replace(/^([^\/])/,"/$1")),b.match(/^\//))return c(b,g.path.substring(1));if(f=c("/-1",g.path.substring(1)),f&&(f=f.match(/(.*?)\.(.*)/))&&(g.file=f[0],g.filename=f[1],g.fileext=f[2]),(f=e.match(/(.*)\:([0-9]+)$/))&&(g.port=f[2],e=f[1]),(f=e.match(/(.*?)@(.*)/))&&(g.auth=f[1],e=f[2]),g.auth&&(f=g.auth.match(/(.*)\:(.*)/),g.user=f?f[1]:g.auth,g.pass=f?f[2]:void 0),g.hostname=e.toLowerCase(),"."===b.charAt(0))return c(b,g.hostname);a()&&(f=g.hostname.match(a()),f&&(g.tld=f[3],g.domain=f[2]?f[2]+"."+f[3]:void 0,g.sub=f[1]||void 0)),g.port=g.port||("https"===g.protocol?"443":"80"),g.protocol=g.protocol||("443"===g.port?"https":"http")}return b in g?g[b]:"{}"===b?g:void 0}}();"function"==typeof window.define&&window.define.amd?window.define([],function(){return a}):("undefined"!=typeof window.jQuery&&window.jQuery.extend({url:function(a,b){return window.url(a,b)}}),window.url=a)}();
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.SoundCloudAudio=t()}}(function(){return function t(e,i,n){function o(s,a){if(!i[s]){if(!e[s]){var l="function"==typeof require&&require;if(!a&&l)return l(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var p=i[s]={exports:{}};e[s][0].call(p.exports,function(t){var i=e[s][1][t];return o(i?i:t)},p,p.exports,t,e,i,n)}return i[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,e,i){"use strict";function n(t){s||(s=document.createElement("a")),s.href=t||"";for(var e={},i=0,n=a.length;i<n;i++){var o=a[i];e[o]=s[o]}return e}function o(t,e,i){var o=n(t),r=/\?(?:.*)$/,s=r.test(o.search)?"&":"?",a=o.protocol+"//"+o.host+o.port+o.pathname+o.search+s+e+"="+i+o.hash;return a}function r(t){if(!(this instanceof r))return new r(t);if(!t)throw new Error("SoundCloud API clientId is required, get it - https://developers.soundcloud.com/");this._events={},this._clientId=t,this._baseUrl="https://api.soundcloud.com",this.playing=!1,this.duration=0,this.audio=document.createElement("audio")}var s,a="protocol hostname host pathname port search hash href".split(" ");r.prototype.resolve=function(t,e){if(!t)throw new Error("SoundCloud track or playlist url is required");var i=this._baseUrl+"/resolve.json?url="+encodeURIComponent(t)+"&client_id="+this._clientId;this._json(i,function(i){if(this.cleanData(),Array.isArray(i)){var o=i;i={tracks:o},this._playlist=i}else if(i.tracks)this._playlist=i;else{this._track=i;var r=n(t);this._track.stream_url+=r.hash}this.duration=i.duration&&!isNaN(i.duration)?i.duration/1e3:0,e(i)}.bind(this))},r.prototype._jsonp=function(t,e){var i=document.getElementsByTagName("script")[0]||document.head,n=document.createElement("script"),r="jsonp_callback_"+(new Date).valueOf()+Math.floor(1e3*Math.random());window[r]=function(t){n.parentNode&&n.parentNode.removeChild(n),window[r]=function(){},e(t)},n.src=o(t,"callback",r),i.parentNode.insertBefore(n,i)},r.prototype._json=function(t,e){var i=new XMLHttpRequest;i.open("GET",t),i.onreadystatechange=function(){if(4===i.readyState&&200===i.status){var t={};try{t=JSON.parse(i.responseText)}catch(t){}e(t)}},i.send(null)},r.prototype.on=function(t,e){this._events[t]=e,this.audio.addEventListener(t,e,!1)},r.prototype.off=function(t,e){this._events[t]=null,this.audio.removeEventListener(t,e)},r.prototype.unbindAll=function(){for(var t in this._events){var e=this._events[t];e&&this.off(t,e)}},r.prototype.preload=function(t){this._track={stream_url:t},this.audio.src=o(t,"client_id",this._clientId)},r.prototype.play=function(t){t=t||{};var e;if(t.streamUrl)e=t.streamUrl;else if(this._playlist){var i=this._playlist.tracks.length;if(i){if(this._playlistIndex=t.playlistIndex||0,this._playlistIndex>=i||this._playlistIndex<0)return void(this._playlistIndex=0);e=this._playlist.tracks[this._playlistIndex].stream_url}}else this._track&&(e=this._track.stream_url);if(!e)throw new Error("There is no tracks to play, use `streamUrl` option or `load` method");e=o(e,"client_id",this._clientId),e!==this.audio.src&&(this.audio.src=e),this.playing=e,this.audio.play()},r.prototype.pause=function(){this.audio.pause(),this.playing=!1},r.prototype.stop=function(){this.audio.pause(),this.audio.currentTime=0,this.playing=!1},r.prototype.next=function(){var t=this._playlist.tracks.length;this._playlistIndex>=t-1||this._playlist&&t&&this.play({playlistIndex:++this._playlistIndex})},r.prototype.previous=function(){this._playlistIndex<=0||this._playlist&&this._playlist.tracks.length&&this.play({playlistIndex:--this._playlistIndex})},r.prototype.seek=function(t){if(!this.audio.readyState)return!1;var e=t.offsetX/t.target.offsetWidth||(t.layerX-t.target.offsetLeft)/t.target.offsetWidth;this.audio.currentTime=e*(this.audio.duration||0)},r.prototype.cleanData=function(){this._track=void 0,this._playlist=void 0},e.exports=r},{}]},{},[1])(1)});

/*!
 * jquery-confirm v3.0.3 (http://craftpip.github.io/jquery-confirm/)
 * Author: Boniface Pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2016 jquery-confirm
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
if(typeof jQuery==="undefined"){throw new Error("jquery-confirm requires jQuery");}var jconfirm,Jconfirm;(function($){$.fn.confirm=function(options,option2){if(typeof options==="undefined"){options={};}if(typeof options==="string"){options={content:options,title:(option2)?option2:false};}$(this).each(function(){var $this=$(this);$this.on("click",function(e){e.preventDefault();var jcOption=$.extend({},options);if($this.attr("data-title")){jcOption.title=$this.attr("data-title");}if($this.attr("data-content")){jcOption.content=$this.attr("data-content");}if(typeof jcOption.buttons=="undefined"){jcOption.buttons={};}jcOption["$target"]=$this;if($this.attr("href")&&Object.keys(jcOption.buttons).length==0){var buttons={};if(jconfirm.defaults&&jconfirm.defaults.defaultButtons){buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons,jconfirm.defaults.defaultButtons||{});}else{buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons);}var firstBtn=Object.keys(buttons)[0];jcOption.buttons=buttons;jcOption.buttons[firstBtn].action=function(){location.href=$this.attr("href");};}jcOption.closeIcon=false;$.confirm(jcOption);});});return $(this);};$.confirm=function(options,option2){if(typeof options==="undefined"){options={};}if(typeof options==="string"){options={content:options,title:(option2)?option2:false,};}if(typeof options.buttons!="object"){options.buttons={};}if(Object.keys(options.buttons).length==0){var buttons={};if(jconfirm.defaults&&jconfirm.defaults.defaultButtons){buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons,jconfirm.defaults.defaultButtons||{});}else{buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons);}options.buttons=buttons;}return jconfirm(options);};$.alert=function(options,option2){if(typeof options==="undefined"){options={};}if(typeof options==="string"){options={content:options,title:(option2)?option2:false,};}if(typeof options.buttons!="object"){options.buttons={};}if(Object.keys(options.buttons).length==0){var buttons={};if(jconfirm.defaults&&jconfirm.defaults.defaultButtons){buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons,jconfirm.defaults.defaultButtons||{});}else{buttons=$.extend({},jconfirm.pluginDefaults.defaultButtons);}var firstBtn=Object.keys(buttons)[0];options.buttons[firstBtn]=buttons[firstBtn];}return jconfirm(options);};$.dialog=function(options,option2){if(typeof options==="undefined"){options={};}if(typeof options==="string"){options={content:options,title:(option2)?option2:false,closeIcon:function(){}};}options.buttons={};if(typeof options.closeIcon=="undefined"){options.closeIcon=function(){};}options.confirmKeys=[13];return jconfirm(options);};jconfirm=function(options){if(typeof options==="undefined"){options={};}if(jconfirm.defaults){$.extend(jconfirm.pluginDefaults,jconfirm.defaults);}options=$.extend({},jconfirm.pluginDefaults,options);var instance=new Jconfirm(options);jconfirm.instances.push(instance);return instance;};Jconfirm=function(options){$.extend(this,options);this._init();};Jconfirm.prototype={_init:function(){var that=this;this._lastFocused=$("body").find(":focus");this._id=Math.round(Math.random()*99999);setTimeout(function(){that.open();},0);},_buildHTML:function(){var that=this;this._parseAnimation(this.animation,"o");this._parseAnimation(this.closeAnimation,"c");this._parseBgDismissAnimation(this.backgroundDismissAnimation);this._parseColumnClass(this.columnClass);this._parseTheme(this.theme);var template=$(this.template);var type="";switch(this.type){case"default":case"blue":case"green":case"red":case"orange":case"purple":case"dark":type="jconfirm-"+this.type;break;default:console.warn("Invalid dialog type: "+this.type);}template.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(type);if(this.typeAnimated){template.find(".jconfirm-box").addClass("jconfirm-type-animated");}if(this.useBootstrap){template.find(".jc-bs3-row").addClass(this.bootstrapClasses.row);template.find(".jconfirm-box-container").addClass(this.columnClassParsed);if(this.containerFluid){template.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid);}else{template.find(".jc-bs3-container").addClass(this.bootstrapClasses.container);}}else{template.find(".jconfirm-box").css("width",this.boxWidth);}if(this.titleClass){template.find(".jconfirm-title-c").addClass(this.titleClass);}template.addClass(this.themeParsed);var ariaLabel="jconfirm-box"+this._id;template.find(".jconfirm-box").attr("aria-labelledby",ariaLabel).attr("tabindex",-1);template.find(".jconfirm-content").attr("id",ariaLabel);if(this.bgOpacity!=null){template.find(".jconfirm-bg").css("opacity",this.bgOpacity);}if(this.rtl){template.addClass("jconfirm-rtl");}this.$el=template.appendTo(this.container);this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container");this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box");this.$jconfirmBg=this.$el.find(".jconfirm-bg");this.$title=this.$el.find(".jconfirm-title");this.$content=this.$el.find("div.jconfirm-content");this.$contentPane=this.$el.find(".jconfirm-content-pane");this.$icon=this.$el.find(".jconfirm-icon-c");this.$closeIcon=this.$el.find(".jconfirm-closeIcon");this.$btnc=this.$el.find(".jconfirm-buttons");this.$scrollPane=this.$el.find(".jconfirm-scrollpane");this._contentReady=$.Deferred();this._modalReady=$.Deferred();this.setTitle();this.setIcon();this._setButtons();this._parseContent();if(this.isAjax){this.showLoading(false);}$.when(this._contentReady,this._modalReady).then(function(){if(that.isAjaxLoading){setTimeout(function(){that.isAjaxLoading=false;that.setContent();that.setTitle();that.setIcon();setTimeout(function(){that.hideLoading(false);},100);if(typeof that.onContentReady=="function"){that.onContentReady();}},50);}else{that.setContent();that.setTitle();that.setIcon();if(typeof that.onContentReady=="function"){that.onContentReady();}}if(that.autoClose){that._startCountDown();}});that._contentHash=this._hash(that.$content.html());that._contentHeight=this.$content.height();this._watchContent();this.setDialogCenter();if(this.animation=="none"){this.animationSpeed=1;this.animationBounce=1;}this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce));this.$contentPane.css(this._getCSS(this.animationSpeed,1));this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1));},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(theme){var that=this;var previous=this.theme;this.theme=theme||this.theme;this._parseTheme(this.theme);if(previous){this.$el.removeClass(previous);}this.$el.addClass(this.themeParsed);this.theme=theme;},_parseTheme:function(theme){var that=this;theme=theme.split(",");$.each(theme,function(k,a){if(a.indexOf(that._themePrefix)==-1){theme[k]=that._themePrefix+$.trim(a);}});this.themeParsed=theme.join(" ").toLowerCase();},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(bgDismissAnimation){var animation=bgDismissAnimation.split(",");var that=this;$.each(animation,function(k,a){if(a.indexOf(that._bgDismissPrefix)==-1){animation[k]=that._bgDismissPrefix+$.trim(a);}});this.backgroundDismissAnimationParsed=animation.join(" ").toLowerCase();},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(animation){this.animation=animation||this.animation;this._parseAnimation(this.animation,"o");},_parseAnimation:function(animation,which){which=which||"o";var animations=animation.split(",");var that=this;$.each(animations,function(k,a){if(a.indexOf(that._animationPrefix)==-1){animations[k]=that._animationPrefix+$.trim(a);}});var a_string=animations.join(" ").toLowerCase();if(which=="o"){this.animationParsed=a_string;}else{this.closeAnimationParsed=a_string;}return a_string;},setCloseAnimation:function(closeAnimation){this.closeAnimation=closeAnimation||this.closeAnimation;this._parseAnimation(this.closeAnimation,"c");},setAnimationSpeed:function(speed){this.animationSpeed=speed||this.animationSpeed;},columnClassParsed:"",setColumnClass:function(colClass){this.columnClass=colClass||this.columnClass;this._parseColumnClass(this.columnClass);this.$jconfirmBoxContainer.addClass(this.columnClassParsed);},_parseColumnClass:function(colClass){colClass=colClass.toLowerCase();var p;switch(colClass){case"xl":case"xlarge":p="col-md-12";break;case"l":case"large":p="col-md-8 col-md-offset-2";break;case"m":case"medium":p="col-md-6 col-md-offset-3";break;case"s":case"small":p="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":p="col-md-2 col-md-offset-5";break;default:p=colClass;}this.columnClassParsed=p;},_hash:function(a){return btoa((encodeURIComponent(a)));},_watchContent:function(){var that=this;if(this._timer){clearInterval(this._timer);}this._timer=setInterval(function(){var now=that._hash(that.$content.html());var nowHeight=that.$content.height();if(that._contentHash!=now||that._contentHeight!=nowHeight){that._contentHash=now;that._contentHeight=nowHeight;that.setDialogCenter();that._imagesLoaded();}},this.watchInterval);},_hilightAnimating:false,_hiLightModal:function(){var that=this;if(this._hilightAnimating){return;}that.$body.addClass("hilight");var duration=2;this._hilightAnimating=true;setTimeout(function(){that._hilightAnimating=false;that.$body.removeClass("hilight");},duration*1000);},_bindEvents:function(){var that=this;this.boxClicked=false;this.$scrollPane.click(function(e){if(!that.boxClicked){var buttonName=false;var shouldClose=false;var str;if(typeof that.backgroundDismiss=="function"){str=that.backgroundDismiss();}else{str=that.backgroundDismiss;}if(typeof str=="string"&&typeof that.buttons[str]!="undefined"){buttonName=str;shouldClose=false;}else{if(typeof str=="undefined"||!!(str)==true){shouldClose=true;}else{shouldClose=false;}}if(buttonName){var btnResponse=that.buttons[buttonName].action.apply(that);shouldClose=(typeof btnResponse=="undefined")||!!(btnResponse);}if(shouldClose){that.close();}else{that._hiLightModal();}}that.boxClicked=false;});this.$jconfirmBox.click(function(e){that.boxClicked=true;});setTimeout(function(){$(window).on("keyup."+that._id,function(e){that.reactOnKey(e);});},10);$(window).on("resize."+this._id,function(){that.setDialogCenter(true);});},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(speed,bounce){return{"-webkit-transition-duration":speed/1000+"s","transition-duration":speed/1000+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+bounce+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+bounce+")"};},_imagesLoaded:function(){var that=this;if(that.imageLoadInterval){clearInterval(that.imageLoadInterval);}$.each(this.$content.find("img:not(.loaded)"),function(i,a){that.imageLoadInterval=setInterval(function(){var h=$(a).css("height");if(h!=="0px"){$(a).addClass("loaded");clearInterval(that.imageLoadInterval);that.setDialogCenter();}},40);});},_setButtons:function(){var that=this;var total_buttons=0;if(typeof this.buttons!=="object"){this.buttons={};}$.each(this.buttons,function(key,button){total_buttons+=1;if(typeof button==="function"){that.buttons[key]=button={action:button};}that.buttons[key].text=button.text||key;that.buttons[key].btnClass=button.btnClass||"btn-default";that.buttons[key].action=button.action||function(){};that.buttons[key].keys=button.keys||[];$.each(that.buttons[key].keys,function(i,a){that.buttons[key].keys[i]=a.toLowerCase();});var button_element=$('<button type="button" class="btn '+that.buttons[key].btnClass+'">'+that.buttons[key].text+"</button>").click(function(e){e.preventDefault();var res=that.buttons[key].action.apply(that);that.onAction(key);that._stopCountDown();if(typeof res==="undefined"||res){that.close();}});that.buttons[key].el=button_element;that.buttons[key].setText=function(text){button_element.html(text);};that.buttons[key].addClass=function(className){button_element.addClass(className);};that.buttons[key].removeClass=function(className){button_element.removeClass(className);};that.buttons[key].disable=function(){button_element.prop("disabled",true);};that.buttons[key].enable=function(){button_element.prop("disabled",false);};that.buttons[key].show=function(){button_element.css("display","");that.setDialogCenter();};that.buttons[key].hide=function(){button_element.css("display","none");that.setDialogCenter();};that["$_"+key]=that["$$"+key]=button_element;that.$btnc.append(button_element);});if(total_buttons===0){this.$btnc.hide();}if(this.closeIcon===null&&total_buttons===0){this.closeIcon=true;}if(this.closeIcon){if(this.closeIconClass){var closeHtml='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(closeHtml);}this.$closeIcon.click(function(e){e.preventDefault();var buttonName=false;var shouldClose=false;var str;if(typeof that.closeIcon=="function"){str=that.closeIcon();}else{str=that.closeIcon;}if(typeof str=="string"&&typeof that.buttons[str]!="undefined"){buttonName=str;shouldClose=false;}else{if(typeof str=="undefined"||!!(str)==true){shouldClose=true;}else{shouldClose=false;}}if(buttonName){var btnResponse=that.buttons[buttonName].action.apply(that);shouldClose=(typeof btnResponse=="undefined")||!!(btnResponse);}if(shouldClose){that.close();}});this.$closeIcon.show();}else{this.$closeIcon.hide();}},setTitle:function(string,force){force=force||false;if(typeof string!=="undefined"){if(typeof string=="string"){this.title=string;}else{if(typeof string=="function"){if(typeof string.promise=="function"){console.error("Promise was returned from title function, this is not supported.");}var response=string();if(typeof response=="string"){this.title=response;}else{this.title=false;}}else{this.title=false;}}}if(this.isAjax&&!force){return;}this.$title.html(this.title||"");},setIcon:function(iconClass,force){force=force||false;if(typeof iconClass!=="undefined"){if(typeof iconClass=="string"){this.icon=iconClass;}else{if(typeof iconClass==="function"){var response=iconClass();if(typeof response=="string"){this.icon=response;}else{this.icon=false;}}else{this.icon=false;}}}if(this.isAjax&&!force){return;}this.$icon.html(this.icon?'<i class="'+this.icon+'"></i>':"");},setContentPrepend:function(string,force){this.contentParsed=string+this.contentParsed;if(this.isAjaxLoading&&!force){return;}this.$content.prepend(string);},setContentAppend:function(string,force){this.contentParsed=this.contentParsed+string;if(this.isAjaxLoading&&!force){return;}this.$content.append(string);},setContent:function(string,force){force=force||false;var that=this;this.contentParsed=(typeof string=="undefined")?this.contentParsed:string;if(this.isAjaxLoading&&!force){return;}this.$content.html(this.contentParsed);this.setDialogCenter();setTimeout(function(){that.$body.find("input[autofocus]:visible:first").focus();},100);},loadingSpinner:false,showLoading:function(disableButtons){this.loadingSpinner=true;this.$jconfirmBox.addClass("loading");if(disableButtons){this.$btnc.find("button").prop("disabled",true);}this.setDialogCenter();},hideLoading:function(enableButtons){this.loadingSpinner=false;this.$jconfirmBox.removeClass("loading");if(enableButtons){this.$btnc.find("button").prop("disabled",false);}this.setDialogCenter();},ajaxResponse:false,contentParsed:"",isAjax:false,isAjaxLoading:false,_parseContent:function(){var that=this;var e="&nbsp;";if(typeof this.content=="function"){var res=this.content.apply(this);if(typeof res=="string"){this.content=res;}else{if(typeof res=="object"&&typeof res.always=="function"){this.isAjax=true;this.isAjaxLoading=true;res.always(function(data,status,xhr){that.ajaxResponse={data:data,status:status,xhr:xhr};that._contentReady.resolve(data,status,xhr);if(typeof that.contentLoaded=="function"){that.contentLoaded(data,status,xhr);}});this.content=e;}else{this.content=e;}}}if(typeof this.content=="string"&&this.content.substr(0,4).toLowerCase()==="url:"){this.isAjax=true;this.isAjaxLoading=true;var u=this.content.substring(4,this.content.length);$.get(u).done(function(html){that.contentParsed=html;}).always(function(data,status,xhr){that.ajaxResponse={data:data,status:status,xhr:xhr};that._contentReady.resolve(data,status,xhr);if(typeof that.contentLoaded=="function"){that.contentLoaded(data,status,xhr);}});}if(!this.content){this.content=e;}if(!this.isAjax){this.contentParsed=this.content;this.setContent(this.contentParsed);that._contentReady.resolve();}},_stopCountDown:function(){clearInterval(this.autoCloseInterval);if(this.$cd){this.$cd.remove();}},_startCountDown:function(){var that=this;var opt=this.autoClose.split("|");if(opt.length!==2){console.error("Invalid option for autoClose. example 'close|10000'");return false;}var button_key=opt[0];var time=parseInt(opt[1]);if(typeof this.buttons[button_key]==="undefined"){console.error("Invalid button key '"+button_key+"' for autoClose");return false;}var seconds=time/1000;this.$cd=$('<span class="countdown"> ('+seconds+")</span>").appendTo(this["$_"+button_key]);this.autoCloseInterval=setInterval(function(){that.$cd.html(" ("+(seconds-=1)+") ");if(seconds===0){that["$$"+button_key].trigger("click");that._stopCountDown();}},1000);},_getKey:function(key){switch(key){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space";}var initial=String.fromCharCode(key);if(/^[A-z0-9]+$/.test(initial)){return initial.toLowerCase();}else{return false;}},reactOnKey:function(e){var that=this;var a=$(".jconfirm");if(a.eq(a.length-1)[0]!==this.$el[0]){return false;}var key=e.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(key)){return false;}var keyChar=this._getKey(key);if(keyChar==="esc"&&this.escapeKey){if(this.escapeKey===true){this.$scrollPane.trigger("click");}else{if(typeof this.escapeKey==="string"||typeof this.escapeKey==="function"){var buttonKey;if(typeof this.escapeKey==="function"){buttonKey=this.escapeKey();}else{buttonKey=this.escapeKey;}if(buttonKey){if(typeof this.buttons[buttonKey]==="undefined"){console.warn("Invalid escapeKey, no buttons found with key "+buttonKey);}else{this["$_"+buttonKey].trigger("click");}}}}}$.each(this.buttons,function(key,button){if(button.keys.indexOf(keyChar)!=-1){that["$_"+key].trigger("click");}});},setDialogCenter:function(){var contentHeight;var paneHeight;var style;contentHeight=0;paneHeight=0;if(this.$contentPane.css("display")!="none"){contentHeight=this.$content.outerHeight()||0;paneHeight=this.$contentPane.height()||0;}var children=this.$content.children();if(children.length!=0){var marginTopChild=parseInt(children.eq(0).css("margin-top"));if(marginTopChild){contentHeight+=marginTopChild;}}if(paneHeight==0){paneHeight=contentHeight;}var windowHeight=$(window).height();var boxHeight;boxHeight=(this.$body.outerHeight()-paneHeight)+contentHeight;var topMargin=(windowHeight-boxHeight)/2;var minMargin=100;if(boxHeight>(windowHeight-minMargin)){style={"margin-top":minMargin/2,"margin-bottom":minMargin/2};$("body").addClass("jconfirm-no-scroll-"+this._id);}else{style={"margin-top":topMargin,"margin-bottom":minMargin/2,};$("body").removeClass("jconfirm-no-scroll-"+this._id);}this.$contentPane.css({height:contentHeight}).scrollTop(0);this.$body.css(style);},_unwatchContent:function(){clearInterval(this._timer);},close:function(){var that=this;if(typeof this.onClose==="function"){this.onClose();}this._unwatchContent();clearInterval(this.imageLoadInterval);$(window).unbind("resize."+this._id);$(window).unbind("keyup."+this._id);$("body").removeClass("jconfirm-no-scroll-"+this._id);this.$body.addClass(this.closeAnimationParsed);this.$jconfirmBg.addClass("jconfirm-bg-h");var closeTimer=(this.closeAnimation=="none")?1:this.animationSpeed;setTimeout(function(){that.$el.remove();console.log(that._lastFocused);if(that._lastFocused.length&&$.contains(document,that._lastFocused[0])){var st=$(window).scrollTop();var ot=that._lastFocused.offset().top;var wh=$(window).height();if(!(ot>st&&ot<(st+wh))){$("html, body").animate({scrollTop:(ot-Math.round((wh/3))),},that.animationSpeed,"swing",function(){that._lastFocused.focus();});}else{that._lastFocused.focus();}}if(typeof that.onDestroy=="function"){that.onDestroy();}},closeTimer*0.4);return true;},open:function(){this._buildHTML();this._bindEvents();this._open();return true;},_open:function(){var that=this;if(typeof that.onOpenBefore=="function"){that.onOpenBefore();}this.$body.removeClass(this.animationParsed);this.$jconfirmBg.removeClass("jconfirm-bg-h");this.$body.focus();setTimeout(function(){that.$body.css(that._getCSS(that.animationSpeed,1));that.$body.css({"transition-property":that.$body.css("transition-property")+", margin"});that._modalReady.resolve();if(typeof that.onOpen==="function"){that.onOpen();}},this.animationSpeed);},isClosed:function(){return this.$el.css("display")==="";},isOpen:function(){return !this.isClosed();},toggle:function(){if(!this.isOpen()){this.open();}else{this.close();}}};jconfirm.instances=[];jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:true,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}},},contentLoaded:function(){},icon:"",bgOpacity:null,theme:"light",animation:"zoom",closeAnimation:"scale",animationSpeed:400,animationBounce:1.2,escapeKey:true,rtl:false,container:"body",containerFluid:false,backgroundDismiss:false,backgroundDismissAnimation:"shake",autoClose:false,closeIcon:null,closeIconClass:false,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",useBootstrap:true,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row",},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};})(jQuery);
$(document).ready(function () {

    $('.toggle-dl-dialog').click(function (e) {
        e.preventDefault();

        var $e = $(this),
            title = $e.data('title'),
            text = $e.data('text'),
            donate = $e.data('donate'),
            download = $e.data('download'),
            downloadUrl = $e.data('url');

        var content =
            "<div>"
            + "<p>" + text + "</p>"
            + "<a class='btn btn-dialog btn-primary' target='_blank' href='" + downloadUrl + "'>" + download + "</a>"
            + "<a class='btn btn-dialog btn-success' target='_blank' href='https://www.aerzte-ohne-grenzen.de/spenden-sammeln?cfd=barthyb'>" + donate + "</a>"
            + "</div>";

        e.preventDefault();
        $.dialog({
            title: title,
            content: content,
            theme: 'supervan',
            backgroundDismiss: true
        });
    });

    'use strict';

    var players = [];
    var playlists = [];

    var prettyTime = function (time, milli) {
        if (milli) time = time / 1000;
        var hours = Math.floor(time / 3600);
        var mins = '0' + Math.floor((time % 3600) / 60);
        var secs = '0' + Math.floor((time % 60));

        mins = mins.substr(mins.length - 2);
        secs = secs.substr(secs.length - 2);
        if (!isNaN(secs)) {
            if (hours) {
                return hours + ':' + mins + ':' + secs;
            } else {
                return mins + ':' + secs;
            }
        } else {
            return '00:00';
        }
    };

    $.fn.swapWith = function (that) {
        var $this = this;
        var $that = $(that);

        // create temporary placeholder
        var $temp = $("<div>");

        // 3-step swap
        $this.before($temp);
        $that.before($this);
        $temp.after($that).remove();

        return $this;
    };

    var $globalPlayer = $('.global-player'),
        $play = $globalPlayer.find('.fa-play'),
        $pause = $globalPlayer.find('.fa-pause'),
        $forward = $globalPlayer.find('.fa-forward'),
        $backward = $globalPlayer.find('.fa-backward'),
        $nowPlayingElapsed = $globalPlayer.find('.now-playing-elapsed'),
        $nowPlayingLength = $globalPlayer.find('.now-playing-length'),
        $nowPlayingAlbum = $globalPlayer.find('.now-playing-album'),
        $nowPlayingSong = $globalPlayer.find('.now-playing-song'),
        $nowPlayingProgress = $globalPlayer.find('.progress-bar'),
        currentPlayer = 0,
        currentSong = 0;

    var togglePlay = function (player, song, b) {
        if (currentPlayer != player) {
            players[currentPlayer].pause({
                playlistIndex: currentSong
            });
            if (b) {
                players[player].play({
                    playlistIndex: song
                });
                currentPlayer = player;
            }
        } else if (!players[player].playing) {
            if (b) {
                $play.fadeToggle(200, 'linear', function () {
                    $pause.fadeToggle(200);
                });
                players[player].play({
                    playlistIndex: song
                });
            }
        } else if (players[player]._playlistIndex != song) {
            if (b) {
                players[player].play({
                    playlistIndex: song
                });
            }
        }

        $nowPlayingLength.text(prettyTime(playlists[player].tracks[song].duration, true));
        $nowPlayingAlbum.text(playlists[player].title);
        $nowPlayingSong.text(playlists[player].tracks[song].title);

        currentPlayer = player;
        currentSong = song;
    };

    var togglePause = function (player, song) {
        if (players[player].playing) {
            $pause.fadeToggle(200, 'linear', function () {
                $play.fadeToggle(200);
            });
            players[player].pause({
                playlistIndex: song
            });
        }
    };

    var $embeds = $('.album-embed'),
        embedCnt = $embeds.length;
    $embeds.each(function (playerIndex, e) {
        var player = new SoundCloudAudio('3f0c2df99a948f8142621535b3b4ba73');
        players.push(player);
        var $this = $(this);
        $this.data('player-nr', playerIndex);
        var render = function (playlist) {
            playlists.push(playlist);
            var tracks = playlist.tracks,
                $list = $this.find('.list-group');

            for (var i = 0; i < tracks.length; i++) {
                var $listItem = $('<li class="list-group-item music-player-interaction"><span class="track-number music-player-interaction">' + ((i < 9) ? '0' + (i + 1) : (i + 1)) + '</span> <span class="title music-player-interaction">' + tracks[i].title + '</span><span class="badge music-player-interactiongit add -A' +
                    '">' + prettyTime(tracks[i].duration, true) + '</span></li>');
                $list.append($listItem);
                $listItem.click(function () {
                    togglePlay(playerIndex, $(this).index(), true);
                });
            }

            var renderTimer = function () {
                var time = prettyTime(new Date(player.audio.currentTime), false);
                $nowPlayingElapsed.text(time);
                var percent = 100 * Math.floor(player.audio.currentTime) / Math.floor(player.audio.duration);
                $nowPlayingProgress.attr('aria-valuenow', percent);
                $nowPlayingProgress.width(percent + "%");
            };

            // render timer on every second
            player.on('timeupdate', renderTimer);
            renderTimer();

            player.on('ended', function () {
                var next = currentSong + 1;
                if (next < tracks.length) {
                    togglePlay(playerIndex, next, true);
                }
            });

            if (--embedCnt == 0) {
                togglePlay(currentPlayer, currentSong, false);
            }
        };
        player.resolve($this.attr('data-sc'), render);
    });

    $play.click(function () {
        togglePlay(currentPlayer, currentSong, true);
    });

    $pause.click(function () {
        togglePause(currentPlayer, currentSong);
    });

    $forward.click(function () {
        if (currentSong + 1 < playlists[currentPlayer].tracks.length) {
            togglePlay(currentPlayer, currentSong + 1, true);
        }
    });

    $backward.click(function () {
        if (currentSong - 1 >= 0) {
            togglePlay(currentPlayer, currentSong - 1, true);
        }
    });

    $('.album-art-container > div').each(function () {
        var $this = $(this),
            uurl = $this.data('uurl');
        $this.click(function () {
            if (!$this.hasClass('col-lg-12')) {
                var $currentlyActive = $this.parent().find('.col-lg-12');
                var $last = $this.parent().find('.col-lg-6').last();
                $this.swapWith($last);
                $currentlyActive.swapWith($this);

                $currentlyActive.addClass('col-lg-6');
                $currentlyActive.removeClass('col-lg-12');

                $this.addClass('col-lg-12');
                $this.removeClass('col-lg-6');

                var $detailsThis = $('.album-details.album-' + uurl),
                    $detailsCurrentlyActive = $('.album-details.album-' + $currentlyActive.data('uurl'));

                $detailsCurrentlyActive.removeClass('active').fadeOut(function () {
                    $detailsThis.addClass('active');
                });
            }
        });
    });

});
/**
 * Created by Barthy on 20.04.16.
 */
$(document).ready(function() {
    var $scPlayers = $('.embed-2 > iframe');
    $scPlayers.each(function () {
        var $url = $(this).attr('src'),
            songUrl = $.url('?url', $url),
            widget = SC.Widget(this);

        widget.load(songUrl, {
            show_artwork: false,
            show_user: false,
            buying: false,
            download: false,
            color: '609e55'
        });
    });
});