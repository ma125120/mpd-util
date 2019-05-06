## 1. 说明
主要是一些平时比较常用的函数，还在更新中

## 2. 安装

```node
npm i -S mpd-util
```

## 3. 功能说明

### 3.1 indexDB

#### 3.1.1 实例化
``` db.openDb(dbName: string, isReload?: boolean, idKey?: string, dbVersion?: string): Promise; ```

```javascript
// dbName: 数据库名
// isReload: 数据库更新时是否刷新网页，建议开启（可选）
// idKey： 主键名（可选）
// dbVersion：数据库版本（可选）
var db = new MyDb(dbName, isReload, idKey, dbVersion);
```

#### 3.1.2 打开某个集合(objectStore)
``` db.openDb(storeName: string): Promise; ```

```javascript
db.openDb('info')
.then(db => {
  //数据的增删改查
})
```

#### 3.1.3 增加或修改数据
``` db.setData(data: any, key: string): void; ```

第二个参数为主键名，默认_id,必须指定，否则可能无法检索数据。
```javascript
db.openDb('info')
.then(db => {
  // 添加或更新数据，第二个参数为主键，查询或删除时使用。
  db.setData({ _id: 123, name: 'test' }, '_id');
})
```

#### 3.1.4 获取单个数据
``` db.getData(key: string): Promise; ```
```javascript
db.openDb('info')
.then(db => {
  db.getData(123)
  .then(data => {
    console.log(data)
  })
})
```

#### 3.1.5 获取所有数据
``` db.getAllData(): Promise; ```
```javascript
db.openDb('info')
.then(db => {
  db.getAllData()
  .then(allData => {
    console.log(allData)
  })
})
```

#### 3.1.6 删除数据
``` db.getAllData(): Promise; ```
```javascript
db.openDb('info')
.then(db => {
  db.delData(123);
})
```

#### 3.1.7 清空数据
``` db.getAllData(): Promise; ```
```javascript
db.openDb('info')
.then(db => {
  db.clear();
})
```

#### 3.1.8 完整流程

```javascript

import { MyDb } from 'mpd-util'
var db = new MyDb('mydb', 20190115);

db.openDb('info')
.then(db => {
  // 添加或更新数据，第二个参数为主键，查询或删除时使用。
  db.setData({ _id: 123, name: 'test' }, '_id');

  // 获取单个数据
  db.getData(123)
  .then(data => {
    console.log(data)
  })
  // 获取所有数据
  db.getAllData()
  .then(allData => {
    console.log(allData)
  })

  // 删除数据
  db.delData(123);
  //清空数据
  db.clear();
})
```

### 3.2 复制文本或元素
```javascript
// @params selector: String 已存在的dom元素选择器字符串（可以直接在DOM中放置一个空元素，来实现复制字符串的功能）
// @params text: String 在文本后面添加的文字
// @params isHtml: Boolean 是否复制dom元素的html结构,默认false

function copy(selector, text, isHtml) {  }

// 调用方式
import { copy } from 'mpd-util'
copy("#app")

```

### 3.3 拨打电话
```javascript
// @params callPhone: String 要拨打的手机号

function callPhone(tel) {  }

// 调用方式
import { callPhone } from 'mpd-util'
callPhone('158****1234')
```

### 3.4 localStorage操作

#### 3.4.1 设置数据
``` setStore(data: any, key: String): void; ```
```javascript
// 调用方式
import { setStore } from 'mpd-util'
setStore({ name: 'test' }, 'info');
```

#### 3.4.2 获取数据
``` getStore(key: String): any; ```
```javascript
// 调用方式
import { getStore } from 'mpd-util'
getStore('info');
```

### 3.5 避免空值
```javascript
// params data: 原始值
// keys: 键名，多个 键名以逗号隔开，
// defaultValue: 最后返回的默认值
// debug: 是否开启调试模式
getSafe(data: any, keys: string | number, defaultValue: any, debug: boolean): any
```

```javascript
// 调用方式
import { getSafe } from 'mpd-util'
console.log(getSafe({}, 's, 1', 1))

```
