// context_script.js
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
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "copy") {
      copyToClipboard(request.title, request.url, request.useHtml);
    }
  }
);
