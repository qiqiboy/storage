/**
 * storage v1.2
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/12
 */
var storage=(function(){
	var storage=0,//window.localStorage || window.globalStorage && window.globalStorage[location.hostname],
		getStorages=function(){
			var storages={},
				i=0,
				len=storage && storage.length || 0,
				key;
			for(;i<len;i++){
				key=storage.key(i);
				storages[key]=storage.getItem(key);
			}
			return storages;
		}
		
	if(!storage){
		storage={
			length:0,
			userData:document.getElementById('userData')||document.createElement('input'),
			init:function(){
				var userData=this.userData;
				if(!userData.id){
					userData.id="userData";
                	userData.style.display='none';
                	userData.style.behavior='url(#default#userData)';
                	document.body.appendChild(userData);
				}
				
				try{
					userData.load("oXMLBranch");
					this.storeNode=userData.xmlDocument.firstChild;
				}catch(e){
					return null;	
				}
				
				return this.refresh();
			},
			refresh:function(){
				this.length=this.storeNode.attributes.length;
				return this;
			},
			key:function(i){
				return this.storeNode.attributes[i].nodeName;
			},
			getItem:function(key){
				return this.userData.getAttribute(key);
			},
			setItem:function(key,value){
				this.userData.setAttribute(key,value);
				this.save();
			},
			removeItem:function(key){
				this.userData.removeAttribute(key);
				this.save();;
			},
			clear:function(){
				var len=this.length,
					i=0;
				while(i++<len){
					this.userData.removeAttribute(this.key(0));
				}
				this.save();
			},
			save:function(){
				this.userData.save("oXMLBranch");
				this.refresh();
			}
		}.init();
	}
	
	return storage && {
		storage:storage,
		refresh:function(){
			this.storages=getStorages();
			return this;
		},
		has:function(key){
			return this.storages[key]!=null;
		},
		get:function(key){
			return this.storages[key]
		},
		set:function(key,value){
			storage.setItem(key,value);
			return this.refresh().has(key);
		},
		remove:function(key){
			storage.removeItem(key);
			return !this.refresh().has(key);
		},
		clear:function(){
			storage.clear();
			return this.refresh();
		},
		size:function(){
			return storage.length;
		}
	}.refresh();
})();