const MENU_STATE = {
  cataData: [
    { key: "all", value: "全部" },
    { key: "good", value: "精华" },
    { key: "share", value: "分享" },
    { key: "ask", value: "问答" },
    { key: "job", value: "招聘" },
    { key: "dev", value: "客户端测试" }
  ],
  currentCata: { key: "all", value: "全部" },
  showDrawer: false
};

export default function menu(state = MENU_STATE, action) {
  switch (action.type) {
    case "showDrawer": //显示抽屉
      return { ...state, showDrawer: true };
    case "hideDrawer": //隐藏抽屉
      return { ...state, showDrawer: false };
    case "changeCata": //点击抽屉菜单触发切换当前分类
      return { ...state, currentCata: action.currentCata };
    default:
      return state;
  }
}
