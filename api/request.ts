export interface SendCodeReq{
	email: string
}

export interface LoginReq{
	email: string
	userName: string
	deviceId: string
	passwordEncrypted: string
	passwdVerify: boolean
	code: string
}

export interface UserInfo{
	userId: string
	userName: string
	deviceId: string
	portrait: string
	tags: string[]
}

export interface MessageBody{
	userInfo: UserInfo
	content: string
	timestamp: string
}

export interface ChatListItem{
	userInfo: UserInfo
	
}

export interface PhotoListCard{
	userInfo: UserInfo
	publishTime: number
	// 封面图
	coverImages: string[]
	// 擅长风格
	photoStyles: PhotoStyle[]
	
	// 接单时间范围
	start: number
	end: number
	// 接单地址范围
	orderScope: AddressInfo[]
}

export interface AddressInfo{
	country: string
	province: string
	city: string
	//区
	region: string
	// 街道、小区...
	detail: string
}

export interface PhotoStyle{
	// 风格定位
	styleLocation: string
	// 价格
	price: number
	//作品头图
	firstPhoto: string
}


