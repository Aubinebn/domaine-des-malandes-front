<script setup lang="ts">
    import { ref, onMounted, nextTick} from 'vue';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';
    import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
    import gsap from 'gsap';

    async function getPresentationData() 
    {
        const res = await api.get('/presentation?populate=*');
        return res.data.data
    }

    const presentationData = ref();
    
    onMounted(async () => {

        presentationData.value = await getPresentationData();

        await nextTick();

        const image = document.querySelector('.content__logo');

        gsap.from(image, {
            opacity: 0, filter: "blur(2px)",
            duration: 1,
            ease: "quad.easeInOut",
            scrollTrigger: {
                trigger: image,
                start: 'top center',
                toggleActions: "play none none reverse",
                scrub: true,
            },
        })
    })

</script>

<template>
    <div v-if="presentationData"
        id="presentation"
        class="container grid-container menu-section"
    >
        <div class="background-logo" data-speed="1.1">
            <img src="/graphic-elements/background_logo.svg">
        </div>

        <img :src="getImageUrl(presentationData.image.url)"
            :alt="presentationData.image.alternativeText"
            class="image"
        />

        <div class="content">

            <div class="content__arrow arrow">
                <div class="arrow__line"></div>
                <img class="arrow__end" src="/graphic-elements/losange_red.svg">
            </div>

            <img :src="getImageUrl(presentationData.logo.url)"
                :alt="presentationData.logo.alternativeText"
                class="content__logo"
            />
            <h2 class="content__title">
                {{ presentationData.title }}
            </h2>

            <div class="content__baseline">
                {{ presentationData.baseline }}
            </div>

            <div class="content__paragraph">
                <StrapiBlocks
                    :content="presentationData.content"
                    class="paragraph"
                />
            </div>

            <img class="content__dots"
                src="/graphic-elements/horizontal_dots.svg"
            >
        </div>
    </div>

</template>
        
<style scoped lang="scss">
    .image {
        grid-column: 2 / span 4;
        width: 100%;
        height: auto;
    }

    .content {
        grid-column: 7 / span 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 18px;

        &__logo {
            width: 280px;
            height: auto;
        }

        &__title::after {
            content: "";
            display: block;
            height: 2px;
            background-color: $bg-color-light-red;
            margin: 5px 20px;
        }

        &__baseline {
            color: $color-red;
            text-transform: uppercase;
        }

        &__paragraph {
            margin: 20px 0;
        }

        &__dots {
            margin-top: 20px;
        }
    }

    .arrow {
        display: flex;
        flex-direction: column;
        align-items: center;

        &__line {
            width: 2px;
            height: 70px;
            background-color: $bg-color-light-red;
        }

        &__end {
            margin-top: -3px;
            height: 18px;
            width: auto;
        }
    }

    .background-logo {
        position:absolute;
        top: -30px;
        left: -300px;
        width: 600px;
        overflow: hidden;
        z-index: -1;
        opacity: 0.4;
        rotate: 124deg;

        & img {
            width: 100%;
            height:auto;
            object-fit: cover;
        }
    }

    @media (max-width: 1200px) {
        .image {
            grid-column: 1 / span 6;
        }

        .content {
            grid-column: 8 / span 5;
        }
    }

    @media (max-width: 992px) {

        .container {
            row-gap: 0px;
        }

        .image,
        .content {
            grid-column: 1 / -1;
        }

        .image {
            width: auto;
            max-height: 800px;
            max-width: 100%;
            justify-self: center;
        }
    }

    @media (max-width: 768px) {
        .content {
            gap: 14px;
        }

        .content__paragraph {
            margin: 12px 0;
        }

        .arrow__line {
            height: 50px;
        }
    }

    @media (max-width: 576px) {
        .content__logo {
            width: 200px;
        }
    }
</style>