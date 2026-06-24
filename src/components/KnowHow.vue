<script setup lang="ts">
    import { ref, onMounted, nextTick } from 'vue';
    import api from '@/services/api';
    import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
    import { getImageUrl } from '@/utils/url';
    import gsap from 'gsap';

    async function getKnowHowData() 
    {
        const res = await api.get(`/savoir-faire?populate=*`);
        return res.data.data
    }

    const knowHowData = ref();
    
    onMounted(async () => {
        knowHowData.value = await getKnowHowData();

        await nextTick();

        const images = document.querySelectorAll('.secondary-images__image');
        
        images.forEach((image, index) => {
            gsap.from(image, {
                scrollTrigger: {
                    trigger: image,
                    start: 'top ' + (index*10 + 60) + '%',
                    end: 'top ' + (index*10 + 20) + '%',
                    toggleActions: 'play none none reverse',
                    scrub: true,
                },
                opacity: 0,
                y: 50,
                x: 50,
            });
        });
        
        gsap.from
    });
    
</script>

<template>
<div v-if="knowHowData" id="know-how" class="know-how menu-section">

    <div class="title-upper-separator">
        <div class="title-upper-separator__line"></div>
        <img class="title-upper-separator__end" src="/graphic-elements/losange_red.svg">
    </div>

    <div class="container grid-container content">
        <h2 class="content__title">{{ knowHowData.title }}</h2>
        <p class="content__text">
            <StrapiBlocks
                :content="knowHowData.content"
            />
        </p>
        <div class="content__images secondary-images">
            <div v-for="(image, index) in knowHowData.secondary_images" 
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
        <img :src="getImageUrl(knowHowData.main_image.url)" 
            :alt="knowHowData.main_image.alternativeText"
            class="main-image__image"
        >
    </div>

</div>

</template>

<style scoped lang="scss">
.know-how {
    position: relative;
    padding-top: 80px;
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

@media (max-width: 1200px) {

    .content {
        &__title,
        &__text {
            grid-column: 2 / 6;
        }

        &__images {
            grid-column: 1 / 9;
        }
    }

    .secondary-images {
        width: 68%;
        gap: 18px;
    }
}

@media (max-width: 992px) {

    .content {

        &__title,
        &__text,
        &__images {
            grid-column: 1 / -1;
        }

        &__title {
            margin-bottom: 6px;
        }

        &__text {
            max-width: 620px;
        }

        &__images {
            display: none;
        }
    }

    .main-image {
        position: relative;
        top: auto;
        bottom: auto;
        right: auto;
        max-width: 100%;
        width: 100%;
        margin-top: 30px;
        aspect-ratio: 16 / 9;
    }
}

@media (max-width: 768px) {

    .content {
        &__title {
            margin-bottom: 4px;
        }

        &__text {
            max-width: 100%;
            margin-bottom: 6px;
        }
    }
}

@media (max-width: 576px) {

    .know-how {
        padding-top: 50px;
    }

    .content {
        &__title,
        &__text {
            margin-bottom: 0;
        }
    }

    .main-image {
        margin-top: 18px;
        aspect-ratio: 4 / 3;
    }
}
</style>