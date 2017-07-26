<template>
    <div class="">
        <header-section></header-section>
        <div class="contacts-container">
            <span>这是通讯录 界面！</span>
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
