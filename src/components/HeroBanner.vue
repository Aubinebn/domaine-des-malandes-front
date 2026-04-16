<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';

    const heroBanner = ref();

    async function getHeroBanner() 
    {
        const res = await api.get('/banniere?populate=*');
        return res.data.data
    }

    onMounted(async () => {
        heroBanner.value = await getHeroBanner();
    })

</script>

<template>
    <div v-if="heroBanner" 
        :style="{ backgroundImage: `url(${getImageUrl(heroBanner.background.url)})` }"
        class="hero-banner"
    >
        <img :src="getImageUrl(heroBanner.logo.url)"
            :alt="heroBanner.logo.alternativeText"
            class="logo"
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
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
}

.hero-banner .logo {
    max-width: 40%;
    max-height: 40%;
    margin-top: 8%;
}

</style>