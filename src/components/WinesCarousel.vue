<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getImageUrl } from '@/utils/url';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const props = defineProps(['wineSlides']);

const activeIndex = ref(0);

const showArrow = ref(true)

const handleSlideChange = (swiper: any) => {
	activeIndex.value = swiper.realIndex

	showArrow.value = false

	setTimeout(() => {
		showArrow.value = true
	}, 600)
}
</script>

<template>
	<div v-if="wineSlides" class="grid-container">
		<div class="line-separator"></div>

		<div class="slider-wrapper">
			<div class="btn-slider btn-slider--prev">
				<img src="/graphic-elements/arrow_left.svg" alt="">
			</div>

			<Swiper :modules="[Navigation]" :centeredSlides=true :grabCursor="true" :slidesPerView=3 :speed="1000"
				:loop="true" :navigation="{
					nextEl: '.btn-slider--next',
					prevEl: '.btn-slider--prev',
				}" @slideChange="handleSlideChange" class="swiper">
				<SwiperSlide v-for="(slide, index) in wineSlides" :key="index">
					<img src="/graphic-elements/vertical_dots.svg" alt=""
						class="graphic-elements graphic-elements--left">
					<img :src="getImageUrl(slide.image.url)" :alt="slide.image.alternativeText" class="bottle">
					<img src="/graphic-elements/vertical_dots.svg" alt=""
						class="graphic-elements graphic-elements--right">
				</SwiperSlide>
			</Swiper>

			<div class="btn-slider btn-slider--next">
				<img src="/graphic-elements/arrow_right.svg" alt="">
			</div>
		</div>

		<div class="line-separator"></div>

		<div class="text">
			<div class="text__arrow" :class="{ 'is-hidden': !showArrow }">
				<img src="/graphic-elements/wine_arrow.svg" alt="">
			</div>

			<transition name="text-fade" mode="out-in">
				<div class="text__content" :key="activeIndex">
					<h2>{{ wineSlides[activeIndex].name }}</h2>
					<p>{{ wineSlides[activeIndex].description }}</p>
				</div>
			</transition>
		</div>

	</div>

	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
	<br>
</template>

<style scoped lang="scss">
* {
	user-select: none;
}
.line-separator {
	grid-column: 1 / none;
	width: 100%;
	height: 1px;
	background-color: $bg-color-light-red;
}

.slider-wrapper {
	grid-column: 2 / 12;
	margin: -60px 0;
	display: flex;
	align-items: center;
	justify-content: center;
}

.bottle {
	height: 400px;
	transform: scale(0.75);
	transition: transform 1s ease-in-out !important;
	object-fit: contain;
	object-position: center;
	transition: ease-in-out;
	background-image: url('/graphic-elements/losange_beige.svg');
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
}

.graphic-elements {
	opacity: 0;
	transition: all 0.4s ease-in-out;
	position: absolute;
	z-index: 10;
	height: 40px;

	&--left {
		bottom: 15%;
		left: 80px;
	}

	&--right {
		top: 15%;
		right: 90px;
	}
}

.swiper-slide {
	opacity: 0.5;
	transition: opacity 0.5s;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.swiper-slide-active {
	opacity: 1;

	& .graphic-elements {
		opacity: 1;

		&--left {
			bottom: 25%;
		}

		&--right {
			top: 25%;
		}
	}

	& .bottle {
		transform: scale(1);
	}
}

.btn-slider {
	cursor: pointer;
}
.text {
	grid-column: 7 / 12;
	display: flex;
	align-items: start;
	gap: 16px;
	margin-top: 20px;
	margin-left: -10px;
	z-index: 20;

	&__arrow {
		margin-top: -33px;
	}

	&__arrow.is-hidden {
		opacity: 0;
	}

	&__arrow:not(.is-hidden) {
		transition: opacity 0.3s;
	}
}

.text-fade-enter-active,
.text-fade-leave-active {
	transition: all 0.3s ease;
}

.text-fade-enter-from {
	opacity: 0;
	transform: translateX(20px);
}

.text-fade-leave-to {
	opacity: 0;
	transform: translateX(-20px);
}
</style>