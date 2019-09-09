import { server } from "../config/serve_config";
import request from "../utils/request";

//我是买家列表接口(待付款，交易中，已完成)
export async function list({page,limit,type,product_name}) {
  let obj = {
    page:page,
    limit:limit,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${server}/buyer/order?${arr.join("&")}`;
  return request(`${url}`,{type:'POST',body: {
    type: type,product_name
    }});
}

//我是买家列表接口(报价中)
export async function haggleorder({page,limit,product_name}) {
  let obj = {
    page:page,
    limit:limit,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${server}/buyer/haggleorder?${arr.join("&")}`;
  return request(`${url}`,{type:'POST',body:{product_name}});
}

//我是买家列表接口(维权中)
export async function maintainorder({page,limit,product_name}) {
  let obj = {
    page:page,
    limit:limit,
  };
  let arr = [];
  for(let i in obj){
    if(obj[i]){
      arr.push(`${i}=${obj[i]}`);
    }
  }
  let url = `${server}/buyer/maintainorder?${arr.join("&")}`;
  return request(`${url}`,{type:'POST',body:{product_name}});
}

// 获取我是买家订单数量
export async function orderbuyernum() {
  let url = `${server}/order/orderbuyernum`;
  return request(`${url}`,{type:'POST'});
}

// 我是买家订单详情
export async function orderDetail({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/buyer/orderdetail`;
  return request(`${url}`,{type:'POST',body: obj});
}

// 买家确认收货订单
export async function confirmorder({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/buyer/confirmorder`;
  return request(`${url}`,{type:'POST',body: obj});
}

// 买家撤销删除维权信息
export async function deletemaintain({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/buyer/deletemaintain`;
  return request(`${url}`,{type:'POST',body: obj});
}

// 买家删除订单
export async function deleteorder({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/buyer/deleteorder`;
  return request(`${url}`,{type:'POST',body: obj});
}


// 买家新增维权
export async function maintain(obj) {
  let url = `${server}/buyer/maintain`;
  return request(`${url}`,{type:'POST',body: obj});
}

// 我是买家维权详情
export async function safeguardDetail({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/buyer/maintaindetail`;
  return request(`${url}`,{type:'POST',body: obj});
}

// 发起支付接口
export async function orderPay({orderId}) {
  let obj = {
    orderId:orderId,
  };
  let url = `${server}/order/orderpay`;
  return request(`${url}`,{type:'POST',body: obj});
}


// 发起余额支付接口
export async function balancepay({orderId, payPassword}) {
  let obj = {
    orderId:orderId,
    payPassword:payPassword,
  };
  let url = `${server}/order/balancepay`;
  return request(`${url}`,{type:'POST',body: obj});
}

//充值查询接口
export async function searchrecharge({orderId}) {
  let url = `${server}/order/searchorder`;
  return request(`${url}`, {
    type: 'POST', body: {
      orderId: orderId,
    }
  });
}


/**
 * 继续报价接口
 * @param payload
 * @returns {Promise<void>}
 */
export async function haggle(payload) {
  let url = `${server}/haggle`;
  return request(`${url}`, {
    type: 'POST', body: payload
  });
}


export async function haggledownorder({product_id,haggle_id}) {
  let url = `${server}/buyer/haggledownorder`;
  return request(`${url}`, {
    type: 'POST', body: {
      product_id: product_id,
      haggle_id: haggle_id,
    }
  });
}
