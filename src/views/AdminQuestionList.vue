<template>
    <div style="height:100%;">
        <Menu theme="dark" active-name="9" style="height:100%;vertical-align:top;display:inline-block;">
            <MenuGroup title="用户" @click.native="adminIndex">
                <MenuItem name="1">
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
                <MenuItem name="3" @click.native="adminImg">
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
                <MenuItem name="9">
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
                    <li class="litb">
                        <span style="width:150px;">问题id</span>
                        <span style="width:500px;">问题内容</span>
                    </li>

                    <li class="litb" v-for="item in showList.slice(0, 6)">
                        <span style="width:150px;">{{item.questionId}}</span>
                        <span style="width:500px;">{{item.question}}</span>
                    </li>
                </ul>
            </div>

            <div class="page" style="position:absolute;top:600px;left:900px;">
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
        name: "AdminQuestionList",
        data(){
            return{
                questionList:[],
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

            axios.get('http://localhost:8090/fy/question/index')
                .then((res) => {
                    this.questionList = res.data.data
                    this.showList = res.data.data
                })
        },
        mounted(){

        },
        computed: {
            total() {
                return this.questionList.length;
            },
        },
        methods:{
            change(page){
                this.current = page;
                this.showList = [];
                for (var i = 0; i < this.size; i++) {
                    var index = (this.current - 1) * this.size + i;
                    if (index < this.questionList.length) {
                        var prod = this.questionList[index];
                        this.showList.push(prod);
                    }
                    else
                        break;
                }
            },
            adminIndex(){
                this.$router.push("/adminIndex")
            },
            addIcon(){
                this.$router.push("/upIcon")
            },
            adminImg(){
                this.$router.push("/adminImg")
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
    .litb{
        margin:10px;
        padding:5px;
        border-bottom:1px solid #E2E2E2;
    }
    .litb > span{
        text-align: center;
        vertical-align:middle;
        display:inline-block;
    }
</style>