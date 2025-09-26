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
			<view class="item-text" @click="showTraitPicker">
				<view class="icon-wrapper">
					<text v-if="traitPickerShow === true" style="margin-right: 3px; color: #FE1934;">风格</text>
					<text v-else style="margin-right: 3px;">风格</text>
					<image class="icon-small" :src="traitPickerShow?up:down" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-text" @click="showMorePicker">
				<view class="icon-wrapper">
					<text v-if="morePickerShow === true" style="margin-right: 3px; color: #FE1934;">更多</text>
					<text v-else style="margin-right: 3px;">更多</text>
					<image class="icon-small" :src="morePickerShow?up:down" mode="aspectFit"></image>
				</view>
			</view>
			<view class="item-text">推荐排序</view>
		</view>
		
		<uni-calendar v-show="datePickerShow === true" class="uni-calendar--hook my-extra" :clear-date="timePicker.clear" insert=true lunar=true :startDate="timePicker.startDate"
		 :endDate="timePicker.endDate" :key="timePicker.calendarKey" range=true @confirm="timePickConfirm" @close="close" @change="change"/>
		 <view v-show="datePickerShow" class="btn-bar">
			 <view class="btn-cancel" @click="cancelTimePicker">重置</view>
			 <view class="btn-confirm" @click="timePickConfirm">确认</view>
		 </view>
		 <view v-show="traitPickerShow === true" class="trait-picker-wrapper">
			 <view class="trait-picker-grid">
				 <view v-for="(item, i) in traitList" :key="i" @click="appendCell(item)">
					 <view class="picked" v-if="activeCell(item)">{{item}}</view>
					 <view class="unpicked" v-else> {{item}} </view>
				 </view>
			 </view>
			<view class="btn-bar">
				 <view class="btn-cancel" @click="canceltraitPicker">重置</view>
				 <view class="btn-confirm" @click="traitPickConfirm">确认</view>
			</view>
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
						<image class="first-photo" :src="scard.firstPhoto" mode="aspectFill"></image>
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
import { EventEmitter } from 'stream';

// 字段定义
const cardList = reactive<type.PhotoListCard[]>([]);
const activeIndex = ref(0)

// 风格标签
const traitList = reactive([
	"全部风格",
	"日系",
	"古风",
	"赛博朋克",
	"洛丽塔",
	"二次元"
])

// 时间选择器
const timePicker = reactive({
	"selected": [],
	"endDate": '',
	"startDate":'',
	"range": {},
	"clear": false,
	"calendarKey": Date.now()
})
const datePickerShow = ref(false)

// 风格选择
const traitPickerShow = ref(false)
const traitPicker = reactive({
	"pickedList" : [traitList[0]] as string[]
})

// 更多
const morePickerShow = ref(false)
const morePicker = reactive(({}))


//内部方法

const showTimePicker = ()=>{
	datePickerShow.value = !datePickerShow.value
	if(datePickerShow.value === true){
		traitPickerShow.value = false;
		morePickerShow.value = false;
	}
}
const showTraitPicker=()=>{
	traitPickerShow.value = !traitPickerShow.value
	if(traitPickerShow.value === true){
		datePickerShow.value = false;
		morePickerShow.value = false;
	}
}
const showMorePicker=()=>{
	morePickerShow.value = !morePickerShow.value
	if(morePickerShow.value === true){
		datePickerShow.value = false;
		traitPickerShow.value = false;
	}
}



const activeCell = (item: string) => traitPicker.pickedList.includes(item);

const change = (e:Event)=>{
	console.log('change-----')
	timePicker.range = e
	timePicker.startDate = e.range.before;
	timePicker.endDate = e.range.endDate;
	console.log(timePicker)
}

const timePickConfirm = ()=>{
	console.log(timePicker.startDate)
	console.log(timePicker.endDate)
	close()
	//todo:请求筛选接口刷新页面
}

const close=()=>{
	datePickerShow.value = false
}

const closeTraitPicker=()=>{
	traitPickerShow.value = false;
}


const cancelTimePicker=()=>{
	console.log('cancel')
	// 请求接口刷新页面
	 timePicker.startDate = '';
	timePicker.endDate = '';
  // 强制重新渲染日历组件
	timePicker.calendarKey = Date.now();
	timePicker.clear = true;
	setTimeout(()=>{
		close();
	},50)
}

const appendCell=(item:string)=>{
	var all = traitList[0]
	var allPicked =  traitPicker.pickedList.indexOf(all)
	if(item != all){
		if(allPicked>=0 ){
			traitPicker.pickedList.splice(allPicked, 1)
		}
		var idx = traitPicker.pickedList.indexOf(item)
		if(idx >=0){
			traitPicker.pickedList.splice(idx, 1)
		}else{
			traitPicker.pickedList.push(item)
		}
		console.log(traitPicker.pickedList.flat())
		return;
	}
	traitPicker.pickedList = [item]
	return
}

// 请求接口

const canceltraitPicker = ()=>{
	traitPicker.pickedList = [] as string[]
	traitPicker.pickedList.push(traitList[0])
	//todo:刷新重新请求
	setTimeout(()=>{
		closeTraitPicker()
	}, 100)
	
}

const traitPickConfirm=()=>{
	//todo：请求接口刷新
	setTimeout(()=>{
		closeTraitPicker()
	}, 100)
}

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

<style scoped lang="scss">
.select-items{
	margin-top: 90rpx;
	width: 100vw;
	height: auto;
}

.box{ 
	margin-top: 150rpx;
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
	  justify-content: space-between;
  }
}
.cover{
	width:45vw;
	height: 55vw;
	object-fit: cover;
	border-radius: 10px;
	border: 3px solid white;
	
}
.styles{
	width: 55vw;
	display: flex;
	margin-top: -30rpx;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	font-family: 'Cute';
	font-size: 0.8rem;
	&-card{
		padding: 15rpx 0;
		width: 50vw;
		height: 12vw;
		display: flex;
		margin-top: 20rpx;
		box-shadow: 0 4px 16px rgba(0,0,0,.2);
	}
}
.first-photo{
	width: 10vw;
	height: auto;
}

// 擅长风格卡片
.styles-top{
	width: 40vw;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
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
	margin-top: 20rpx;
	align-items: center;
	justify-content: space-evenly;
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
		width: 100%;
		padding: 20px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 999;
		border-radius: 0 0 12px 12px;
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
.trait-picker-wrapper{
	width: 98vw;
	background: #fff;
	border-radius: 0 0 12px 12px;
	box-shadow: 0 20px 50px rgba(0,0,0,.5);
}
.trait-picker-grid{
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	padding: 12px 0;  /* 上下留白，左右已由外层 margin 控制 */
	justify-items: center;
	align-items: center;
	font-size: 0.8rem;
}
.unpicked {
  height: 30px;
  width: 18vw;
  background: #979797;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.picked{
	height: 30px;
	width: 18vw;
	background: #FF5853;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}

</style>