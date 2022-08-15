<template>
    <div :style="{ 'background-color': '#EFEFEF' }" class="vh-100 d-flex justify-content-center align-items-center">
        <div class="bg-white rounded p-2 p-sm-4 pb-0 mx-2">
            <!-- image -->
            <img class="w-100" src="@/assets/images/login-img.png" alt="" />
            <!-- form -->
            <div>
                <el-form
                    label-position="left"
                    label-width="40px"
                    :hide-required-asterisk="true"
                    ref="loginForm"
                    :model="loginData"
                    @submit.prevent="handleSubmitLogin"
                >
                    <!-- account input-->
                    <el-form-item label="帳號" prop="account" :rules="[{ required: true, message: '帳號必須填滿' }]">
                        <el-input
                            type="account"
                            autocomplete="off"
                            clearable
                            v-model="loginData.account"
                            @focus="handleInputOnFocus"
                        ></el-input>
                    </el-form-item>
                    <!-- password input -->
                    <el-form-item label="密碼" prop="password" :rules="[{ required: true, message: '密碼必須填滿' }]">
                        <el-input
                            type="password"
                            autocomplete="off"
                            show-password
                            clearable
                            v-model="loginData.password"
                            @focus="handleInputOnFocus"
                        ></el-input>
                    </el-form-item>
                    <!-- error msg -->
                    <p :style="{ color: 'red', 'text-transform': 'capitalize' }" v-if="hasError">{{ errorMsg }}</p>
                    <!-- submit -->
                    <el-form-item class="ms-0 d-flex justify-content-start">
                        <el-button
                            native-type="submit"
                            :loading="loading"
                            type="primary"
                            class="shadow"
                            @click="handleSubmitLogin"
                            >登入</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { loginApi } from '@/plugins/httpRequest/authApi'
import sha512 from 'js-sha512'
export default {
    data() {
        return {
            loading: false,
            loginData: {
                account: '',
                password: '',
            },
            errorMsg: '',
        }
    },
    computed: {
        hasError() {
            return this.errorMsg !== ''
        },
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
                this.loading = true

                const res = await loginApi({
                    headers: {
                        account: this.loginData.account,
                        password: sha512(this.loginData.password),
                    },
                })
                //save current user to localStorage then router can check if user log in
                localStorage.setItem('user', JSON.stringify(res.data))
                this.$router.push('/home')
            } catch (error) {
                this.errorMsg = error.response.data?.msg ? error.response.data.msg : 'Network Error !'
            } finally {
                this.loading = false
            }
        },
        handleInputOnFocus() {
            //clear error message
            this.errorMsg = ''
        },
    },
}
</script>

<style></style>
