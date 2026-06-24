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
    
    async function getFooterData() 
    {
        const res = await api.get(`/footer?${params}`);
        return res.data.data
    }

    const footerData = ref();
    onMounted(async () => {
        footerData.value = await getFooterData();
    });
    
</script>

<template>
<footer v-if="footerData">
    <div v-if="footerData.title" class="container grid-container title">
        
        <img src="/graphic-elements/linked_red_horizontal_dots.svg" alt="" class="title__top-icon">

        <div class="title__before"></div>
        <h2 class="title__text">{{ footerData.title }}</h2>
        <div class="title__after"></div>
    </div>

    <div class="container footer">
    
        <img class="footer__logo" 
            :src="getImageUrl(footerData.logo.formats.small.url)"
            :alt="footerData.logo.alternativeText"
        >
        
        <div class="footer__address">
            <p>{{ footerData.address }}</p>
            <p>{{ footerData.city }}</p>
        </div>

        <div class="footer__separator"></div>

        <div class="footer__contacts contacts">
            <a v-if="footerData.mail" :href="'mailto:' + footerData.mail"
                class="contacts__mail"
            >
                {{ footerData.mail }}
            </a>

            <div v-for="social in footerData.social_links" 
                class="contacts_links"
            >
                <img v-if="social.logo" :src="getImageUrl(social.logo.url)" alt="">
                <a :href="social.url" target="_blank">{{ social.label }}</a>
            </div>
        </div>

        <div v-if="footerData.certificate" class="footer__separator"></div>

        <img v-if="footerData.certificate"
            class="footer__certificate"
            :src="getImageUrl(footerData.certificate.url)" 
            :alt="footerData.certificate.alternativeText"
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
    gap: 6px;

    &__mail {
        font-weight: bold;
    }

    .contacts_links {
        display: flex;
        align-items: center;
        gap: 6px;

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

@media (max-width: 1200px) {
    .title {
        &__before {
            grid-column: 4 / 5;
        }

        &__after {
            grid-column: 9 / 10;
        }
    }

    .footer {
        gap: 16px;

        &__logo {
            width: 28%;
        }

        &__certificate {
            width: 180px;
        }
    }
}

@media (max-width: 992px) {

    .footer {
        // flex-wrap: wrap;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 32px;

        &__logo {
            order: 100;
            max-height: 200px;
            width: auto;
        }

        &__separator {
            height: 2px;
            width: 30%;
        }

        &__certificate {
            height: 80px;
            width: auto;
        }
    }

    .contacts {
        align-items: center;
        text-align: center;
    }
}

@media (max-width: 768px) {

    .title {
        &__before {
            grid-column: 2 / 5
        }
        
        &__after {
            grid-column: 9 / 12
        }
    }

    .footer {
        margin-top: 16px;
        margin-bottom: 28px;
        gap: 14px;

        &__logo {
            max-height: 150px;
        }

        &__certificate {
            height: 70px;
        }
    }

    .contacts {
        gap: 8px;
    }
}

@media (max-width: 576px) {

    .footer {
        &__logo {
            max-width: 100%;
            max-height: 100px;
        }

        &__certificate {
            max-width: 100%;
        }
    }

    .contacts {
        gap: 10px;
    }
}

</style>