import './loadingScreen.scss'

const body = document.querySelector("body");

const loadingScreen = document.createElement("div");
loadingScreen.className = "loadingScreen";
loadingScreen.innerHTML = `
<div class="loadingScreenInner">Loading your Plugins</div>
`;

let lastUrl;

const startLoading = function () {
  lastUrl = location.href;
  location.hash = "#/loading-plugins";
  body.appendChild(loadingScreen);
};

const reload = function () {
  location.href = lastUrl;
  location.reload();
};

const stopLoading = function () {
  location.href = lastUrl;
  // body.removeChild(loadingScreen);
};

export { startLoading, stopLoading, reload };
