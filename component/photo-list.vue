<template>
	<!-- 筛选项	 -->
	<view class="select-items">
		<view class="item">
			<view class="item-text" @click="showTimePicker">
				<view class="icon-wrapper">
					<text v-if="datePickerShow === true" style="margin-right: 3px; color: #FE1934;">时间</text>
					<text v-else style="margin-right: 3px;">时间</text>
					<image class="icon-small" :src="datePickerShow?up:down" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-text">
				<view class="icon-wrapper">
					<text v-if="datePickerShow === true" style="margin-right: 3px; color: #FE1934;">风格</text>
					<text v-else style="margin-right: 3px;">风格</text>
					<image class="icon-small" :src="datePickerShow?up:down" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-text">
				<view class="icon-wrapper">
					<text v-if="datePickerShow === true" style="margin-right: 3px; color: #FE1934;">更多</text>
					<text v-else style="margin-right: 3px;">更多</text>
					<image class="icon-small" :src="datePickerShow?up:down" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-text">推荐排序</view>
		</view>
		<uni-calendar v-show="datePickerShow === true" class="uni-calendar--hook my-extra" clear-date=false insert=true lunar=true :startDate="timePicker.startDate"
		 :endDate="timePicker.endDate" range=true @confirm="timePickConfirm" @close="close"/>
		 <view v-show="datePickerShow" class="btn-bar">
			 <view class="btn-cancel">取消</view>
			 <view class="btn-confirm">确认</view>
		 </view>
	</view>
  <view class="box">
     <view v-for="(item, i) in cardList" :key="i" class="card">
		 <view style="display: flex; justify-content: space-between;align-items: center;">
			 <UserInfoEnchanced
			   :avatarUrl="item.userInfo.portrait"
			   :name="item.userInfo.userName"
			   description="2天前"
			   ipPosition="上海"
			   size="medium"
			   gender=0
			   layout="horizontal"
			   :tags="item.userInfo.tags"
			 />
			 <view class="btn-concern">
				+ 关注
			 </view>
		 </view>
		
		 <view class="card-content">
			 <!-- 作品封面图 -->
			 <image class="cover"  :src="item.coverImages[0]" mode="aspectFill">
			</image>
			 <!-- 擅长风格 -->
			 <view class="styles">
				<text class="styles-title">擅长风格</text>
				<view v-for="(scard,idx) in item.photoStyles" :key="idx" class="styles-card">
					<!-- 头图 -->
					<image class="first-photo" :src="scard.firstPhoto" mode="aspectFill">
						
					</image>
					<view class="styles-summerize">
						<view class="styles-top">
							<!-- 风格 -->
							<view class="styles-top-trait">
								{{'【'+scard.styleLocation+'】'}}
							</view>
							<!-- 价格 -->
							<view class="styles-top-price">
								{{'¥'+scard.price+'/h'}}
							</view>
						</view>
						<view class="styles-bottom">
							<!-- 预约按钮 -->
							<view class="styles-bottom-btn">
								预约
							</view>
							<!-- 查看作品按钮 -->
							<view  style="color: #979797; font-size: 0.7rem;">
								查看作品>
							</view>
						</view>
					</view>
				</view>
				<!-- 接单范围 -->
				<view class="range">
					<image class="range-img" src="../static/time.png" mode="aspectFit"></image>
					<view class="range-time"> {{item.start}}~{{item.end}} </view>
				</view>
				<!-- 时间 -->
				<view class="range">
					<image class="range-img" src="../static/search/position.png" mode="aspectFit"></image>
					<view class="range-time"> 上海之巅附近 </view>
				</view>
				<view class="hot-digit">
					<view class="icon-wrapper">
						<image class="icon" src="../static/fire.png" mode="aspectFit"></image>
						<view style="color: #FE1934;">1000</view>
					</view>
					<view style="color:#979797;">查看详情 ></view>
					</view>
			 </view>
		 </view>
       </view>
	   
  </view>
</template>

<script setup lang="ts">
import {ref, reactive } from 'vue';
import UserInfoEnchanced from '../component/user_info.vue';
import * as type from "../api/request";
import down from "@/static/icons/down.png";
import up from "@/static/icons/up.png";

// 字段定义
const cardList = reactive<type.PhotoListCard[]>([]);
const timePicker = reactive({
	"selected": [],
	"endDate": '',
	"startDate":'',
	"range": true
})
const datePickerShow = ref(false)

