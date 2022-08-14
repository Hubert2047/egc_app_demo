<template>
    <div :style="{ 'background-color': '#EFEFEF' }" class="vh-100 d-flex justify-content-center align-items-center">
        <div class="bg-white rounded p-2 p-sm-4 pb-0 mx-2">
            <img class="w-100" src="@/assets/images/login-img.png" alt="" />
            <div class="">
                <el-form
                    label-position="left"
                    :model="loginData"
                    label-width="40px"
                    :hide-required-asterisk="true"
                    ref="loginForm"
                    class="demo-ruleForm"
                >
                    <el-form-item label="帳號" prop="account" :rules="[{ required: true, message: '帳號必須填滿' }]">
                        <el-input type="account" autocomplete="off" v-model="loginData.account"></el-input>
                    </el-form-item>

                    <el-form-item label="密碼" prop="password" :rules="[{ required: true, message: '密碼必須填滿' }]">
                        <el-input
                            type="password"
                            autocomplete="off"
                            show-password
                            v-model="loginData.password"
                        ></el-input>
                    </el-form-item>

                    <el-form-item class="ms-0 d-flex justify-content-start">
                        <el-button type="primary" @click="handleSubmitLogin()">登入</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginData: {
                account: '',
                password: '',
            },
        }
    },
    methods: {
        async handleSubmitLogin() {
            //handle validate input
            let isFormValidation
            this.$refs.loginForm.validate((valid) => {
                if (!valid) {
                    this.$notify.warning({
                        title: '警告',
                        message: '資料未填滿',
                        duration: 2000,
                        customClass: 'notification',
                    })
                }
                isFormValidation = valid
            })
            if (!isFormValidation) return

            //call api
            try {
                // const res = await logInApi()
                const res = { id: 1 }
                localStorage.setItem('user', JSON.stringify(res))
                this.$router.push('/home')
            } catch (error) {
                let erroMsg = ''
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    erroMsg = error.response
                } else if (error.request) {
                    // The request was made but no response was received
                    erroMsg = error.response
                } else {
                    // Something happened in setting up the request that triggered an Error
                    erroMsg = 'Error !'
                }
                this.$notify.error({
                    title: '警告',
                    message: erroMsg,
                    duration: 2000,
                    customClass: 'notification',
                })
            }
        },
    },
}
</script>

<style></style>
