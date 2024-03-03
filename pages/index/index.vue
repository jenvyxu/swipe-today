<template>
	<view class="container">
		<view class="card-wrapper">
			<view :class="card.class" v-for="card in cards" :key="card.id" @touchstart="handleTouch" :style="card.style" @touchmove="onTouchMove" @touchend="onTouchEnd">{{card.label}}</view>
		</view>
		<view class="footer">
			<view v-for="item in buttons" :key="item.id" class="btn" @click="() =>handleClick(item.id)">{{item.label}}</view>
		</view>
	</view>
</template>

<script setup>
	import {ref, onMounted} from 'vue'
	const start = ref({x:0, y : 0})
	let date = new Date();
	let a = date.getDate();
	let clientX = 0;
	let clientY = 0
	const buttons = ref([{label: '浪费', id: 'bad'}, {label: '还不错', id: 'ok'}, {label: '非常好', id: 'nice'}])
	
	const creareCard = () => {
		const day = new Date().getDate()
		return {
			label: date.getDate(),
			id: `card-${day}`,
			style: {},
			class: 'card ok',
		}
	}
	
	const cards = ref([creareCard()])

	const handleTouch = (e) => {
		const touchData = e.touches[0]
		clientX = touchData.clientX
		clientY = touchData.clientY
	}
	
	const onTouchMove = (e) => {
		const {clientX: newClientX, clientY: newClientY} = e.touches[0]
		const offsetX = newClientX - clientX 
		const offsetY = newClientY - clientY 
		const rotate = offsetX * 0.1;
		cards.value[0].style = {transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`};
		if (Math.abs(offsetX) > 100) {
		  dismiss(offsetX > 0 ? 1 : -1, offsetY);
		}
	}
	
	const dismiss = (direction, offsetY) => {
		let {windowWidth} = uni.getWindowInfo()
		start.value = {};
		cards.value[0].style = {
			transition:'transform 1s',
			transform :`translate(${direction * windowWidth * 10}rpx, ${offsetY}rpx) rotate(${90 * direction}deg)`
		}
	}
	
	const onTouchEnd = () => {
		cards.value.pop()
		++a
		setTimeout(() => {
			cards.value.unshift({
				id:`card-${a}`,
				label: a,
				style: {},
				class:'card ok'
			})
		}, 500)

	}
	
	const handleClick = (id) => {
		cards.value[cards.value.length -1].class = `card ${id}`
	}
	
</script>

<style lang="scss">
	$bad-color: #F94C10;
	$nice-color: #54B435;
	$ok-color:#7BD3EA;
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100vh;
		background: palegreen;
		width: 100%;
		.card-wrapper {
			position: relative;
			width: 500rpx;
			flex-grow: 1;
			.card {
				box-sizing: border-box;
				position: absolute;
				width: 100%;
				height: 640rpx;
				margin-top: 200rpx;
				transition: ease-in-out 50ms;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 420rpx;
				font-weight: bold;
				font-family: Arial, Helvetica, sans-serif;
				border: 24rpx solid rgba(0,0,0,0.2);
				border-radius: 32rpx;
				color: rgba(0,0,0,0.8);
				&.ok {
					background-color: $ok-color
				}
				&.nice {
					background-color: $nice-color
				}
				&.bad {
					background-color: $bad-color
				}
			}
		}
		.footer {
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 200rpx;
			width: 100%;;
			.btn {
				padding: 16rpx 20rpx;
				border-radius: 10rpx;
				box-shadow: #000 2rpx 4rpx 12rpx;
				&:first-child {
					background-color: $bad-color;
				}
				&:nth-child(2) {
					background-color: $ok-color;
				}
				&:nth-child(3) {
					background-color: $nice-color;
				}
			}
		}
	}
</style>
