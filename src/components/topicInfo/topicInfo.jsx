import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, RichText, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import { myTimeLocal } from "../../utils/date";

import "./topicinfo.less";

class TopicInfo extends Component {
  editTopic(params){
    Taro.redirectTo({url: '/pages/publish/publish?edit=1'})
  }
  render() {
    let { topicinfo, selfPublish } = this.props;
    return topicinfo ? (
      <View className="topic-info">
        <View className="topic-info-header">
          <View className="topic-info-header-title">
            {topicinfo.top ? (
              <Text className="topic-up">置顶</Text>
            ) : topicinfo.tab === "share" ? (
              <Text className="topic-share">分享</Text>
            ) : topicinfo.tab === "ask" ? (
              <Text className="topic-ask">问答</Text>
            ) : (
              ""
            )}
            <Text>{topicinfo.title}</Text>
          </View>
          <View className="topic-info-header-pie">
            <Text className="topic-info-header-text">
              {myTimeLocal(topicinfo.create_at)}
            </Text>
            <Text className="topic-info-header-text">
              {topicinfo.author.loginname}
            </Text>
            <Text className="topic-info-header-text">
              {topicinfo.visit_count ? topicinfo.visit_count + "次浏览" : ""}
            </Text>
          </View>
          {selfPublish ? (
            <View className="topic-info-header-img">
              <Image
              onClick={this.editTopic.bind(this, topicinfo)}
                className="img"
                src={require("../../assets/img/edit.png")}
              />
              <Image
                className="img"
                src={require("../../assets/img/delete.png")}
              />
            </View>
          ) : null}
        </View>
        <View className="topic-info-body">
          <RichText nodes={topicinfo.content} />
        </View>
      </View>
    ) : (
      ""
    );
  }
}
TopicInfo.defaultProps = {
  topicinfo: {}
};
export default TopicInfo;
