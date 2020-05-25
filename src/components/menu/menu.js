import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { AtDrawer } from "taro-ui";
import { connect } from "@tarojs/redux";

import "./menu.less";
import menuImg from "../../assets/img/menu.png";
import mySelf from "../../assets/img/myself.png";
import { showDrawer, changeCurrentCata, hideDrawer } from "../../actions/menu";

import { validateUser } from "../../actions/user";

@connect(
  function(store) {
    return { ...store.menu, user: store.user };
  },
  function(dispatch) {
    return {
      showMenu: () => dispatch(showDrawer()),
      hideMenu: () => dispatch(hideDrawer()),
      changeCata: curCata => dispatch(changeCurrentCata(curCata))
    };
  }
)
class Menu extends Component {
  openDrawer() {
    //显示抽屉
    this.props.showMenu && this.props.showMenu();
  }
  getItems(cataData) {
    return cataData.map(item => item.value);
  }
  handleClickItem(index) {
    let { cataData } = this.props;
    let lickedCata = cataData[index];
    if (lickedCata.key !== this.props.currentCata.key) {
      //点击同一个菜单分类避免重复请求
      this.props.changeCata && this.props.changeCata(lickedCata);
    }
  }
  handleClose() {
    this.props.hideMenu && this.props.hideMenu();
  }
  toUser() {
    let { user } = this.props;
    validateUser(user).then(result => {
      if (result) {
        //跳转到用户详情
        Taro.navigateTo({ url: "/pages/user/user" });
      } else {
        Taro.navigateTo({ url: "/pages/login/login" });
      }
    });
  }
  render() {
    let { showDrawer, cataData } = this.props;
    let items = this.getItems(cataData);
    return (
      <View className="topiclist-wrapper">
        <AtDrawer
          style="position:absolute"
          show={showDrawer}
          items={items}
          onItemClick={this.handleClickItem.bind(this)}
          onClose={this.handleClose.bind(this)}
        />
        <View className="topiclist-menu">
          <Image
            className="img"
            src={menuImg}
            onClick={this.openDrawer.bind(this)}
          />
          <Text>
            {this.props.currentCata ? this.props.currentCata.value : ""}
          </Text>
          <Image
            className="img"
            src={mySelf}
            onClick={this.toUser.bind(this)}
          />
        </View>
      </View>
    );
  }
}

export default Menu;
