import { setCache, getCache } from "../utils/cache";

const cacheKey = "cnode-user-key";
const user_cache = getCache(cacheKey) ? getCache(cacheKey) : {};
const USER_STATE = {
  // accesstoken: "", //用户秘钥
  // loginname: "",
  // avatar_url: ""
  ...user_cache
};

export default function user(state = USER_STATE, action) {
  switch (action.type) {
    case "loginSuccess":
      let newState = {
        ...state,
        accesstoken: action.accesstoken,
        loginname: action.loginname,
        avatar_url: action.avatar_url
      };

      setCache(cacheKey, newState); //设置到缓存
      return newState;
    case "loginFail":
      let new2State = {
        accesstoken: "",
        loginname: "",
        avatar_url: ""
      };
      setCache(cacheKey, new2State); //设置到缓存
      return new2State;
    default:
      return state;
  }
}
