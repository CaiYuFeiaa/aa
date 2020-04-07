<template>
    <div id="upMain">
        <div style="margin-left:100px;vertical-align:top;display:inline-block;">
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

                <div id="imgYL">
                    <Icon type="md-close-circle" size="35" @click="closeImg()" style="float:right;margin-top:15px;margin-right:15px;cursor:pointer;"/>
                    <img id="image-yl" ref="imgYlInfo" src="">
                </div>
            </div>
        </div>

        <div id="sctpxx">
            <Input v-model="imgTitle" size="large" placeholder="点击添加图片标题" style="width:500px;" />

            <Input v-model="imgProfile" maxlength="500" :rows="4" show-word-limit type="textarea" placeholder="说点什么吧" style="width:500px;margin-top:10px;" />

            <Input v-model="imgPrice" @on-blur="checkPrice" size="large" placeholder="下载所需金币(需为整数)" style="width:500px;margin-top:10px;" />

            <div id="lxk">
                <p>点击选择图片类型</p>
                <div id="scrolllx">
                    <CheckboxGroup v-model="typeList">
                        <div class="xzlx" v-for="item in categoryList"><!--v-bind:style="{ 'background-image': 'url(' + item.categoryImg + ')','background-repeat':'no-repeat','background-size':'cover' }"-->
                            <Checkbox :label="item.categoryType" style="width:100%;height:100%;">
                                <img class="lxtp" @click="chooseType($event)" :src="item.categoryImg"/>
                            </Checkbox>
                            <p class="lxmc">{{item.categoryName}}</p>
                        </div>
                    </CheckboxGroup>
                </div>
            </div>

            <div v-if="file !== null">
                <Button id="upBtn"  type="primary" @click="upload" :loading="loadingStatus">
                    {{ loadingStatus ? '上传中...' : '点击上传动态' }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "UploadImg",
        data(){
            return{
                file: null,
                loadingStatus: false,
                imgTitle:'',
                imgProfile:'',
                imgPrice:'',
                imgUrl:'',
                imgHeight:0,
                imgWidth:0,
                imgExit: false,
                typeList:[],
                priceREG:false,
                categoryList:[],
                infoUser:[],
                exist:false,
                typeListNull:false,
                imgTitleNull:false,
                imgProfileNull:false,
                imgPriceNull:false
            }
        },
        created: function () {
            //向后端获取所有的图片类型
            axios.get('http://localhost:8090/fy/category/index')
                .then((res) => {
                    this.categoryList = res.data.data;
                })
        },
        mounted(){
            // console.log(this.$cookieStore.getCookie('username'))
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
        },
        watch:{
            imgExit(){
                if (this.imgExit){
                    $("#imgUP").css("display","none")
                    $("#imgYL").css("display","inline-block")
                }else{
                    $("#imgUP").css("display","inline-block")
                    $("#imgYL").css("display","none")}
            },
            typeList(){
                if(this.typeList != '' || this.typeList != null){
                    this.typeListNull = true
                }else{
                    this.typeListNull = false
                }
            },
            imgTitle(){
                if(this.imgTitle != '' || this.imgTitle != null){
                    this.imgTitleNull = true
                }else{
                    this.imgTitleNull = false
                }
            },
            imgProfile(){
                if(this.imgProfile != '' || this.imgProfile != null){
                    this.imgProfileNull = true
                }else{
                    this.imgProfileNull = false
                }
            },
            imgPrice(){
                if(this.imgPrice != '' || this.imgPrice != null){
                    this.imgPriceNull = true
                }else {
                    this.imgPriceNull = false
                }
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
                if(!this.typeListNull){
                    alert("还未选择图片类型!")
                }else if(!this.imgTitleNull){
                    alert("还未填写图片标题!")
                }else if(!this.imgProfileNull){
                    alert("还未填写图片简介!")
                }else if(!this.imgPriceNull){
                    alert("还未填写下载图片所需金币!")
                }

                if(this.typeListNull && this.imgTitleNull && this.imgProfileNull && this.imgPriceNull){
                    this.imgWidth = this.$refs.imgYlInfo.offsetWidth
                    this.imgHeight = this.$refs.imgYlInfo.offsetHeight

                    this.loadingStatus = true;
                    this.$refs.upload.post(this.file);
                }
            },
            uploadSuccess(res, file){
                this.file = null;
                this.loadingStatus = false;
                this.imgUrl = res.data.fileUrl;

                axios.post('http://localhost:8090/fy/img/upImg', {
                    userId: this.infoUser.userId,
                    imgType:this.typeList,
                    imgTitle:this.imgTitle,
                    imgUrl:this.imgUrl,
                    imgProfile:this.imgProfile,
                    imgPrice:this.imgPrice,
                    imgWidth:this.imgWidth,
                    imgHeight:this.imgHeight
                }).then((res) => {
                    this.closeImg()
                    this.typeList = []
                    this.imgTitle = ''
                    this.imgUrl = ''
                    this.imgProfile = ''
                    this.imgPrice = ''
                    $(".lxtp").removeClass("opacityDiv")

                    this.$Message.success('上传成功')
                })
            },
            closeImg(){
                this.file = null;
                this.imgExit = false;
            },
            checkPrice(){
                let reg = /^[0-9]*$/;
                if(!reg.test(this.imgPrice)) {
                    alert("下载价格需为整数!")
                    this.imgPrice = ''
                }
            },
            chooseType(e){
                $(e.target).toggleClass("opacityDiv")
            },
            loginOut(){
                var a=confirm("是否退出？")
                if(a){
                    this.$cookieStore.delCookie('username');
                    this.$router.push("/login")
                }
            },
        },
    }
</script>

<style scoped>
    @import '../css/uploadImg.css';

    .opacityDiv{
        opacity:0.5;
    }
    #sctpxx{ /*上传图片信息*/
        width:500px;
        margin-left:20px;
        vertical-align:top;
        display:inline-block;
    }
    #lxk{ /*类型框*/
        margin:10px 0;
        border:1px solid #E2E2E2;
        border-radius:5px;
    }
    #lxk > p{
        margin:10px 0;
        font-weight:bold;
        text-align:center;
        font-size:1.25em;
    }
    #scrolllx{ /*类型图片滑轮*/
        width:500px;
        height:308px;
        overflow-y:auto;
    }
    .xzlx{ /*选择类型*/
        width:160px;
        height:160px;
        margin-left:5px;
        padding-top:5px;
        padding-left:7px;
        border-radius:5px;
        position:relative;
        display:inline-block;
        overflow:hidden;
    }
    .lxtp{ /*类型图片*/
        width:185px;
        position:absolute;
        top:0px;
        left:0px;
    }
    .lxmc{ /*类型名称*/
        font-weight:bold;
        color:white;
        position:absolute;
        left:5px;
        top:140px;
    }
</style>