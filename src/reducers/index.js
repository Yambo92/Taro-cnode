import { combineReducers } from "redux";
import menu from "./menu";
import TopicList from "./topic";
import user from "./user";
export default combineReducers({
  menu,
  TopicList,
  user
});
