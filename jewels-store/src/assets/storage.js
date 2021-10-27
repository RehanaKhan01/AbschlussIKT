window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
    alert("Your browser is not supported IndexedDB");
}

var db;
// version number 1
var request = window.indexedDB.open("jewels_store_db", 1);

request.onerror = function(event) {
    console.log("IndexedDB-Error: " + event.target.result);
}

request.onsuccess = function(event) {
    db = request.result;
    console.log(db + "-DB connected.");
}

request.onupgradeneeded = function(event) {
    var db = event.target.result;
    var objectStore = db.createObjectStore("jewels_store_db");
}