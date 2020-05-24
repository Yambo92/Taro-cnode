const TOPIC_STATE = {
  page: 1,
  limit: 20,
  list: [],
  topicInfo: {},
  replies: [],
  islike: false
};

export default function TopicList(state = TOPIC_STATE, action) {
  switch (action.type) {
    case "likeSuccess":
      return {
        ...state,
        islike: !state.islike
      };
    case "getTopicInfo":
      return {
        ...state,
        replies: action.infoData.replies,
        topicInfo: { ...action.infoData, replies: null }
      };
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
