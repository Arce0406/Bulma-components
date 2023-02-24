/**
 * https://developer.mozilla.org/zh-TW/docs/Web/API/IndexedDB_API/Using_IndexedDB#%E5%AE%8C%E6%95%B4_indexeddb_%E7%AF%84%E4%BE%8B
 */

const DB_NAME = "webrtc-indexeddb-database";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "videos";

let db;
// Used to keep track of which view is displayed to avoid uselessly reloading it
let current_view_pub_key;

function isIndexDbSupport() {
  if (!window.indexedDB) {
    window.alert(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
    );
    return false;
  }
  return true;
}

function onDbError(evt) {
  console.error("openDb:", evt.target.errorCode);
}

function openDb() {
  console.log("openDb ...");
  let req = indexedDB.open(DB_NAME, DB_VERSION);
  req.onsuccess = function (evt) {
    // Better use "this" than "req" to get the result to avoid problems with garbage collection.
    // db = req.result;
    db = this.result;
    console.log("openDb DONE");

    getAllVideo();
  };
  req.onerror = onDbError;

  req.onupgradeneeded = function (evt) {
    console.log("openDb.onupgradeneeded");
    let store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME, {
      keyPath: "id",
      autoIncrement: true,
    });

    store.createIndex("create_date", "create_date", { unique: false });
    store.createIndex("title", "title", { unique: false });
    store.createIndex("blob", "blob", { unique: false });
  };
}

function deleteDb() {
  let delDb = window.indexedDB.deleteDatabase(DB_NAME);
  delDb.addEventListener("error", onDbError);
  delDb.addEventListener("success", function (event) {
    console.log("資料庫刪除成功!!");
  });
}

/**
 * @param {string} store_name
 * @param {string} mode either "readonly" or "readwrite"
 */
function getObjectStore(store_name, mode) {
  let tx = db.transaction(store_name, mode);
  return tx.objectStore(store_name);
}

function clearObjectStore(store_name) {
  let store = getObjectStore(DB_STORE_NAME, "readwrite");
  let req = store.clear();
  req.onsuccess = function (evt) {
    console.log("Store cleared");
  };
  req.onerror = function (evt) {
    console.error("clearObjectStore:", evt.target.errorCode);
  };
}

function addVideo(title, blob) {
  const d = Date.now();

  let obj = { title: title, create_date: d };
  if (typeof blob != "undefined") obj.blob = blob;

  let store = getObjectStore(DB_STORE_NAME, "readwrite");
  let req;
  try {
    req = store.add(obj);
  } catch (e) {
    if (e.name == "DataCloneError")
      console.log(
        "This engine doesn't know how to clone a Blob, " + "use Firefox"
      );
    throw e;
  }
  req.onsuccess = function (evt) {
    console.log("Insertion in DB successful");
  };
  req.onerror = function () {
    console.error("addVideo error", this.error);
  };
}

function updateVideo() {}

async function getAllVideo() {
  let store = getObjectStore(DB_STORE_NAME, "readwrite");

  let datas = [];
  store.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      datas.push(cursor.value);
      cursor.continue();
    }
    else {
      console.log("Got all videos: ", datas);
      // datas[0].blob
    }
  };

  // store.getAll().onsuccess = function(event) {
  //   console.log("Got all videos: ", event.target.result);
  // };

}

function getVideosAsync(skip, take) {
  return new Promise((resolve, reject) => {
    let store = getObjectStore(DB_STORE_NAME, "readonly");
    var results = [];
    var request =
      (store.openCursor(IDBKeyRange.bound(skip, skip + take)).onsuccess =
      function (evt) {
        var cursor = evt.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        }
        resolve(results);
      }.onerror =
        function (err) {
          reject(err);
        });
  });
}

/**
 * @param {number} key
 * @param {IDBObjectStore=} store
 */
function deleteVideo(key, store) {
  console.log("deletePublication:", arguments);

  if (typeof store == "undefined")
    store = getObjectStore(DB_STORE_NAME, "readwrite");

  // As per spec http://www.w3.org/TR/IndexedDB/#object-store-deletion-operation
  // the result of the Object Store Deletion Operation algorithm is
  // undefined, so it's not possible to know if some records were actually
  // deleted by looking at the request result.
  let req = store.get(key);
  req.onsuccess = function (evt) {
    let record = evt.target.result;
    console.log("record:", record);
    if (typeof record == "undefined") {
      displayActionFailure("No matching record found");
      return;
    }
    // Warning: The exact same key used for creation needs to be passed for
    // the deletion. If the key was a Number for creation, then it needs to
    // be a Number for deletion.
    req = store.delete(key);
    req.onsuccess = function (evt) {
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

export { isIndexDbSupport, openDb, addVideo, getAllVideo };
