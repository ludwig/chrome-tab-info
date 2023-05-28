// context_script.js
function copyToClipboard(text) {
  var input = document.createElement('textarea');
  document.body.appendChild(input);
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  document.body.removeChild(input);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "copy") {
      copyToClipboard(request.text);
    }
  }
);
