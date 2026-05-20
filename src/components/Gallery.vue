<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import api from '@/services/api'
import { getImageUrl } from '@/utils/url'
import Vue3JustifiedLayout from 'vue3-justified-layout'
import 'vue3-justified-layout/dist/style.css'

// PhotoSwipe
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

const galleryData = ref<any>(null)
const images = ref<any[]>([])
let lightbox: any = null

async function getGalleryData() {
    const res = await api.get('/galerie?populate=images')
    return res.data.data
}

onMounted(async () => {
    galleryData.value = await getGalleryData()
    images.value = galleryData.value?.images || []
    await nextTick()
    initPhotoSwipe()
})

onBeforeUnmount(() => {
    lightbox?.destroy()
})

function initPhotoSwipe() {
    lightbox = new PhotoSwipeLightbox({
        gallery: '.pswp-gallery',
        children: 'a',
        pswpModule: () => import('photoswipe')
    })

    lightbox.init()
}
</script>

<template>
    <div v-if="galleryData" id="gallery" class="gallery">
        
        <div class="separator">
            <div class="separator__line"></div>
            <img class="separator__end" src="/graphic-elements/losange_red.svg">
        </div>

        <div class="container">
            <h2 class="title">
                <img class="title__icon"
                    src="/graphic-elements/square_losange_red.svg"
                >
                {{ galleryData.title }}
            </h2>

            <Vue3JustifiedLayout
                v-model:list="images"
                class="pswp-gallery"
                :options="{ targetRowHeight: 220, boxSpacing: 8 }"
            >
                <template #default="{ item }">
                    <a
                        :href="getImageUrl(item.url)"
                        :data-pswp-width="item.width"
                        :data-pswp-height="item.height"
                        target="_blank"
                        rel="noreferrer"
                        class="gallery-item"
                    >
                        <img :src="getImageUrl(item.formats?.small?.url || item.url)" :alt="item.alt || ''" />
                    </a>
                </template>
            </Vue3JustifiedLayout>
        </div>
    </div>

</template>

<style scoped lang="scss">
.pswp-gallery {
    width: 100%;
}

.gallery-item {
    display: block;
    overflow: hidden;
}

.gallery-item img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease-out;
}

.gallery-item:hover img {
    transform: scale(1.1);
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

.title {
    display: flex;
    margin-left: -40px;

    &__icon {
        padding: 7px 0 8px;
        line-height: 0.8;
        display: inline-block;
        margin-right: 20px;
    }
}

@media (max-width: 900px) {
    .gallery {
        margin: 80px auto;
    }
}
</style>