<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="header-container">
        <el-row :gutter="20">
            <el-col :span="6">
                <span>微信(<span>{{messages}}</span>)</span>
            </el-col>
            <el-col :span="6" :offset="12">
                <div v-bind:style="iconDivStyle">
                    <span><i class="el-icon-search"></i></span>
                </div>
                <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link">
                        <img src="static/image/icon-plus_u8.png">
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
                        <el-dropdown-item command="logout">
                            退出账号
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'HeaderSection',
    data() {
        return {
            messages: 0,
            iconDivStyle: {
                display: 'inline',
                'padding-right': '10px'
            }
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
                case 'logout':
                    this.logout();
                    break;
            }
            this.$message('click on item ' + command);
        },
        goto(path) {
            this.$router.push(path);
        },
        logout() {
            this.$http.get('/user/logout').then((response) => {
                let result = response.body
                if (!result.code) {
                    this.$store.dispatch('changeIsLogin', false)
                    this.$message(result.message)

                    this.$router.push('/login');
                }
            })
        }
    },
    computed: {
        // 计算未读消息，还是得用 store～
        getTotalMessages() {
            return parseInt(Math.random() * 10);
        }
    },
    watch: {
        // 这个应该是要如何监控，本来是 监听 socket d的～
        getTotalMessages: (newvalue, oldvalue) => {
            console.log(newvalue);
            return this.messages = newvalue;
        }
    }
}
</script>

<style scoped>
    .header-container {
        background-color: #434439;
        color: white;
        height: 60px;
        font-size: 20px;
    }
    .el-dropdown {

    }
    img {
        margin-top: 5px;
        height: 20px;
    }
</style>
