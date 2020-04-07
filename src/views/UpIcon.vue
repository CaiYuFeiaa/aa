<template>
    <div style="height:100%;">
        <Menu theme="dark" active-name="2" style="height:100%;vertical-align:top;display:inline-block;">
            <MenuGroup title="用户">
                <MenuItem name="1" @click.native="adminIndex">
                    用户管理
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="头像">
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

                <MenuItem name="5"  @click.native="addQuestion">
                    新增密保问题
                </MenuItem>
            </MenuGroup>

            <MenuGroup title="退出">
                <MenuItem name="6" @click.native="loginOut">
                    退出登录
                </MenuItem>
            </MenuGroup>
        </Menu>

        <div  id="upMain" style="margin-left:400px;display: inline-block;">
            <Input v-model="iconProfile" placeholder="点击输入头像介绍" style="width:500px;display:inline-block;" />

            <div id="upDiv">
                <Upload
                        id="imgUP"
                        ref="upload"
                        multiple
                        name="file_data"
                        type="drag"
                        :max-size="1024"
                        :format="['jpg','jpeg','png','gif']"
                        :before-upload="handleUpload"
                        :on-success="uploadSuccess"
                        :show-upload-list="false"
                        action="http://localhost:8090/fy/image/upload">

                    <div id="upCheck">
                        <Icon type="ios-cloud-upload" size="150" style="color:#3399ff;margin-top:180px;"></Icon>
                        <p style="font-size: 20px">点击选择或拖拽图片</p>
                    </div>
                </Upload>

                <div id="imgYL" >
                    <Icon type="md-close-circle" size="35" @click="closeImg()" style="float:right;margin-top:15px;margin-right:15px;cursor:pointer;"/>
                    <img id="image-yl" src="">
                </div>
            </div>

            <div v-if="file !== null">
                <Button id="upBtn" type="primary" @click="upload" :loading="loadingStatus">
                    {{ loadingStatus ? '上传中...' : '点击新增头像' }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "UpIcon",
        data(){
            return{
                file: null,
                loadingStatus: false,
                imgUrl:'',
                imgExit: false,
                iconProfile:'',
                iconImg:'',
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
        watch:{
            imgExit(){
                if (this.imgExit){
                    $("#imgUP").css("display","none")
                    $("#imgYL").css("display","inline-block")
                }else{
                    $("#imgUP").css("display","inline-block")
                    $("#imgYL").css("display","none")}
            }
        },
        methods:{
            handleUpload (file) {
                this.file = file;
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    const re = reader.result
                    $("#image-yl").attr("src",re)
                }
                this.imgExit = true;
                return false;
            },
            upload () {
                if(this.iconProfile == '' || this.iconProfile == null){
                    alert("头像介绍不能为空!")
                }else {
                    this.loadingStatus = true;
                    this.$refs.upload.post(this.file);
                }
            },
            uploadSuccess(res, file){
                this.file = null;
                this.loadingStatus = false;
                this.iconImg = res.data.fileUrl;//图片路径

                axios.post('http://localhost:8090/fy/icon/addIcon', {
                    iconProfile: this.iconProfile,
                    iconImg: this.iconImg
                }).then((res) => {
                    this.iconProfile = ''
                    this.closeImg()
                    this.$Message.success('上传成功')
                })
            },
            closeImg(){
                this.file = null;
                this.imgExit = false;
            },
            adminIndex(){
                this.$router.push("/adminIndex")
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
        },
    }
</script>

<style scoped>
    @import '../css/uploadImg.css';
</style>