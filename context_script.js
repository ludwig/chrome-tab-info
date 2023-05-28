// context_script.js
function showPopup(message) {
  var popup = document.createElement('div');
  popup.style.position = 'fixed';
  popup.style.left = '50%';
  popup.style.top = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.backgroundColor = 'white';
  popup.style.border = '1px solid black';
  popup.style.padding = '10px';
  popup.style.zIndex = '10000';
  popup.textContent = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 1000);
}

function copyToClipboard(title, url, useHtml) {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  if (useHtml) {
    // Copy HTML to clipboard
    //const html = `<a href="${url}">${title}</a>`;
    const html2 = `<p>${title}</p>\n<a href="${url}">${url}</a>\n`;
    navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([`${title}\n${url}`], { type: "text/plain" }),
        "text/html": new Blob([html2], { type: "text/html" })
      })
    ]);
  } else {
    // Copy plain text to clipboard
    navigator.clipboard.writeText(`${title}\n${url}`);
  }
  window.scrollTo(0, scrollPosition);

  // Show popup
  showPopup('Title and URL copied!');
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "copy") {
      copyToClipboard(request.title, request.url, request.useHtml);
    }
  }
);
