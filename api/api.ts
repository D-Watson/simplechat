import axios from 'axios'
import * as type from "./request"

export const sendEmailCode=async(data: type.SendCodeReq)=>{
	const url = 'http://localhost:50011/user/email/send'
	const response = axios({
	    url,
	    method: 'POST',
	    data: data,
	    headers: {
	      'Content-Type': 'application/json'
	    },
	  })
	  return response
} 
export const loginByCode=async(data: type.LoginReq)=>{
	const url = 'http://localhost:50011/user/login'
	const response = axios({
	    url,
	    method: 'POST',
	    data: data,
	    headers: {
	      'Content-Type': 'application/json'
	    },
	  })
	  return response
} 
