chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'copyTabInfo',
    title: 'Copy Tab Info',
    contexts: ['page']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'copyTabInfo') {
    const tabInfo = `${tab.title}\n${tab.url}`;
    //console.log(tabInfo);
    navigator.clipboard.writeText(tabInfo).then(() => {
      console.log('Tab info copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy tab info: ', err);
    });
  }
});
