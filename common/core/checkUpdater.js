var _self;
export default {
	install: function(Vue) {
		_self = Vue.prototype;
	},
	checkUpdater(currentId, updaterPage) {
		// app打开时先检查是否有更新记录（更新记录会被保存在storage中）
		// 更新记录的内容为 { 更新标记, 安装包位置 }
		// 如果存在更新记录，且更新标记（complete=true）则删除上次使用过的安装包，达到存储释放空间的目的	
		const updated = uni.getStorageSync('updated') // 尝试读取storage
		if (updated.completed === true) { // 如果上次刚更新过
			// 删除安装包及安装记录
			console.log('安装记录被删除，更新成功')
			uni.removeSavedFile({ 
				filePath: updated.packgePath,
				success: (res) => {
					uni.removeStorageSync('updated')
				}
			})
		}	
		uni.request({
            url: _self.upgradeUrl()+'/anon/app/update/checkUpdate',
            method: 'GET',
            data: {
                version: currentId
            },
            success: res => {
                if (res.statusCode === 200) {
                    const response = res.data
                    const latestId = response.upgrades.id
                    const method = response.upgrades.method
					var outerLink = "";
					var packVersion = "";
					var upgrade = "";
					if(plus.os.name.toLowerCase() === 'android'){
						if(response.packages.apk.id){
							upgrade ="package";
							outerLink = response.packages.apk.link;
							packVersion = response.packages.apk.id;
						}
					}else{
						if(response.packages.ios.id){
							upgrade ="package";
							outerLink = response.packages.ios.link;
							packVersion = response.packages.ios.id;
						}
					}
					//区分整包更新与热更新
					if(upgrade==="package"){
						uni.showModal({
							title: "更新提示",  
							content: "发现可用新版本,是否更新？",  
							success: (res) => {  
								if (res.confirm) {  
									plus.runtime.openURL(outerLink);  
								}  
							}  
						})  
					}else{
						console.log('当前版本：'+currentId+"，新版本："+latestId);
						if (!latestId) {
						        console.log('当前没有发行版本')
						    } else if (currentId != latestId && method === 'force') {
						        console.log('确认强制更新，正在取得地址')
						        //  如果需要背地（静默）热更新，获取下载地址
						        uni.request({
						            url: _self.upgradeUrl()+'/anon/app/update/latestInfo',
						            method: 'GET',
						            data: {
						              search: 'latestInfo'
						            },
						            success: (res) => {
						                if (res.statusCode === 200) {
						                    console.log('地址请求成功')					
						                    const response = res.data
														console.log(response);
						                    const iosLink = response.latest.info.iosLink
						                    const androidLink = response.latest.info.androidLink
						                    let downloadLink = ''
						                    let ready = false
											console.log(plus.os.name.toLowerCase());
						                    // 判断系统类型
						                    if (plus.os.name.toLowerCase() === 'android') {
						                        console.log('安卓系统')
						                        if (androidLink && androidLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
						                            console.log('发现下载地址')
						                            // 安卓：创建下载任务
						                            if (androidLink.match(RegExp(/.wgt/))) {
						                                console.log('确认wgt热更新包')
						                                downloadLink = androidLink
						                                ready = true
						                            } else {
						                                console.log('安卓推荐.wgt强制更新，.apk的强制更新请您自行修改程序')
						                            }
						                        } else {
						                            console.log('下载地址是空的，无法继续')
						                        }
						                    } else {
						                        console.log('苹果系统')
						                        if (iosLink && iosLink !== '#') { // 我这里默认#也是没有地址，请根据业务自行修改
						                            console.log('发现下载地址')
						                            // 苹果(A)：进行热更新（如果iosLink是wgt更新包的下载地址）判断文件名中是否含有.wgt
						                            if (iosLink.match(RegExp(/.wgt/))) {
						                                console.log('确认wgt热更新包')
						                                downloadLink = iosLink
						                                ready = true
						                            } else {
						                                console.log('苹果只支持.wgt强制更新')
						                            }
						                        } else {
						                            console.log('下载地址是空的，无法继续')
						                        }
						                    }
						                    if (ready) {
						                        console.log('任务开始')
						                        let downloadTask = uni.downloadFile({
						                            url: downloadLink,
						                            success: (res) => {
						                                if (res.statusCode === 200) {
						                                    // 保存下载的安装包
						                                    console.log('保存安装包')
						                                    uni.saveFile({
						                                        tempFilePath: res.tempFilePath,
						                                        success: (res) => {
						                                            const packgePath = res.savedFilePath
																	// 安装更新
																	console.log('静默安装,强制更新')
																	plus.runtime.install(packgePath, { force: true })
																	 // 保存更新记录到stroage，下次启动app时安装更新
																	uni.setStorage({
																		key: 'updated',
																		data: {
																			completed: true,
																			packgePath: packgePath
																		},
																		success: () => {
																			console.log('成功保存记录')
																		}
																	}) 
																	// 判断是否为热更新（判断文件名中是否含有.wgt）
																	if (packgePath.match(RegExp(/.wgt/))) {
																		uni.showModal({
																			title: '提示',
																			content: '应用将重启以完成更新',
																			showCancel: false,
																			complete: () => {
																			  plus.runtime.restart()
																			}
																		})
																	}
																	
						                                            // 任务完成，关闭下载任务
						                                            console.log('任务完成，关闭下载任务，下一次启动应用时将安装更新')
						                                            downloadTask.abort()
						                                            downloadTask = null
						                                        }
						                                    })
						                                }
						                            }
						                        })
						                    } else {
						                        console.log('下载地址未准备，无法开启下载任务')
						                    }             
						                }
						            }
						        })
						    } else if (currentId != latestId) {
						        console.log('检测到更新')
						        uni.showModal({
						            title: '发现新版本',
						            content: '有新版本可用 (版本:' + latestId + ')，是否更新？',
						            success: (res) => {
						                if (res.confirm) {
						                    uni.navigateTo({
						                        url: updaterPage
						                    })										
						                } else if (res.cancel) {
						                    console.log('取消')
						                }
						            }
						        })
						    } else {
						        console.log('现在是最新版本')
						    }      
					}
                }
            }
        })
}
}