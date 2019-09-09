import menuConfig from "../config/menu_config";
import { Iterator } from "../config/util";
import _ from "lodash";
import localforage from 'localforage';
import {USERINFO} from "../config/constants";


/**
 * 获取用户信息
 * @returns {Promise<any>}
 */
export async function getUserInfo() {
  let user = await localforage.getItem(USERINFO);
  if (user) {
    return JSON.parse(user);
  }
  return user;
}

/**
 *  设置用户信息
 * @param data
 * @returns {Promise<void>}
 */
export async function setUserInfo(data) {
  await localforage.setItem(`${USERINFO}`, JSON.stringify(data));
}

/**
 * 根据路径得到节点树
 * @param {*} pathname
 */
export function getCurrentRating(pathname,menShow) {
    let obj = [];
    let _menuConfig = Iterator(_.cloneDeep(menuConfig));
    while (!_menuConfig.isDone()) {
        if (_menuConfig.getCurrentItem() && !_menuConfig.getCurrentItem().children) {
            if (_menuConfig.getCurrentItem().sub === pathname) {
                obj.push(_menuConfig.getCurrentItem());
            }
        } else {
            let menuConfigChild = Iterator(_menuConfig.getCurrentItem().children);
            while (!menuConfigChild.isDone()) {
                if (menuConfigChild.getCurrentItem() && menuConfigChild.getCurrentItem().sub === pathname) {
                    obj.push(_menuConfig.getCurrentItem());
                    obj[0].children = [];
                    obj[0].children.push(menuConfigChild.getCurrentItem());
                }
                menuConfigChild.next();
            }
        }
        _menuConfig.next();
    }
    return obj;
}


/**
 * 递归过滤对象args []
 * @param {*} obj 过滤的对象
 * @param {*} result 初始化对象的值
 * @param {*} param 过滤的属性集合
 */
export function getparma(obj, result, ...param) {

    let _result = recurve(obj, ...param);
    if (Object.keys(result).length > 0) {
        result = addProperty(result, _result);
    } else {
        result = _result;
    }
    if (obj[0] && obj[0]['children']) {
        getparma(obj[0]['children'], result, ...param);
    }
    return result;
}

/**
 * 过滤对象args [] 为 obj {}
 * @param {*} obj 过滤的对象
 * @param {*} param 过滤的属性集合
 */
export function recurve(obj, ...param) {
    let _obj = {};
    for (let k in obj[0]) {
        if (param.indexOf(k) > -1) {
            _obj[k] = obj[0][k];
        }
    }
    return _obj;
}

/**
 * 递归找到最底层的children给他添加param
 * @param {*} obj
 * @param {*} param
 */
export function addProperty(obj, param) {
    if (Object.keys(obj).indexOf("children") > -1) {
        addProperty(obj["children"], param);
    } else {
        obj.children = param;
    }
    return obj;
}

/**参数说明：

 * 根据长度截取先使用字符串，超长部分追加…

 * str 对象字符串

 * len 目标字节长度

 * 返回值： 处理结果字符串

 */

 export function cutString(str, len) {

   //length属性读出来的汉字长度为1
   if(!str){
   		return null;
   }else{
	   	if(str.length*2 <= len) {

	     return str;

	   	}

	   	var strlen = 0;

	   	var s = "";

	   	for(var i = 0;i < str.length; i++) {

	     	s = s + str.charAt(i);

	     	if (str.charCodeAt(i) > 128) {

	       		strlen = strlen + 2;

	       		if(strlen >= len){

	         	return s.substring(0,s.length-1) + "...";

	       		}

	    	} else {

	       		strlen = strlen + 1;

	       		if(strlen >= len){

	         		return s.substring(0,s.length-2) + "...";

	       		}

	     	}

	   	}

	   	return s;
 	}
 }



/**
 * 待用、、、
 * @param {*} obj
 * @param {*} param
 */
export function match(obj, pathname, ...param) {
    while (!obj.isDone()) {
        if (obj.getCurrentItem() && obj.getCurrentItem().sub === pathname) {
            return obj.getCurrentItem();
        } else {
            match(obj.children, obj);
        }
        obj.next();
    }
}

/**
 * 解析cookie
 ***/
export function parseCookie(cookie) {
  var pattern = /([^=]+)=([^;]+);?\s*/g,
    result,
    value = {};
  while((result = pattern.exec(cookie)) != null) {
    value[result[1]] = result[2];
  }
  return value;
}

/**
 * 清除所有的cookie
 */
export function clearAllCookie() {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if(keys) {
    for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
  }
}


/**
 * 手机号截取中间星号标示
 ***/

export function formatPhone(phone) {
    if (phone) {
        return phone.substr(0, 3) + '****' + phone.substr(7, 11);
    } else {
        return '';
    }
}

export function formatCard(str,str1) {
    if (str) {
        return '*'+str.substr(1, 1)+" "+str1.substr(0,3)+"***********"+str1.substr(str1.length-4,4)+" 已认证";
    } else {
        return '';
    }
}
// 时间格式化
export function timeReset(t){
	function checkTime(i){ //将0-9的数字前面加上0，例1变为01
	  if(i<10)
	  {
	    i = "0" + i;
	  }
	  return i;
	}
	let d = Math.floor(t / (24 * 3600));
    let h = Math.floor((t - 24 * 3600 * d) / 3600);
    let m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    let s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
    let D = checkTime(d);
    let H = checkTime(h);
    let M = checkTime(m);
    let S = checkTime(s);
    return `${D}天${H}小时${M}分钟${S}秒`
}
// 倒计时时间格式化
export function undertimeReset(t){
	function checkTime(i){ //将0-9的数字前面加上0，例1变为01
	  if(i<10)
	  {
	    i = "0" + i;
	  }
	  return i;
	}
	let d = Math.floor(t / (24 * 3600));
    let h = Math.floor((t - 24 * 3600 * d) / 3600);
    let m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60);
    let s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60));
    let M = checkTime(m);
    let S = checkTime(s);
    return `${M}:${S}`
}
