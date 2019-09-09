import { Select } from 'antd';
const Option = Select.Option;

// 外部迭代器
export function Iterator(obj) {
  let len = 0;

  let next = function() {
    len = len + 1;
  };
  let isDone = function() {
    return len >= obj.length;
  };
  let getCurrentItem = function() {
    return obj[len];
  };
  return {
    next: next,
    isDone: isDone,
    getCurrentItem: getCurrentItem
  }
}


//根据对象获取key value映射为Option
export const getOptionByObj = (obj) => {
	let options = [];
	for(let key in obj) {
		options.unshift(<Option key={key} value={key}>{obj[key]}</Option>)
	}
	return options
}
