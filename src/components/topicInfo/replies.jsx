import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image, RichText } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./replies.less";
import { myTimeLocal } from "../../utils/date";
import {validateUser} from '../../actions/user'

const isweapp = process.env.TARO_ENV === "weapp"; //小程序

class Replies extends Component {
  handleLike(reply){

    let {user} = this.props;
    validateUser(user).then(result => {
      if(result){
        this.props.onLike(reply.id)
      } else {
        Taro.navigateTo({url: '/pages/login/login'})
      }
    })
  }
  replytoReply(reply){
    let {user} = this.props;
    console.log('uuuuuu', user);
    
    validateUser(user).then(result => {
      if(result){
        this.props.onReplytoReply(reply)
      } else {
        Taro.navigateTo({url: '/pages/login/login'})
      }
    })
  }
  render() {
    let { replies } = this.props;

    return (
      <View className="topicinfo-replies">
        {replies.map((reply, index) => {
          return (
            <View className="topicinfo-reply" key={reply.id}>
              <Image
                className="topicinfo-reply-image"
                src={reply.author ? reply.author.avatar_url : ""}
              />
              <View className="topicinfo-reply-right">
                <View className="topicinfo-reply-right-body">
                  <View className="topicinfo-reply-right-pie">
                    <Text className="loginname">
                      {reply.author ? reply.author.loginname : "游客"}
                    </Text>
                    <Text className="floor">{index + 1 + "楼"}</Text>
                    <Text className="time">{myTimeLocal(reply.create_at)}</Text>
                  </View>
                  <View className="topicinfo-reply-right-content">
                    {isweapp ? (
                      <RichText nodes={reply.content} />
                    ) : (
                      <View
                        dangerouslySetInnerHTML={{ __html: reply.content }}
                      ></View>
                    )}
                  </View>
                </View>
                <View className="topicinfo-reply-right-zan">
                  <Image
                  onClick={this.handleLike.bind(this, reply)}
                    className="topicinfo-reply-image"
                    src={reply.is_uped 
                      ? require("../../assets/img/like-red.png")
                      :  require("../../assets/img/like.png")
                     }
                  />
                  <Text className='uped-length'>{reply.ups.length}</Text>
                  <Image
                    onClick={this.replytoReply.bind(this, reply)}
                    className="topicinfo-reply-image"
                    src={require("../../assets/img/reply.png")}
                  />
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
Replies.defaultProps = {
  replies: []
};
export default Replies;
