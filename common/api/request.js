import {
	Get,
	Post
} from "./http.js" //文件路径自己写对
//实名认证
export const userrealname = p => Post(p, 'v2/user-real')
//短信接口已登录
export const getcodelogo = p => Get(p, 'v2/send-sms-code-global')
//邮箱验证码
export const getcodeemail = p => Post(p, 'v2/send-email-code')
//短信接口未登录
export const getcode = p => Post(p, 'v2/send-sms-code?from=app')
//退出登录接口
export const logout = p => Get(p, 'v1/logout')
//登录接口
export const login = p => Post(p, 'v2/login')
//手机短信码校验
export const checkcode = p => Post(p, 'v2/check-sms-code')
//邮箱验证码校验
export const checkemailcode = p => Post(p, 'v2/check-email-code')
//注册接口
export const reg = p => Post(p, 'v2/reg')
//修改头像
export const editimage = p => Post(p, 'v1/upload-avatar')
//邮箱密码找回
export const findbyemail = p => Post(p, 'v2/find-pass-byemail')
//手机密码找回
export const findpwd = p => Post(p, 'v2/find-pass-bymobile')
//修改密码
export const changepwd = p => Post(p, 'v2/change-pass')
//检查更新
export const checkupdat = p => Post(p, 'v1/check-update')//未使用
//我的邀请
export const myinvite = p => Get(p, 'v2/user-invite-list')
//首页接口
export const indexrequest = p => Get(p, 'v1/chain/metadata')
//活动赠送两个接口转账记录
export const bringforward = p => Get(p, 'v1/user-transfer-log')
//sr1奖励
export const sr1reward = p => Get(p, 'v1/sr-reward-release-log')
//我的订单
export const myorder = p => Get(p, 'v1/sl-order-list')
//咨询页面接口
export const articallist = p => Get(p, 'v2/artical-list')
//资产页面 
export const myassets = p => Get(p, 'v2/user-panel')
//资产页面数据概况
export const myassetsdata = p => Get(p, 'v2/kjykj-query')
//我的页面接口
export const uinfo = p => Get(p, 'v1/uinfo')
//昨日产出
export const output = p => Get(p, 'v1/user-income-log')
//昨日产出详情
export const outputdetail = p => Get(p, 'v1/user-income-detail')
//活动赠送两个接口赠送记录
export const giverecord = p => Get(p, 'v1/user-gift-log')
//用户协议
export const agreement = p => Get(p, 'v1/artical-detail')
//获取区
export const countrymobile = p => Get(p, 'v1/mobile-country')
//实名信息
export const userpass = p => Get(p, 'v2/user-pass')
//支付密码修改
export const changepaypass = p => Post(p, 'v2/cash-pass-reset')
//支付密码修改
export const bindemail = p => Post(p, 'v2/bind-email')
//------------提现--------------//

//支付密码修改
export const cashoutadd = p => Get(p, 'v1/user-wallet-address')
//提现申请
export const cashoutapply = p => Post(p, 'v1/user-withdraw-fil')



