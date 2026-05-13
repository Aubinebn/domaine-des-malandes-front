<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import qs from 'qs';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';
    import WinesCarousel from '@/components/WinesCarousel.vue';

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

    async function getWines() 
    {
        const res = await api.get(`/vin?${params}`);
        return res.data.data
    }

    const wines = ref();

    onMounted(async () => {
        wines.value = await getWines();
    })    

</script>

<template>
    <div v-if="wines"
        class="wines"
    >
        <img :src="getImageUrl(wines.cover.url)" 
            :alt="wines.cover.alternativesText"
            class="cover"
        >

        <div class="container grid-container">

            <div class="content">
                <div class="content__separator separator">
                    <div class="separator__line"></div>
                    <img src="/graphic-elements/grape_losange.svg"
                        class="separator__icon"
                    >
                    <div class="separator__line"></div>
                </div>
    
                <h2 class="content__title">{{ wines.title }}</h2>
    
                <p class="content__description">
                    {{ wines.description }}
                </p>
            </div>

            <div class="images-left">
                <img :src="getImageUrl(wines.image_left_top.formats.small.url)" 
                    :alt="wines.image_left_top.alternativesText"
                    class="images-left__image-top image-losange"
                >
                <img :src="getImageUrl(wines.image_left_bottom.formats.small.url)" 
                    :alt="wines.image_left_bottom.alternativesText"
                    class="images-left__image-bottom image-losange"
                >
            </div>
            
            <div class="images-right">
                <img :src="getImageUrl(wines.image_right_top.formats.small.url)" 
                    :alt="wines.image_right_top.alternativesText"
                    class="images-right__image-top image-losange"
                >
                <img :src="getImageUrl(wines.image_right_bottom.formats.small.url)" 
                    :alt="wines.image_right_bottom.alternativesText"
                    class="images-right__image-bottom image-losange"
                >
            </div>
            
        </div>

        <div class="wine-carousel container">
            <WinesCarousel
                :wine-slides="wines.slides"
            />
        </div>

    </div>
</template>
        
<style scoped lang="scss">

.cover {
    width: 100%;
    height: auto;
    max-height: 60vh;
    object-fit: cover;
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
}

</style>