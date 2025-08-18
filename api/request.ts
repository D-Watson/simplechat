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
}

export interface MessageBody{
	userInfo: UserInfo
	content: string
	timestamp: string
}
