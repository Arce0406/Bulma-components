// import idb from "./umd";
//  => <script src="https://cdn.jsdelivr.net/npm/idb@7/build/umd.js"></script>

import {
  openDB,
  deleteDB,
  wrap,
  unwrap,
} from "https://cdn.jsdelivr.net/npm/idb@7/+esm";
const DB_NAME = "webrtc-indexeddb-database";
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = "videos";

let db;

function onDbError(event) {
  console.error("openDb:", evt.target.errorCode);
  const error = event.target.error; // DOMException
  if (error.name == "QuotaExceededError") {
    // Fallback code goes here
  }
}

// if (!window.indexedDB) {
//   window.alert(
//     "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
//   );
// }
async function init() {
  const dbPromise = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction, event) {
      console.log("openDb.onupgradeneeded");
      // Create a store of objects
      let store = db.createObjectStore(DB_STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });

      // Create an index on the 'xxx' property of the objects.
      // store.createIndex("xxx", "xxx");
      store.createIndex("create_date", "create_date", { unique: false });
      store.createIndex("title", "title", { unique: false });
      store.createIndex("blob", "blob", { unique: false });
    },
    blocked(currentVersion, blockedVersion, event) {
      // …
      console.log("openDb.onblocked");
    },
    blocking(currentVersion, blockedVersion, event) {
      // …
      console.log("openDb.onblocking");
    },
    terminated() {
      // …
      console.log("openDb.onterminated");
    },
  });

  const videoStored = {
    async get(key) {
      return (await dbPromise).get(DB_STORE_NAME, key);
    },
    async set(key, val) {
      return (await dbPromise).put(DB_STORE_NAME, val, key);
    },
    async delete(key) {
      return (await dbPromise).delete(DB_STORE_NAME, key);
    },
    async clear() {
      return (await dbPromise).clear(DB_STORE_NAME);
    },
    async keys() {
      return (await dbPromise).getAllKeys(DB_STORE_NAME);
    },
  };

  return { dbPromise, videoStored };
}

export { init };

// export async function get(key) {
//   return (await dbPromise).get(DB_STORE_NAME, key);
// }
// export async function set(key, val) {
//   return (await dbPromise).put(DB_STORE_NAME, val, key);
// }
// export async function del(key) {
//   return (await dbPromise).delete(DB_STORE_NAME, key);
// }
// export async function clear() {
//   return (await dbPromise).clear(DB_STORE_NAME);
// }
// export async function keys() {
//   return (await dbPromise).getAllKeys(DB_STORE_NAME);
// }
