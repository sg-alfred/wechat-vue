<template id="">
    <div class="TodoList">
        <ol>
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    data () {
        return {
            initData: {

            },
            todos: [
                {text: '学习JavaScript', time: '30分钟'},
                {text: '学习vue', time: '30分钟'},
                {text: '休息', time: '1小时'},
            ]
        }
    }
}
</script>
