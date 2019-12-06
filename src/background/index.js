chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request);
  if(request.command === 'getData') {
    let key = request.key;
    chrome.storage.sync.get([key], function(result) {
      if(result[key]) {
        sendResponse({value: result[key]});
      } else {
        sendResponse({value: []});
      }
    });
  } else if(request.command === 'setData') {
    let value = request.data;
    for(let i = 0; i < value.length; i++) {
      Object.assign(value[i], {selected: false, hover: false, effect: "light"});
      if(value[i].title === '') {
        value[i].title = `新建文本文档（${i + 1}）`;
      }
    }
    chrome.storage.sync.set({docs: value}, function() {
      sendResponse({msg: 'ok'});
    });
  }
  return true;
});