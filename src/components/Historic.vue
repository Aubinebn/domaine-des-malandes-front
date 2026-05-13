<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import qs from 'qs';
    import api from '@/services/api';
    import TimelineItem from '@/components/TimelineItem.vue';

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
            encodeValuesOnly: true, // prettify URL
        }
    );

    async function getHistoric() 
    {
        const res = await api.get(`/historique?${params}`);
        return res.data.data
    }

    const historic = ref();

    onMounted(async () => {
        historic.value = await getHistoric();
    })

</script>

<template>
    <div v-if="historic"
        class="historic"
    >
        <div class="separator">
            <div class="separator__line"></div>
            <img class="separator__end" src="/graphic-elements/losange_red.svg">
        </div>

        <div class="container grid-container">
            <div class="historic__title title">
                <img class="title__icon"
                    src="/graphic-elements/square_losange_red.svg"
                >
                <h2>{{ historic.title }}</h2>
            </div>

            <div class="historic__timeline timeline-container">
                <div v-for="(item, index) in historic.timeline" :key="item.id">
                    <TimelineItem 
                        :data="item" 
                        :order="index % 2 == 0 ? 'normal' : 'invert'"
                        :isLast="index === historic.timeline.length - 1"
                    />
                </div>
            </div>

            <p class="historic__quote">
                {{ historic.quote }}
            </p>
        </div>
    </div>

</template>
        
<style scoped lang="scss">

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

.historic {
    margin: 80px 0;

    &__title {
        grid-row: 1;
        grid-column: 2 / none;
    }

    &__timeline {
        grid-row: 2;
        grid-column: 2 / 12;
    }

    &__quote {
        grid-row: 3;
        grid-column: 5 / span 4;
        margin-top: 40px;
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
</style>