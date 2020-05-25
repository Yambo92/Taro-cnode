import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Input } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import Head from '../../components/head/head'
import './login.less'
import {accesstoken} from '../../actions/user'

@connect(function(store){
    return {
        user: store.user
    }
}, function(dispatch){
    return {
        accesstoken: (params) => dispatch(accesstoken(params))
    }
})
class Login extends Component {
    state={
        accesstokens: ''
    }
    config={
        navigationBarTitleText: '登录'
    }
    handleChange(event){
        this.setState({accesstokens: event.target.value})
    }
    handleLogin(){
        let {accesstokens} = this.state
        if(accesstokens){
            
            this.props.accesstoken({accesstoken: accesstokens}).then((result) => {
                if(result){
                 Taro.redirectTo({url: '/pages/user/user'})
                }
            })
        } else {
            Taro.showToast({title: '请输入秘钥', icon: 'none'})
        }
    }
  render() {
    return <View className="login-body">
        <Head />
        <View className="form">
        <Input
        onInput={this.handleChange.bind(this)}
        className="access_input"  placeholder="请输入accesstoken"/>
        <Button 
        onClick={this.handleLogin.bind(this)}
        className="btn_login">登录</Button>
        </View>
    </View>;
  }
}

export default Login;
