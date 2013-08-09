/**
 * storage v1.1.0
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/08/08
 */
var storage=(function(){
	var storage=window.localStorage || window.globalStorage && window.globalStorage[location.hostname],
		storages={};
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
				this.userData.save("oXMLBranch");
				this.refresh();
			},
			removeItem:function(key){
				this.userData.removeAttribute(key);
				this.userData.save("oXMLBranch");
				this.refresh();
			},
			clear:function(){
				for(var key in storages){
					this.removeItem(key);
				}
			}
		}.init();
	}
	
	var i=0,
		len=storage && storage.length || 0,
		key;
	for(;i<len;i++){
		key=storage.key(i);
		storages[key]=storage.getItem(key);
	}
	
	return storage && {
		storage:storage,
		storages:storages,
		has:function(key){
			return storages[key]!=null;
		},
		get:function(key){
			var value=storage.getItem(key);
			return value==null?null:value;
		},
		set:function(key,value){
			storage.setItem(key,value);
			storages[key]=value;
			return storages;
		},
		remove:function(key){
			storage.removeItem(key);
			delete storages[key];
			return storages;
		},
		clear:function(){
			storage.clear();
			return this.storages=storages={};
		},
		size:function(){
			return storage.length;
		}
	}
})();