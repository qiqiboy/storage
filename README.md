storage
=======

> 提供LocalStorage的本地化存储方案，支持IE（通过IE特性userData）。

注意：IE6 IE7等是通过userData来持久化存储数据的，为了可以达到获取本域下所有已存储数据的目的，所以所有数据都是存储在一个xml文件里的。因此一个域下不能存储太大的数据，限制为128KB（受限站点64KB）。
另外不支持复杂对象的存储，例如Array、Object等，如果有此需求，请转为JSON后再进行存储。

## 如何使用
```javascript
// 首先在页面中引入storage.js

storage.get(key); //获取名字为 key 的storage的值

storage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage，true表示设置成功，false表示设置失败

storage.remove(key,value); //删除名字为 key 的storage，true表示删除成功，false表示删除失败

storage.clear(); //清除所有的storage

storage.size(); //返回已存储的storage数量

````