//显示抽屉
export function showDrawer() {
  return function(dispatch) {
    dispatch({ type: "showDrawer" });
  };
}
//关闭抽屉
export function hideDrawer() {
  return function(dispatch) {
    dispatch({ type: "hideDrawer" });
  };
}
//切换当前分类
export function changeCurrentCata(currentCata) {
  return dispatch => dispatch({ type: "changeCata", currentCata });
}
