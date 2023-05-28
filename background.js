// background.js
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copyTabInfo',
    title: 'Copy Tab Info',
    contexts: ['page']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copyTabInfo') {
    const text = `${tab.title}\n${tab.url}`;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['context_script.js']
    }).then(() => {
      chrome.tabs.sendMessage(tab.id, {action: "copy", text: text});
    });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'copy_tab_info') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tab = tabs[0];
      const text = `${tab.title}\n${tab.url}`;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['context_script.js']
      }).then(() => {
        chrome.tabs.sendMessage(tab.id, {action: "copy", text: text});
      });
    });
  }
});