//内部方法
const showTimePicker = ()=>{
	datePickerShow.value = !datePickerShow.value
}
const timePickConfirm = (e)=>{
	console.log(e)
}

const close=(e)=>{
	console.log(e)
}


// 请求接口

const getCardList = (page: Number, pageSize: Number)=>{
	// 请求服务端获取卡片列表
	for (let i = 0; i < 10; i++) {
		var tags = ["萌新","当日返图sdfsdfs"] as string[]
		var imgs = ["https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"] as string[]
		var user: type.UserInfo = {
			"userId":"",
			"deviceId":"",
			"portrait":"https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp",
			"userName":"aka-cookie*",
			"tags": tags
		}
		var photoStyle1: type.PhotoStyle={
			styleLocation:"日系甜美",
			price: 100,
			firstPhoto: "https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"
		}
		var photoStyle2: type.PhotoStyle={
			styleLocation:"日系甜美",
			price: 100,
			firstPhoto: "https://gitee.com/Anxiaozhuang/pic-storage/raw/master/ss.webp"
		}
		var photoStyleList: type.PhotoStyle[]=[]
		photoStyleList.push(photoStyle1)
		photoStyleList.push(photoStyle2)
		var card : type.PhotoListCard = {
			userInfo: user as type.UserInfo,
			coverImages: imgs,
			photoStyles: photoStyleList,
			start: "2025.09.15",
			end: "2025.09.20"
			
		}
		cardList.push(card)
	}
	
}
getCardList(0,10);
</script>

<style lang="scss">

.box{ 
	margin-top: 80rpx;
	padding: 20rpx 0; 
	background-color: #F2EDE6;
	font-family: 'Cute';
}
.card{
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  &-content{
	  display: flex;
	  margin-top: 10px;
  }
}
.cover{
	width:50vw;
	height: 55vw;
	object-fit: cover;
	border-radius: 10px;
	border: 3px solid white;
	
}
.styles{
	width: 35vw;
	display: flex;
	padding: 0 20px;
	margin-top: -30rpx;
	flex-direction: column;
	align-items: center;
	font-family: 'Cute';
	font-size: 0.8rem;
	&-card{
		width: 43vw;
		height: 12vw;
		display: flex;
		margin-top: 15rpx;
		box-shadow: 0 4px 16px rgba(0,0,0,.2);
	}
}
.first-photo{
	width: 10vw;
	height: auto;
}

// 擅长风格卡片
.styles-top{
	display: flex;
	&-trait{
		width: 20vw;
		font-size: 0.75rem;
		color: #4D4D4D;
		margin-right: 5px;
	}
	&-price{
		color: #FE1934;
		font-size: 0.75rem;
	}
}
.styles-bottom{
	display: flex;
	margin-top: 6px;
	align-items: center;
	justify-content: space-between;
	&-btn{
		width: 14vw;
		height: 5vw;
		border-radius: 5px;
		background-color: #F68084;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 5px;
		font-size: 0.75rem;
		color: white;
	}
}
.my-extra{
	width: 100vw;
	z-index: 999;
	border-radius: 50px;
	box-shadow: 0 10px 50px rgba(0,0,0,.2);
}
.range{
	display: flex;
	margin-top: 10px;
	width: 43vw;
	height: 5vw;
	align-items: center;
	color: #979797;
	font-size: 0.75rem;
	&-img{
		width: 5vw;
		height: 5vw;
		margin-right: 10px;
	}
	&-time{
		font-size: 0.7rem;
	}
	
}
.hot-digit{
	display: flex;
	width:43vw;
	color: #d4237a;
	align-items: center;
	justify-content: space-between;
	height: 10vw;
	font-size: 0.75rem;
}

// 日历选择器的确认和取消
.btn{
	&-bar{
		background-color: white;
		width: 100vw;
		padding: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
	}
	&-confirm{
		align-items: center;
		width: 75px;
		height: 60rpx;
		font-size: 0.75rem;
		background-color: #FF5853;
		border: 1px solid #FF5853;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		margin-right: 20px;
		color: white;
	}
	&-cancel{
		display: flex;
		justify-content: center;
		align-items: center;
		align-items: center;
		height: 60rpx;
		width: 75px;
		border-radius: 10px;
		font-size: 0.75rem;
		margin-left:20px;
		background-color: #f9f9f9;
		color: #979797;
		border: 1px solid #f9f9f9;
	}
}

</style>