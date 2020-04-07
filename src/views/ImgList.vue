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
            <div v-for="item in imgList" style="width:610px;margin-left:100px;padding:6px;display:inline-block;vertical-align:middle;overflow:hidden;">
                <img :src="item.imgUrl" @click="imgClick(item.imgId)" style="width:400px;height:144px;display:inline-block;cursor:pointer;" >
                <div style="margin-left:10px;color:#43acf0;vertical-align:bottom;display:inline-block;font-size:16px;font-weight:bold;">
                    <p>图片标题:{{item.imgTitle}}</p>
                    <p>图片简介:{{item.imgProfile}}</p>
                    <p>图片收藏:{{item.imgCollection}}</p>
                    <p>图片点击:{{item.imgClick}}</p>
                    <p>图片下载:{{item.imgDownload}}</p>
                    <p>上传时间:{{item.createTime.substr(0,10)}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "ImgList",
        data(){
            return{
                infoUser:'',
                searchV:'',
                optionV:'img',
                imgList:[],
                value1:false,
            }
        },
        created: function (){
            this.searchV = this.$route.params.title
            axios.post('http://localhost:8090/fy/img/queryLike', {
                title: this.$route.params.title
            }).then((res) => {
                this.imgList = res.data.data
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
                    axios.get('http://localhost:8090/fy/img/allImg')
                        .then((res) => {
                            this.imgList = res.data.data
                        })
                }else {
                    if(this.optionV == 'img'){
                        axios.post('http://localhost:8090/fy/img/queryLike', {
                            title: this.searchV
                        }).then((res) => {
                            this.imgList = res.data.data
                        })
                    }else {
                        this.$router.push({name:'userList',params:{username:this.searchV}})
                    }
                }
            },
            userDetail(id){
                this.$router.push({name:'userDetails',params:{userId:id}})
            },
            mineInfo(){
                this.$router.push("/user")
            },
            backIndex(){
                this.$router.push("/")
            },
            imgClick(id){
                axios.post('http://localhost:8090/fy/img/imgClick',{
                    imgId: id
                }).then((res) => {
                    this.$store.commit("setImgId",id)
                    this.$router.push('/ImgDetails')
                })
            },
            loginOut(){
                var a=confirm("是否退出？")
                if(a){
                    this.$cookieStore.delCookie('username');
                    this.$router.push("/login")
                }
            }
        }
    }
</script>

<style scoped>
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
</style>