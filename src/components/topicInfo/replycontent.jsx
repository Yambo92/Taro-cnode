import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Textarea } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import './replycontent.less'
class ReplyContent extends Component {
    state = {
        value: ''
    }
    onbtnCancel(){
        this.props.onCancelReplyContent()
    }
    onbtnOK(){
        if(this.state.value){
            this.props.onOKReplyContent(this.state.value)
        }else {
            Taro.showToast({title: '请输入评论内容', icon:'none'})
        }
    }
    handleTextarea(event){
        let result = event.target.value;
        this.setState({value: result})
    }
  render() {
    return <View className='replycontent'>
        <Textarea
            onInput={this.handleTextarea.bind(this)}
        className="replycontent-textarea" placeholder="请输入回复内容"

        ></Textarea>
        <View className='replycontent-btn-group'>
            <Button
            onClick={this.onbtnOK.bind(this)}
            className="btn">确定</Button>
            <Button 
            onClick={this.onbtnCancel.bind(this)}
            
            className="btn">取消</Button>
        </View>
    </View>;
  }
}

export default ReplyContent;
