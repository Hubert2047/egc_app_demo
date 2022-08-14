<template>
    <div>
        <h1>Login</h1>
        <el-button @click="setUser" type="primary" icon="el-icon-share"></el-button>
    </div>
</template>

<script>
export default {
    methods: {
        setUser() {
            this.$store.dispatch('setCurrentUser', { id: 1 })
            this.$router.push('/home')
        },
    },
}
</script>

<style></style>
