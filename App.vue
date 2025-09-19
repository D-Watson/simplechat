<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	.page-login {
	  width: 100vw;
	  height: 100vh;
	  display: grid;
	  /***
	  第一行：固定高度 30vh（视口高度的30%）
	  第二行：auto（由内容决定高度）
	  第三行：1fr → 占用剩余的全部空间
	  ***/
	  grid-template-rows: 30vh auto auto 1fr;
	  background-color: #ffffff;
	}
	@font-face {
	  font-family: 'Cute';
	  src: url('/static/font/LXGWWenKai-Regular.ttf') format('truetype');
	  font-display: swap; /* 先显示系统字体，再切换 */
	}
	/* 全局使用 */
	page, * {
	  font-family: 'Cute';
	}
	
	.login-banner {
	  grid-row: 1;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  background-color: #FF5853;
	  color: white;
	  font-size: 2.5rem;
	  font-weight: bold;
	}
	.login-forms {
	  grid-row: 2;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 0 10vw;
	  margin-top: 20px;
	}
	.account-inputs {
	  display: flex;
	  width: 100%;
	  height: 50px;
	  border-radius: 25px;
	  border: 1px solid #e0e0e0;
	  margin-bottom: 20px;
	  align-items: center;
	  background-color: #f9f9f9;
	}
	
	.place-icon {
	  width: 50px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	
	.icon {
	  width: 24px;
	  height: 24px;
	}
	.icon-small{
		width: 12px;
		height: 12px;
	}
	.icon-wrapper{
		display: flex;
		align-items: center;
	}
	
	.account-input {
	  flex: 1;
	  height: 100%;
	  padding: 0 10px;
	  border: none;
	  background: transparent;
	  outline: none;
	}
	
	.btn-login {
	  width: 100%;
	  height: 50px;
	  background-color: #FF5853;
	  border-radius: 25px;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  color: white;
	  font-size: 1rem;
	  font-weight: bold;
	  margin-top: 10px;
	  border: none;
	}
	.btn-concern{
		display: flex;
		justify-content: center;
		align-items: center;
		color:aliceblue;
		background-color: #FF5853;
		width: 15vw;
		height: 7vw;
		border-radius: 10px;
		font-size: 0.7rem;
		margin-right: 10px;
	}
		
	.btn-concerned{
		display: flex;
		justify-content: center;
		align-items: center;
		color:#4D4D4D;
		background-color: #979797;
		width: 15vw;
		height: 7vw;
		border-radius: 10px;
		font-size: 0.7rem;
		margin-right: 10px;
	}	
	.select-items{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 998;
		display: flex;
		background-color: white;
		width: 100vw;
		flex-direction: column;
		overflow: hidden;
		align-items: center;
	}
	.item{
		display: flex;
		align-items: center;
		height: 50px;
		width: 100vw;
	}
	.item-text{
		min-width: 50px;
		height: 20px;
		align-items: center;
		justify-content: center;
		color: #4D4D4D;
		font-size: 0.8rem;
		font-weight: 800;
		margin-left: 10px;
	}
</style>
