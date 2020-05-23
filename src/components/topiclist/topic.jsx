import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import './topic.less'
import {myTimeLocal} from '../../utils/date'
class Topic extends Component {

    //跳转到详情页
    gotoDetail(topic){
        Taro.navigateTo({url: '/pages/detail/index?topicid='+topic.id})
    }
  render() {
      let {item} = this.props
    return ( item ?
        <View className="topiclist-topic"
            onClick={this.gotoDetail.bind(this, item)}
        >
        <Image 
        className="head-img"
        src={item.author ? item.author.avatar_url : ''} />
        <View className='right'>
            <View className='topic-title'>
                {
                    item.top 
                    ? <Text className="topic-up">置顶</Text>
                    : item.tab === 'share'
                    ? <Text className="topic-share">分享</Text>
                    : item.tab === 'ask'
                    ? <Text className="topic-ask">问答</Text>
                    : ''
                }
                <Text>{item.title}</Text>
            </View>
            <View className="topic-info">
                <Text>{item.author? item.author.loginname: ''}</Text>
                <Text>{item.reply_count + '/' + item.visit_count}</Text>
                <Text>{'创建时间:' + myTimeLocal(item.create_at)}</Text>
            </View>
        </View>
    </View>
    : ''
    )
    
   
  }
}

export default Topic;
