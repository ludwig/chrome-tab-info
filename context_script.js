// context_script.js
function copyToClipboard(text) {
  var input = document.createElement('textarea');
  // Save current scroll position
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  // Restore scroll position
  window.scrollTo(0, scrollPosition);
  document.body.removeChild(input);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "copy") {
      copyToClipboard(request.text);
    }
  }
);
