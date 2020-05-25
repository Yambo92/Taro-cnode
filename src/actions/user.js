import Taro from "@tarojs/taro";
import api from "../constants/api";
import { postJSON, getJSON } from "../utils/request";
export function accesstoken(params) {
  return async dispatch => {
    try {
      let result = await postJSON(api.checkusertoken, params);
      if (result.data && result.data.success) {
        dispatch({
          type: "loginSuccess",
          accesstoken: params.accesstoken,
          loginname: result.data.loginname,
          avatar_url: result.data.avatar_url
        });
        return result.data;
      } else {
        dispatch({ type: "loginFail" });
      }
    } catch (err) {
      Taro.showToast({ title: "登录失败", icon: "none" });
    }
  };
}

//获取用户信息
export async function getUserInfo(params) {
  try {
    let result = await getJSON(api.getuserinfo + params.loginname);

    if (result && result.data && result.data.success) {
      return result.data.data;
    }
  } catch (err) {
    Taro.showToast({ title: "获取用户信息失败", icon: "none" });
  }
}

//验证用户信息
export async function validateUser(params) {
  if (params && params.accesstoken) {
    return true;
  } else {
    Taro.navigateTo({ url: "/pages/login/login" });
    return false;
  }
}
