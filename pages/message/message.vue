<template>
  <view class="container">
    <scroll-view class="message-list" scroll-y="true" :scroll-top="scrollTop">
      <view v-for="(msg, index) in messages" :key="index" class="message-item">
        <text class="username">{{ msg.username }}:</text>
        <text class="content">{{ msg.content }}</text>
        <text class="time">{{ formatTime(msg.timestamp) }}</text>
      </view>
    </scroll-view>
    
    <view class="input-area">
      <input 
        v-model="inputMessage" 
        class="input" 
        placeholder="输入消息..." 
        @confirm="sendMessage"
      />
      <button class="send-btn" @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

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
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.close();
  }
});
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  background-color: #f5f5f5;
}

.message-list {
  flex: 1;
  overflow: auto;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.message-item {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.username {
  font-weight: bold;
  color: #4a8cff;
  margin-right: 5px;
}

.content {
  flex: 1;
}

.time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
  float: right;
}

.input-area {
  display: flex;
  padding: 10px 0;
  background-color: white;
  border-radius: 8px;
}

.input {
  flex: 1;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}

.send-btn {
  width: 80px;
  height: 40px;
  background-color: #4a8cff;
  color: white;
  border-radius: 4px;
}
</style>