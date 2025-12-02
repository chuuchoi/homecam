self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function () {
  console.log("fcm sw activate..");
});
// self.addEventListener("push", function (e) {
//   if (!e.data.json()) return;
//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//   };
//   console.log(resultData.title, {
//     body: resultData.body,
//   });
//   e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
// });

// 웹 푸쉬 수신 시
self.addEventListener('push', (event) => {
  const {title, body} = event.data.json();
  event.waitUntil(
      self.registration.showNotification(title, {
          body: body,
          data: {
              url: 'https://google.com',
          },
      })
  );
});

// 푸쉬 알림 클릭 시
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});