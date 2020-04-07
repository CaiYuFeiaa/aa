<template>
    <div style="height:100%;">
        <Menu theme="dark" active-name="3" style="height:100%;vertical-align:top;display:inline-block;">
            <MenuGroup title="用户">
                <MenuItem name="1" @click.native="adminIndex">
                    用户管理
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="头像">
                <MenuItem name="7" @click.native="existIcon">
                    已有头像
                </MenuItem>

                <MenuItem name="2" @click.native="addIcon">
                    新增头像
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="图片">
                <MenuItem name="3">
                    图片管理
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="图片类型">
                <MenuItem name="8" @click.native="existType">
                    已有类型
                </MenuItem>

                <MenuItem name="4" @click.native="addCategory">
                    新增类型
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="密保">
                <MenuItem name="9" @click.native="existQuestion">
                    已有密保问题
                </MenuItem>

                <MenuItem name="5" @click.native="addQuestion">
                    新增密保问题
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="退出">
                <MenuItem name="6" @click.native="loginOut">
                    退出登录
                </MenuItem>
            </MenuGroup>
        </Menu>

        <div style="width:1270px;height:100%;vertical-align:top;border:1px solid black;display:inline-block;position:relative;">
            <div style="width:100%;">
                <ul style="list-style:none;">
                    <li class="imgLi">
                        <span style="width:80px;">图片</span>
                        <span style="width:160px;">图片id</span>
                        <span style="width:160px;">用户id</span>
                        <span style="width:150px;">图片标题</span>
                        <span style="width:150px;">图片类型</span>

                        <span style="width:150px;">图片简介</span>
                        <span style="width:80px;">收藏数</span>
                        <span style="width:80px;">点击数</span>
                        <span style="width:80px;">下载数</span>
                        <span style="width:100px;">是否可见</span>
                    </li>

                    <li class="imgLi" v-for="(item,index) in showList.slice(0, 6)">
                        <img :src="item.imgUrl" style="width:50px;margin:0 15px;vertical-align:middle;"/>
                        <span style="width:160px;">{{item.imgId}}</span>
                        <span style="width:160px;">{{item.userId}}</span>
                        <span style="width:150px;padding:0 10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.imgTitle}}</span>
                        <span style="width:150px;padding:0 10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.imgType}}</span>
                        <span style="width:150px;padding:0 10px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{item.imgProfile}}</span>
                        <span style="width:80px;">{{item.imgCollection}}</span>
                        <span style="width:80px;">{{item.imgClick}}</span>
                        <span style="width:80px;">{{item.imgDownload}}</span>

                        <Button v-if="item.imgStatus==0" @click="kj(item.imgId)" style="width:100px;">设为可见</Button>
                        <Button v-else @click="bkj(item.imgId)" style="width:100px;">设为不可见</Button>
                    </li>
                </ul>
            </div>

            <div class="page" style="position:absolute;top:535px;left:900px;">
                <Page :total="total" :current="current" :page-size="size"
                      prev-text="上一页" next-text="下一页" @on-change="change"/>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "AdminImg",
        data(){
            return{
                imgList:[],
                showList:[],
                current:1,
                size:6,
            }
        },
        created: function () {
            if (this.$cookieStore.getCookie('adminUsername')) {
            } else {
                alert("还未登录")
                this.$router.push('/adminLogin');
            }

            axios.get('http://localhost:8090/fy/img/allImg')
                .then((res) => {
                    this.imgList = res.data.data
                    this.showList = res.data.data
                })
        },
        mounted(){

        },
        computed: {
            total() {
                return this.imgList.length;
            },
        },
        methods:{
            change(page){
                this.current = page;
                this.showList = [];
                for (var i = 0; i < this.size; i++) {
                    var index = (this.current - 1) * this.size + i;
                    if (index < this.imgList.length) {
                        var prod = this.imgList[index];
                        this.showList.push(prod);
                    }
                    else
                        break;
                }
            },
            kj(id){
                axios.post('http://localhost:8090/fy/img/kj', {
                    imgId:id
                }).then((res) => {
                    axios.get('http://localhost:8090/fy/img/allImg')
                        .then((res) => {
                            this.imgList = res.data.data
                            this.change(this.current)
                        })
                })
            },
            bkj(id){
                axios.post('http://localhost:8090/fy/img/bkj', {
                    imgId:id
                }).then((res) => {
                    axios.get('http://localhost:8090/fy/img/allImg')
                        .then((res) => {
                            this.imgList = res.data.data
                            this.change(this.current)
                        })
                })
            },
            adminIndex(){
                this.$router.push("/adminIndex")
            },
            addIcon(){
                this.$router.push("/upIcon")
            },
            addCategory(){
                this.$router.push("/upCategory")
            },
            addQuestion(){
                this.$router.push("/adminQuestion")
            },
            existIcon(){
                this.$router.push("/AdminIconList")
            },
            existType(){
                this.$router.push("/AdminCategoryList")
            },
            existQuestion(){
                this.$router.push("/AdminQuestionList")
            },
            loginOut(){
                var a=confirm("是否退出？")
                if(a){
                    this.$cookieStore.delCookie('adminUsername');
                    this.$router.push("/adminLogin")
                }
            },
        }
    }
</script>

<style scoped>
    .imgLi{
        margin:10px;
        padding:5px;
        border-bottom:1px solid #E2E2E2;
    }
    .imgLi > span{
        text-align: center;
        vertical-align:middle;
        display:inline-block;
    }
</style>