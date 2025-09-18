
// 返回发布于xxx前，大于24h为
export interface PublishTime{
	// hour, minute, 刚刚, 天, 星期,月,年
	unit: string 
	time: number
}
export const transferPublishTime=(publishTime:number)=>{
	// 1. 毫秒级（13 位，最常用的 Unix 时间戳）
	const ms: number = Date.now()
	if( publishTime / 1e13 <0){
		publishTime = publishTime * 1e3
	}
	//取时间差
	var diff = ms - publishTime
	
}