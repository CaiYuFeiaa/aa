<template>
    <div id="mainLogin">
        <div id="hyhy">
            <h1>欢迎来到飞鱼图片网</h1>
        </div>

        <!--头像旋点特效  #0175E8 蓝   #FF6501 橙   #B46AEB 紫   #F8B904 黄  #10A574 绿   #E60023 红-->
        <div>
            <div class="d1" style="top: 115px;left: 208px;animation-delay:0s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:0s;background-color: #E60023;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 145px;left: 220px;animation-delay:1s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:1s;background-color: #0175E8;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 40px;left: 175px;animation-delay:3s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:3s;background-color: #FF6501;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 30px;left: 186px;animation-delay:0.5s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:0.5s;background-color: #B46AEB;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 50px;left: 200px;animation-delay:0s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:0s;background-color: #F8B904;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 95px;left: 205px;animation-delay:1s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:1s;background-color: #10A574;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 118px;left: 192px;animation-delay:1.5s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:1.5s;background-color: #E60023;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 130px;left: 136px;animation-delay:2s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:2s;background-color: #0175E8;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 80px;left: -15px;animation-delay:2s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:2s;background-color: #FF6501;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 50px;left: 97px;animation-delay:2.5s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:2.5s;background-color: #B46AEB;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 50px;left: -100px;animation-delay:2s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:2s;background-color: #F8B904;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 55px;left: -110px;animation-delay:0.5s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:0.5s;background-color: #10A574;">
                    </div>
                </div>
            </div    >
            <div class="d1" style="top: 40px;left: -5px;animation-delay:1s;">
                <div class="d2">
                    <div class="d3" style="animation-delay:2s;background-color: #E60023;">
                    </div>
                </div>
            </div    >
            <div id="tx">
                <Icon type="md-person" size="100"/>
            </div>
        </div>

        <div id="infoLogin">
            <Input v-model="username" prefix="ios-contact" placeholder="输入账号" style="width: 75%" />
            <Input v-model="password" prefix="ios-lock" type="password" password placeholder="输入密码" style="width: 75%;margin-top: 20px" />
            <Button type="primary" style="width: 75%;margin-top: 20px" @click="doLogin">登录</Button>
            <router-link  :to="{path:'/Register'}" style="position: absolute;top: 430px;left: 472px;color: #999999;">注册账号</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "Login",
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            doLogin() {
                axios.post('http://localhost:8090/fy/user/login', {
                    username: this.username,
                    password: this.password
                }).then((res) => {
                    if (res.data) {
                        this.$cookieStore.setCookie( 'username' ,this.username,86400);
                        this.$router.push('/');
                    }
                    else {
                        alert('用户名或密码错误，请重新输入');
                        this.username = '';
                        this.password = '';
                        console.log(res)
                    }
                })

            }
        }
    }
</script>

<style scoped>
    @import '../css/login.css';
</style>