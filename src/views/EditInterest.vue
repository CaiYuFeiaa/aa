<template>
    <div style="width:100%;">
        <div style="width:80%;margin-left:10%;position:relative;">
            <Icon id="back" type="md-arrow-back" size="50" title="返回首页" @click="backIndex" />
            <div style="margin-left:180px;padding:30px;vertical-align:middle;display:inline-block;">
                <h1 style="font-weight:bold;">
                    {{infoUser.name}}
                </h1>
                <p>{{infoUser.userFans}}位粉丝 . {{infoUser.userFollow}}关注</p>
            </div>

            <div style="width:100px;height:100px;margin-left:582px;vertical-align:middle;border-radius:50%;background-color:#E2E2E2;display:inline-block;overflow:hidden;">
                <img :src="infoUser.userIcon" style="width:100px;">
            </div>
        </div>

        <div id="allType">
            <div class="typeDiv" v-for="item in categoryList">
                <p class="typeName" style="">{{item.categoryName}}</p>
                <div class="imgDiv">
                    <img :src="item.categoryImg" style="width:266px;" />
                </div>

                <Button @click="qxgz(item.categoryType)" v-if="item.b" type="primary" style="width:100%;margin-top:5px;">取消关注</Button>
                <Button @click="gz(item.categoryType)" v-else type="primary" style="width:100%;margin-top:5px;">关注</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "EditInterest",
        data(){
            return{
                infoUser:[],
                arr:[],
                categoryList:[],
                exist:false,
            }
        },
        created: function () {
            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')

                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                    this.infoUser = res.data.data
                })
                this.exist = true
            } else {
                alert("还未登录")
                this.$router.push('/Login');
                this.exist = false
            }
            //向后端获取所有的图片类型
            axios.post('http://localhost:8090/fy/category/editCategory',{
                username:this.$cookieStore.getCookie('username')
            }).then((res) => {
                    this.categoryList = res.data.data;
                })
        },
        mounted(){

        },
        methods:{
            backIndex(){
                this.$router.push("/")
            },
            gz(i){
                axios.post('http://localhost:8090/fy/category/gz',{
                    username:this.$cookieStore.getCookie('username'),
                    categoryType:i
                }).then((res) => {
                    axios.post('http://localhost:8090/fy/category/editCategory',{
                        username:this.$cookieStore.getCookie('username')
                    }).then((res) => {
                        this.categoryList = res.data.data;
                    })
                })
            },
            qxgz(i){
                axios.post('http://localhost:8090/fy/category/qxgz',{
                    username:this.$cookieStore.getCookie('username'),
                    categoryType:i
                }).then((res) => {
                    if(res.data){
                        axios.post('http://localhost:8090/fy/category/editCategory',{
                            username:this.$cookieStore.getCookie('username')
                        }).then((res) => {
                            this.categoryList = res.data.data;
                        })
                    }else {
                        alert("至少保留一个兴趣主题!")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    html,body{
        width:100%;
    }
    #back{
        position:absolute;
        top:10px;
        left:10px;
        cursor: pointer;
    }
    #back:hover{
        color:#2D8CF0;
    }
    #allType{
        width:100%;
        padding:0 9.6%;
    }
    .typeDiv{
        width:225px;
        margin:10px;
        display:inline-block;
        position:relative;
    }
    .typeDiv:hover{
        opacity:0.8;
    }
    .imgDiv{
        width:225px;
        height:225px;
        border-radius:10px;
        overflow:hidden;
        cursor:pointer;
    }
    .typeName{
        color:white;
        font-size:18px;
        font-weight:bold;
        position:absolute;
        top:202px;
        left:10px;
    }
</style>