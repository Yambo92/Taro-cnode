import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import './head.less'
class Head extends Component {
  render() {
      let {loginname, avatar_url} = this.props
    return <View className="login-head">
        <Image className='login-head-bg' src={require('../../assets/img/bg.jpg')} />
        <Image className="login-head-head" src={avatar_url ? avatar_url : require('../../assets/img/icon.png')}/>
        {loginname?<Text className="login-head-name">{loginname}</Text> : null }
    </View>;
  }
}

export default Head;
