<template>
<div id="app">
    <input type="text" name="" value="" placeholder="在这里输入文字，下面会跟着变化" v-model="message">
    <hr>
    <p>{{ message }}</p>
</div>
</template>

<script>
export default {
    data() {
        return {
            message: ''
        }
    },

    methods: {
    },

    created() {

    },

}
</script>

<style lang="less">

</style>