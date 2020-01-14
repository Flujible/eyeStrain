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
    hideButtons();
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

const toggleInfo = () => {
  let infoDiv = document.getElementById("info");
  let infoBtn = document.getElementById("infoBtn");
  let infoBtnClose = document.getElementById("infoBtnClose");
  if (infoDiv.classList.contains("hidden")) {
    infoDiv.classList.remove("hidden");
    infoBtnClose.focus();
  } else {
    infoDiv.classList.add("hidden");
    infoBtn.focus();
  }
}

const toggleBreakMessage = (mini, callback) => {
  console.log("toggle");
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