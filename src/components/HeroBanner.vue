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
    max-width: 40%;
    max-height: 40%;
    margin-top: 8%;
}

</style>