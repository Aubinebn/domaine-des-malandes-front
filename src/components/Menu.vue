<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger'
    
    gsap.registerPlugin(ScrollTrigger);

    const presentationTitle = ref();
    const historicTitle = ref();
    const winesTitle = ref();
    const mapTitle = ref();
    const knowHowTitle = ref();
    const teamTitle = ref();

    const activeSection = ref('');

    async function getTitle(entity) 
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


        const sections = document.querySelectorAll('section');

        const handleScroll = () => {
            let currentSection = '';

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();

                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentSection = section.id;
                }
            });

            activeSection.value = currentSection;
        }

        window.addEventListener('scroll', handleScroll);
        
        handleScroll();
    })

</script>

<template>
    <div class="menu">
        <div class="menu-container container">
            <a href="#presentation"
                class="menu-item"
                :class="{ 'active': activeSection === 'presentation' }"
            >
                {{ presentationTitle }}
            </a>

            <div class="menu-separator"></div>

            <a href="#historic"
                class="menu-item"
                :class="{ 'active': activeSection === 'historic' }"
            >
                {{ historicTitle }}
            </a>

            <div class="menu-separator"></div>

            <a href="#wines"
                class="menu-item"
                :class="{ 'active': activeSection === 'wines' }"
            >
                {{ winesTitle }}
            </a>
            
            <div class="menu-separator"></div>

            <a href="#map"
                class="menu-item"
                :class="{ 'active': activeSection === 'map' }"
            >
                {{ mapTitle }}
            </a>

            <div class="menu-separator"></div>

            <a href="#know-how"
                class="menu-item"
                :class="{ 'active': activeSection === 'know-how' }"
            >
                {{ knowHowTitle }}
            </a>
            
            <div class="menu-separator"></div>

            <a href="#team"
                class="menu-item"
                :class="{ 'active': activeSection === 'team' }"
            >
                {{ teamTitle }}
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

.menu-separator {
    height: 10px;
    width: 2px;
    background-color: #fff;
}
</style>
