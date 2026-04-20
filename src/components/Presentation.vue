<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import { getImageUrl } from '@/utils/url';
    import { StrapiBlocks, type BlocksContent } from 'vue-strapi-blocks-renderer'

    const presentation = ref();

    async function getPresentation() 
    {
        const res = await api.get('/presentation?populate=*');
        return res.data.data
    }

    onMounted(async () => {
        presentation.value = await getPresentation();
    })

</script>

<template>
    <div v-if="presentation"
        class="presentation container grid-container"
    >
        <img :src="getImageUrl(presentation.image.url)"
            :alt="presentation.image.alternativeText"
            class="image"
        />

        <div class="content">

            <div class="content__arrow arrow">
                <div class="arrow__line"></div>
                <img class="arrow__end" src="/graphic-elements/losange_red.svg">
            </div>

            <img :src="getImageUrl(presentation.logo.url)"
                :alt="presentation.logo.alternativeText"
                class="content__logo"
            />
            <h2 class="content__title">
                {{ presentation.title }}
            </h2>

            <div class="content__baseline">
                {{ presentation.baseline }}
            </div>

            <div class="content__paragraph">
                <StrapiBlocks
                    :content="presentation.content"
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
            font-size: 18px;
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
        }
    }
</style>