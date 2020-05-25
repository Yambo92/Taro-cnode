import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Head from '../../components/head/head'
import Panel from '../../components/user/panel'

import {getUserInfo} from '../../actions/user'
import './user.less'

@connect(function(store){
    return {
        user: store.user
    }
})
class User extends Component {
    config = {
        navigationBarTitleText: '个人中心'
    }
    state={
        recent_topics:[],
        recent_replies:[],
    }
    componentWillMount(){
        getUserInfo({loginname:this.props.user.loginname}).then((result) => {
            this.setState({
                recent_topics: result.recent_topics, 
                recent_replies: result.recent_replies, 
            })
        }).catch(err => console.log(err)
        )
    }
    publish(){
        Taro.redirectTo({url: '/pages/publish/publish'})

    }
  render() {
      let {loginname, avatar_url} = this.props.user
    return <View>
        <Head loginname={loginname} avatar_url={avatar_url} />
        <Panel listData={this.state.recent_topics} title="最近发布的话题"></Panel>
        <Panel listData={this.state.recent_replies} title="最近收到的回复"></Panel>
        <Button className="publish-btn" onClick={this.publish.bind(this)}>发布话题</Button>
    </View>;
  }
}

export default User;
