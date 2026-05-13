<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import { StrapiBlocks } from 'vue-strapi-blocks-renderer';
    import { getImageUrl } from '@/utils/url';

    async function getTeam() 
    {
        const res = await api.get(`/equipe?populate=*`);
        return res.data.data
    }

    const team = ref();
    onMounted(async () => {
        team.value = await getTeam();
    });
    
</script>

<template>
<div v-if="team" class="team">

    <div class="background-logo">
        <img src="/graphic-elements/background_logo.svg" alt="">
    </div>

    <div class="container grid-container">

        <img src="/graphic-elements/5_losanges.svg" alt="" class="top-icon">

        <div class="title-before"></div>
        <h2 class="title-text">{{ team.title }}</h2>
        <div class="title-after"></div>

        <p class="quote">
            {{ team.quote }}
        </p>
    </div>


    <div class="cover">
        <img :src="getImageUrl(team.cover_image.url)" alt="">
    </div>

    <div class="content container grid-container">
        <div class="content__text">
            <StrapiBlocks
                :content="team.text"
            />        
        </div>
        <div class="content__images">
            <div class="background-shapes">
                <div class="background-shapes__shape"></div>
                <div class="background-shapes__shape"></div>
                <div class="background-shapes__shape"></div>
            </div>
            <div class="images">
                <div v-for="(image) in team.secondary_images" class="image-container">
                    <img :src="getImageUrl(image.url)" alt="image.alternativeText">
                </div>
            </div>
        </div>

        <img src="/graphic-elements/horizontal_dots.svg" class="content__dots">
    </div>

</div>
</template>

<style scoped lang="scss">

.team {
    position: relative;
    margin-top: 100px;
}

.background-logo {
    position:absolute;
    top: -430px;
    left: 0;
    right: 0;
    overflow: hidden;
    z-index: -1;
    opacity: 0.2;

    & img {
        width: 100%;
        height:auto;
        object-fit: cover;
        rotate: -15deg;
    }
}

.top-icon {
    grid-column: 6 / 8;
    grid-row: 1;
    justify-self: center;
}
.title-text {
    grid-column: 6 / 8;
    grid-row: 2;
    justify-self: center;
}
.title-before,
.title-after {
    grid-row: 2;
    height: 2px;
    width: 100%;
    background-color: $bg-color-red;
    align-self: center;
}

.title-before {
    grid-column: 5 / 6;
}
.title-after {
    grid-column: 8 / 9;
}

.quote {
    grid-column: 5 / 9;
    font-family: "Mrs Eaves OT";
    font-size: 24px;
    line-height:1.1
    font-style: italic;
    text-align: center;
    margin: 20px 0;
}

.cover {
    width: 100%;
    overflow: hidden;
    margin: 30px 0;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.content {
    
    &__text {
        grid-column: 3 / 8;
        margin-right: 10px;
    }

    &__images {
        grid-column: 8 / 12;
        position: relative;
    }

    &__dots {
        grid-column: 1 / none;
        justify-self:center;
    }
}

.images,
.background-shapes {
    display: grid;
    align-items: center;
    gap: 20px;
    rotate: -45deg;
}

.image-container {
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    
    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        transform-origin: center;
        transform: scale(1.5) rotate(45deg);
    }
}

.image-container:nth-of-type(1) {
    grid-row: 1;
    grid-column: 1 / 2;
}

.image-container:nth-of-type(1) {
    grid-row: 1;
    grid-column: 2 / 4;
}

.background-shapes{
    position: absolute;
    width: 90%;
    left: 10%;
    top: 10%;

    &__shape{
        width: 100%;
        aspect-ratio: 1 / 1;
        background: $bg-light-beige;
        opacity: 0.4;
    }

    &__shape:nth-of-type(1){
        grid-row: 1;
        grid-column: 1 / 2;
        width: 60%;
        justify-self: center;
    }
    &__shape:nth-of-type(2){
        grid-row: 1 / 3;
        grid-column: 2 / 4;
        width: 70%;
    }
    &__shape:nth-of-type(3){
        grid-row: 3 / 4;
        grid-column: 1 / 3;
        width: 50%;
        justify-self: center;
    }
}

</style>