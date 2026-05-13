<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import api from '@/services/api';
    import qs from 'qs';
    import { getImageUrl } from '@/utils/url';

    const params = qs.stringify(
        {
            populate: {
                fields : '*',
                logo: {
                    populate: '*'
                },
                social_links: {
                    populate: '*'
                },
                certificate : {
                    populate: '*'
                }
            },
        },
        {
            encodeValuesOnly: true,
        }
    );
    
    async function getFooter() 
    {
        const res = await api.get(`/footer?${params}`);
        // const res = await api.get(`/footer?populate=*`);
        return res.data.data
    }

    const footer = ref();
    onMounted(async () => {
        footer.value = await getFooter();
    });
    
</script>

<template>
<footer v-if="footer">
    <div v-if="footer.title" class="container grid-container title">
        
        <img src="/graphic-elements/linked_red_horizontal_dots.svg" alt="" class="title__top-icon">

        <div class="title__before"></div>
        <h2 class="title__text">{{ footer.title }}</h2>
        <div class="title__after"></div>
    </div>

    <div class="container footer">
    
        <img class="footer__logo" 
            :src="getImageUrl(footer.logo.formats.small.url)"
            :alt="footer.logo.alternativeText"
        >
        
        <div class="footer__address">
            <p>{{ footer.address }}</p>
            <p>{{ footer.city }}</p>
        </div>

        <div class="footer__separator"></div>

        <div class="footer__contacts contacts">
            <a v-if="footer.mail" :href="'mailto:' + footer.mail"
                class="contacts__mail"
            >
                {{ footer.mail }}
            </a>

            <div v-for="social in footer.social_links" 
                class="contacts_links"
            >
                <img v-if="social.logo" :src="getImageUrl(social.logo.url)" alt="">
                <a :href="social.url" target="_blank">{{ social.label }}</a>
            </div>
        </div>

        <div v-if="footer.certificate" class="footer__separator"></div>

        <img v-if="footer.certificate"
            class="footer__certificate"
            :src="getImageUrl(footer.certificate.url)" 
            :alt="footer.certificate.alternativeText"
        >
    </div>

    <div class="sub-footer">
        <p>© 2026 Domaine des Malandes - Site réalisé par l’<a href="https://atelier-pangram.fr/" target="blank">Atelier Pangram</a></p>
    </div>

</footer>
</template>

<style scoped lang="scss">

.title {
    margin-top: 50px;

    &__top-icon {
        grid-column: 6 / 8;
        grid-row: 1;
        justify-self: center;
    }

    &__before,
    &__after {
        grid-row: 2;
        height: 2px;
        width: 100%;
        background-color: $bg-color-red;
        align-self: center;
    }

    &__before {
        grid-column: 5 / 6;
    }
    &__after {
        grid-column: 8 / 9;
    }

    &__text {
        grid-column: 6 / 8;
        grid-row: 2;
        justify-self: center;
    }
}

.footer{
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 40px;

    &__logo {
        width: 350px;
        max-height: 130px;
        object-fit: contain;
    }

    &__certificate {
        width: 250px;
        max-height: 100px;
        object-fit: contain;
    }

    &__separator {
        height: 60px;
        width: 2px;
        background-color: $bg-color-light-red;
    }
}

.contacts {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__mail {
        font-weight: bold;
    }

    .contacts_links {
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 20px;
            height: 20px;
            object-fit: contain;
        }
    }
}

.sub-footer {
    width: 100%;
    background-color: $bg-light-beige;
    padding: 20px 0;
    
    & p {
        text-align: center;
    }

    & a {
        text-decoration: underline;
    }
}

</style>