const rootPath = "https://cnodejs.org/api/v1";
const apiObject = {
  gettopics: rootPath + "/topics", //获取话题列表
  gettopicInfo: rootPath + "/topic/", //主题详情
  checkusertoken: rootPath + "/accesstoken", // 验证 accessToken 的正确性
  getuserinfo: rootPath + "/user/", //获取用户详情
  createtopic: rootPath + "/topics", //新建话题
  createcomment: rootPath + "/topic/", //新建评论
  like: rootPath + "/reply/", //点赞
  updatetopic: rootPath + "/topics/update" //更新主题
};

export default apiObject;
