<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import api from '@/services/api'
import { getImageUrl } from '@/utils/url'
import Vue3JustifiedLayout from 'vue3-justified-layout'
import 'vue3-justified-layout/dist/style.css'

// PhotoSwipe
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

const galleryData = ref<any>(null)
const images = ref<any[]>([])
const viewportWidth = ref(window.innerWidth)
let lightbox: any = null

const galleryOptions = computed(() => {
    if (viewportWidth.value <= 576) {
        return { targetRowHeight: 140, boxSpacing: 6 }
    }

    if (viewportWidth.value <= 768) {
        return { targetRowHeight: 160, boxSpacing: 6 }
    }

    if (viewportWidth.value <= 992) {
        return { targetRowHeight: 190, boxSpacing: 7 }
    }

    if (viewportWidth.value <= 1200) {
        return { targetRowHeight: 210, boxSpacing: 8 }
    }

    return { targetRowHeight: 220, boxSpacing: 8 }
})

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
        
        <div class="title-upper-separator">
            <div class="title-upper-separator__line"></div>
            <img class="title-upper-separator__end" src="/graphic-elements/losange_red.svg">
        </div>

        <div class="container grid-container">
            <h2 class="title">
                <img class="title__icon"
                    src="/graphic-elements/square_losange_red.svg"
                >
                {{ galleryData.title }}
            </h2>

            <Vue3JustifiedLayout
                v-model:list="images"
                class="pswp-gallery"
                :options="galleryOptions"
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
    grid-column: 1 / -1;
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

.title {
    display: flex;
    align-items: center;
    margin-left: -40px;
    grid-column: 2 / -1;

    &__icon {
        width: 40px;
        height: 40px;
        line-height: 0.8;
        display: inline-block;
        margin-right: 20px;
    }
}

@media (max-width: 1200px) {
    .gallery {
        margin: 90px auto;
    }
}

@media (max-width: 768px) {
    .gallery {
        margin: 70px auto;
    }
    
    .title {
        &__icon {
            width: 30px;
            height: 30px;
        }
    }
}

@media (max-width: 576px) {
    .gallery {
        margin: 56px auto;
    }
}
</style>