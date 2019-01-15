var browser = (function(){
  var u = navigator.userAgent, app = navigator.appVersion;
  return {//移动终端浏览器版本信息
    trident: u.indexOf('Trident') > -1, //IE内核
    presto: u.indexOf('Presto') > -1, //opera内核
    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
    mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQ HD浏览器
    iPad: u.indexOf('iPad') > -1, //是否iPad
    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
  };
})();

var callPhone = function (tel) {
  tel = browser.android ? (tel + '#mp.weixin.qq.com') : tel;
  var el = document.querySelector('#my-js--tel');
  if (el === null) {
    el = document.createElement('a');
    el.setAttribute('id', 'my-js--tel');
  }
  el.setAttribute('href', 'tel: ' + tel);
  el.click();
}

function getStore(key = 'info') {
  var data = window.localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (err) { console.log(err) }
  return data;
}

function setStore(obj, key = 'info') {
  if (typeof obj === 'object') {
    obj = JSON.stringify(obj);
  }
  return window.localStorage.setItem(key, obj);
}

var copy = function copyText(selector, text, isHtml) {
  var el = document.querySelector(selector);
  if (!el) {
    return ;
  }

  handleCopy(el, text, isHtml);
  setSelection(el);
}

function setSelection(el) {
  el.setAttribute("contenteditable", true);
  var range = document.createRange();
  var end = el.childNodes.length;
  range.setStart(el, 0);
  range.setEnd(el, end);

  var selection = window.getSelection();

  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy", false, null);
  selection.removeRange(range);
}

function handleCopy(el, text, isHtml) {
  var copyEvent = function(e){
    var oldText = isHtml ? (el.outerHTML + '\n') : el.innerText;
    oldText = text ? (oldText + text) : oldText;
    e.clipboardData.setData('text/plain', oldText.trim());
    e.preventDefault();

    setTimeout(function() {
      el.removeAttribute("contenteditable", true);
      el.removeEventListener("copy", copyEvent);
    }, 0);
  }

  el.addEventListener("copy", copyEvent);
}

export {
  copy,
  setStore,
  getStore,
  callPhone,
}
