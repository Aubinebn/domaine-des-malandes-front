<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

type Location = {
    id: number
    name: string
    description: string
    lat: number
    lng: number
}

const mapData = ref();
const locations = ref<Location[]>([])
const activeLocation = ref<Location | null>(null)

let map: L.Map;

async function getMapData() {
    const res = await api.get(`/carte?populate=*`);
    return res.data.data
}

onMounted(async () => {

    mapData.value = await getMapData();

    if (!mapData.value || mapData.value.locations.length === 0) {
        console.warn('Pas de données à afficher sur la carte')
        return
    }

    locations.value = mapData.value.locations.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        lat: item.location.coordinates.lat,
        lng: item.location.coordinates.lng
    }))

    activeLocation.value = locations.value[0] ?? null

    initMap();

    await nextTick();

    initGsapAnimations();
})

function initMap() {
    //-- Création de la carte
    map = L.map('map', {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
        zoomSnap: 0.5
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    const defaultIcon = L.icon({
        iconUrl: '/graphic-elements/map_marker.svg',
        iconSize: [42, 42],
        iconAnchor: [21, 42]
    })

    const activeIcon = L.icon({
        iconUrl: '/graphic-elements/map_marker_active.svg',
        iconSize: [42, 42],
        iconAnchor: [21, 42]
    })
    
    const bounds = L.latLngBounds([])
    const markers: L.Marker[] = []

    locations.value.forEach((loc, index) => {

        const latLng: [number, number] = [loc.lat, loc.lng]

        //-- Ajoute le point aux bounds
        bounds.extend(latLng)

        //-- Crée le marker
        const marker = L.marker(latLng, {
            icon: index === 0 ? activeIcon : defaultIcon
        }).addTo(map)

        marker.on('click', (e) => {

            //-- Pour éviter que de déclencher le click sur la carte
            L.DomEvent.stopPropagation(e)

            activeLocation.value = loc

            //-- reset tous les markers
            markers.forEach(m => m.setIcon(defaultIcon))

            //-- active celui cliqué
            marker.setIcon(activeIcon)

            //-- centrer la carte
            map.flyTo([loc.lat, loc.lng], 14, {
                duration: 0.6
            })
        })

        markers.push(marker)
    })

    //-- Ajuste la carte aux points
    map.fitBounds(bounds, {
            padding: [80, 80]
        })
        // .setMaxBounds(bounds.pad(0.5))

    //-- Dézoom au clic sur la carte
    map.on('click', () => {
        map.setZoom(13, {
            animate: true,
        })
        map.flyToBounds(bounds, {
            padding: [50, 50],
            duration: .5
        })
    })
}

function initGsapAnimations()
{
    const quote = document.querySelector('.content__quote');

    const split = new SplitText(quote, {
        type: 'lines,chars',
        linesClass: 'line',
        charsClass: 'char',
        wordsClass: 'word',
    })

    split.lines.forEach((line, index) => {
        gsap.from(line, {
            y: 20,
            stagger: 1,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: index * 0.35,
            scrollTrigger: {
                trigger: line,
                toggleActions: "play none none reverse",
                start: 'top 70%',
                end: 'top 20%',
                scrub: true,
            },
        });
    })
}
</script>

<template>
    <div class="map-container">
        <div id="map" class="map menu-section" data-offset-top="20"></div>
        
        <div class="info-container container grid-container">
            <div class="info">
                <transition name="fade-slide" mode="out-in">
                    <div :key="activeLocation?.id">
                        <h3>{{ activeLocation?.name }}</h3>
                        <p>{{ activeLocation?.description }}</p>
                    </div>
                </transition>
            </div>
        </div>
    </div>

    <div v-if="mapData" class="content grid-container container">
        <div class="content__left">
            <h2 class="content__title title">
                <img class="title__icon"
                    src="/graphic-elements/vertical_line_losange_red.svg"
                >
                {{ mapData.title }}
            </h2>
            <p class="content__text">
                <StrapiBlocks
                    :content="mapData.text"
                    class="paragraph"
                />
            </p>
        </div>
        <p class="content__right content__quote">
            {{ mapData.quote }}
        </p>
    </div>
</template>

<style scoped lang="scss">
.map-container {
    position: relative;
    width: 100%;
    height: 500px;
    max-height: 65vh;
}
.map {
    width: 100%;
    height: 100%;
    filter: brightness(1.02) saturate(0.9);
    z-index: 10;
}

.leaflet-container {
    font-family: Mr Eaves;
}

.info-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.info {
    grid-column: 9 / span 4;
    position: absolute;
    bottom: 20px;
    background: $bg-light-beige;
    padding: 18px;
    width: 100%;
    max-width: 360px;
    z-index: 200;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}
.fade-slide-enter-from {
    opacity: 0;
    transform: translateY(20px);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

.content {

    &__left {
        grid-column: 3 / span 4;
    }

    &__right {
        grid-column: 8 / span 5;
        align-self: center;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background-color: $bg-color-light-red;
            margin: 20px 0 0 0;
        }
    }

    &__quote {
        font-family: "Mrs Eaves OT";
        font-size: 28px;
        line-height: 1.1;
        font-style: italic;
    }
}

.title{
    margin-top: 15px;
    margin-left: -40px;
    display: flex;
    align-items: center;
    gap: 25px;

    &__icon {
        width: 15px;
        position: relative;
        bottom: 26px;
    }
}

@media (max-width: 1200px) {
    .map-container {
        height: 400px;
    }

    .info {
        grid-column: 8 / span 5;
    }

    .content__left {
        grid-column: 2 / span 5;
    }

    .content__right {
        grid-column: 8 / span 5;
    }
}

@media (max-width: 992px) {

    .info {
        grid-column: 7 / span 6;
        padding: 16px;
    }

    .content {
        &__left {
            grid-column: 1 / span 6;
        }

        &__right {
            grid-column: 7 / span 6;
        }

        &__quote {
            font-size: 26px;
        }
    }

    .title {
        margin-left: -20px;
    }
}

@media (max-width: 768px) {
    .map-container {
        max-height: 75vh;
    }

    .info {
        grid-column: 1 / -1;
        max-width: 100%;
    }

    .content {
        &__left,
        &__right {
            grid-column: 1 / -1;
        }

        &__right {
            margin-top: 10px;

            &::after{
                display: none;
            }
        }

        &__quote {
            font-size: 24px;
        }
    }

    .title {
        margin-left: 0;
    }
}

@media (max-width: 576px) {

    .map-container {
        height: 80vh;
    }

    .info {
        padding: 14px;
    }

    .content {
        &__quote {
            font-size: 22px;
        }
    }

    .title {
        gap: 18px;

        &__icon {
            width: 12px;
            bottom: 20px;
        }
    }
}

</style>