<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是发现 界面！</span>

            <base-item></base-item>

            <div class="placeholder"></div>

            <span @click="goto('/moment')">朋友圈</span>

        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    import FooterSection from '../components/FooterSection'
    import BaseItem from '../components/BaseItem'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection,
            BaseItem,
        },
        methods: {
            goto(path) {
                this.$router.push(path);
            }
        }
    }
</script>

<style>
    .placeholder {
        height: 8px;
        width: auto;
    }
</style>
