<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { getImageUrl } from '@/utils/url';
    import gsap from 'gsap';

    const props = defineProps(['data', 'order', 'isLast']);
    
    //-- Reformate les dates pour n'afficher que l'année
    props.data.date_start = new Date(props.data.date_start).getFullYear();
    if (props.data.date_end)
        props.data.date_end = new Date(props.data.date_end).getFullYear();
        
    const timelineItem = ref();
    const offset = props.order === 'invert' ? -100 : 100;

    onMounted( async () => {

        const description = timelineItem.value.querySelector('.description');
        const image = timelineItem.value.querySelector('.image');
        
        let animationParams = {
            duration: 1,
            ease: "quad.easeIn",
            scrollTrigger: {
                trigger: timelineItem.value,
                start: 'top 80%',
                end: 'top 40%',
                scrub: true,
                toggleActions: "play none none reverse",
            },
        }

        gsap.from(description, {
            x: -offset, opacity: 0, filter: "blur(2px)",
            ...animationParams,

        })
        
        gsap.from(image, {
            x: offset, opacity:0, 
            ...animationParams,
        }) 
    });
</script>

<template>
    <div class="timeline-item"
        ref="timelineItem"
        :class="{ 'timeline-item--last': isLast }"
    >

        <div :class="`timeline-item__image timeline-item__image--${order} image`"
        >
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
        
        <p :class="`timeline-item__description timeline-item__description--${order} description`">
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
    height: 300px;

    &__image {
        grid-column: 1 / span 5;
        grid-row: 1;
        display: flex;
        justify-content: right;
        gap: 20px;

        img {
            position: relative;
            width: 100%;
            height: 280px;
            object-fit: cover;
        }

        &--invert {
            grid-column: 8 / span 5;
            justify-content: left;
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
            transform: translateX(-50%px);
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

@media (max-width: 1200px) {
    .timeline-item {
        padding: 18px 0 52px;

        &__image img {
            height: 260px;
        }
    }

    .date-container {
        width: 112px;
        height: 112px;

        &__date {
            font-size: 24px;
        }
    }
}

@media (max-width: 992px) {

    .timeline-item {
        grid-template-columns: 1fr;
        gap: 12px;
        height: auto;
        padding: 14px 0 36px;

        &__image,
        &__image--invert,
        &__date,
        &__description,
        &__description--invert {
            grid-column: 1;
            grid-row: auto;
            justify-self: stretch;
        }

        &__image {
            justify-content: center;
            align-items: center;

            &--invert {
                justify-content: center;
            }

            img {
                height: 400px;
                flex-grow: 1;
                max-width: 100%;
            }
        }

        &__date {
            margin-top: -67px;
            z-index: 1;
            transform: none;
            justify-self: center;
        }

        &__description {
            margin: 0;
            max-width: none;
            justify-self: center;
            text-align: center;

            &--invert {
                margin: 0;
                text-align: center;
                justify-self: center;
            }
        }
    }
    
    .line {
            display: none;
    }
}

@media (max-width: 768px) {

    .timeline-item {
        &__date {
            margin-top: -58px;
        }

        &__image {
            flex-direction: column;
            align-items: center;
        }

    }

    .date-container {
        width: 92px;
        height: 92px;

        &__date {
            font-size: 22px;
        }
    }
}

@media (max-width: 576px) {
    .timeline-item {
        padding: 12px 0 30px;

        &__image img {
            height: 300px;
        }

    }

    .date-container {
        width: 84px;
        height: 84px;

        &__date {
            font-size: 20px;
        }
    }

    .line {
        &__dots {
            transform: translateX(-50%);
        }
    }
}


</style>