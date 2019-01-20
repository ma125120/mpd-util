function isExist(data) {
  return data !== undefined && data !== null;
}
function isNothing(data) {
  return !isExist(data);
}
function isVaild(data) {
  return typeof data === 'string' || typeof data === 'number';
}

function getSafe(data, keys, defaultValue, debug) {
  if (isNothing(data)) {
    debug && (console.error('传入的第一个参数为空', data));
    return defaultValue;
  }
  data = isExist(data) ? data : {};
  return isVaild(keys) && 
      `${keys}`.split(",").reduce((item, key, i, arr) => {
         let result = item[key.trim()];
         if (isNothing(result)) {
           result = (i === arr.length - 1) ? defaultValue : {};
           debug && (console.error(item, `当前数据不存在键：${key}`));
         }
         return result;
      }, data);
}

export default getSafe;