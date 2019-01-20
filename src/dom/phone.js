import browser from './browser.js'

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

export default callPhone
