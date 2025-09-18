<template>
  <!-- 1. 固定导航栏 -->
  <!-- 当 active === i 为真时，给这一行 DOM 加上 active 这个 class；否则不加 -->
  	<view class="navBar">
  		<view class="top-tab">
  			<!-- 定位 -->
  			<view class="position">
				<image class="position-img" src="../../static/search/position.png" mode="aspectFit">
				</image>
				<view class="position-text">上海之巅</view>
			</view>
  			<!-- 搜索 -->
			<view class="search">
				<input class="search-input" blur="red" maxlength="35">
				<image class="search-btn" src="../../static/search/search.png" mode="aspectFit"></image>
			</view>
  		</view>
  		<!-- 导航拦 -->
  		<view class="tab-bar">
  		  <view
  		    v-for="(t,i) in tabs"
  		    :key="i"
  		    class="tab-item"
  		    :class="{active:active===i}" 
  		    @click="changeTab(i)"
  		  >
  		    {{t}}
  		  </view>
  		</view>
  	</view>
  

  <!-- 2. 内容区：swiper 负责左右滑，scroll-view 负责内部滚动 -->
  <swiper
    class="content-swiper"
    :current="active"
    @change="swiperChange"
  >
    <swiper-item v-for="(t,i) in tabs" :key="i">
      <!-- 每个子区域都能单独下拉刷新 -->
      <scroll-view
        scroll-y
        refresher-enabled
        :refresher-triggered="refresher[i]"
        @refresherrefresh="onRefresh(i)"
        class="scroll-box"
      >
        <!-- 3. 真正的“页面”组件 -->
        <pageA v-if="i===0"/>
        <pageB v-if="i===1"/>
        <pageC v-if="i===2"/>
      </scroll-view>
    </swiper-item>
  </swiper>
</template>

<script setup>
import {ref} from 'vue'
import PageA from '../../component/photo-list.vue'
import PageB from '../../component/page-b.vue'
import PageC from '../../component/page-c.vue'

const tabs = ['约拍','妆娘','演出']
const active = ref(0)
const refresher = ref([false,false,false])

function changeTab(i){
  active.value = i
}
function swiperChange(e){
  active.value = e.detail.current
}

async function onRefresh(idx){
  refresher.value[idx] = true
  // 模拟请求
  await new Promise(r=>setTimeout(r,1500))
  refresher.value[idx] = false
  uni.showToast({title:'已刷新',icon:'none'})
}
</script>

<style lang="scss">
/* 固定栏 */
.navBar{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 998;
	width: 100%;
	height: 100px;
	background: linear-gradient(180deg, #F2EDE6 0%, #fff 100%);
	border-bottom: solid 0.1px #D9D9D9;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
	
.tab-bar{
  width: 100%;
  height: 88rpx;
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #eee;
  z-index: 998;
  
}
.tab-item{
  flex:1;
  text-align: center;
  font-size: 28rpx;
  color:#666;
  position: relative;
  &.active{
    color:#F68084;
    font-weight: 600;
    &::after{
      content:'';
      position: absolute;
      bottom:0;
      left:50%;
      transform: translateX(-50%);
      width: 75rpx;
      height: 4rpx;
      background: #F68084;
      border-radius: 2rpx;
    }
  }
}

/* 内容区 */
.content-swiper{
  height: 100vh;          // 整屏高
  padding-top: 88rpx;     // 把固定栏位置让出来
  box-sizing: border-box;
}
.scroll-box{
  height: 100%;           // 必须给高度，否则下拉刷新不出现
}

.top-tab{
	width: 100vw;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.search{
	width: 56vw;
	height: 60rpx;
	border: 1px solid #8a8a8a;
	display: flex;
	justify-content: center;	
	padding: 0 10px 0 20px;
	align-items: center;
	border-radius: 10px;
	&-input{
		width: 90%;
		height: 100%;
	}
	&-btn{
		width: 10%;
		height: 100%;
	}
}
.position{
	width: 20vw;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	&-img{
		width: 30%;
		height: 80%;
	}
	&-text{
		width: 70%;
		height: 100%;
		display: flex;
		align-items: center;
		color: #8a8a8a;
		font-size: 0.7rem;
	}
}
</style>