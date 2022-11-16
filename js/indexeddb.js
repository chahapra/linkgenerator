//prefixes of implementation that we want to test
window.indexedDB = window.indexedDB || window.mozIndexedDB ||
window.webkitIndexedDB || window.msIndexedDB;

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction ||
window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
window.msIDBKeyRange

if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

var db;
var dbVersion = 2;
var request = window.indexedDB.open("urlbuilder", dbVersion);

request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {

   var db = event.target.result;
   var appsos = "app";
   var networksos = "network";
   var sitesos = "site";

   checkOS(db,appsos, app);
   checkOS(db,networksos, network);
   checkOS(db,sitesos, site);
}

function checkOS(db,os,data){
  if (!db.objectStoreNames.contains(os)) {
    var objectStore = db.createObjectStore(os, {keyPath: "id"});
    addItems(objectStore, data);
  }else if(event.newVersion){
    db.deleteObjectStore(os);
    var objectStore = db.createObjectStore(os, {keyPath: "id"});
    addItems(objectStore, data);
  }
}

function addItems(objectStore,items){
  for (var i in items) {
     objectStore.add(items[i]);
  }
}
