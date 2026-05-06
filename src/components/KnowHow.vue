<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
    import { getImageUrl } from '@/utils/url';

    const knowHow = ref();

    async function getKnowHow() 
    {
        const res = await api.get(`/savoir-faire?populate=*`);
        return res.data.data
    }

    onMounted(async () => {
        knowHow.value = await getKnowHow();
    });
    
</script>

<template>
<div v-if="knowHow" class="know-how">

    <div class="separator">
        <div class="separator__line"></div>
        <img class="separator__end" src="/graphic-elements/losange_red.svg">
    </div>

    <div class="container grid-container content">
        <h2 class="content__title">{{ knowHow.title }}</h2>
        <p class="content__text">
            <StrapiBlocks
                :content="knowHow.content"
            />
        </p>
        <div class="content__images secondary-images">
            <div v-for="(image, index) in knowHow.secondary_images" 
                :key="index" 
                class="secondary-images__image"
            >
                <img :src="getImageUrl(image.formats.small.url)" 
                    :alt="image.alternativeText"
                >
            </div>
        </div>
    </div>

    <div class="main-image">
        <img :src="getImageUrl(knowHow.main_image.formats.large.url)" 
            :alt="knowHow.main_image.alternativeText"
            class="main-image__image"
        >
    </div>

</div>

</template>

<style scoped lang="scss">
.know-how {
    position: relative;
}

.separator {
    display: flex;
    align-items: center;
    margin: 12px 0;
    
    &__line {
        width: 35%;
        height: 1px;
        background-color: $bg-color-red;
    }

    &__end {
        margin-left: -3px;
        margin-bottom: -1px;
    }
}

.content {
    
    &__title {
        grid-column: 2 / 5 ;
        margin-bottom: 18px;
    }

    &__text {
        grid-column: 2 / 5 ;
        margin-bottom: 18px;
    }

    &__images {
        grid-column: 1 / 8;
    }
}

.secondary-images{ 
    width: 60%;
    justify-self: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 25px;
    rotate: 45deg;
    z-index: 10;
    
    &__image {
        aspect-ratio: 1 / 1;
        overflow: hidden;

        &:nth-of-type(1) {
            grid-column: 1 / span 2;
            grid-row: 3 /span 2;
        }
        &:nth-of-type(2) {
            grid-column: 3 / span 1;
            grid-row: 3 /span 1;
        }
        &:nth-of-type(3) {
            grid-column: 2 / span 2;
            grid-row: 1 /span 2;
            width: 80%;
            align-self: end;
            justify-self: end;
        }
        &:nth-of-type(4) {
            grid-column: 4 / span 1;
            grid-row: 2 /span 1;
        }

        & img {
            transform: rotate(-45deg) scale(1.5);
            object-fit: cover;
            object-position:center;
            width: 100%;
            height: 100%;
        }
    }
}

.main-image {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    max-width: 53%;
    overflow: hidden;

    &__image {
        object-fit: cover;
        object-position: center;
        width: 100%;
        height: 100%;
    }
}
</style>