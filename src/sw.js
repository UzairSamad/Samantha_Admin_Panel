// Pre-Cache
const cacheName = "cache-v1";
const resourcesToPrecache = [
  "./index.html",
  "./static",
  "./favicon.ico",
  "./asset-manifest.json",
];

// Register Service Worker
export function register() {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      // Registered a Service Worker
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((reg) => {
          console.log("SW Registered: ", reg);

          // Request Permission For Notifications
          // Notification.requestPermission((result) => {
          //   if (result === 'granted') {
          //     console.log('Notification Enabled');
          //     reg.showNotification('Push Notification Test');
          //   }
          // });

          // Checking if Push Notification is Supported By Browser
          // if (!('PushManager' in window)) {
          //   alert("Sorry, Push notification isn't supported in your browser.");
          //   return;
          // }

          //To subscribe `push notification` from push manager
          // reg.pushManager
          //   .subscribe({
          //     userVisibleOnly: true,
          //   })
          //   .then(function (subscription) {
          //     console.info("Push notification subscribed.");
          //     console.log(subscription);
          //   })
          //   .catch(function (error) {
          //     console.error("Push notification subscription error: ", error);
          //   });
        })
        .catch((err) => {
          console.log("SW Error: ", err);
        });

      // Checking Push Notification Subscription
      // navigator.serviceWorker.ready.then(function (registration) {
      //   registration.pushManager
      //     .getSubscription()
      //     .then(function (subscription) {
      //       //If already access granted, enable push button status
      //       if (subscription) {
      //         console.log("Subscribed");
      //       } else {
      //         console.log("Not Subscribe");
      //       }
      //     })

      //     .catch(function (error) {
      //       console.error("Error occurred while enabling push ", error);
      //     });
      // });
    });

    // Install Event => Pre-Caching
    window.addEventListener("install", (event) => {
      console.log("SW Install Event");
      event.waitUntil(
        caches.open(cacheName).then((cache) => {
          return cache.addAll(resourcesToPrecache);
        })
      );
    });

    // Activate Event
    window.addEventListener("activate", (event) => {
      console.log("Activate Event", event);
    });

    // Fetch Event -> For Work Offline
    window.addEventListener("fetch", (event) => {
      console.log("SW Fetch Event");
      event.respondWith(caches.match(event.request)).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      });
    });
  }

  // Push Event For Web Notification
  // window.addEventListener("push", (event) => {
  //   console.log("[Service Worker] Push Received.");
  //   const title = "Web Tracking Application";
  //   const body = "Bykea - Web Tracking Application Push Message";
  //   const icon = "../public/favicon.ico";
  //   const tag = "sample-push-example-tag";
  //   event.waitUntil(
  //     window.registration.showNotification(title, {
  //       body,
  //       icon,
  //       tag,
  //     })
  //   );
  // });
}

// Unregister Services Worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
