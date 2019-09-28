importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// our adjustments

console.log("Service-worker succesfully registered");


workbox.precaching.precacheAndRoute([
  {
    "url": "adds.html",
    "revision": "1e6011213a7a1c704994cf38d8d4418f"
  },
  {
    "url": "AdPosting.html",
    "revision": "cc5af2aff5bceb9b95f9414f45485d94"
  },
  {
    "url": "authentication.html",
    "revision": "c992f88f415e6b795101609e9bcb1455"
  },
  {
    "url": "back up/adds.html",
    "revision": "e913569f13e98f696ba0404445c9a44d"
  },
  {
    "url": "back up/authentication.html",
    "revision": "b8db0e4c153d963e6d261d7c6fe1e93f"
  },
  {
    "url": "back up/index.html",
    "revision": "60532b47405025aa06bddc692450a5d3"
  },
  {
    "url": "back up/profile.html",
    "revision": "ad19b8a2458080341b8f0c6bbe764b83"
  },
  {
    "url": "css/authcss.css",
    "revision": "a6075d48fd2c35cc745121a0baad7dc5"
  },
  {
    "url": "css/materialize.css",
    "revision": "b0663391a6dd5efed956259f29fa18dd"
  },
  {
    "url": "css/materialize.min.css",
    "revision": "ec1df3ba49973dcb9ff212f052d39483"
  },
  {
    "url": "css/mystyle.css",
    "revision": "1816ca0fe4ce5ef6377815631963957d"
  },
  {
    "url": "css/normalize.css",
    "revision": "f3a2153a2dc2825037a5170a581172c7"
  },
  {
    "url": "css/styleguide.css",
    "revision": "3bf7849210e80775501c50583890fbbc"
  },
  {
    "url": "img/add-thumbnail-01.jpg",
    "revision": "ea0313794e14d7bf9795fc476e7b5dfd"
  },
  {
    "url": "img/add-thumbnail-02.jpg",
    "revision": "003ef55cdec8b596b173a282dbaf8dcf"
  },
  {
    "url": "img/add-thumbnail-03.jpg",
    "revision": "a0bdfcbc2c8c6bbcaf0d5bc8a823b834"
  },
  {
    "url": "img/add-thumbnail-04.jpg",
    "revision": "71fd9827d8ff189eb7386aef0d041f17"
  },
  {
    "url": "img/logo.png",
    "revision": "c44fc65d4aaa567c43411fb12a77d76c"
  },
  {
    "url": "img/profile-image.png",
    "revision": "44330dbd1b68607423fba43ee3aad470"
  },
  {
    "url": "img/social-icon.png",
    "revision": "781d3f3e3e94696a5cc0713453c6c189"
  },
  {
    "url": "index.html",
    "revision": "98acf90cfc916d187b6f9941516c2523"
  },
  {
    "url": "Integration/authCheck.js",
    "revision": "617935dd795a0a4e4a3b4b3535d0d26c"
  },
  {
    "url": "Integration/google-signIn.js",
    "revision": "c847961d2feaebcbaa0214ca6ac298ac"
  },
  {
    "url": "Integration/index.js",
    "revision": "c77f8b837f9ca352c190dd081ee8dba1"
  },
  {
    "url": "Integration/postingAD.js",
    "revision": "667779951dcb2af4c025431d880af4e8"
  },
  {
    "url": "Integration/productPage.js",
    "revision": "ba8a2fb19c92daff2593ca2f6fb17413"
  },
  {
    "url": "Integration/registerPage.js",
    "revision": "cf5750929d150c880c196ff7df42a262"
  },
  {
    "url": "Integration/userProfile.js",
    "revision": "579cd7e720de05614244a235e3e7908b"
  },
  {
    "url": "js/materialize.js",
    "revision": "9832259e6e013b2e55f342c053c26104"
  },
  {
    "url": "js/materialize.min.js",
    "revision": "5dcfc8944ed380b2215dc28b3f13835f"
  },
  {
    "url": "js/myjs.js",
    "revision": "ae05e99d7488690e2847bb457f0dce5c"
  },
  {
    "url": "profile.html",
    "revision": "6300f3fc5029a91787266c4b132dc8e1"
  },
  {
    "url": "readme.txt",
    "revision": "052d3faee47d717f21436880f0d9fdcc"
  },
  {
    "url": "sw-src.js",
    "revision": "e58f85d1919f12d6edc613f177fd8931"
  },
  {
    "url": "test.html",
    "revision": "1a0487c3ccdc1a00c1ef43e9f4da9e8c"
  },
  {
    "url": "workbox-config.js",
    "revision": "50330b2bc52798ebc9840f416dcb6d3c"
  }
]);