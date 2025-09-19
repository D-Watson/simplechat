<template>
  <view class="user-info-enhanced" :class="[layout, size]">
	<view class="user-info">
		<view class="avatar-wrapper" :class="{ 'has-badge': showBadge }">
		  <image
		    :src="effectiveAvatarUrl"
		    :alt="name + '的头像'"
		    class="avatar"
		    :class="size"
		    @error="handleImageError"
		  />
		  <span v-if="showBadge && badgeContent" class="badge">{{ badgeContent }}</span>
		  <span v-if="status" class="status-indicator" :class="status"></span>
		</view>
		<view class="info-content">
		  <view class="name" :class="size">{{ name }}</view>
		  <view style="display: flex; justify-content: center;align-items: center;">
			  <image class="img" :src="currentIcon" mode="aspectFit"></image>
			  <view v-if="description" class="description">{{ description }}</view>
			  <view v-if="ipPosition" class="description">{{ ipPosition }}</view>
		  </view>
		 
		</view>
	</view>
	<view class="tags">
		<view v-for="(item, i) in tags" :key="i" class="tag">
			{{item}}
		</view>
	</view>
	
  </view>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
import girl from '@/static/girl.png'
import boy from '@/static/boy.png'

const props = defineProps({
  tags:{
	type: [],
	default:[]
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  // ip归属地
  ipPosition:{
	  type: String,
	  default: ''
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  // 性别
  gender:{
	  type: Number,
	  default: 0 //0=女，1=男
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
  },
  layout: {
    type: String,
    default: 'horizonal', // horizontal, vertical
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  showBadge: {
    type: Boolean,
    default: false
  },
  badgeContent: {
    type: [String, Number],
    default: ''
  },
  status: {
    type: String,
    default: '', // online, offline, busy, away
    validator: (value) => ['', 'online', 'offline', 'busy', 'away'].includes(value)
  },
  defaultAvatar: {
    type: String,
    default: 'https://via.placeholder.com/100x100?text= 头像'
  }
})

const avatarError = ref(false)
const currentIcon = computed(() => props.gender.value === 0 ? boy : girl)
const effectiveAvatarUrl = computed(() => {
  if (avatarError.value || !props.avatarUrl) {
    return props.defaultAvatar
  }
  return props.avatarUrl
})

const handleImageError = () => {
  avatarError.value = true
}
</script>

<style scoped>
.user-info-enhanced {
  display: inline-flex;
  gap: 12px;
  align-items: center;
}

.user-info{
	display: inline-flex;
	align-items: center;
}

.user-info-enhanced.vertical {
  flex-direction: column;
  text-align: center;
  gap: 8px;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 尺寸样式 */
.avatar.small {
  width: 32px;
  height: 32px;
}

.avatar.medium {
  width: 48px;
  height: 48px;
}

.avatar.large {
  width: 64px;
  height: 64px;
}

.avatar.xlarge {
  width: 80px;
  height: 80px;
}

.info-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name {
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

.name.small {
  font-size: 12px;
}

.name.medium {
  font-size: 14px;
}

.name.large {
  font-size: 16px;
  font-weight: 700;
}

.name.xlarge {
  font-size: 18px;
  font-weight: 700;
}

.description {
  font-size: 0.7rem;
  color: #6b7280;
  margin-top: 5rpx;
  margin-left: 10rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150rpx;
}
.img{
	margin-top: 5rpx;
	overflow: hidden;
	width: 30rpx;
	height: 30rpx;
}

/* 徽章样式 */
.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4757;
  color: white;
  border-radius: 10px;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid white;
}

/* 状态指示器 */
.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-indicator.online {
  background: #22c55e;
}

.status-indicator.offline {
  background: #94a3b8;
}

.status-indicator.busy {
  background: #ef4444;
}

.status-indicator.away {
  background: #f59e0b;
}

/* 垂直布局调整 */
.user-info-enhanced.vertical .info-content {
  align-items: center;
}

.user-info-enhanced.vertical .name,
.user-info-enhanced.vertical .description {
  max-width: 100px;
  text-align: center;
}

/* 用户标签 */
.tags{
	display: flex;
	height: 100%;
}
.tag{
	min-width:40px;
	height: 15px;
	font-size: 0.6rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	background-color: #d9d9d9;
	color: #979797;
	padding:0 5px;
	border-radius: 10px;
}

</style>