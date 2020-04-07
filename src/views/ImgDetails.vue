<template>
    <div style="width:100%;">
        <Icon id="back" type="md-arrow-back" size="50" title="返回首页" @click="backIndex" />

        <div style="width:100%;margin:30px 0px;padding-left:15%;">
            <div id="imgHead" style="padding-left:500px;">
                <div style="width:100px;height:100px;border-radius:50%;overflow:hidden;">
                    <img :src="infoUser.userIcon" style="width:100px;"/>
                </div>
                <div style="margin-right:50px;font-size:30px;font-weight:bold;">
                    {{infoUser.name}}
                </div>
                <div style="margin-right:150px;">
                    {{infoUser.userFans}}位粉丝

                    <Button v-if="show" @click="qxgzyh(infoUser.userId)" type="info" size="small">取消关注</Button>
                    <Button v-else @click="gzyh(infoUser.userId)" type="info" size="small">关注</Button>
                </div>
                <div title="收藏量" style="cursor:pointer;">
                    <Icon type="md-heart" size="20" />
                    {{imgDetail.imgCollection}}
                </div>
                <div title="下载量" style="margin-left:10px;cursor:pointer;">
                    <Icon type="md-download" size="20" />
                    {{imgDetail.imgDownload}}
                </div>
            </div>

            <p>图片标题:</p>
            <Input :value="imgDetail.imgTitle" disabled style="width:80%;"/>
            <p>图片简介:</p>
            <Input :value="imgDetail.imgProfile" type="textarea" disabled  style="width:80%;"/>

            <div id="imgDiv">
                <img :src="imgDetail.imgUrl" style="max-width:80%;">
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "ImgDetails",
        data(){
            return{
                imgDetail:[],
                infoUser:[],
                show:false,
            }
        },
        created: function () {
            //向后端获取图片信息
            axios.post('http://localhost:8090/fy/img/imgDetail',{
                username: this.$cookieStore.getCookie('username'),
                imgId:this.$store.state.imgId
            }).then((res) => {
                this.imgDetail = res.data.data;

                axios.post('http://localhost:8090/fy/user/oneUserInfo',{
                    userId:this.imgDetail.userId
                }).then((res) =>{
                    this.infoUser = res.data.data

                    axios.post('http://localhost:8090/fy/user/sfygz',{
                        username: this.$cookieStore.getCookie('username'),
                        userId:this.imgDetail.userId
                    }).then((res)=>{
                        this.show = res.data;
                    })
                })
            })
        },
        mounted(){

        },
        methods:{
            backIndex(){
                this.$router.push("/")
            },
            gzyh(id){
                axios.post('http://localhost:8090/fy/user/gzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:id
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/oneUserInfo',{
                        userId:this.imgDetail.userId
                    }).then((res) =>{
                        this.infoUser = res.data.data

                        axios.post('http://localhost:8090/fy/user/sfygz',{
                            username: this.$cookieStore.getCookie('username'),
                            userId:this.imgDetail.userId
                        }).then((res)=>{
                            this.show = res.data;
                        })
                    })
                })
            },
            qxgzyh(id){
                axios.post('http://localhost:8090/fy/user/qxgzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:id
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/oneUserInfo',{
                        userId:this.imgDetail.userId
                    }).then((res) =>{
                        this.infoUser = res.data.data

                        axios.post('http://localhost:8090/fy/user/sfygz',{
                            username: this.$cookieStore.getCookie('username'),
                            userId:this.imgDetail.userId
                        }).then((res)=>{
                            this.show = res.data;
                        })
                    })
                })
            },
        }
    }
</script>

<style scoped>
    html,body{
        width:100%;
    }
    #back{
        position:fixed;
        top:10px;
        left:30px;
        cursor: pointer;
    }
    #back:hover{
        color:#2D8CF0;
    }
    #imgDiv{
        width:80%;
        margin:10px 0px;
        padding:30px 0px;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:10px;
        border:1px solid black;
    }
    #imgHead > div{
        display:inline-block;
    }
</style>