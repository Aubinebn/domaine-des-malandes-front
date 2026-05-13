<script setup lang="ts">
    import { getImageUrl } from '@/utils/url';

    const props = defineProps(['data', 'order', 'isLast']);
    
    //-- Reformate les dates pour n'afficher que l'année
    props.data.date_start = new Date(props.data.date_start).getFullYear();
    if (props.data.date_end)
        props.data.date_end = new Date(props.data.date_end).getFullYear();

</script>

<template>
    <div class="timeline-item"
        :class="{ 'timeline-item--last': isLast }"
    >

        <div :class="`timeline-item__image timeline-item__image--${order}`">
            <img v-for="image in data.image"
                :src="getImageUrl(image.url)"
                :alt="image.alternativeText"
            />
        </div>
        
        <div class="timeline-item__date">
            <div class="date-container">
                <div class="date-container__date">
                    {{ data.date_start }}
                </div>
                <div class="date-container__separator"></div>
                <div v-if="data.date_end"
                class="date-container__date">
                {{ data.date_end }}
                </div>
            </div>
            <div class="line">
                <img v-if="isLast" 
                    src="/graphic-elements/vertical_dots.svg"
                    class="line__dots">
            </div>
        </div>
        
        <p :class="`timeline-item__description timeline-item__description--${order}`">
            {{ data.description }}
        </p>

    </div>
</template>
        
<style scoped lang="scss">

.timeline-item {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 20px;
    padding: 20px 0 60px;

    &__image {
        grid-column: 1 / span 5;
        grid-row: 1;
        display: flex;
        justify-content: center;
        gap: 20px;

        img {
            width: 100%;
            height: 280px;
            object-fit: cover;
        }

        &--invert {
            grid-column: 8 / span 5;
        }
    }

    &__date {
        grid-column: 6 / 8;
        grid-row: 1;
        justify-self: center;
        transform: translateY(-55px);

        & .line {
            width: 2px;
            height: 100%;
            background-color: $bg-color-red;
            margin: -8px auto 0;
            transform: translateX(-3px);
        }
    }

    &__description {
        grid-column: 8 / span 5;
        grid-row: 1;
        text-align: left;
        margin:  0 0 0 -30px;
        display: flex;
        align-items: center;
        font-family: "Mrs Eaves OT";
        font-size: 22px;
        font-style: italic;
        max-width: 400px;
        justify-self: start;
        
        &--invert {
            grid-column: 1 / span 5;
            text-align: right;
            justify-self: end;
            margin: 0 -30px 0 0;
        }
    }
}

.date-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    background-image: url('/graphic-elements/losange_red.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    gap: 2px;
    color: #fff;
    
    &__separator {
        width: 20px;
        height: 1px;
        background-color: #fff;
    }

    &__date {        
        margin-top: -4px;
        font-family: "Mrs Eaves";
        font-size: 28px;
    }
}

    .line {
        position: relative;
        
        &__dots {
            position: absolute;
            bottom: 0;
            background-color: #fff;
            transform: translateX(-42%);
        }
    }
</style>