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
  if (isFormElement(el)) {
    el.select();
  } else {
    var range = document.createRange();
    var end = el.childNodes.length;
    range.setStart(el, 0);
    range.setEnd(el, end);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
  document.execCommand("copy", false, null);
  range && selection.removeRange(range);
}

function handleCopy(el, text, isHtml) {
  var copyEvent = function(e){
    if (!isFormElement(el)) {
      var oldText = isHtml ? (el.outerHTML + '\n') : el.innerText;
      oldText = text ? (oldText + text) : oldText;
      e.clipboardData.setData('text/plain', oldText.trim());
      e.preventDefault();
    }
    
    setTimeout(function() {
      el.removeAttribute("contenteditable", true);
      el.removeEventListener("copy", copyEvent);
    }, 0);
  }

  el.addEventListener("copy", copyEvent);
}

function isFormElement(el) {
  return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
}

export default copy