function InffuseSDK_01(d){var a=this;var c=this;this.app_id=d;this.version="0.1";this.server="https://inffuse-platform.appspot.com";this.context_params=null;var b={};this.init=function(h,f){var g=c.context_params;if(g){g="?"+$.param(g)}else{g=document.location.search}var e=c.server+"/js/v"+c.version+"/"+d+"/data"+g;$.ajax({url:e,xhrFields:{withCredentials:true},type:"GET"}).success(function(i,k,j){c.app=new c.App(a,i.app.meta,i.app.data);c.platform=i.platform;c.server=i.server;c.apiVersion=i.api_version;c.editing=i.editing;c.external_script=i.external_script;c._viewMode=i.view_mode;if(i.user){c.user=new c.UserClass(c,i.user.meta,i.user.data)}else{c.user=new c.UserClass(c,{},{})}if(i.user){if(i.site){c.site=new c.Site(c,i.site.meta)}if(i.project){c.project=new c.ProjectClass(c,i.project.meta,i.project.data)}}c.projects=new c.ProjectsClass(c);c.quotas=new c.Quotas(c,i.quotas);c.ui=new c.UI(c);c.utils=new c.Utils(c);c.services=new c.Services(c,i.services);c.stripe=new c.StripeClass(c);c.fastspring=new c.FastspringClass(c);switch(c.platform){case"wix":c.wix=new c.WixClass(c);c.wix.init();break;case"weebly":c.weebly=new c.WeeblyClass(c);c.weebly.init();break;case"shopify":c.shopify=new c.ShopifyClass(c);c.shopify.init(i.shopify);break}if(typeof h!="undefined"){h(c)}c.ready()}).error(function(i,k,j){if(i.status==303){document.location.href=i.responseJSON.redirect_url;return}if(f){f(j)}})};this.message=function(e){console.log(e)};this.logData=function(){console.log("version: "+this.version+", appID: "+this.app_id)};this.ready=function(e){if(typeof e!="undefined"){if(c.isready){e(c)}else{if(typeof c.readyCallbacks=="undefined"){c.readyCallbacks=[]}c.readyCallbacks.push(e)}return}if(c.readyCallbacks){for(var f in c.readyCallbacks){c.readyCallbacks[f](c)}}c.broadcast("ready");c.isready=true};this.viewMode=function(){return this._viewMode};this.error=function(f){var e="[Inffuse error] "+f+".";if(window.console){console.error(e)}};this.on=function(f,e){if(!e||typeof e!="function"){throw"[Inffuse] Invalid handler passed (function is required)";return}if(typeof b[f]=="undefined"){b[f]=[]}b[f].push(e)};this.off=function(f,e){if(typeof b[f]=="undefined"){return}b[f]=b[f].filter(function(g){return g!=e})};this.trigger=function(f,g){var e=b[f];if(typeof e=="undefined"||e.length==0){return false}b[f].map(function(h){h(g)});return true};this.broadcast=function(f,g,e){if(!window.parent||!window.parent.postMessage){return}var h={app:"inffuse",user:c.user?c.user.key():null,project:c.project?c.project.key():null,type:f,params:g};window.parent.postMessage(h,"*");if(e){c.trigger(f,g)}};this.loadScript=function(g,i){if(g.indexOf("//")==-1){var h=Inffuse.server;g=h+g}var f=document.getElementsByTagName("head")[0];var e=document.createElement("script");e.type="text/javascript";e.src=g;f.appendChild(e);e.onload=function(){i()}};this.loadSite=function(f){var g={user:Inffuse.user.id()};var e=new jQuery.Deferred();Inffuse.requestAPI("sites/"+f,g,"GET").then(function(h){var i=new Inffuse.SiteClass(Inffuse,h.site);e.resolve(i)},function(h){e.reject(h)});return e.promise()};this.requestAPI=function(i,j,l,e,h){if(typeof l=="undefined"){l="GET"}j=j||{};j.app=c.app.id();j.platform=c.platform;if(this.demo_mode){return new function(){this.success=function(m){m()}}}var k=c.user.accessToken();if(k){j.access_token=k}var g=[c.server,"api",c.apiVersion,i].join("/");if(l=="GET"||l=="DELETE"){g+="?"+$.param(j);j=undefined}var f={url:g,type:l,data:j,async:!h};if(e){f.crossDomain=true;f.xhrFields={withCredentials:true}}return $.ajax(f)};this.receiveMessage=function(f){switch(f.type){case"data-changed":if(c.project){var e=f.params;for(key in e){c.project.set(key,e[key],true)}}break}c.trigger(f.type,f.params)};window.addEventListener("message",function(f){var e=f.data;if(e.app!="inffuse"){return}c.receiveMessage(e)},false)}if(typeof Inffuse!="undefined"&&Inffuse.registerVersion){Inffuse.registerVersion("0.1",InffuseSDK_01)}InffuseSDK_01.prototype.App=function(a,d,c){var b=this;this.init=function(){};this.id=function(){return d.id};this.platform=function(){return d.platform};this.name=function(){return d.name};this.set=function(e,g,f){c[e]=g;if(typeof f=="undefined"||f){this.save()}};this.get=function(f,e){if(typeof f=="undefined"){return c}if(f in c==false){return e}return c[f]};this.remove=function(e,f){delete c[e];if(typeof f=="undefined"||f){this.save()}}};InffuseSDK_01.prototype.DataStore=function(d,c,b,e){var a=this;var h=false;var f={};var g=d;this.populate=function(i){f=i};this.set=function(k,l,j){f[k]=l;if(j){return}var i=[c,b,"data",e,k].join("/");var m={user:g.user.id(),value:JSON.stringify(l)};return g.requestAPI(i,m,"PUT").success(function(n){var o={};o[k]=l;g.broadcast("data-changed",o)})};this.get=function(j,i){if(typeof j=="undefined"){return f}if(j in f==false){return i}return f[j]};this.loadData=function(k,i){var l={user:g.user.id(),};if(k){var j=[c,b,"data",e,k].join("/");return g.requestAPI(j,l,"GET").success(function(m){f[k]=m.data;return f[k]})}else{var j=[c,b,"data",e].join("/");return g.requestAPI(j,l,"GET").success(function(m){f=m.data;return f})}};this.append=function(j,k){if(f[j]===undefined){f[j]=[]}f[j].push(k);var i=[c,b,"data",e,j].join("/");var l={user:g.user.id(),value:JSON.stringify(k)};return g.requestAPI(i,l,"POST").success(function(m){var n={};console.log(j);console.log(f);n[j]=f[j];g.broadcast("data-changed",n)})};this.del=function(i,j){delete f[i];if(typeof j=="undefined"||j){a.save()}};this.setData=function(i){f=i};this.setMulti=function(l,k){for(var j in l){if(l.hasOwnProperty(j)){f[j]=l[j]}}if(k){return}var i=["projects",b,"data",e].join("/");var m={user:g.user.id(),obj:JSON.stringify(l)};return g.requestAPI(i,m,"POST").success(function(n){g.broadcast("data-changed",l)})};this.save=function(){var i=[c,b,"data",e].join("/");var j={user:g.user.id(),obj:JSON.stringify(f)};return g.requestAPI(i,j,"PUT").success(function(k){g.broadcast("data-changed",f)})}};ExternalScriptLoader=function(a){Inffuse.loadScript(a).then(function(){Inffuse.ready()})};InffuseSDK_01.prototype.ProjectClass=function(a,h,b){var e=a;var j=this;var d=false;var i=e.user.accessToken()?"private":"public";var f={};var c;function g(){f["private"]=new e.DataStore(e,"projects",j.id(),"private");f["public"]=new e.DataStore(e,"projects",j.id(),"public");c=f[i];c.populate(b)}this.getDataStore=function(k){if(k){return f[k]}return c};this.meta=function(k){return h?h[k]:null};this.id=function(){return j.meta("id")};this.created=function(){return j.meta("created")};this.key=function(){return j.meta("key_name")};this.name=function(){return j.meta("name")};this.isNew=function(){return h["new"]==true};this.siteID=function(){return j.meta("site_id")};this.set=function(l,n,k,m){if(!this.id()){return e.error("Project does not exist")}return this.getDataStore(m).set(l,n,k)};this.get=function(l,k){if(!this.id()){return e.error("Project does not exist")}return c.get(l,k)};this.loadData=function(l,m,k){if(!this.id()){return e.error("Project does not exist")}return this.getDataStore(m).loadData(l,k)};this.append=function(k,l){if(!this.id()){return e.error("Project does not exist")}return c.append(k,l)};this.del=function(k,l){return c.del(k,l)};this.setData=function(k){return c.setData(k)};this.setMulti=function(l,k){if(!this.id()){e.error("Project does not exist")}return c.setMulti(l,k)};this.setToken=function(m,k,l){var n={project:j.id(),service:m,key:k,value:l};return e.requestAPI("projects/settoken",n,"POST")};this.save=function(){if(!this.id()){e.error("Project does not exist")}return c.save()};this.publish=function(){e.broadcast("project-published",undefined,true);var k=["projects",j.id(),"data","publish"].join("/");var l={user:e.user.id(),project:j.id()};return e.requestAPI(k,l,"POST")};this.remove=function(){e.broadcast("project-deleted",undefined,true);var k=["projects",j.id()].join("/");var l={user:e.user.id()};return e.requestAPI(k,l,"DELETE",false,true)};this.refreshWidget=function(k){e.broadcast("refresh-widget",k)};this.updateHeight=function(k){if(typeof k=="undefined"){var l=$(".inffuse-container");if(!l.length){l=$(document)}k=l.outerHeight()}j.resize({height:k})};this.resize=function(k){if(k.height&&e.platform=="wix"&&typeof Wix!="undefined"){Wix.setHeight(k.height)}e.broadcast("resize",k)};this.preview=function(k){j.refreshWidget(k)};this.manage=function(){var l=e.server.indexOf("local")==-1?"dashboard.inffuse.com":"dev.inffuse.local:28099";var k=["http:/",l,"app:"+e.app.id(),"users","project:"+j.id()].join("/");console.log("To manage the project go to: ",k)};g()};InffuseSDK_01.prototype.ProjectsClass=function(a){var b=a;this._init=function(){};this.list=function(){var c={user:b.user.id(),};return b.requestAPI("projects",c,"GET")};this.create=function(c){var d={user:b.user.id(),name:c};return b.requestAPI("projects",d,"POST")};this.load=function(d,e){var g=[];if(e){g.push("site")}var f={user:b.user.id(),fields:"data",expand:g.join(",")};var c=new jQuery.Deferred();b.requestAPI("projects/"+d,f,"GET").then(function(i){var h=new b.ProjectClass(b,i.project,i.data);c.resolve(h)},function(h){c.reject(h)});return c.promise()}};InffuseSDK_01.prototype.Quotas=function(a,b){var b=b;var c=a;this.get=function(d){if(typeof b[d]=="undefined"){return -1}return b[d]};this.consume=function(f,e){params={};if(typeof e=="undefined"){e=1}params.count=e;var d=b[f];if(typeof d=="undefined"){return false}switch(d.scope){case"user":params.user=c.user.id();break;case"site":params.site=c.site.id();break;case"project":params.project=c.project.id();break}return c.requestAPI("quotas/"+f+"/consume",params,"POST").success(function(g){d.remaining=g.remaining})}};InffuseSDK_01.prototype.Redirect=function(a){this.url=a;if(typeof debug_mode=="undefined"||confirm("Redirecting to "+this.url)){document.location.href=this.url}document.getElementsByTagName("html")[0].style.visibility="hidden"};InffuseSDK_01.prototype.Services=function(b,g){var h=b;var i=this;function f(n,q,j,l){var r=[q,j].join(".");var m=r.split(".");for(var o=0;o<m.length-1;o++){var k=m[o];if(typeof n[k]=="undefined"){n[k]={}}n=n[k]}var p=m.pop();n[p]=l}for(var d=0;d<g.length;d++){var e=g[d];for(var c=0;c<e.methods.length;c++){var a=e.methods[c];(function(j,l){var k=function(){var p={};for(var q=0;q<l.args.length;q++){var o=l.args[q];var r=arguments[q];p[o]=r}var s=j.name.replace(/\./g,"/");var n=l.name.replace(/\./g,"/");var m={method:[s,l.name].join("."),path:["services",s,n].join("/"),type:l.type};m.args={};for(var o in p){var r=p[o];if(typeof r=="function"){continue}if(typeof r=="object"){r=JSON.stringify(r)}m.args[o]=r}m.args.platform=h.platform;m.args.app=h.app.id();if(h.user){m.args.user=h.user.id();m.args.site=h.site?h.site.id():null;m.args.project=h.project?h.project.id():null}if(l.args.indexOf("callback")!=-1){m.callback=p.callback}return h.services[l.action||"fetch"](m)};f(i,j.name,l.name,k)})(e,a)}}this.fetch=function(j){return h.requestAPI(j.path,j.args,j.type).fail(function(k){if(k.responseJSON&&k.responseJSON.error){h.error(["Request to",j.method,"failed","("+k.responseJSON.error+")"].join(" "))}})};this.openWindow=function(p){function o(q){var r=q.data;if(r.app!="inffuse"){return}if(r.type=="connected"){window.removeEventListener("message",o);p.callback(r.params)}}var n=Math.floor(Math.random()*100000000);p.args.session=n;var m=[h.server,"api",h.apiVersion,p.path].join("/");m+="?"+$.param(p.args);var j=window.open(m,"Inffuse","height=600,width=600");var l="ActiveXObject" in window;if(!l){window.addEventListener("message",o,false)}else{var k=setInterval(function(){h.requestAPI("async/get",{session:n},"GET").then(function(q){if(!q.result){return}clearInterval(k);p.callback(q.data)})},1000)}}};InffuseSDK_01.prototype.Site=function(b,c){var d=b;var a=this;var c=c;this.id=function(){return c?c.id:null};this.created=function(){return c?c.created:null};this.key=function(){return c?c.key_name:null};this.meta=function(e){d.error("Inffuse.site.meta() method is not implemented on "+d.platform+" platform")};this.pages=function(e){d.error("Inffuse.site.pages() method is not implemented on "+d.platform+" platform")};this.currentPage=function(e){d.error("Inffuse.site.currentPage() method is not implemented on "+d.platform+" platform")};this.manage=function(){var f=d.server.indexOf("local")==-1?"dashboard.inffuse.com":"dev.inffuse.local:28099";var e=["http:/",f,"app:"+d.app.id(),"users","site:"+a.id()].join("/");console.log("To manage the site go to: ",e)}};InffuseSDK_01.prototype.UI=function(a){var c=a;var b=this;this.init=function(){$("[data-section-title]").click(function(){b.toggleSection($(this).parent())})};this.toggleSection=function(e){var d=e.hasClass("open");$("[data-section]").removeClass("open");$("[data-section]").addClass("closed");if(d){e.removeClass("open");e.addClass("closed")}else{e.addClass("open");e.removeClass("closed")}};this.openColorSelect=function(p,t,j){if(p.find(".colorpopup").length){return}function l(i){var w=p.find("input.hex");w.val(c.ui.rgbToHex(i))}function n(w){var i=$(w.target);if(i.hasClass("colorcell")){p.find(".current").removeClass("current");i.addClass("current");l(i.attr("data-color"));q()}w.preventDefault();return false}function r(i){p.find(".colorpopup").remove();$("body").unbind("click",r);if(i){i.preventDefault()}}function q(w){var i=p.find(".hex").val();i=c.ui.hexToRgb(i);if(i){j(i)}r()}var s=[["","rgb(0,0,0)","rgb(77,77,77)","rgb(115,115,115)","rgb(171,171,171)","rgb(224,224,224)","rgb(242,242,242)","rgb(255,255,255)"],["rgb(255,0,0)","rgb(255,153,0)","rgb(255,255,0)","rgb(0,255,0)","rgb(0,255,255)","rgb(0,0,255)","rgb(153,0,255)","rgb(255,0,255)"],["rgb(244,204,204)","rgb(252,229,205)","rgb(255,242,204)","rgb(217,234,211)","rgb(208,224,227)","rgb(207,226,243)","rgb(217,210,233)","rgb(234,209,220)"],["rgb(234,153,153)","rgb(249,203,156)","rgb(255,229,153)","rgb(182,215,168)","rgb(162,196,201)","rgb(159,197,232)","rgb(180,167,214)","rgb(213,166,189)"],["rgb(224,102,102)","rgb(246,178,107)","rgb(255,217,102)","rgb(147,196,125)","rgb(118,165,175)","rgb(111,168,220)","rgb(142,124,195)","rgb(194,123,160)"],["rgb(204,0,0)","rgb(230,145,56)","rgb(241,194,50)","rgb(106,168,79)","rgb(69,129,142)","rgb(61,133,198)","rgb(103,78,167)","rgb(166,77,121)"],["rgb(153,0,0)","rgb(180,95,6)","rgb(191,144,0)","rgb(56,118,29)","rgb(19,79,92)","rgb(11,83,148)","rgb(53,28,117)","rgb(116,27,71)"],["rgb(102,0,0)","rgb(120,63,4)","rgb(127,96,0)","rgb(39,78,19)","rgb(12,52,61)","rgb(7,55,99)","rgb(32,18,77)","rgb(76,17,48)"]];var o=[["rgb(0,0,0)","rgb(153,51,0)","rgb(51,51,0)","rgb(0,0,128)","rgb(51,51,153)","rgb(51,51,51)"],["rgb(128,0,0)","rgb(255,102,0)","rgb(128,128,0)","rgb(0,128,0)","rgb(0,128,128)","rgb(0,0,255)"],["rgb(102,102,153)","rgb(128,128,128)","rgb(255,0,0)","rgb(255,153,0)","rgb(153,204,0)","rgb(51,153,102)"],["rgb(51,204,204)","rgb(51,102,255)","rgb(128,0,128)","rgb(153,153,153)","rgb(255,0,255)","rgb(255,204,0)"],["rgb(255,255,0)","rgb(0,255,0)","rgb(0,255,255)","rgb(0,204,255)","rgb(153,51,102)","rgb(192,192,192)"],["rgb(255,153,204)","rgb(255,204,153)","rgb(255,255,153)","rgb(204,255,255)","rgb(153,204,255)","rgb(255,255,255)"]];var e=$('<div class="colorpopup"></div>');for(var k in o){var g=$('<div class="colorsrow"></div>');for(var v in o[k]){var u=o[k][v];var h=(u=="")?"url(/static/wix/img/none.png)":u;var f=$('<div class="colorcell" data-color="'+u+'" style="background: '+h+'"></div>');if(u==t){f.addClass("current")}g.append(f);f.click(n)}e.append(g)}var m=$('<div class="colorhex"><span class="labelhex">hex:</span> <input class="hex" type="text" /> <div class="clear"></div></div>');m.find("input").change(n);e.append(m);var d=$('<button class="ok">OK</button>');d.click(q).append('<div class="clear"></div>');e.append(d);p.append(e);if(e.offset().top+e.height()>$("body").height()){e.addClass("top")}setTimeout(function(){l(t);$("body").bind("click",r);$(e).click(function(){return false})},0)};this.rgbToHex=function(d){if(typeof d=="undefined"){return""}function e(g){var f=(1*g).toString(16);return f.length==1?"0"+f:f}d=d.substr(4,d.length-5);return"#"+d.split(",").map(e).join("")};this.hexToRgb=function(f){var d=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(f);if(!d){d=/^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(f)}if(!d){return null}d.shift();var e=d.map(function(g){if(g.length==1){g=g+g}return parseInt(g,16)});return"rgb("+e.join(",")+")"};this.addCssRule=function(d,e){e=e+" !important";if(document.styleSheets[1].insertRule){document.styleSheets[1].insertRule(d+" {"+e+" }",0)}else{if(document.styleSheets[1].addRule){document.styleSheets[1].addRule(d,e,0)}}};this.opacity=function(d,e){if(!d){return d}if(d[0]=="#"){d=d.substr(1);shorthand=(d.length==3);if(shorthand){colors=[d[0]+d[0],d[1]+d[1],d[2]+d[2]]}else{colors=[d.substr(0,2),d.substr(2,2),d.substr(4,2)]}colors=colors.map(function(f){return parseInt(f,16)});colors.push(e);d="rgba("+colors.join(",")+")"}else{if(d.substr(0,3)=="rgb"){d=d.replace("rgb(","");d=d.replace("rgba(","");d=d.replace(")","");d=d.replace(" ","");colors=d.split(",").slice(0,3);colors.push(e);d="rgba("+colors.join(",")+")"}else{if(d.substr(0,3)=="hsl"){d=d.replace("hsl(","");d=d.replace("hsla(","");d=d.replace(")","");d=d.replace(" ","");colors=d.split(",").slice(0,3);colors.push(e);d="hsla("+colors.join(",")+")"}}}return d};this.openModal=function(d){c.ui.alert("Inffuse error :: openModal is not supported on "+c.platform+" platform")};this.closeModal=function(){c.ui.alert("Inffuse error :: closeModal is not supported on "+c.platform+" platform")};this.alert=function(d){alert(d)}};InffuseSDK_01.prototype.Utils=function(a){var c=a;var b=this;this.init=function(){};this.openPopup=function(j){function d(){c.off("popup-closed",d);if(j.onClose){j.onClose()}}var h={};var g=Object.keys(j);for(var f=0;f<g.length;f++){var e=g[f];if(typeof j[e]=="function"){continue}h[e]=j[e]}c.broadcast("open-popup",h);c.on("popup-closed",d)};this.closePopup=function(){c.broadcast("close-popup")}};InffuseSDK_01.prototype.UserClass=function(b,d,c){var e=b;var a=this;this.init=function(){};this.create=function(h,g,f){var i={name:h,email:g,password:f};return e.requestAPI("users",i,"POST",true).success(function(j){d=j.user})};this.login=function(g,f){var h={email:g,password:f};return e.requestAPI("users/login",h,"POST",true).success(function(i){d=i.user})};this.logout=function(){return e.requestAPI("users/logout",{},"POST",true).success(function(f){d={}})};this.loggedin=function(){return !!this.id()};this.resetPasswordRequest=function(f){return e.requestAPI("users/reset_password_request",{email:f},"POST")};this.resetPassword=function(f,g,h){return e.requestAPI("users/reset_password",{user:f,password:g,token:h},"POST")};this.id=function(){return d.id};this.created=function(){return d.created};this.key=function(){return d.key_name};this.plan=function(){return d.plan};this.isNew=function(){return d["new"]==true};this.update=function(f){f.user=a.id();return e.requestAPI("users/"+a.id(),f,"POST").success(function(h){for(var g in f){if(g!="password"){d[g]=f[g]}}})};this.email=function(f){if(typeof f=="undefined"){return d.email}d.email=f;var g={user:a.id(),email:f};return e.requestAPI("users/update",g,"POST")};this.name=function(f){if(typeof f=="undefined"){return d.name}d.name=f;var g={user:a.id(),name:f};return e.requestAPI("users/update",g,"POST")};this.upgrade=function(g){var f="{{billing_service}}";switch(f){case"stripe":e.services.stripe.checkout({type:"subscription",amount:15,plan:g,description:"Subscribe to "+g+" plan"});break}e.ui.alert("Inffuse error :: upgrade() is not supported on "+e.platform+" platform")};this.accessToken=function(){return d?d.access_token:null};this.is=function(f){return(f==this.plan())};this.free=function(){var f=this.plan();return(!f||f=="free")};this.getDataStore=function(f){if(!a.dataStore){a.dataStore=new e.DataStore(e,"users",a.id(),"private");a.dataStore.populate(c)}return a.dataStore};this.manage=function(){var g=e.server.indexOf("local")==-1?"dashboard.inffuse.com":"dev.inffuse.local:28099";var f=["http:/",g,"app:"+e.app.id(),"users","user:"+a.id()].join("/");console.log("To manage the user go to: ",f)}};InffuseSDK_01.prototype.Services=function(b,g){var h=b;var i=this;function f(n,q,j,l){var r=[q,j].join(".");var m=r.split(".");for(var o=0;o<m.length-1;o++){var k=m[o];if(typeof n[k]=="undefined"){n[k]={}}n=n[k]}var p=m.pop();n[p]=l}for(var d=0;d<g.length;d++){var e=g[d];for(var c=0;c<e.methods.length;c++){var a=e.methods[c];(function(j,l){var k=function(){var p={};for(var q=0;q<l.args.length;q++){var o=l.args[q];var r=arguments[q];p[o]=r}var s=j.name.replace(/\./g,"/");var n=l.name.replace(/\./g,"/");var m={method:[s,l.name].join("."),path:["services",s,n].join("/"),type:l.type};m.args={};for(var o in p){var r=p[o];if(typeof r=="function"){continue}if(typeof r=="object"){r=JSON.stringify(r)}m.args[o]=r}m.args.platform=h.platform;m.args.app=h.app.id();if(h.user){m.args.user=h.user.id();m.args.site=h.site?h.site.id():null;m.args.project=h.project?h.project.id():null}if(l.args.indexOf("callback")!=-1){m.callback=p.callback}return h.services[l.action||"fetch"](m)};f(i,j.name,l.name,k)})(e,a)}}this.fetch=function(j){return h.requestAPI(j.path,j.args,j.type).fail(function(k){if(k.responseJSON&&k.responseJSON.error){h.error(["Request to",j.method,"failed","("+k.responseJSON.error+")"].join(" "))}})};this.openWindow=function(p){function o(q){var r=q.data;if(r.app!="inffuse"){return}if(r.type=="connected"){window.removeEventListener("message",o);p.callback(r.params)}}var n=Math.floor(Math.random()*100000000);p.args.session=n;var m=[h.server,"api",h.apiVersion,p.path].join("/");m+="?"+$.param(p.args);var j=window.open(m,"Inffuse","height=600,width=600");var l="ActiveXObject" in window;if(!l){window.addEventListener("message",o,false)}else{var k=setInterval(function(){h.requestAPI("async/get",{session:n},"GET").then(function(q){if(!q.result){return}clearInterval(k);p.callback(q.data)})},1000)}}};InffuseSDK_01.prototype.StripeClass=function(a){var b=a;this.checkout=function(e){var c=e.publishable_key;function d(){var f=StripeCheckout.configure({key:c,image:e.image,token:function(h){switch(e.type){case"charge":b.services.stripe.charge(h.id,e.amount,e.test);break;case"subscription":b.services.stripe.subscribe(h.id,e.plan,e.test);break}}});var g=e.period||"month";f.open({name:e.name,description:e.description,amount:e.amount*100,panelLabel:"Subscribe ({{amount}}/"+g+")",allowRememberMe:false})}b.loadScript("https://checkout.stripe.com/checkout.js",d)}};InffuseSDK_01.prototype.FastspringClass=function(b){var c=b;var a=this;this.renderUrl=function(d){var f={platform:c.platform,user:c.user.id()};if(c.site){f.site=c.site.id()}var e=encodeURI(JSON.stringify(f));return d+"?referrer="+e};this.open=function(d){window.open(a.renderUrl(d))}};InffuseSDK_01.prototype.WixClass=function(b){var c=b;var a=this;a.siteInfo=null;this.init=function(){if(typeof Wix=="undefined"){return c.ui.alert("Inffuse error :: Wix SDK not loaded.")}c.user.upgrade=a.upgrade;c.broadcast=a.broadcast;c.site.meta=a.site_meta;c.site.pages=a.site_pages;c.site.currentPage=a.site_currentPage;c.utils.openPopup=a.openPopup;c.utils.closePopup=a.closePopup;(Wix.getSiteInfo||Wix.Worker.getSiteInfo)(function(e){this.siteInfo=e});var d=(Wix.addEventListener||Wix.Worker.addEventListener);d(Wix.Events.SITE_PUBLISHED,function(){c.project.publish()});d(Wix.Events.COMPONENT_DELETED,function(){if(c.viewMode()!="editor"){return}c.project.remove()});d(Wix.Events.STYLE_PARAMS_CHANGE,function(f,e){c.trigger("data-changed")});d(Wix.Events.EDIT_MODE_CHANGE,function(f,e){c._viewMode=f.editMode;c.trigger("view-mode-changed",c._viewMode)});d(Wix.Events.SETTINGS_UPDATED,function(e){c.receiveMessage(e)});d(Wix.Events.PAGE_NAVIGATION,function(e){c.trigger("route-changed",{page:e.toPage})});if(Wix.Utils&&Wix.Utils.getViewMode){c._viewMode=Wix.Utils.getViewMode()}};this.demoMode=function(){return false};this.upgrade=function(){Wix.Settings.openBillingPage()};this.broadcast=function(f,g,d){var e=c.project?c.project.key():undefined;Wix.Settings.triggerSettingsUpdatedEvent({type:f,params:g},e);if(d){c.trigger(f,g)}};this.site_meta=function(d){(Wix.getSiteInfo||Wix.Worker.getSiteInfo)(function(e){d({title:e.siteTitle,pageTitle:e.pageTitle,description:e.siteDescription,keywords:e.siteKeywords,referrer:e.referrer,url:e.url,host:e.baseUrl})})};this.site_pages=function(d){(Wix.getSitePages||Wix.Worker.getSitePages)(function(e){d(e)})};this.site_currentPage=function(d){Wix.getCurrentPageId(function(e){d(e)})};this.openPopup=function(d){Wix.openModal(d.url,d.width,d.height,{origin:Wix.WindowOrigin.FIXED},d.onClose,Wix.Theme.BARE)};this.closePopup=function(){Wix.closeWindow()}};InffuseSDK_01.prototype.WeeblyClass=function(b){var c=b;var a=this;this.init=function(){c.broadcast=a.broadcast};a.broadcast=function(g,h,d){if(!window.parent){return}var j={app:"inffuse",user:c.user?c.user.key():null,project:c.project?c.project.key():null,type:g,params:h};if(window.parent.postMessage){window.parent.postMessage(j,"*")}for(var e=0;e<window.parent.frames.length;e++){var f=window.parent.frames[e];if(f==window){continue}f.postMessage(j,"*")}if(d){c.trigger(g,h)}}};InffuseSDK_01.prototype.ShopifyClass=function(b){var d=b;var a=this;var c;a.init=function(e){c=e;if(d.editing){d.loadScript("https://cdn.shopify.com/s/assets/external/app.js",function(){ShopifyApp.init({apiKey:c.api_key,shopOrigin:"https://"+c.shop,forceRedirect:c.force_redirect});var g=c.logo_url;if(!g){g=[document.location.protocol,"//",document.location.host,"/img/logo_86.png"].join("")}var h={};h.primary={label:"Publish",message:"publish",callback:function(){setTimeout(ShopifyApp.Bar.loadingOff,200);d.project.publish();ShopifyApp.flashNotice("Your changes were published.")}};if(c.widget_url){h.secondary=h.secondary||[];h.secondary.push({label:"Preview",message:"preview",callback:d.shopify.preview})}var f=c.has_premium;if(f&&d.user.free()){h.secondary=h.secondary||[];h.secondary.push({label:"Upgrade",message:"upgrade",callback:function(){setTimeout(ShopifyApp.Bar.loadingOff,200);d.trigger("upgrade")}})}ShopifyApp.Bar.loadingOff();ShopifyApp.Bar.initialize({icon:c.logo_url,title:"Settings",buttons:h})})}};a.preview=function(){setTimeout(ShopifyApp.Bar.loadingOff,200);if(!c.widget_url){return d.ui.alert("Inffuse error :: widget endpoint is not set")}d.ui.openModal({src:c.widget_url,title:"Preview",width:"small",height:350,buttons:{primary:{label:"Close",callback:d.ui.closeModal}}})};d.ui.alert=function(e){ShopifyApp.flashNotice(e)};d.ui.openModal=function(e,f){ShopifyApp.Modal.open(e,f)};d.ui.closeModal=function(){ShopifyApp.Modal.close()};d.user.upgrade=function(f,e,g){d.services.shopify.createCharge(c.shop,f,e,g).then(function(h){window.top.location.href=h.confirmation_url})}};
