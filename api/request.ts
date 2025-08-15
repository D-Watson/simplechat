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