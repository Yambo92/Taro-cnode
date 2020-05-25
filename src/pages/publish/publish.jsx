import Taro, { Component } from "@tarojs/taro";
import {Input, View, Text, Button, Picker, Textarea } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import {submitTopic} from '../../actions/topiclist'
import './publish.less'
@connect(function(store){
    return{
        menu: store.menu,
        user: store.user,
    }
}, function(dispatch){
    return {
        submitTopic: (params) => dispatch(submitTopic(params))
    }
})
class Publish extends Component {
    state = {
        selectCata: null,
        title: null,
        content: null
    }
    handlePicker(event){
      let {cataData} = this.props.menu
        this.setState({ selectCata: cataData[event.detail.value].value})
    }
    titleChange(event){
        this.setState({
          title:  event.target.value
        })
    }
    contentChange(event){
        this.setState({
            content: event.target.value
        })
    }
    async handleSubmit(){
        let {title, content, selectCata} = this.state;
        let {accesstoken} = this.props.user;
        if(title&&content && selectCata){
            try{
                await this.props.submitTopic({
                    tab: 'dev',
                    title,
                    content,
                    accesstoken
                })
                Taro.redirectTo({url: '/pages/user/user'})
                
            }catch(err){
                console.log(err);
                
            }
        
        }else {
            Taro.showToast({title: '分类或标题内容都不能为空', icon: 'none'})
        }
    }
  render() {
      let {cataData} = this.props.menu
    return <View className="publish-topic">
       
        <Input
        className="publish-topic-title"
        onInput={this.titleChange.bind(this)} placeholder="请输入您要发布的标题" />
        <Textarea
        className="publish-topic-content"
        
        onInput={this.contentChange.bind(this)} placeholder="请输入您要发布的内容" />
        <Picker
        onChange={this.handlePicker.bind(this)}
        mode="selector" range={cataData} rangeKey='value'>
  <View className="publish-topic-cata">{this.state.selectCata ? this.state.selectCata : '请选择'}</View>
        </Picker>
        <Button
        className="public-topic-btn"
        onClick={this.handleSubmit.bind(this)}>提交</Button>
    </View>;
  }
}

export default Publish;
