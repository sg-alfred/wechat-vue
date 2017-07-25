<template id="">
    <div id="Test">
        <h1 @click="doThis">{{ msg }}</h1>

        <a href="/">返回</a>

        <div style="margin: 20px 0;">
            <!-- <input v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo"> -->

            <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions0">
            </el-date-picker>

            <el-date-picker
                v-model="value2"
                type="daterange"
                placeholder="选择日期范围">
            </el-date-picker>

            <el-input v-model="newTodoText" v-on:keyup.enter="addNewTodo" placeholder="Add a todo"></el-input>

            <!--<todo-item is="todo-item" v-for="(item, index) in todos" v-bind:todo='item' v-on:remove="todos.splice(index, 1)">
            </todo-item>-->
        </div>

        <todo-list2></todo-list2>

        <!-- <ul>
            <li v-for="(item, index) in todos" v-bind:title="todo" v-on:remove="todos.splice(index, 1)">
                {{ item.text }}
                <button v-on:click="$emit('remove')">X</button>
            </li>
        </ul> -->
    </div>
</template>

<script>

// vue 需要引进来?? ！！为什么，全局的可以使用吗? 因为是一个独立的组件？
import Vue from 'vue'
import TodoList2 from '../components/TodoList'

// 这算是 局部组件吧，只有这个可以使用
Vue.component('todo-item', {
    props: ['todo'],
    template: `
        <li>
            {{ todo }}
            <button v-on:click="$emit('remove')">X</button>
        </li>
    `,
})

// var app4 = new Vue({
//     el: '#Test',
//     data: {
//         msg: "This a Test Page!",
//         todos: [
//             {text: '学习JavaScript', time: '30分钟'},
//             {text: '学习vue', time: '30分钟'},
//             {text: '休息', time: '1小时'}
//         ]
//     },
//     methods: {
//         doThis() {
//             alert(msg)
//         }
//     },
//     watch: {

//     }
// })

export default {
    name: 'Test',
    components: {
        TodoList2
    },
    data() {
        return {
            value1: '',
            value2: '',
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            msg: "This a Test Page!",
            newTodoText: '',
            // todos: [
            //     {text: '学习JavaScript', time: '30分钟'},
            //     {text: '学习vue', time: '30分钟'},
            //     {text: '休息', time: '1小时'}
            // ]
            todos: [
                'Do the dishes',
                'Take out the trash',
                'Mow the lawn'
            ]
        }
    },
    methods: {
        doThis() {
            alert(this.msg)
        },
        addNewTodo() {
            this.todos.push(this.newTodoText)
            this.newTodoText = ''
        }
    }
}
</script>
