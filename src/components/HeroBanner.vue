<script setup lang="ts">
    import { ref, onMounted, nextTick } from 'vue';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';
    import ScrollSmoother from 'gsap/ScrollSmoother';

    async function getHeroBannerData() 
    {
        const res = await api.get('/banniere?populate=*');
        return res.data.data
    }

    const heroBannerData = ref();
    onMounted(async () => {
        heroBannerData.value = await getHeroBannerData();

        await nextTick();

        ScrollSmoother.get()?.effects('[data-speed]');
    })

</script>

<template>
    <div v-if="heroBannerData"
        :style="{ backgroundImage: `url(${getImageUrl(heroBannerData.background.url)})` }"
        class="hero-banner"
    >
        <img :src="getImageUrl(heroBannerData.logo.url)"
            :alt="heroBannerData.logo.alternativeText"
            class="logo"
            data-speed="1.2"
        />
    </div>

</template>
        
<style scoped>
.hero-banner {
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.hero-banner .logo {
    width: min(82vw, 82vh);
    height: auto;
    max-width: clamp(40%, calc(95% - 4vw), 82%);
    max-height: clamp(40%, calc(95% - 4vw), 82%);
    min-width: clamp(140px, 22vw, 320px);
    object-fit: contain;
    margin-top: clamp(8%, calc(18% - 0.6vw), 16%);
}

</style>