chrome.tabs.onUpdated.addListener((e,s)=>{s.status&&(async()=>{let t=(await chrome.tabs.get(e)).url;const a=await chrome.runtime.sendMessage({message:t});return console.log(a),!0})()});
