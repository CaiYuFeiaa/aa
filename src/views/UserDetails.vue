<template>
    <div>
        <Icon id="back" style="position:fixed;top:10px;left:30px;cursor:pointer;" type="md-arrow-back" size="50" title="返回首页" @click="backIndex" />

        <div style="display:flex;flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;">
            <div style="width:300px;height:300px;border-radius:50%;overflow:hidden;">
                <img :src="infoUser.userIcon" style="width:100%;"/>
            </div>
            <div style="width:145px;margin-left:20px;">
                <h1>{{infoUser.name}}</h1>
                <p style="margin:10px 0;">{{infoUser.userFans}}:位粉丝</p>
                <p style="margin:10px 0;">{{imgListLen}}:张作品</p>
                <Button v-if="show" @click="qxgzyh()" type="error">取消关注</Button>
                <Button v-else @click="gzyh()" type="error">关注</Button>
            </div>
        </div>

        <div id="waterfall" style="width:100%;position:relative;top:20px;">
            <div class="lie" style="width:250px;padding:8px;position:absolute;display:inline-block;cursor:pointer;" v-for="item in userImgList">
                <div class="water" @click="imgClick(item.imgId)" style=" width: 100%;border-radius: 20px;overflow: hidden;">
                    <img :src="item.imgUrl" style="width:100%;"/>
                </div>

                <Icon v-if="item.b" class="iconCollection" style="position:absolute;color:#2D8CF0;left:75%;cursor:pointer;" @click="cancelImg(item.imgId)" type="md-heart" size="20" title="取消收藏"/>
                <Icon v-else class="iconCollection" style="position:absolute;color:#2D8CF0;left:75%;cursor:pointer;" @click="collectionImg(item.imgId)" type="md-heart-outline" size="20" title="点击收藏"/>

                <a class='downloadImg' style="position: absolute;left:85%;" @click="download(item.imgId)" href='#' :download='item.imgUrl' title="点击下载图片">
                    <Icon type="md-download" size="20" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "UserDetails",
        data(){
            return{
                infoUser:[],
                arr:[0,0,0,0,0,0],
                userImgList:[],
                imgListLen:0,
                show:false,
            }
        },
        created: function (){
            axios.post('http://localhost:8090/fy/user/oneUserInfo', {
                userId: this.$route.params.userId
            }).then((res) => {
                this.infoUser = res.data.data
            })

            axios.post('http://localhost:8090/fy/user/sfygz',{
                username: this.$cookieStore.getCookie('username'),
                userId: this.$route.params.userId
            }).then((res)=>{
                this.show = res.data;
            })
        },
        mounted(){
            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')
                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                })
            } else {
                alert("还未登录")
                this.$router.push('/Login');
            }

            axios.post('http://localhost:8090/fy/img/getImgById', {
                username: this.$cookieStore.getCookie('username'),
                userId: this.$route.params.userId
            }).then((res) => {
                this.userImgList = res.data.data
                this.imgListLen = this.userImgList.length
                this.$nextTick(() => {
                    this.putImg()
                })
            })
        },
        methods:{
            backIndex(){
                this.$router.push("/")
            },
            findMinIndex() {
                var minIndex = this.arr[0];
                var index = 0;

                for (var i = 0;i < this.arr.length;i++) {
                    if (minIndex > this.arr[i]){
                        minIndex = this.arr[i]
                        index = i;
                    }
                }
                return index;
            },
            putImg() {
                for(var i = 0;i < this.imgListLen;i++){
                    if(i < 6){
                        $(".lie:eq("+i+")").css({top:10,left:250*i})
                        this.arr[i] = this.userImgList[i].imgHeight + 10
                    }else {
                        $(".lie:eq("+i+")").css({top:20+this.arr[this.findMinIndex()],left:250*this.findMinIndex()})
                        this.arr[this.findMinIndex()] +=  this.userImgList[i].imgHeight + 30
                    }

                    $(".lie:eq("+i+") > a").css({top:this.userImgList[i].imgHeight-15})
                    $(".lie:eq("+i+") > .iconCollection").css({top:this.userImgList[i].imgHeight-15})
                }
                // console.log(this.arr)
            },
            imgClick(id){
                axios.post('http://localhost:8090/fy/img/imgClick',{
                    imgId: id
                }).then((res) => {
                    this.$store.commit("setImgId",id)
                    this.$router.push('/ImgDetails')
                })
            },
            download(id) {
                axios.post('http://localhost:8090/fy/img/downloadImg', {
                    imgId: id
                }).then((res) => {
                })
            },
            cancelImg(id){
                axios.post('http://localhost:8090/fy/img/cancelImg', {
                    username: this.$cookieStore.getCookie('username'),
                    imgId: id
                }).then((res) => {
                    axios.post('http://localhost:8090/fy/img/getImgById',{
                        username: this.$cookieStore.getCookie('username'),
                        userId: this.$route.params.userId
                    }).then((res) => {
                        this.userImgList = res.data.data
                        this.imgListLen = this.userImgList.length

                        this.$nextTick(() => {
                            this.putImg()
                        })
                    })
                })
            },
            collectionImg(id){
                axios.post('http://localhost:8090/fy/img/collectionImg', {
                    username: this.$cookieStore.getCookie('username'),
                    imgId: id
                }).then((res) => {
                    axios.post('http://localhost:8090/fy/img/getImgById',{
                        username: this.$cookieStore.getCookie('username'),
                        userId: this.$route.params.userId
                    }).then((res) => {
                        this.userImgList = res.data.data
                        this.imgListLen = this.userImgList.length
                        this.$nextTick(() => {
                            this.putImg()
                        })
                    })
                })
            },
            gzyh(){
                axios.post('http://localhost:8090/fy/user/gzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:this.$route.params.userId
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/oneUserInfo',{
                        userId:this.$route.params.userId
                    }).then((res) =>{
                        this.infoUser = res.data.data

                        axios.post('http://localhost:8090/fy/user/sfygz',{
                            username: this.$cookieStore.getCookie('username'),
                            userId:this.$route.params.userId
                        }).then((res)=>{
                            this.show = res.data;
                        })
                    })
                })
            },
            qxgzyh(){
                axios.post('http://localhost:8090/fy/user/qxgzyh',{
                    username:this.$cookieStore.getCookie('username'),
                    userId:this.$route.params.userId
                }).then((res) =>{
                    axios.post('http://localhost:8090/fy/user/oneUserInfo',{
                        userId:this.$route.params.userId
                    }).then((res) =>{
                        this.infoUser = res.data.data

                        axios.post('http://localhost:8090/fy/user/sfygz',{
                            username: this.$cookieStore.getCookie('username'),
                            userId:this.$route.params.userId
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

</style>