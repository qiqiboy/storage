storage
=======

> 提供LocalStorage的本地化存储方案，支持IE（通过IE特性userData）。

## 如何使用
```javascript
// 首先在页面中引入storage.js

storage.get(key); //获取名字为 key 的storage的值

storage.set(key,value); //添加或修改一个名字为 key， 值为 value 的storage

storage.remove(key,value); //删除名字为 key 的storage

storage.clear(); //清除所有的storage

storage.size(); //返回已存储的storage数量

````