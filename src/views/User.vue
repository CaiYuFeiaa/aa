<template>
    <div id="u-main">
        <Drawer title="点击选择头像" placement="right" width="520" :closable="false" v-model="value1">
            <div>
                <div v-for="item in iconList" style="display:inline-block;">
                    <div  style="width:100px;height:100px;margin:20px;border:1px solid black;border-radius:50%;overflow:hidden;">
                        <img :src="item.iconImg" @click="updTx(item.iconImg)" style="width:100px;cursor:pointer;"/>
                    </div>
                    <p style="text-align:center;">{{item.iconProfile}}</p>
                </div>
            </div>
        </Drawer>

        <Icon id="back" type="md-arrow-back" size="50" title="返回首页" @click="backIndex" />
        <h2 style="margin-left:75px;">编辑个人资料</h2>
        <div title="点击更改" style="width:80px;height:80px;margin:20px 100px 10px;border-radius:50%;cursor:pointer;overflow:hidden;">
            <img :src="infoUser.userIcon" @click="value1 = true" style="width:100%;">
        </div>

        <p>名字:<Input v-model="uname" disabled style="width:216px;" /></p>
        <span style="margin:20px 0px;display:inline-block;">生日:</span>
        <DatePicker type="date" placeholder="Select date" v-model="userBirth" @on-change="userBirth=$event" ></DatePicker>
        <p>性别:
            <RadioGroup v-model="sex">
                <Radio :label="0">男</Radio>
                <Radio :label="1">女</Radio>
                <Radio :label="2">保密</Radio>
            </RadioGroup>
        </p>

        <p style="margin:10px 0px;">关于你:</p>
        <Input v-model="userProfile" maxlength="500" :rows="5" show-word-limit type="textarea" placeholder="说点什么吧" style="width:260px;" />

        <Button @click="updUser" type="primary" style="margin:20px 55px;display:block;">确认更新个人数据</Button>

        <a @click="reset" href="#" style="position:absolute;top:500px;left:420px;">修改密码</a>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "User",
        data(){
            return{
                infoUser:[],
                iconList:[],
                uname:'',
                userBirth:'',
                sex:'',
                userProfile:'',
                value1:false,

                birthCanUse:false,
            }
        },
        created: function (){
            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')

                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                    this.infoUser = res.data.data
                    this.uname = this.infoUser.name
                    this.userBirth = this.infoUser.userBirth
                    this.sex = this.infoUser.userSex
                    this.userProfile =this.infoUser.profile
                })
            } else {
                alert("还未登录")
                this.$router.push('/Login');
            }

            axios.get('http://localhost:8090/fy/icon/index')
                .then((res => {
                    this.iconList = res.data.data
                }))
        },
        mounted(){

        },
        methods:{
            backIndex(){
                this.$router.push("/")
            },
            updTx(i){
                this.infoUser.userIcon = i
            },
            updUser(){
                if(this.userBirth == '' || this.userBirth == null){
                    this.birthCanUse = false
                    alert("请选择一个日期作为您的生日日期!")
                }else {
                    this.birthCanUse = true
                }
                if(this.userProfile == ''){
                    this.userProfile = '这个人很懒,还没有简介'
                }

                if(this.birthCanUse){
                    axios.post('http://localhost:8090/fy/user/updUser', {
                        username:this.$cookieStore.getCookie('username'),
                        name: this.uname,
                        icon:this.infoUser.userIcon,
                        birth:this.userBirth,
                        sex:this.sex,
                        profile:this.userProfile
                    }).then((res) =>{
                        alert('更新成功')
                    })
                }
            },
            reset(){
                this.$router.push("/resetPassword")
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
    #u-main{
        width:500px;
        margin:50px 0px 0px 500px;
        padding:20px 125px;
        border-radius:20px;
        border:1px solid black;
        display:inline-block;
        position:relative;
    }
</style>