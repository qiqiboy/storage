/**
 * storage v1.0.1
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2013/03/29
 */
var storage=function(key, value){
    try{
        var storage=window.localStorage || window.globalStorage && window.globalStorage[location.hostname];
        if(storage){
            if(typeof value != 'undefined'){
                value===null ? storage.removeItem(key) : storage[key]=value;
			}else if(typeof key != 'undefined'){
                return storage[key]||"";
			}else{
				storage.clear();
			}
        }else if(/MSIE/i.test(navigator.userAgent)){
            var userData=document.getElementById('userData')||document.createElement('input');
            if(!userData.id){
                userData.id="userData";
                userData.style.display='none';
                userData.style.behavior='url(#default#userData)';
                document.body.appendChild(userData);
            }
            try{
                userData.load("oXMLBranch");
            }catch(e){}
            if(typeof value != 'undefined'){
                value===null ? userData.removeAttribute(key) : userData.setAttribute(key, value);
                userData.save("oXMLBranch");
            }else if(typeof key != 'undefined'){
               	return userData.getAttribute(key)||"";
			}else{
				var attrs=userData.xmlDocument.firstChild.attributes, i;
				while(i=attrs.length){
					var j=attrs[--i].nodeName;
					userData.removeAttribute(j);
				}
				userData.save("oXMLBranch");
			}
        }else{
			return false;
		}
        return true;
    }catch(e){
       	return false;
    }
}