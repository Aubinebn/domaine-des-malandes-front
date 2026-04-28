<script setup lang="ts">
import { onMounted, ref, h } from 'vue'
import api from '@/services/api'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { StrapiBlocks } from 'vue-strapi-blocks-renderer'

type Location = {
    id: number
    name: string
    description: string
    lat: number
    lng: number
}

const data = ref();
const locations = ref<Location[]>([])
const activeLocation = ref<Location | null>(null)

let map: L.Map;

async function getData() {
    const res = await api.get(`/carte?populate=*`);
    return res.data.data
}

onMounted(async () => {

    data.value = await getData();

    if (!data.value || data.value.locations.length === 0) {
        console.warn('Pas de données à afficher sur la carte')
        return
    }

    locations.value = data.value.locations.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        lat: item.location.coordinates.lat,
        lng: item.location.coordinates.lng
    }))

    activeLocation.value = locations.value[0] ?? null

    initMap()
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
        iconSize: [28, 28],
        iconAnchor: [14, 28]
    })

    const activeIcon = L.icon({
        iconUrl: '/graphic-elements/map_marker_active.svg',
        iconSize: [28, 28],
        iconAnchor: [14, 28]
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
            padding: [50, 50] // espace autour (important pour ton UI)
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
</script>

<template>
    <div class="map-container">
        <div id="map" class="map"></div>
        
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

    <div v-if="data" class="content grid-container container">
        <div class="content__left">
            <h2 class="content__title title">
                <img class="title__icon"
                    src="/graphic-elements/vertical_line_losange_red.svg"
                >
                {{ data.title }}
            </h2>
            <p class="content__text">
                <StrapiBlocks
                    :content="data.text"
                    class="paragraph"
                />
            </p>
        </div>
        <p class="content__right content__quote">
            {{ data.quote }}
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
    width: 300px;
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
        grid-column: 8 / span 4;
        align-self: center;
        font-family: Mrs Eaves;
        font-size: 20px;
        font-style: italic;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 2px;
            background-color: $bg-color-light-red;
            margin: 20px 0 0 0;
        }
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

</style>