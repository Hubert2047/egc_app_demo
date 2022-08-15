<template>
    <div class="container-fluid bg-primary p-2 px-lg-4 d-flex">
        <!-- brand -->
        <p class="mb-0 align-self-center text-white">AIoM Solution</p>
        <!-- user setting -->
        <el-dropdown @command="handleCommand" trigger="click" class="ms-auto d-flex align-items-center">
            <el-avatar :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout">登出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { logoutApi } from '@/plugins/httpRequest/authApi'
export default {
    methods: {
        handleCommand(command) {
            switch (command) {
                case 'logout':
                    this.logout()
                    break

                default:
            }
        },
        async logout() {
            try {
                await logoutApi()
                //clear user in storage
                localStorage.removeItem('user')
                this.$router.push('/login')
            } catch (error) {
                console.log(error)
                this.$notify.error({
                    title: '提示訊息',
                    message: 'Network error',
                    duration: 2000,
                    customClass: 'notification',
                })
            }
        },
    },
}
</script>
