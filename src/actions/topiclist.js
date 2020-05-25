import { getJSON, postJSON } from "../utils/request";
import api from "../constants/api";
import Taro from "@tarojs/taro";

//请求首页
export function getTopicList(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, params);

    if (result && result.data.success) {
      dispatch({ type: "getTopicList", list: result.data.data });
    } else {
    }
  };
}
//请求下一页
export function getNextList(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopics, params);
    if (result && result.data.success) {
      if (result.data.data.length > 0) {
        dispatch({
          type: "appendTopicList",
          list: result.data.data,
          page: params.page
        });
      }
    } else {
    }
  };
}

//请求话题详情
export function getTopicInfo(params) {
  return async dispatch => {
    let result = await getJSON(api.gettopicInfo + params.id, params);
    if (result && result.data && result.data.success) {
      dispatch({ type: "getTopicInfo", infoData: result.data.data });
    } else {
      console.log("请求话题失败");
    }
  };
}

//点赞
export function like(params) {
  return async dispatch => {
    let result = await postJSON(api.like + params.id + "/ups", params);
    if (result.success) {
      dispatch({ type: "likeSuccess" }); //点赞成功
    } else {
      //点赞失败
      Taro.showToast({ title: "点赞失败！", icon: "none" });
    }
  };
}

//回复
export async function replyContent(params) {
  try {
    let result = await postJSON(
      api.createcomment + params.id + "/replies",
      params
    );
    if (result.success) {
      return result;
    } else {
      Taro.showToast({ title: "评论失败！", icon: "none" });
    }
  } catch (err) {
    Taro.showToast({ title: "评论失败！", icon: "none" });
  }
}

export async function submitTopic(params) {
  try {
    let result = await postJSON(api.createtopic, params);
    if (result.success) {
      return result;
    }
  } catch (err) {
    Taro.showToast({ title: "发布失败！", icon: "none" });
  }
}
