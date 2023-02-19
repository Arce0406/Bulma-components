/**
 * https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API/Using_IndexedDB#%E5%AE%8C%E6%95%B4_indexeddb_%E7%AF%84%E4%BE%8B
 */

const DB_NAME = "webrtc-indexeddb-database";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "videos";

let db;
// Used to keep track of which view is displayed to avoid uselessly reloading it
var current_view_pub_key;

function isIndexDbSupport() {
  // In the following line, you should include the prefixes of implementations you want to test.
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  // DON'T use "var indexedDB = ..." if you're not in a function.
  // Moreover, you may need references to some window.IDB* objects:
  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

  if (!window.indexedDB) {
    window.alert(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
    );
    return false;
  }
  return true;
}

function openDb() {
  console.log("openDb ...");
  let req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function (evt) {
    // Better use "this" than "req" to get the result to avoid problems with garbage collection.
    // db = req.result;
    db = this.result;
    console.log("openDb DONE");
  };
  req.onerror = function (evt) {
    console.error("openDb:", evt.target.errorCode);
  };

  req.onupgradeneeded = function (evt) {
    console.log("openDb.onupgradeneeded");
    var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });

    store.createIndex("create_date", "create_date", { unique: false });
    store.createIndex("title", "title", { unique: false });
    store.createIndex("blob", "blob", { unique: false });
  };
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
  var tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

function clearObjectStore(store_name) {
  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  var req = store.clear();
  req.onsuccess = function(evt) {
    displayActionSuccess("Store cleared");
    displayPubList(store);
  };
  req.onerror = function (evt) {
    console.error("clearObjectStore:", evt.target.errorCode);
    displayActionFailure(this.error);
  };
}

function getBlob(key, store, success_callback) {
  var req = store.get(key);
  req.onsuccess = function(evt) {
    var value = evt.target.result;
    if (value)
      success_callback(value.blob);
  };
}

function addPublication(biblioid, title, year, blob) {
  console.log("addPublication arguments:", arguments);
  var obj = { biblioid: biblioid, title: title, year: year };
  if (typeof blob != 'undefined')
    obj.blob = blob;

  var store = getObjectStore(DB_STORE_NAME, 'readwrite');
  var req;
  try {
    req = store.add(obj);
  } catch (e) {
    if (e.name == 'DataCloneError')
      displayActionFailure("This engine doesn't know how to clone a Blob, " +
                           "use Firefox");
    throw e;
  }
  req.onsuccess = function (evt) {
    console.log("Insertion in DB successful");
    displayActionSuccess();
    displayPubList(store);
  };
  req.onerror = function() {
    console.error("addPublication error", this.error);
    displayActionFailure(this.error);
  };
}

 /**
   * @param {number} key
   * @param {IDBObjectStore=} store
   */
 function deletePublication(key, store) {
  console.log("deletePublication:", arguments);

  if (typeof store == 'undefined')
    store = getObjectStore(DB_STORE_NAME, 'readwrite');

  // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
  // the result of the Object Store Deletion Operation algorithm is
  // undefined, so it's not possible to know if some records were actually
  // deleted by looking at the request result.
  var req = store.get(key);
  req.onsuccess = function(evt) {
    var record = evt.target.result;
    console.log("record:", record);
    if (typeof record == 'undefined') {
      displayActionFailure("No matching record found");
      return;
    }
    // Warning: The exact same key used for creation needs to be passed for
    // the deletion. If the key was a Number for creation, then it needs to
    // be a Number for deletion.
    req = store.delete(key);
    req.onsuccess = function(evt) {
      console.log("evt:", evt);
      console.log("evt.target:", evt.target);
      console.log("evt.target.result:", evt.target.result);
      console.log("delete successful");
      displayActionSuccess("Deletion successful");
      displayPubList(store);
    };
    req.onerror = function (evt) {
      console.error("deletePublication:", evt.target.errorCode);
    };
  };
  req.onerror = function (evt) {
    console.error("deletePublication:", evt.target.errorCode);
    };
}

export { isIndexDbSupport };
