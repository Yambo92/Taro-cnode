import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {getTopicInfo, like} from '../../actions/topiclist'

import TopicInfo from '../../components/topicInfo/topicInfo'
import Replies from '../../components/topicInfo/replies'
import ReplyContent from '../../components/topicInfo/replycontent'
import './detail.less'

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
        showReplyContent: false
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
        })
    }
    handleLike(id){
        // console.log('like', id)
        this.props.like({id, accesstoken: this.props.user.accesstoken})
    }
    handleReply(){
        this.setState({showReplyContent: true})
    }
    onOK(params){
        console.log(params);
        
    }
    onCancel(){
        this.setState({showReplyContent: false})
    }
  render() {
      let {topicInfo, replies} = this.props;
      let {showReplyContent} = this.state;
    return <View>
       <TopicInfo topicinfo={topicInfo} />
       <Replies replies={replies} onLike={this.handleLike.bind(this)} />
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
