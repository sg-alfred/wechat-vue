<template>
    <div class="head-container">
        <span>微信(<span>{{messages}}</span>)</span>
        <span>
            <i class="el-icon-search"></i>
        </span>
        <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link">
                <!--<img src="../assets/icon-plus_u8.png">-->
                +<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu sole="dropdown">
                <el-dropdown-item command="groupChat">
                    <img src="static/image/icon-groupchat.png">发起群聊
                </el-dropdown-item>
                <el-dropdown-item command="addContacts">
                    <img src="static/image/icon-addcontacts.png">添加好友
                </el-dropdown-item>
                <el-dropdown-item command="scanQRCode">
                    <img src="static/image/icon-scancode.png">扫一扫
                </el-dropdown-item>
                <el-dropdown-item command="payment">
                    收付款
                </el-dropdown-item>
                <el-dropdown-item command="help">
                    帮助与反馈
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {
    name: 'HeaderSection',
    data() {
        return {
            messages: 0
        }
    },
    methods: {
        // 为什么不用 goto()，其实没有什么一步的操作！
        handleCommand(command) {
            switch (command) {
                case 'groupChat':
                    this.$router.push('/groupchat');
                    break;
                case 'addFriends':
                    this.$router.push('/addContacts');
                    break;
                case 'scanQRCode':
                    this.$router.push('/scancode');
                    break;
                case 'payment':
                    this.$router.push('/payment');
                    break;
                case 'help':
                    this.$router.push('/help');
                    break;
            }
            this.$message('click on item ' + command);
        },
        goto(path) {
            this.$router.push(path);
        }
    },
    mounted() {

    }
}
</script>

<style>
.head-container {

}
</style>
