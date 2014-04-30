storage
=======

> 提供LocalStorage的本地化存储方案，支持IE（通过IE特性userData）。

注意：IE6 IE7等是通过userData来持久化存储数据的，不支持复杂对象的存储，例如Array、Object等，如果有此需求，请转为JSON后再进行存储。

## 如何使用
```javascript
// 首先在页面中引入storage.js
// 在调用前可以通过storage.support判断浏览器是否支持storage

//可以通过两种方式调用：
//一是直接调用
if(storage.support){

	storage.get(key); //获取名字为 key 的storage的值
	storage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage，true表示设置成功，false表示设置失败
	storage.remove(key,value); //删除名字为 key 的storage，true表示删除成功，false表示删除失败
	storage.clear(); //清除所有的storage
	storage.size(); //返回已存储的storage数量

}

//二是通过先获取一个实例引用，此种方式可以避开单个xml只能存储64KB数据的限制。但是请注意的是，一个域下最多支持10个，所以一个页面中请避免超过10个storage实例。
var mystorage=storage('myName');
if(mystorage.support){

	mystorage.get(key); //获取名字为 key 的storage的值
	mystorage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage，true表示设置成功，false表示设置失败
	mystorage.remove(key,value); //删除名字为 key 的storage，true表示删除成功，false表示删除失败
	mystorage.clear(); //清除所有的storage
	mystorage.size(); //返回已存储的storage数量

}


//v2.4新增
//支持代理功能，主要是为了ie下的userdata跨页面数据互访
//userdata只允许向上访问，不允许向下以及同级互访，所有如果如果涉及到跨页面数据共享，就需要指定一个页面节点作为代理
//该代理一般是使用iframe中节点
var iframe=docuemnt.createElement('iframe');
iframe.style.display='none';
iframe.onload=iframe.onreadystatechange=function(){//确保iframe加载完毕
    if(iframe&&iframe.readyState&&iframe.readyState!='loaded'&&iframe.readyState!='complete'){return;}
    iframe.onload=iframe.onreadystatechange=null;
	var body=(iframe.window||iframe.contentWindow).document.body;
	var storage=new storage(body); //或者 new storage('myName',body);
	if(storage.support){
		// code
	}
}
iframe.src='/myPorxy.html';//使用根一级页面作为代理
````

## DEMO 
http://u.boy.im/storage/
