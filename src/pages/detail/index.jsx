import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import { connect } from "@tarojs/redux";

class Detail extends Component {
    componentWillMount(){
      console.log(this.$router.params.topicid);
        
    }
  render() {
    return <View>
        详情页
    </View>;
  }
}

export default Detail;
