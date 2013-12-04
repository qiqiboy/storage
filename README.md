storage
=======

> 提供LocalStorage的本地化存储方案，支持IE（通过IE特性userData）。

注意：IE6 IE7等是通过userData来持久化存储数据的，不支持复杂对象的存储，例如Array、Object等，如果有此需求，请转为JSON后再进行存储。

## 如何使用
```javascript
// 首先在页面中引入storage.js
//可以通过两种方式调用：
//一是直接调用
storage.get(key); //获取名字为 key 的storage的值
storage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage，true表示设置成功，false表示设置失败
storage.remove(key,value); //删除名字为 key 的storage，true表示删除成功，false表示删除失败
storage.clear(); //清除所有的storage
storage.size(); //返回已存储的storage数量

//二是通过先获取一个实例引用，此种方式可以避开单个xml只能存储64KB数据的限制。但是请注意的是，一个域下最多支持10个，所以一个页面中请避免超过10个storage实例。
var mystorage=storage('myName');
mystorage.get(key); //获取名字为 key 的storage的值
mystorage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage，true表示设置成功，false表示设置失败
mystorage.remove(key,value); //删除名字为 key 的storage，true表示删除成功，false表示删除失败
mystorage.clear(); //清除所有的storage
mystorage.size(); //返回已存储的storage数量

````