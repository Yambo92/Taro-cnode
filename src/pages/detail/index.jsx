import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {getTopicInfo, like, replyContent} from '../../actions/topiclist'

import TopicInfo from '../../components/topicInfo/topicInfo'
import Replies from '../../components/topicInfo/replies'
import ReplyContent from '../../components/topicInfo/replycontent'
import './detail.less'
import {validateUser} from '../../actions/user'
@connect(function (store) {
    return {
        topicInfo: store.TopicList.topicInfo,
        replies: store.TopicList.replies,
        user: store.user,
        islike: store.TopicList.islike,
    }
}, function(dispatch){
    return {
        getTopicInfo: (params) => {
            return dispatch(getTopicInfo(params))
        },
        like: (params) => {
            return dispatch(like(params))
        }
    }
})
class Detail extends Component {

    config={
        navigationBarTitleText: '话题详情'
    }
    state = {
        showReplyContent: false,
        currentReply: {}
    }
    componentWillMount(){
      console.log(this.$router.params.topicid);
      this.getDetail();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.islike !== nextProps.islike){
            //点赞变化请求数据
            this.getDetail();
        }
    }
    getDetail(){
        let id = this.$router.params.topicid;
        this.props.getTopicInfo&&this.props.getTopicInfo({
            id,
            accesstoken: this.props.user.accesstoken,
            mdrender: true
        });
    }
    handleLike(id){
        // console.log('like', id)
        this.props.like({id, accesstoken: this.props.user.accesstoken})
    }
    handleReply(){
        validateUser(this.props.user).then(result => {
            if(result){
                this.setState({showReplyContent: true})
            }else {
                Taro.navigateTo({url: '/pages/login/login'})
            }
        })
    }
    //确认回复
    onOK(params){
       
        const {currentReply} = this.state;
        const reply_id = currentReply ? currentReply.id : null;
        //@评论人
        let preName = currentReply ? '@' + currentReply.author.loginname + ' ': '';
        let datas = {
            id: this.$router.params.topicid,
            accesstoken: this.props.user.accesstoken,
            content: preName + params,
            reply_id
        }
        replyContent(datas).then((result) => {
            if(result&&result.success){
                this.getDetail();
            }
            this.onCancel()
        }).catch(err => console.log(err)
        )

    }
    onCancel(){
        
        this.setState({showReplyContent: false})
    }
    //对评论进行回复
    onReplytoReply(reply){
        validateUser(this.props.user).then(result => {
            if(result){
                this.setState({currentReply: reply, showReplyContent: true})

            }else {
                Taro.navigateTo({url: '/pages/login/login'})
            }
        })
    }
  render() {
      let {topicInfo, replies, user} = this.props;
      let {showReplyContent} = this.state;
    let isSelf =  user.loginname === topicInfo.author.loginname
    return <View>
       <TopicInfo topicinfo={topicInfo}
        selfPublish = {isSelf}
       />
       <Replies
       user={user}
       onReplytoReply={this.onReplytoReply.bind(this)}
       replies={replies} onLike={this.handleLike.bind(this)} />
        <Button className="reply-btn" onClick={this.handleReply.bind(this)}>回复</Button>
      {
          showReplyContent ?  
          <ReplyContent
          onOKReplyContent={this.onOK.bind(this)}
          onCancelReplyContent={this.onCancel.bind(this)}
          /> : ''
      } 
    </View>;
  }
}
Detail.defaultProps = {
    topicInfo: {}
}
export default Detail;
