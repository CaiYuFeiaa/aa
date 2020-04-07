<template>
    <div>
        <Drawer title="站内消息" placement="left" width="520" :closable="false" v-model="value1">
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>


        <div style="width:100%;position:fixed;top:0px;left:0px;background-color: #F7EFE7;z-index:1000;">
            <div style="padding:10px 0px 10px 100px;border-bottom:1px solid #dae2e1;">
                <div id="head-left" style="display:inline-block;vertical-align:middle;">
                    <Input v-model="searchV" style="width:920px;z-index:0;">
                    <Select v-model="optionV" slot="prepend" style="width:80px;">
                        <Option value="img">图片</Option>
                        <Option value="user">用户</Option>
                    </Select>
                    <Button @click="searchSomething" slot="append" icon="ios-search" style="color:white;background-color:#2D8CF0;width:80px;"></Button>
                    </Input>
                </div>

                <div id="head-right" style="height:100%;margin-left:100px;display:inline-block;vertical-align:middle;">
                    <div @click="userDetail(infoUser.userId)" style="width:50px;height:50px;border-radius:50%;display:inline-block;vertical-align:middle;overflow:hidden;">
                        <img :src="infoUser.userIcon" style="width:50px;cursor:pointer;"/>
                    </div>
                    <div class="rightDiv" @click="mineInfo">{{infoUser.name}}</div>
                    <div class="rightDiv" @click="backIndex">主页</div>
                    <div class="rightDiv" @click="">关注</div>
                    <div class="rightDiv" @click="value1 = true">消息</div>
                    <div class="rightDiv" @click="loginOut">退出登录</div>
                </div>
            </div>
        </div>

        <div style="margin-top:75px;">
            <div v-for="item in userList" style="margin-left:200px;display:inline-block;">
                <div @click="userDetail(item.userId)" style="cursor:pointer;">
                    <div style="width:146px;height:146px;border-radius:50%;background-color:white;position:absolute;display:inline-block;z-index:50;">
                        <div style="width:140px;height:140px;margin:3px 0px 0px 3px;border-radius:50%;border:1px solid black;overflow:hidden;">
                            <img :src="item.userIcon" style="width:100%;"/>
                        </div>
                    </div>

                    <div class="dbImg" style="margin-left:73px;background-color:#E2F0F3;">
                        <img :src="item.imgS.length>0?item.imgS[0].imgUrl:''"/>
                    </div>
                    <div class="dbImg" style="background-color: #747382;">
                        <img :src="item.imgS.length>1?item.imgS[1].imgUrl:''" style="width:100px;"/>
                    </div>
                    <div class="dbImg" style="border-radius:0 10px 10px 0;">
                        <img :src="item.imgS.length>2?item.imgS[2].imgUrl:''" style="width:100px;"/>
                    </div>
                </div>


                <div style="padding-left:30px;">
                    <div style="display:inline-block;vertical-align:middle;">
                        <p style="font-size:22px;font-weight:bold;">{{item.name}}</p>
                        <p>{{item.userFans}}位粉丝</p>
                    </div>
                    <Button v-if="item.b" @click="qxgzyh(item.userId)" class="btnSty" type="error" >取消关注</Button>
                    <Button v-else @click="gzyh(item.userId)" class="btnSty" type="error">关注</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "UserList",
        data(){
            return{
                infoUser:'',
                searchV:'',
                optionV:'user',
                userList:[],
                value1:false,
            }
        },
        created: function (){
            this.searchV = this.$route.params.username
            axios.post('http://localhost:8090/fy/user/queryLike', {
                username:this.$cookieStore.getCookie('username'),
                name: this.$route.params.username
            }).then((res) => {
                this.userList = res.data.data
                console.log(this.userList)
            })
        },
        mounted(){
            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')
                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                    this.infoUser = res.data.data
                })
            } else {
                alert("还未登录")
                this.$router.push('/Login');
            }
        },
        watch:{

        },
        methods:{
            searchSomething(){
                if(this.searchV==''){
                    axios.post('http://localhost:8090/fy/user/allUser', {
                        username: this.$cookieStore.getCookie('username')
                    }).then((res) => {
                        this.userList = res.data.data
                    })
                }else {
                    if(this.optionV == 'img'){
                        this.$router.push({name:'imgList',params:{title:this.searchV}})
                    }else {
                        axios.post('http://localhost:8090/fy/user/queryLike', {
                            username:this.$cookieStore.getCookie('username'),
                            name: this.searchV
                        }).then((res) => {
                            this.userList = res.data.data
                            console.log(this.userList)
                        })
                    }
                }
            },
            mineInfo(){
                this.$router.push("/user")
            },
            backIndex(){
                this.$router.push("/")
            },
            loginOut(){
                var a=confirm("是否退出？")
                if(a){
                    this.$cookieStore.delCookie('username');
                    this.$router.push("/login")
                }
            },
            gzyh(id){
                axios.post('http://localhost:8090/fy/user/gzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:id
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/queryLike', {
                        username:this.$cookieStore.getCookie('username'),
                        name: this.searchV
                    }).then((res) => {
                        this.userList = res.data.data
                    })
                })
            },
            qxgzyh(id){
                axios.post('http://localhost:8090/fy/user/qxgzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:id
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/queryLike', {
                        username:this.$cookieStore.getCookie('username'),
                        name: this.searchV
                    }).then((res) => {
                        this.userList = res.data.data
                    })
                })
            },
            userDetail(id){
                this.$router.push({name:'userDetails',params:{userId:id}})
            },
        }
    }
</script>

<style scoped>
    *{
        box-sizing:border-box;
    }
    .rightDiv{
        /*height:50px;*/
        position: relative;
        padding:10px 15px;
        vertical-align: middle;
        display: inline-block;
        color:#8E8E8E;
        font-size: 16px;
        font-weight: bold;
        cursor:pointer;
        z-index: 5;
    }
    .rightDiv:hover{
        color:#2D8CF0;
        opacity: 0.8;
    }
    .dbImg{
        width:140px;
        height:140px;
        margin-top:3px;
        margin-left:3px;
        background-color:#97948D;
        display:inline-block;
        overflow:hidden;
    }
    .dbImg > img{
        min-width:140px;
        min-height:140px;
    }
    .btnSty{
        margin-left:325px;
        vertical-align:middle;
    }
</style>