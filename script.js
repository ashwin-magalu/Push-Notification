const button = document.querySelector("button");

button.addEventListener("click", () => {
  Notification.requestPermission().then((perm) => {
    if (perm === "granted") {
      const notification = new Notification("Example Notification", {
        body: "This is more text",
        data: {
          hello: "world",
        },
        icon: "icon.png",
        tag: "Welcome message", // only one notification will be shown at a time
        vibrate: true, // works in mobile devices
      });

        notification.addEventListener("show", (e) => {
          console.log(e)
      });

      notification.addEventListener("error", (error) => {
        alert(error);
      });
    }
  });
});

let notification;
let interval;

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    const leaveDate = new Date();
    interval = setInterval(() => {
      notification = new Notification("Come back please", {
        body: `You have been gone for ${Math.round(
          (new Date() - leaveDate) / 1000
        )} seconds`,
        tag: "Come back",
      }); // This will send a notification when user goes to different tab
    }, 100);
  } else {
    if (interval) clearInterval(interval);
    if (notification) notification.close();
  }
});
