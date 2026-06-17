<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger'
    import ScrollSmoother from 'gsap/ScrollSmoother';
    
    gsap.registerPlugin(ScrollTrigger);

    const presentationTitle = ref();
    const historicTitle = ref();
    const winesTitle = ref();
    const mapTitle = ref();
    const knowHowTitle = ref();
    const teamTitle = ref();
    const galleryTitle = ref();
    let sections: NodeListOf<Element> | null = null;

    const activeSection = ref('');

    const handleScroll = () => {
        let currentSection = '';

        sections?.forEach((section) => {
            const rect = section.getBoundingClientRect();

            //-- récupère la propriété data-offset-top de la section
            let offsetTop = section.getAttribute('data-offset-top') ?? 0;
            offsetTop = window.innerHeight * offsetTop / 100;
            
            if (rect.top + offsetTop <= window.innerHeight * 0.7 && 
                rect.bottom >= window.innerHeight * 0.3) 
            {
                currentSection = section.id;
            }
        });

        activeSection.value = currentSection;
    }

    function scrollToSection(sectionId: string, event: MouseEvent) 
    {
        event.preventDefault();

        const smoother = ScrollSmoother.get();

        if (smoother) 
        {
            const target = smoother.offset(`#${sectionId}`, "top 100px");
            smoother.scrollTo(target, true);
        }

        window.history.replaceState(null, '', `#${sectionId}`);
    }

    async function getTitle(entity: string) 
    {
        const res = await api.get(`/${entity}?fields[0]=title`);
        return res.data.data.title;
    }

    onMounted(async () => {
        presentationTitle.value = await getTitle('presentation');        
        historicTitle.value = await getTitle('historique');
        winesTitle.value = await getTitle('vin');
        mapTitle.value = await getTitle('carte');
        knowHowTitle.value = await getTitle('savoir-faire');
        teamTitle.value = await getTitle('equipe');
        galleryTitle.value = await getTitle('galerie');

        const menu = document.querySelector('.menu');
        const menuSeparator = document.querySelectorAll('.menu-separator');
        const presentation = document.querySelector('#presentation');

        const animationsParams = {
            duration: 0.3,
            ease: "power2.easeIn",
            scrollTrigger: {
                trigger: presentation,
                toggleActions: "play none none reverse",
                start: 'top 90%',
            }
        }

        gsap.to(menu, {
            background: '#fff',
            color: '#000',
            'box-shadow': '0px 4px 30px 1px #0000001a', 
            ...animationsParams
        })

        menuSeparator.forEach((separator) => {
            gsap.to(separator, {
                background: '#000',
                ...animationsParams
            })
        })

        sections = document.querySelectorAll('.menu-section');

        window.addEventListener('scroll', handleScroll);
        ScrollTrigger.addEventListener('scrollEnd', handleScroll);
        
        handleScroll();
    })

</script>

<template>
    <div class="menu">
        <div class="menu-container container">
            <a href="#presentation"
                @click="scrollToSection('presentation', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'presentation' }"
            >
                {{ presentationTitle }}
                <div class="underline"></div>
            </a>

            <div class="menu-separator"></div>

            <a href="#historic"
                @click="scrollToSection('historic', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'historic' }"
            >
                {{ historicTitle }}
                <div class="underline"></div>
            </a>

            <div class="menu-separator"></div>

            <a href="#wines"
                @click="scrollToSection('wines', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'wines' }"
            >
                {{ winesTitle }}
                <div class="underline"></div>
            </a>
            
            <div class="menu-separator"></div>

            <a href="#map"
                @click="scrollToSection('map', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'map' }"
            >
                {{ mapTitle }}
                <div class="underline"></div>
            </a>

            <div class="menu-separator"></div>

            <a href="#know-how"
                @click="scrollToSection('know-how', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'know-how' }"
            >
                {{ knowHowTitle }}
                <div class="underline"></div>
            </a>
            
            <div class="menu-separator"></div>

            <a href="#team"
                @click="scrollToSection('team', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'team' }"
            >
                {{ teamTitle }}
                <div class="underline"></div>
            </a>            
            <div class="menu-separator"></div>

            <a href="#gallery"
                @click="scrollToSection('gallery', $event)"
                class="menu-item"
                :class="{ 'active': activeSection === 'gallery' }"
            >
                {{ galleryTitle }}
                <div class="underline"></div>
            </a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff00;
    color: #fff;
    z-index: 1000;
}

.menu-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding: 25px;
}

.menu-item {
    text-transform: uppercase;
}
.menu-item .underline {
    width: 0%;
    height: 1px;
    margin-top: 3px;
    background-color: #000;
    transition: width ease-out 500ms;
}

.menu-item.active .underline {
    width: 100%;
}
.menu-separator {
    margin-bottom: 4px;
    height: 10px;
    width: 2px;
    background-color: #fff;
}

</style>
