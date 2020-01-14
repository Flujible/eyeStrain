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
  }, 1200000)
});
   
   
const breakAlert = (mini) => {
  if (Notification.permission === 'granted') {
    newNotification(
      mini ? "Mini break!" : "Take a break!", 
      mini ? "Take a quick break, look away from the screen for 20 seconds" : "Take a break, come back in a few minutes",
      setTimeout(() => {
        newNotification("Break over", "You can get back to work now")
      }, mini ? 20000 : 300000)
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