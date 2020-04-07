<template>
    <div style="width:600px;height:400px;margin:80px auto;border:1px solid black;border-radius:30px;position:relative;">
        <Steps :current="current" id="regSteps">
            <Step title="身份验证"></Step>
            <Step title="重置密码"></Step>
            <Step title="返回登录"></Step>
        </Steps>
        <hr>

        <Icon id="back" type="md-arrow-back" size="50" title="返回首页" @click="backIndex" />

        <div id="yzmb" v-show="current==0">
            <p style="margin-top:50px;">密保问题:</p>
            <Input v-model="mbwt" disabled style="width:80%;"/>
            <p>密保答案:</p>
            <Input v-model="mbda" placeholder="请输入密保答案" style="width:80%;"/>
        </div>

        <div id="szmm" v-show="current==1">
            <p>旧的密码:</p>
            <Input v-model="jmm" style="width:80%;"/>
            <p>新的密码:</p>
            <Input v-model="xmm" type="password" style="width:80%;"/>
            <p>确认密码:</p>
            <Input v-model="qrmm" type="password" placeholder="请输入密保答案" style="width:80%;"/>
        </div>

        <div id="xgcg" v-show="current==2">
            <h2 style="margin-top:111px;text-align:center;">密码修改成功,点击下一步返回登录页面.</h2>
        </div>

        <Button type="primary" @click="nextClick" style="width:69%;margin-left:15%;position:absolute;top:350px;">下一步</Button>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "ResetPassword",
        data(){
            return{
                current: 0,
                infoUser:[],
                mbwt:'',
                mbda:'',
                jmm:'',
                xmm:'',
                qrmm:'',
            }
        },
        created: function () {
            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')

                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                    this.infoUser = res.data.data
                    this.mbwt = this.infoUser.question
                })
            } else {
                alert("还未登录")
                this.$router.push('/Login');
            }
        },
        mounted(){

        },
        methods:{
            backIndex(){
                this.$router.push("/user")
            },
            nextClick(){
                if(this.current < 2){
                    if(this.current == 0){
                        if(this.mbda == ''){
                            alert("密保答案不能为空!")
                        }else {
                            axios.post('http://localhost:8090/fy/user/qrmb', {
                                username: this.$cookieStore.getCookie('username'),
                                answer: this.mbda
                            }).then((res => {
                                console.log(res)
                                if(res.data){
                                    this.current += 1
                                }else {
                                    alert("答案错误!!!")
                                }
                            }))
                        }
                    }else if(this.current == 1){
                        if(this.jmm == ''){
                            alert("旧密码不能为空!")
                        }else if(this.xmm == ''){
                            alert("新密码不能为空!")
                        }else if(this.qrmm == ''){
                            alert("确认密码不能为空!!")
                        }else if(this.xmm != this.qrmm){
                            alert("两次密码输入不一致")
                        }else {
                            axios.post('http://localhost:8090/fy/user/qrmm', {
                                username: this.$cookieStore.getCookie('username'),
                                password: this.jmm
                            }).then((res => {
                                if(!res.data){
                                    alert("旧密码输入错误!!!")
                                }else {
                                    axios.post('http://localhost:8090/fy/user/ggmm', {
                                        username: this.$cookieStore.getCookie('username'),
                                        password: this.xmm
                                    }).then((res => {}))
                                    this.current += 1
                                }
                            }))
                        }
                    }
                }else {
                    this.$cookieStore.delCookie('username');
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped>
    #back{
        position:fixed;
        top:10px;
        left:30px;
        cursor: pointer;
    }
    #yzmb{
        width:100%;
        padding-left:15%;
    }
    #yzmb > p{
        margin-top:20px;
        font-size:18px;
        font-weight:bold;
    }
    #szmm{
        width:100%;
        padding-left:15%;
    }
    #szmm > p{
        margin-top:25px;
        font-size:18px;
        font-weight:bold;
    }
</style>