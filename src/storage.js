/**
 * storage v2.4
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/12/03
 */
;
(function(ROOT, Struct, NS, undefined){
	"use strict";
	
	var doc=ROOT.document,
		storage=ROOT.localStorage || ROOT.globalStorage&&ROOT.globalStorage[location.hostname];
	
	Struct.prototype=Struct;
	
	var getStorage=function(name,proxy){
		return ( storage ? {
			length:0,
			init:function(){
				this.name=name?name+'/':'';
				this.getStorages();
				return this;
			},
			getStorages:function(){
				var storages=this.storages={},
                    keys=this.keys=[],
					i=0,j=storage.length,key,_key,
					testReg=new RegExp('^'+this.name.replace(/([\.\?\+\*\[\]\(\)\^\$\/\|\\])/g,"\\$1"),'i');
				for(;i<j;i++){
					key=storage.key(i);
					if(testReg.test(key)){
						_key=key.replace(testReg,'');
						keys.push(_key);
						storages[_key]=storage.getItem(key);
					}
				}
				this.length=keys.length;
				return this;
			},
			key:function(i){
				return this.keys[i];
			},
			getItem:function(key){
				return this.storages[key];
			},
			setItem:function(key,value){
				storage.setItem(this.name+key,value);
				return this.getStorages();
			},
			removeItem:function(key){
				storage.removeItem(this.name+key);
				return this.getStorages();
			},
			clear:function(){
				if(this.name){
					var len=this.length,
						i=0;
					while(i++<len){
						this.removeItem(this.key(0));
					}
				}else{
					storage.clear();
				}
				return this.getStorages();
			}
		} : {
				length:0,
				userData:proxy || doc.getElementsByTagName('head')[0],
				init:function(){
					this.name=name?'_'+name:'';
					try{
						this.userData.addBehavior("#default#userdata");
					}catch(e){}
					this.refresh();

					return this;
				},
				load:function(){
					try{
						this.userData.load("oXMLBranch"+this.name);
						this.storeNode=this.userData.xmlDocument.firstChild;
					}catch(e){}
				},
				refresh:function(){
					this.load();
					this.length=this.storeNode.attributes.length;
					return this;
				},
				key:function(i){
					this.load();
					return this.storeNode.attributes[i].nodeName.replace(/^_/,'');
				},
				getItem:function(key){
					this.load();
					return this.userData.getAttribute('_'+key);
				},
				setItem:function(key,value){
					this.load();
					this.userData.setAttribute('_'+key,value);
					return this.save();
				},
				removeItem:function(key){
					this.load();
					this.userData.removeAttribute('_'+key);
					return this.save();;
				},
				clear:function(){
					this.load();
					this.userData.xmlDocument.removeChild(this.storeNode);
					return this.save();
				},
				save:function(){
					this.userData.save("oXMLBranch"+this.name);
					return this.refresh();
				}
			} ).init();
	}
	
	var prop, fn={
		version:"2.4",
		constructor:Struct,
		init:function(name,proxy){
            if(typeof name!='string'){
                proxy=name;
                name='';
            }
			this.storage=getStorage(name,proxy);
			return this.test();
		},
		test:function(){
			try{
				this.support=this.set('__storage__',1) && this.remove('__storage__');
			}catch(e){
				this.support=false;
			}
			return this;
		},
		refresh:function(){
			this.storages=this.getStorages();
			return this;
		},
		has:function(key){
			return this.get(key)!=null;
		},
		get:function(key){
			return this.storages[key];
		},
		set:function(key,value){
			this.storage.setItem(key,value);
			return this.refresh().has(key);
		},
		remove:function(key){
			this.storage.removeItem(key);
			return !this.refresh().has(key);
		},
		clear:function(){
			this.storage.clear();
			return !this.refresh().size();
		},
		size:function(){
			return this.storage.length;
		},
		getStorages:function(){
			var storages={},
				storage=this.storage,
				i=0,
				len=storage && storage.length || 0,
                key;
			for(;i<len;i++){
                key=storage.key(i);
				storages[key]=storage.getItem(key);
			}
			return storages;
		},
        key:function(i){
            return this.storage.key(i);
        }
	}
	
	for(prop in fn){
		Struct[prop]=fn[prop];
	}
	
	return ROOT[NS]=Struct.init();
	
})(window, function(name){
	if(!(this instanceof arguments.callee)){
		return new arguments.callee(name);
	}
	this.init(name);
}, 'storage');
