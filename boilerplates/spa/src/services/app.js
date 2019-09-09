import { server } from "../config/serve_config";
import request from "../utils/request";

//我是卖家列表接口
export async function detail() {
  let url = `${server}/user/detail`;
  return request(`${url}`,{type:'GET'});
}
export async function logout() {
  let url = `${server}/user/logout`;
  return request(`${url}`,{type:'GET'});
}

export async function getOssSign(payload) {
  let url = `${server}/misc/aliyunosssign`;
  return request(`${url}`,{type:'GET'});
}

//页脚接口
export async function getFooterList() {
  let url = `${server}/operational/index?type=1`;
  return request(`${url}`,{type:'GET'});
}