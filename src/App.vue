<script setup lang="ts">
    import Menu from '@/components/Menu.vue';
    import HeroBanner from '@/components/HeroBanner.vue';
    import Presentation from '@/components/Presentation.vue';
    import Historic from '@/components/Historic.vue';
    import Wines from '@/components/Wines.vue';
    import Map from '@/components/Map.vue';
    import KnowHow from '@/components/KnowHow.vue';
    import Team from '@/components/Team.vue';
    import Footer from '@/components/Footer.vue';

    import {onMounted } from 'vue';
    import gsap from 'gsap';
    import ScrollSmoother from 'gsap/ScrollSmoother'

    gsap.registerPlugin(ScrollSmoother);

    onMounted(() => {

        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 2,
            effects: true,
        });
    });

</script>

<template>
    <div id="smooth-wrapper">
        <div id="smooth-content">
            <Menu/>
            <HeroBanner/>
            <Presentation/>
            <Historic/>
            <Wines/>
            <Map/>
            <KnowHow/>
            <Team/>
            <Footer/>
        </div>
    </div>  
</template>

<style scoped></style>
