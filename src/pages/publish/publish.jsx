import Taro, { Component } from "@tarojs/taro";
import {Input, View, Text, Button, Picker, Textarea } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import {submitTopic, updateTopic} from '../../actions/topiclist'
import './publish.less'
@connect(function(store){
    return{
        menu: store.menu,
        user: store.user,
        topicInfo: store.TopicList.topicInfo
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
        content: null,
        idEdit: false,
        topicInfo: {
            title: '',
            content: ''
        },
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
        let {title, content, selectCata, topicInfo} = this.state;
        let {accesstoken} = this.props.user;
        if(title&&content && selectCata){
            if(!isEdit){
                try{
                    await this.props.submitTopic({
                        tab: 'dev',
                        title,
                        content,
                        accesstoken
                    })
                    Taro.redirectTo({url: '/pages/user/user'})
                    
                }catch(err){
                    Taro.redirectTo({url: '/pages/user/user'})
                    console.log(err);
                    
                }
            } else {
                updateTopic({
                    topic_id: topicInfo.id,
                    tab: 'dev',
                    title,
                    content,
                    accesstoken
                }).then(result => {
                    if(result){
                    Taro.navigateBack()
                    }
                })
            }
          
        
        }else {
            Taro.showToast({title: '分类或标题内容都不能为空', icon: 'none'})
        }
    }
    componentWillMount(){
        let {edit} = this.$router.params;
        this.setState({isEdit: edit=='1'}, () => {
            if(this.state.isEdit){
                let {topicInfo} = this.props
                this.setState({topicInfo, content:topicInfo.content, title: topicInfo.title})
            }
        })
    }
  render() {
      let {cataData} = this.props.menu
      let {topicInfo} = this.state;
    return <View className="publish-topic">
       
        <Input value={topicInfo.title}
        className="publish-topic-title"
        onInput={this.titleChange.bind(this)} placeholder="请输入您要发布的标题" />
        <Textarea value={topicInfo.content}
        className="publish-topic-content"
        
        onInput={this.contentChange.bind(this)} placeholder="请输入您要发布的内容" />
        <Picker
        onChange={this.handlePicker.bind(this)}
        mode="selector" range={cataData} rangeKey='value'>
  <View className="publish-topic-cata">{
      isEdit ? 6 :
  this.state.selectCata ? this.state.selectCata : '请选择'}</View>
        </Picker>
        <Button
        className="public-topic-btn"
        onClick={this.handleSubmit.bind(this)}>提交</Button>
    </View>;
  }
}

export default Publish;
