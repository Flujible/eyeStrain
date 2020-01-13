document.addEventListener('DOMContentLoaded', () => {
  let count = 0;

  if (!Notification) {
    alert('Desktop notifications not available in your browser so this site wont work, sorry. Please use a chromim browser');
    return;
  }

  requestPermission();

  setInterval(() => {
    if(count < 2) {
      count++
      breakAlert(true);
    } else {
      count = 0;
      breakAlert(false);
    }
  }, 1200000)
});
   
   
const breakAlert = (mini) => {
  if (Notification.permission !== 'granted')
    requestPermissionBtn();
  else {
    newNotification(
      mini ? "Mini break!" : "Take a break!", 
      mini ? "Take a quick break, look away from the screen for 20 seconds" : "Take a break, come back in a few minutes",
      setTimeout(() => {
        newNotification("Break over", "You can get back to work now")
      }, mini ? 20000 : 300000)
    );
  }
}

const newNotification = (title, body, onshow) => {
  const notification = new Notification(title, {
    icon: "./glasses.png",
    body: body,
    silent: true,
  });
  if (onshow) {
    notification.onshow = onshow;
  }
}

const requestPermission = () => {
  Notification.requestPermission().then(function (permission) {
    if (permission === "granted") {
      new Notification("Thanks for granting permission!");
      hideButtons();
    }
  });
}

const requestPermissionBtn = () => {
  if(Notification.permission === 'denied') {
    alert("Notifications have been blocked, you need to enable them in your browser settings");
  } else {
    requestPermission();
  }
}

const hideButtons = () => {
  const els = document.getElementsByClassName('notifications');
  for(let el of els) {
    el.style.display = 'none';
  }
}