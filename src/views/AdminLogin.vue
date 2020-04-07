<template>
    <div style="width:375px;margin:30px auto;">
        <h1 style="text-align:center;">管理员登录</h1>
        <Input v-model="username" prefix="ios-contact" placeholder="输入账号" style="width:100%" />
        <Input v-model="password" prefix="ios-lock" type="password" password placeholder="输入密码" style="width:100%;margin-top:20px" />
        <Button type="primary" style="width:100%;margin-top: 20px" @click="doLogin">登录</Button>

    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "AdminLogin",
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            doLogin(){
                axios.post('http://localhost:8090/fy/admin/login', {
                    username: this.username,
                    password: this.password
                }).then((res) => {
                    if (res.data) {
                        this.$cookieStore.setCookie( 'adminUsername' ,this.username,86400);
                        this.$router.push('/adminIndex');
                    }
                    else {
                        alert('用户名或密码错误，请重新输入');
                        this.username = '';
                        this.password = '';
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>