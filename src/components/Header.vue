<template>
    <div class="container-fluid bg-primary p-3 px-lg-4">
        <div class="row w-100 align-items-center m-0">
            <div class="ps-0 col-2 col-sm-4 d-flex justify-content-start">
                <!-- <el-button
                    type="primary"
                    :style="{ 'font-size': '25px' }"
                    class="px-2 py-1 shadow-sm"
                    title="Align left"
                    size="small"
                >
                    <b-icon class="text-white" icon="text-left"></b-icon> -->
                <!-- </el-button> -->
            </div>
            <!-- brand -->
            <div class="col-8 col-sm-4">
                <p class="mb-0 h3 text-white">AIoM Solution</p>
            </div>
            <!-- user setting -->
            <div class="pe-0 col-2 col-sm-4 d-flex justify-content-end">
                <el-dropdown @command="handleCommand" trigger="click" class="d-flex flex-grow-0">
                    <el-avatar
                        class="align-self-start shadow-sm"
                        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                    ></el-avatar>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import { logoutApi } from '@/plugins/httpRequest/authRequest'
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
