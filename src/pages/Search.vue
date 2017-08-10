<template>
    <div class="">
        <header-section :goBack="true" ></header-section>

        <section class="search-container">
            <span>我是搜索界面！！</span>
            <ul>
                <li>全局搜索</li>
                <li>只搜索好友</li>
                <li>只搜索群</li>
                <li>只搜索公众号等等</li>
            </ul>
        </section>
    </div>
</template>

<script>
    import HeaderSection from '../components/HeaderSection'
    export default {
        name: 'Search',
        components: {
            HeaderSection
        }
    }
</script>