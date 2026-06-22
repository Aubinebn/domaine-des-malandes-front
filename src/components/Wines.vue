<script setup lang="ts">
    import { ref, onMounted, nextTick } from 'vue';
    import qs from 'qs';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';
    import WinesCarousel from '@/components/WinesCarousel.vue';
    import ScrollSmoother from 'gsap/ScrollSmoother'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
    
    const params = qs.stringify(
        {
            populate: {
                fields: [
                    'title',
                    'description',
                ],
                cover:  true,
                image_left_top: true,
                image_left_bottom: true,
                image_right_top: true,
                image_right_bottom: true,
                slides: {
                    populate: '*',
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    );

    async function getWinesData() 
    {
        const res = await api.get(`/vin?${params}`);
        return res.data.data
    }

    const winesData = ref();

    onMounted(async () => {
        winesData.value = await getWinesData();

        await nextTick();

        ScrollSmoother.get()?.effects('[data-speed]');
    })    

</script>

<template>
    <div v-if="winesData"
        id="wines"
        data-offset-top="60"
        class="wines menu-section"
    >
        <div class="cover">
            <img :src="getImageUrl(winesData.cover.url)" 
                :alt="winesData.cover.alternativesText"
                data-speed="0.9"
            >
        </div>

        <div class="container grid-container">

            <div class="background-logo" data-speed="0.8">
                <img src="/graphic-elements/background_logo.svg">
            </div>

            <div class="content">
                <div class="content__separator separator">
                    <div class="separator__line"></div>
                    <img src="/graphic-elements/grape_losange.svg"
                        class="separator__icon"
                    >
                    <div class="separator__line"></div>
                </div>
    
                <h2 class="content__title">{{ winesData.title }}</h2>
    
                <p class="content__description">
                    <StrapiBlocks
                        :content="winesData.description"
                    />        
                </p>
            </div>

            <div class="images-left" data-speed="1.2">
                <img :src="getImageUrl(winesData.image_left_top.formats.medium.url)" 
                    :alt="winesData.image_left_top.alternativesText"
                    class="images-left__image-top image-losange"
                >
                <img :src="getImageUrl(winesData.image_left_bottom.formats.medium.url)" 
                    :alt="winesData.image_left_bottom.alternativesText"
                    class="images-left__image-bottom image-losange"
                >
            </div>
            
            <div class="images-right" data-speed="1.2">
                <img :src="getImageUrl(winesData.image_right_top.formats.medium.url)" 
                    :alt="winesData.image_right_top.alternativesText"
                    class="images-right__image-top image-losange"
                >
                <img :src="getImageUrl(winesData.image_right_bottom.formats.medium.url)" 
                    :alt="winesData.image_right_bottom.alternativesText"
                    class="images-right__image-bottom image-losange"
                >
            </div>
            
        </div>

        <div class="wine-carousel container">
            <WinesCarousel
                :wine-slides="winesData.slides"
            />
        </div>

    </div>
</template>
        
<style scoped lang="scss">

.cover {
    width: 100%;
    height: 60vh;
    overflow: hidden;

    & img {
        width: 100%;
        height: 100%;
        object-position: center;
        object-fit: cover;
    }
}

.content {
    grid-column: 4 / 10;
    grid-row: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 0 20px;

    &__description {
        max-width: 600px;
    }
}

.images-left {
    grid-column: 1 / 4;
    grid-row: 1;
    margin-bottom: -80px ;

    &__image-top {
        width: 100%;
        margin-top: 50px;
    }

    &__image-bottom {
        width: 50%;
        margin-top: -40px;
        margin-left: 20px;
    }
}

.images-right {
    grid-column: 10 / 13;
    grid-row: 1;
    text-align: right;
    margin-top: -120px ;

    &__image-top {
        width: 100%;
        margin-top: 50px;
    }

    &__image-bottom {
        width: 50%;
        margin-top: -40px;
        margin-right: 20px;
    }
}

.image-losange {
    aspect-ratio : 1 / 1;
    object-fit: cover;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.separator {
    display: flex;
    align-items: center;
    gap: 60px;
    margin-top: 20px;
    width: 100%;

    &__line {
        flex-grow: 1;
        height: 1px;
        background-color: $bg-color-red;
    }

    &__icon {
        width: 40px;
        height: 40px;
    }
}

.wine-carousel {
    margin-top: 60px;
    margin-bottom: 120px;
}

.background-logo {
    position:absolute;
    top: -30px;
    left: -250px;
    width: 600px;
    overflow: hidden;
    z-index: -1;
    opacity: 0.3;
    rotate: 136deg;

    & img {
        width: 100%;
        height:auto;
        object-fit: cover;
    }
}
</style>