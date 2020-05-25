import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import "./panel.less";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

class Panel extends Component {
    toDetail(item){
        Taro.navigateTo({url: '/pages/detail/index?topicid='+ item.id })
    }
  render() {
    let { title, listData } = this.props;
    return (
      <View className="topic-panel">
        <View className="topic-panel-title">{title}</View>
        {listData.map(item => {
          return (
            <View 
            onClick={this.toDetail.bind(this, item)}
            className="topic-panel-list" key={item.id}>
              <Image
                className="topic-panel-list-img"
                src={item.author.avatar_url}
              />
              <Text className="topic-panel-list-content">{item.title}</Text>
              <Text className="topic-panel-list-date">
                {dayjs()
                  .locale("zh-cn")
                  .from(item.last_reply_at)}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }
}
Panel.defaultProps = {
  listData: []
};
export default Panel;
