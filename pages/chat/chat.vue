<template>
  <view class="chat-page">
	
	<view class="chat-content">
		<view v-for="msg in messageList">
			<view class="userInfo">
				用户信息
			</view>
			<view class="chat-bubble">
				聊天旗袍
			</view>
		</view>
		
	</view>  
	  
    <view class="bottom-area">
      <textarea 
	  class="text-input" 
	  v-model="content"
	   auto-height="true" cursor-spacing="15" :adjust-position="true"></textarea>
	
	  <view class="msg-send">
		  发送
	  </view>
    </view>
	
  </view>
</template>

<script setup>
import { reactive, ref,onMounted, onUnmounted } from 'vue';
// import {MessageBody, UserInfo} from '../../api/request'
const content = ref('');
const chatWithUser = ref('miao~')
const messageList = reactive([
	{"portrait": "", "userName": "zzz"}
])
// 初始化导航栏
const initNavBar = () => {
  uni.setNavigationBarTitle({
    title: `与${chatWithUser.value}的聊天`
  });
};

const socket = ref(null);
const messages = ref([]);
const inputMessage = ref('');
const username = ref('用户' + Math.floor(Math.random() * 1000));
const scrollTop = ref(0);

// 连接到WebSocket服务器
const connectWebSocket = () => {
  socket.value = uni.connectSocket({
    url: 'ws://localhost:8080/ws',
    complete: () => {}
  });
  
  socket.value.onOpen(() => {
    console.log('WebSocket连接成功');
    sendSystemMessage(`${username.value} 进入聊天室`);
  });
  
  socket.value.onMessage((res) => {
    const msg = JSON.parse(res.data);
    messages.value.push(msg);
    scrollToBottom();
  });
  
  socket.value.onClose(() => {
    console.log('WebSocket连接关闭');
  });
};

// 发送系统消息
const sendSystemMessage = (content) => {
  const msg = {
    username: '系统',
    content,
    timestamp: Date.now()
  };
  messages.value.push(msg);
  scrollToBottom();
};

// 发送普通消息
const sendMessage = () => {
  if (!inputMessage.value.trim()) return;
  
  const msg = {
    username: username.value,
    content: inputMessage.value,
    timestamp: Date.now()
  };
  
  socket.value.send({
    data: JSON.stringify(msg),
    success: () => {
      inputMessage.value = '';
    }
  });
};

// 滚动到底部
const scrollToBottom = () => {
  setTimeout(() => {
    scrollTop.value = Math.random() * 1000000; // 随机值触发滚动
  }, 100);
};

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

onMounted(() => {
  connectWebSocket();
  initNavBar();
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});

</script>

<style>

.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.chat-content{
	width:100vw;
	height: auto;
}

.bottom-area {
  padding: 10px;
  background: rgb(245,245,245,0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.text-input {
  border: 1px solid rgba(151, 151, 151, 0.3);
  width: 70vw;
  min-height: 4vh;
  max-height: 150px;
  padding: 3px 10px;
  font-size: 1rem;
  border-radius: 4px;
  line-height: 1.5;
  box-sizing: border-box;
  background-color: white;
}
.msg-send{
	width: 15vw;
	border-radius: 10px;
	height: 5vh;
	background-color: rgb(	0,191,255, 0.9);
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-size: 0.8rem;
}
</style>