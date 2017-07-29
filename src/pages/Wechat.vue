<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是微信 界面！</span>

            <div>
                <img src="../assets/wechat.png" />
            </div>

        </div>
        <footer-section></footer-section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    import FooterSection from '../components/FooterSection'

    export default {
        name: 'Contacts',
        components: {
            HeaderSection,
            FooterSection
        }
    }
</script>

<style scoped>
    .contacts-container {

    }
    img {
        width: 200px;
    }
</style>
