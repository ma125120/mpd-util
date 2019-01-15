
class MyDb {
  constructor(dbName, dbVersion) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
  }

  openDb(storeName) {
    var { dbName, dbVersion, } = this;
    this.storeName = storeName;
    return new Promise((resolve, reject) => {
      var request = indexedDB.open(dbName, dbVersion);
      request.onerror = reject.bind(null, '打开indexdb时发生了错误');
      request.onsuccess = () => {
        var db = request.result;
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

  setData(data = {}, idKey = '_id') {
    var { db, storeName, } = this;
    var store = this.getStore();
    var request = store.put(data, data[idKey] || 1);
    request.onerror = err => { console.error(err) };
    request.onsuccess = err => {
      // console.log(`Successfully stored ${data._id} in wasm cache`)
    };
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

export default MyDb
