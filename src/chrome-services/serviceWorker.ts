chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status) {
    (async () => {
      let url = (await chrome.tabs.get(tabId)).url;
      const response = await chrome.runtime.sendMessage({ message: url });
      console.log(response);
      return true;
    })();
  }
});
