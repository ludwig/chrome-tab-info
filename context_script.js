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

function copyToClipboard(item) {
  var scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (item.html) {
    // Copy HTML to clipboard
    navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([item.text], { type: "text/plain" }),
        "text/html": new Blob([item.html], { type: "text/html" })
      })
    ]);
  } else {
    // Copy plain text to clipboard
    navigator.clipboard.writeText(item.text);
  }

  // The page might've jumped, so we now restore its position.
  window.scrollTo(0, scrollPosition);

  // Show popup
  showPopup('Title and URL copied!');
}

function getTabInfo(tab) {
  const hostname = new URL(tab.url).hostname;
  const tabInfo = {
    title: tab.title,
    url: tab.url
  };

  if (hostname === "news.ycombinator.com") {
    const targetAnchor = document.querySelector('.titleline a');
    if (targetAnchor) {
      tabInfo.articleTitle = targetAnchor.text;
      tabInfo.articleUrl = targetAnchor.href;
    }
  }

  return tabInfo;
}

function getClipboardContents(tabInfo, useHtml) {
  const item = {
    text: null,
    html: null
  };

  const tabTitle = tabInfo.title;
  const tabUrl = tabInfo.url;

  // These might not be set.
  const articleTitle = tabInfo.articleTitle;
  const articleUrl = tabInfo.articleUrl;

  if (articleTitle) {
    item.text = `${articleTitle}\n${articleUrl}\n${tabUrl}`;
    if (useHtml) {
      item.html = `<p>${articleTitle}</p>\n<p><a href="${articleUrl}">${articleUrl}</a></p>\n<p><a href="${tabUrl}">${tabUrl}</a></p><br><br>\n`;
    }
  } else {
    item.text = `${tabTitle}\n${tabUrl}`;
    if (useHtml) {
      item.html = `<p>${tabTitle}</p>\n<a href="${tabUrl}">${tabUrl}</a><br><br>\n`;
    }
  }
  return item;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "copy") {
      const tab = request.tab;
      const tabInfo = getTabInfo(tab);
      const useHtml = true;
      const clipItem = getClipboardContents(tabInfo, useHtml);
      copyToClipboard(clipItem);
    }
  }
);
