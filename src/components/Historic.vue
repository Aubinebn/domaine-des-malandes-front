<script setup lang="ts">
    import { ref, onMounted, nextTick} from 'vue';
    import qs from 'qs';
    import api from '@/services/api';
    import TimelineItem from '@/components/TimelineItem.vue';
    import gsap from 'gsap'
    
    const params = qs.stringify(
        {
            populate: {
                fields : ['title', 'quote'],
                timeline: {
                    populate: '*'
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    );

    async function getHistoricData() 
    {
        const res = await api.get(`/historique?${params}`);
        return res.data.data
    }

    const historicData = ref();

    onMounted(async () => {
        historicData.value = await getHistoricData();

        await nextTick();

        const quote = document.querySelector('.quote');

        gsap.from(quote, {
            y: 80, opacity: 0, scale: 0.95,
            duration: 1,
            ease: 'quad.easeIn',
            scrollTrigger: {
                trigger: quote,
                toggleActions: "play none none reverse",
                start: '-100px center',
            },
        })
    });

</script>

<template>
    <div v-if="historicData"
        id="historic"
        class="historic menu-section"
    >
        <div class="title-upper-separator">
            <div class="title-upper-separator__line"></div>
            <img class="title-upper-separator__end" src="/graphic-elements/losange_red.svg">
        </div>

        <div class="container grid-container">

            <div class="background-logo background-logo--top" data-speed="1.1">
                <img src="/graphic-elements/background_logo.svg">
            </div>

            <div class="historic__title title">
                <img class="title__icon"
                    src="/graphic-elements/square_losange_red.svg"
                >
                <h2>{{ historicData.title }}</h2>
            </div>

            <div class="historic__timeline timeline-container">
                <div v-for="(item, index) in historicData.timeline" :key="item.id">
                    <TimelineItem 
                        :data="item" 
                        :order="(index as number) % 2 == 0 ? 'normal' : 'invert'"
                        :isLast="index === historicData.timeline.length - 1"
                    />
                </div>
            </div>

            <p class="historic__quote quote">
                {{ historicData.quote }}
            </p>
            
            <div class="background-logo background-logo--bottom">
                <img src="/graphic-elements/logo-background-cut.png">
            </div>
        </div>
    </div>
</template>
        
<style scoped lang="scss">

.historic {
    margin: 80px 0;

    &__title {
        grid-row: 1;
        grid-column: 2 / -1;
    }

    &__timeline {
        grid-row: 2;
        grid-column: 2 / 12;
    }

    &__quote {
        grid-row: 3;
        grid-column: 5 / span 4;
        margin-top: 80px;
        text-align: center;
        font-family: "Mrs Eaves OT";
        font-style: italic;
        font-size: 32px;
        line-height: 1.1;
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

.background-logo {
    position:absolute;
    overflow: hidden;
    z-index: -1;
    opacity: 0.4;

    & img {
        width: 100%;
        height:auto;
        object-fit: cover;
    }

    &--top {
        top: -100px;
        right: -400px;
        width: 650px;
        rotate: 98deg;
    }

    &--bottom {
        bottom: -100px;
        left: -100px;
        right: -100px;
    }
}

@media (max-width: 1200px) {
    .historic {
        margin-top: 60px;
    }
}

@media (max-width: 992px) {
    .historic {
        margin-top: 50px;

        &__quote {
            grid-column: 4 / span 6;
            font-size: 28px;
        }
    }
}

@media (max-width: 768px) {
    .historic {

        &__title {
            grid-column: 1 / -1;
        }

        &__timeline {
            grid-column: 1 / -1;
        }

        &__quote {
            grid-column: 2 / 12;
            font-size: 26px;
        }
    }

    .title {
        margin-left: 0;
    }

    .background-logo {
        &--top {
            width: 400px;
            right: -200px;
        }
    }
}

@media (max-width: 576px) {
    .historic {
        margin-top: 40px;

        &__quote {
            font-size: 24px;
        }
    }

    .background-logo {
        opacity: 0.2;

        &--top {
            width: 300px;
            right: -150px;
            top: -50px;
        }

        &--bottom {
            bottom: -50px;
            left: -50px;
        }
    }
}

</style>