<template>
    <div style="height:100%;">
        <Menu theme="dark" active-name="5" style="height:100%;vertical-align:top;display:inline-block;">
            <MenuGroup title="用户">
                <MenuItem name="1" @click.native="adminIndex">
                    用户管理
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="头像" @click.native="addIcon">
                <MenuItem name="7" @click.native="existIcon">
                    已有头像
                </MenuItem>

                <MenuItem name="2">
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
                <MenuItem name="9" @click.native="existQuestion">
                    已有密保问题
                </MenuItem>

                <MenuItem name="5">
                    新增密保问题
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="退出">
                <MenuItem name="6" @click.native="loginOut">
                    退出登录
                </MenuItem>
            </MenuGroup>
        </Menu>

        <div style="width:1270px;height:100%;padding-top:170px;padding-left:300px;vertical-align:top;display:inline-block;">
            <Input v-model="question" placeholder="输入密保问题" style="width:60%" />
            <Button type="primary" style="width:60%;margin-top:50px" @click="addQuestion">点击新增</Button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "AdminQuestion",
        data(){
            return{
                question:'',
            }
        },
        created: function () {
            if (this.$cookieStore.getCookie('adminUsername')) {
            } else {
                alert("还未登录")
                this.$router.push('/adminLogin');
            }
        },
        mounted(){

        },
        methods:{
            addQuestion(){
                if(this.question == '' || this.question == null){
                    alert("密保问题不能为空!")
                }else{
                    axios.post('http://localhost:8090/fy/question/addQuestion', {
                        question:this.question
                    }).then((res) => {
                        this.question = ''
                        alert("新增成功")
                    })
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
        },

    }
</script>

<style scoped>

</style>