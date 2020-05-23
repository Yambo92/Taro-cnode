const TOPIC_STATE = {
  page: 1,
  limit: 20,
  list: []
};

export default function TopicList(state = TOPIC_STATE, action) {
  switch (action.type) {
    case "getTopicList": //请求第一页
      return { ...state, list: action.list, page: 1 };
    case "appendTopicList": //获取更多页
      return {
        ...state,
        list: state.list.concat(action.list),
        page: action.page
      };
    default:
      return state;
  }
}
