const miniBreakTitle = "Mini break!";
const breakTitle = "Take a break!";
const miniBreakMsg = "Take a quick break, look away from the screen for 20 seconds";
const breakMsg = "Take a break, stretch your legs, come back in a few minutes";
const breakOverTitle = "Break over!";
const breakOverMsg = "You can get back to work now";
const miniBreakDuration = 20000;
const breakDuration = 300000;
const breakInterval = 1200000;

document.addEventListener('DOMContentLoaded', () => {
  let count = 0;

  if (!Notification) {
    alert('Desktop notifications not available in your browser so this site wont work, sorry. Please use a chromium based browser');
    return;
  }

  if(Notification.permission === "granted") {
    togglePermissionButton(false);
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
  }, breakInterval)
});
   
   
const breakAlert = (mini) => {
  if (Notification.permission === 'granted') {
    newNotification(
      mini ? miniBreakTitle : breakTitle, 
      mini ? miniBreakMsg : breakMsg,
      setTimeout(() => {
        newNotification(breakOverTitle, breakOverMsg);
      }, mini ? miniBreakDuration : breakDuration)
    );
  }
  toggleBreakMessage(mini,
    () => {
      setTimeout(() => {
        toggleBreakMessage(mini);
      }, mini ? miniBreakDuration : breakDuration)
    }
  )
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
      new Notification("Thanks for granting permission!", {
        icon: "./glasses.png",
        silent: true
      });
      togglePermissionButton(false);
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

const togglePermissionButton = (show) => {
  const els = document.getElementsByClassName('notifications');
  if (show !== undefined) {
    for(let el of els) {
        if (show === true) {
          el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  } else {
    for(let el of els) {
      if (el.classList.value.includes("hidden")) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    }
  }
}

const togglePanel = (panel) => {
  let div = document.getElementById(panel === "info" ? "infoPanel" : "settingsPanel");
  let triggerBtn = document.getElementById(panel === "info" ? "infoBtn" : "settingsBtn");
  let closeBtn = document.getElementById(panel === "info" ? "infoCloseBtn" : "settingsCloseBtn");
  if (div.classList.contains("offsetLeft")) {
    div.classList.remove("offsetLeft");
    closeBtn.focus();
  } else {
    div.classList.add("offsetLeft");
    triggerBtn.focus();
  }
}

const toggleBreakMessage = (mini, callback) => {
  const breakMsgContainerDiv = document.getElementById("breakMsgContainer") || document.getElementById("breakMsgContainerHidden");
  if(breakMsgContainerDiv.id === "breakMsgContainer") {
    breakMsgContainerDiv.id = "breakMsgContainerHidden";
  } else {
    breakMsgContainerDiv.id = "breakMsgContainer"
  }
  if(mini) {
    const miniBreakMsgDiv = document.getElementById('miniBreakMsg');
    if(miniBreakMsgDiv.classList.contains('hidden')) {
      miniBreakMsgDiv.classList.remove('hidden');
    } else {
      miniBreakMsgDiv.classList.add('hidden');
    }
  } else {
    const breakMsgDiv = document.getElementById('breakMsg');
    if(breakMsgDiv.classList.contains('hidden')) {
      breakMsgDiv.classList.remove('hidden');
    } else {
      breakMsgDiv.classList.add('hidden');
    }
  }
  if(callback) {
    callback();
  }
}

const handleAnimationClick = (value) => {
  const body = document.getElementsByTagName("body")[0];
  if (value && body.classList.value !== "animated") {
    body.classList.add("animated");
  } else if (!value && body.classList.value === "animated") {
    body.classList.remove("animated");
  }
}

const handleNotificationsClick = (on) => {
  const msg = document.getElementById("notificationsOffMsg");
  if (on) {
    // Radio button set to on
    // Toggle browser permission buttons on IF they have granted permission
    if (Notification.permission === "granted") {
      togglePermissionButton(false);
    } else {
      togglePermissionButton(true);
    }
    // Hide 'disabled in settings' message
    if (msg.classList.value !== "hidden") {
      msg.classList.add("hidden")
    }
  } else {
    // Radio button set to off
    // Always hide the browser settings message because it is now irrelevant
    togglePermissionButton(false);
    // Show 'disabled in settings' message
    if (msg.classList.value === "hidden") {
      msg.classList.remove("hidden")
    }
  }
}