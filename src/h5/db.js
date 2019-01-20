
var getDbVersion = () => {
  return window.localStorage.dbVersion || 1;
}
class MyDb {
  constructor(dbName) {
    this.dbName = dbName;
    this.dbVersion = getDbVersion();
  }
  handleNone(resolve) {
    var newVersion = +getDbVersion() + 1
    window.localStorage.dbVersion = newVersion;
    this.dbVersion = newVersion;
    console.log(newVersion)
    this.openDb(this.storeName)
    .then(db => {
      this.db = db;
      resolve(db);
    })
  }

  openDb(storeName) {
    var { dbName, } = this;
    var dbVersion = getDbVersion();
    this.storeName = storeName;
    
    return new Promise((resolve, reject) => {
      var request = indexedDB.open(dbName, dbVersion);
      request.onsuccess = () => {  
        var db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.close();
          this.handleNone(resolve);
          return ;
        }
        this.db = db;
        resolve(this);
      };
      request.onupgradeneeded = event => {
        var db = request.result;
        if (db.objectStoreNames.contains(storeName)) {
            db.deleteObjectStore(storeName);
        }
        db.createObjectStore(storeName)
      };
      request.onerror = (err) => {
        // console.log(err);
        this.handleNone(resolve);
        // reject(err);
      }
    });
  }

  getData(_id, ) {
    var { storeName } = this;
    return new Promise((resolve, reject) => {
      var store = this.getStore();
      var request = store.get(_id);
      request.onerror = reject.bind(null, `Error getting wasm module ${_id}`);
      request.onsuccess = event => {
        if (request.result)
          resolve(request.result);
        else
          reject(`Module ${_id} was not found in wasm cache`);
      }
    });
  }

  _setData(data = {}, idKey = '_id') {
    var { db, storeName, } = this;
    var store = this.getStore();
    var request = store.put(data, data[idKey] || 1);
    request.onerror = err => {
      this.handleError(err, '_setData')
    };
    request.onsuccess = err => {
      // console.log(`Successfully stored ${data._id} in wasm cache`)
    };
  }

  setData(data = {}, idKey = '_id') {
    if (Array.isArray(data)) {
      data.map(v => {
        this._setData(v, idKey)
      });
    } else {
      this._setData(data, idKey)
    }
  }

  delData(_id) {
    var { db, storeName, } = this;
    var store = this.getStore();
    var request = store.delete(_id);
    request.onerror = err => {
      console.error(err)
    };
    request.onsuccess = err => {
      // console.log(`已经成功删除${_id}`)
    };
  }
  getStore() {
    var { db, storeName, } = this;
    var store = db.transaction([storeName], 'readwrite').objectStore(storeName);
    return store;
  }
  clear() {
    var request = this.getStore().clear();
    request.onerror = err => {
      console.error(err)
    };
    request.onsuccess = err => {
      // console.log(`已经成功清空`)
    };
  }

  getAllData() {
    var { db, storeName, } = this;
    return new Promise((resolve, reject) => {
      var request = this.getStore().openCursor(),
        arr = [];
      request.onsuccess = function (event) {
        var cursor = event.target.result;

        if (!cursor) {
          resolve(arr);
          return;
        }
        arr.push(cursor.value);

        cursor.continue();
      }
      request.onerror = err => {
        reject(err);
        console.error(`Failed to store in wasm cache: ${err}`)
      };
    });
  }
}

function getStore(key = 'info') {
  var data = window.localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (err) { console.log(err) }
  return data;
}

function setStore(obj, key = 'info') {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  return window.localStorage.setItem(key, obj);
}

export default MyDb

export {
  getStore,
  setStore,
}
