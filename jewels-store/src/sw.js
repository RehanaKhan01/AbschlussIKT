/*
//das ist die datei für den service worker damit er auf bestimmte ergeinisse reagiert


self.addEventListener('install', event => event.waitUntil(
    caches.open('sw-cache-1')
        .then(cache => cache.add('/'))//füge den request hinzu und die response
));

self.addEventListener('fetch', event => event.respondWith( //beantworte die Frage
        caches.open('sw-cache-1')// guckt im cache
        .then(cache => cache.match(event.request))// wenn der response match mit dem request
            .then(response => response || fetch(event.request))// und gibt den index.html zuruck also die anfrage

    ))


self.addEventListener('install',event => {
    console.log('sw --> installig ...', event)
});//wir haben den Sw geändert und jetzt versucht er sich zu installieren, aber ist noch nicht activiert aber das geht noch nicht
//deswegen sollten wir noch eine funktion activate schreiben
//damit unser neuer sw activiert wird---> Kann man mit skipwaiting machen auf der webkonsole in chrome


self.addEventListener('activate',event => {
    console.log('sw --> activating ...', event);
});//gehört zu dem installierungsprozess

//unser fetch ergegniss
self.addEventListener('fetch',event => {
    console.log('sw --> fetching ...', event.request);
    if (event.request.url.endsWith('/hello')) {
        event.respondWith(new Response('Hello FIW!'));
    }//wenn die URL mit hello endet dann antwortet er mit der response
});//sidn anfragen beim refreshen an den webserver
*/

importScripts('/src/js/idb.js');
importScripts('/src/js/db.js');

const VERSION = '10';
const CURRENT_STATIC_CACHE = 'static-v' + VERSION;
const CURRENT_DYNAMIC_CACHE = 'dynamic-v' + VERSION;
const STATIC_FILES = [
  '/',
  '/index.html',
  '/src/js/app.js',
  '/src/js/feed.js',
  '/src/js/material.min.js',
  '/src/js/idb.js',
  '/src/css/app.css',
  '/src/css/feed.css',
  '/src/images/htw.jpg',
  'https://fonts.googleapis.com/css?family=Roboto:400,700',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://code.getmdl.io/1.3.0/material.blue_grey-red.min.css'
];
self.addEventListener('install', event => {
  console.log('service worker --> installing ...', event);
  event.waitUntil(
    caches.open(CURRENT_STATIC_CACHE)
      .then(cache => {
        console.log('Service-Worker-Cache erzeugt und offen');
        cache.addAll(STATIC_FILES);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('service worker --> activating ...', event);
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          if (key !== CURRENT_STATIC_CACHE && key !== CURRENT_DYNAMIC_CACHE) {
            console.log('service worker --> old cache removed :', key);
            return caches.delete(key);
          }
        }))
      })
  );
  return self.clients.claim();
})

function isInArray(string, array) {
  for (let value of array) {
    if (value === string) {
      return true;
    }
  }
  return false;
}
self.addEventListener('fetch', event => {
  // check if request is made by chrome extensions or web page
  // if request is made for web page url must contains http.
  if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol

  const url = 'http://localhost:3000/posts';
  if (event.request.url.indexOf(url) >= 0) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clonedResponse = res.clone();
          clearAllData('posts')
            .then(() => {
              return clonedResponse.json();
            })
            .then(data => {
              for (let key in data) {
                console.log('write data', data[key]);
                writeData('posts', data[key]);
                // if (data[key].id === 5) deleteOneData('posts', 5);
              }
              deleteByTitle('posts', 'post');
            });
          return res;
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(res => { // nicht erneut response nehmen, haben wir schon
                return caches.open(CURRENT_DYNAMIC_CACHE) // neuer, weiterer Cache namens dynamic
                  .then(cache => {
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              });
          }
        })
    )
  }
})

self.addEventListener('sync', event => {
  console.log('service worker --> background syncing ...', event);
  if(event.tag === 'sync-new-post') {
    console.log('service worker --> syncing new posts ...');
    event.waitUntil(
      readAllData('sync-posts')
        .then( dataArray => {
          for(let data of dataArray) {
            console.log('data from IndexedDB', data);
            fetch('http://localhost:3000/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                id: null,
                title: data.title,
                location: data.location,
                image: '',
              })
            })
              .then( response => {
                console.log('Data sent to backend ...', response);
                if(response.ok) {
                  deleteOneData('sync-posts', data.id)
                }
              })
              .catch( err => {
                console.log('Error while sending data to backend ...', err);
              })
          }
        })
    );
  }
})
