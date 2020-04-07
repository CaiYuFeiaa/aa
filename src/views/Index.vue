<template>
    <div id="mainIndex" @mousemove="mainMove($event)">
        <div id="moveCursor">
        </div>
        <div id="moveCursor2">
        </div>
        <div id="checkIt">
        </div>
        <div id="menu_link" onselectstart="return false;" @click="menuClick()" @mouseenter="menuEnter()" @mouseout="menuOut()">
            上传.
        </div>
        <svg id="shape-overlays" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path id="shape-overlays__path"></path>
        </svg>

        <Drawer title="我的收藏" placement="left" width="520" :closable="false" v-model="value1">
            <div v-for="item in collImgList">
                <div @click="imgClick(item.imgId)" style="width:400px;max-height:200px;margin-top:5px;cursor:pointer;">
                    <img :src="item.imgUrl" style="width:400px;max-height:200px;"/>
                </div>
            </div>
        </Drawer>

        <Drawer title="我的关注" placement="left" width="520" :closable="false" v-model="value2">
            <div v-for="item in collUserList" @click="userDetails(item.userId)" style="cursor:pointer;">
                <div style="width:150px;height:150px;margin:5px 0 0 50px;border-radius:50%;display:inline-block;overflow:hidden;">
                    <img :src="item.userIcon" style="width:150px;height:150px;">
                </div>
                <div style="display:inline-block;">
                    <h2 >{{item.name}}</h2>
                    <h3>{{item.userFans}}位粉丝</h3>

                </div>
            </div>
        </Drawer>

        <Drawer title="站内消息" placement="left" width="520" :closable="false" v-model="value3">
            <div  v-for="item in newsList" style="position:relative;height:94px;margin-bottom:10px;"><!--:style="{backgroundColor: item.newsLook==1 ? '#00fffd' : 'red'}"-->
                <div style="width:50px;height:50px;border-radius:50%;display:inline-block;vertical-align:middle;overflow:hidden;">
                    <img :src="item.userIcon" style="width:50px;">
                </div>
                <span style="display:inline-block;vertical-align:middle;">{{item.name}}</span>
                <span style="margin-left:163px;color:#43acf0;display:inline-block;vertical-align:middle;">{{item.createTime.substring(0,10)}}</span>
                <span><Icon type="md-close-circle" size="22" @click="delNews(item.newsId)" title="删除该消息!" style="margin-left:10px;vertical-align:middle;cursor:pointer;"/></span>

                <div style="padding:10px;border-radius:8px;border:1px solid black;display:inline-block;position:absolute;top:44px;left:40px;">
                    <span>我刚发布了新作品,快来看看吧!</span>
                    <a href="#" @click="newsClick(item.newsCon,item.newsId)">点击跳转</a>
                </div>

                <span v-if="item.newsLook==0" style="font-size:20px;font-weight:bold;color:#43ACF0;position:absolute;top:52px;left:315px;">新</span>
            </div>
        </Drawer>

        <div style="width:100%;position:fixed;top:0px;left:0px;background-color:#F7EFE7;z-index:1000;">
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
                    <div @click="userDetails(infoUser.userId)" style="width:50px;height:50px;border-radius:50%;display:inline-block;vertical-align:middle;overflow:hidden;">
                        <img :src="infoUser.userIcon" style="width:50px;cursor:pointer;"/>
                    </div>
                    <div class="rightDiv" @click="mineInfo" :title="infoUser.name" style="width:60px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">{{infoUser.name}}</div>
                    <div class="rightDiv" @click="value1 = true">收藏</div>
                    <div class="rightDiv" @click="value2 = true">关注</div>
                    <div class="rightDiv" @click="value3 = true">消息</div>
                    <div class="rightDiv" @click="loginOut">退出登录</div>
                </div>
            </div>

            <div style="border-bottom:1px solid #dae2e1;">
                <h2 style="text-align:center;">你好,{{infoUser.name}}!你的页面这些主题组成</h2>

                <div style="width:100%;display:flex;justify-content:center;align-items:center;">
                    <div class="myInterestDiv" v-for="(item,index) in myInterest"  @mouseenter="myInterestDivEnter(index)" @mouseout="myInterestDivOut(index)">
                        <img :src="item.categoryImg" style="width:115px">
                        <div class="typeName">{{item.categoryName}}</div>
                    </div>

                    <Icon id="edit" @click="editInter" title="点击编辑" type="md-create" size="30" />
                </div>
            </div>
        </div>

        <div id="waterfall">
            <div class="lie" v-for="(item,index) in infoImg">
                <div class="water">
                    <img :src="item.imgUrl" @click="imgClick(item.imgId)" title="点击查看详情"/>
                </div>

                <Icon v-if="item.b" class="iconCollection" @click="cancelImg(item.imgId)" type="md-heart" size="20" title="取消收藏"/>
                <Icon v-else class="iconCollection" @click="collectionImg(item.imgId)" type="md-heart-outline" size="20" title="点击收藏"/>

                <a class='downloadImg' @click="download(item.imgId)" href='#' :download='item.imgUrl' title="点击下载图片">
                    <Icon type="md-download" size="20" />
                </a>
            </div>
        </div>

        <div id="bbb">
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
                                        <img class="lxtp" @click="chooseType($event)" :src="item.categoryImg" style="width:185px;position:absolute;top:0px;left:0px;"/>
                                    </Checkbox>
                                    <p class="lxmc">{{item.categoryName}}</p>
                                </div>
                            </CheckboxGroup>
                        </div>
                        <div style="width:99%;height:5px;background-color:#C8E9EC;"></div>
                    </div>

                    <div v-if="file !== null">
                        <Button id="upBtn"  type="primary" @click="upload" :loading="loadingStatus">
                            {{ loadingStatus ? '上传中...' : '点击上传动态' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "index",
        data(){
            return{
                numPoints:2,
                duration:600,
                delayPointsArray:[],
                timeStart:Date.now(),
                isOpened:false,
                infoUser:[],
                infoImg:[],
                imgListLen:0,//图片数组长度
                arr:[0,0,0,0,0,0],// 瀑布流高度
                myInterest:[],//我的兴趣选项
                collection:false,//是否已收藏
                exist:false,//是否已登录
                searchV:'',
                optionV:'img',
                value1: false,
                value2: false,
                value3: false,
                collImgList:[],
                collUserList:[],
                newsList:[],
// ---------------------------------------------------
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
                typeListNull:false,
                imgTitleNull:false,
                imgProfileNull:false,
                imgPriceNull:false
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

                //向后端获取所有的图片类型
                axios.get('http://localhost:8090/fy/category/index')
                    .then((res) => {
                        this.categoryList = res.data.data;
                    })
                //向后端获取用户关注的图片
                axios.post('http://localhost:8090/fy/img/collImg', {
                    username: this.$cookieStore.getCookie('username')
                }).then((res) => {
                    this.collImgList = res.data.data;
                })
                //向后端获取用户关注的人
                axios.post('http://localhost:8090/fy/user/collUser', {
                    username: this.$cookieStore.getCookie('username')
                }).then((res) => {
                    this.collUserList = res.data.data;
                })
                //向后端获取用户的消息
                axios.post('http://localhost:8090/fy/news/index', {
                    username: this.$cookieStore.getCookie('username')
                }).then((res) => {
                    this.newsList = res.data.data;
                })
            } else {
                alert("还未登录")
                this.$router.push('/Login');
                this.exist = false
            }

        },
        mounted(){
            if(this.exist){
                axios.post('http://localhost:8090/fy/img/interestImg',{
                    username: this.$cookieStore.getCookie('username')
                }).then((res) => {
                    this.infoImg = res.data.data
                    this.imgListLen = this.infoImg.length
                    this.$nextTick(() => {
                        this.putImg()
                    })
                })

                axios.post('http://localhost:8090/fy/category/myInterest',{
                    username: this.$cookieStore.getCookie('username')
                }).then((res) => {
                    this.myInterest = res.data.data
                })
            }else{
                axios.get('http://localhost:8090/fy/img/allImg')
                    .then((res) => {
                        this.infoImg = res.data.data
                        this.imgListLen = this.infoImg.length
                        this.$nextTick(() => {
                            this.putImg()
                        })
                    })
            }

            if (this.$cookieStore.getCookie('username')) {
                var username=this.$cookieStore.getCookie('username')

                axios.post('http://localhost:8090/fy/user/oneUser', {
                    username: username
                }).then((res) => {
                    this.infoUser = res.data.data
                })
                this.exist = true
            } else {
                // alert("还未登录")
                // this.$router.push('/Login');
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
            cubicOut(t){
                const f = t - 1.0;
                return f * f * f + 1.0;
            },
            cubicInOut(t){
                return t < 0.5
                    ? 4.0 * t * t * t
                    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
            },
            menuClick() {
                $("#menu_link").css('animation','none');
                for (var i = 0; i < this.numPoints; i++) {
                    this.delayPointsArray[i] = 0;
                }
                this.isOpened = !this.isOpened
                this.timeStart = Date.now();

                this.renderLoop()
                this.isOpened?
                    $("#menu_link").css({'border':'1px dashed #A39D98','animation': 'circularFlip 0.6s'}):
                    $("#menu_link").css({'border': '1px solid #dc3545','animation': 'circularFlip2 0.6s'})

                this.isOpened?
                    setTimeout(function () {$("#menu_link").text('返回.')},250):
                    setTimeout(function () {$("#menu_link").text('上传.')},250)

                this.isOpened?
                    $("#bbb").css({'display':'block','animation': 'opacityCursor 2s'}):
                    $("#bbb").css('display','none')

            },
            renderLoop() {
                $("#shape-overlays__path").attr('d', this.updatePath(Date.now() - this.timeStart));

                if (Date.now() - this.timeStart < this.duration ) {
                    requestAnimationFrame(() => {
                        this.renderLoop();
                    });
                }
            },
            updatePath(time) {
                const points = [];
                for (var i = 0; i < this.numPoints; i++) {
                    const thisEase = this.isOpened ?
                        (i == 1) ? this.cubicOut : this.cubicInOut:
                        (i == 1) ? this.cubicInOut : this.cubicOut;
                    points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
                }

                let str = "";
                str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
                for (var i = 0; i < this.numPoints - 1; i++) {
                    const p = (i + 1) / (this.numPoints - 1) * 100;
                    const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                    str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
                }
                str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
                return str;
            },
            mainMove(e){
                $("#moveCursor").css({'transform':'translate('+e.clientX +'px,'+e.clientY+'px)','animation': 'opacityCursor 0.2s'})
                $("#moveCursor2").css({'transform':'translate('+e.clientX +'px,'+e.clientY+'px)','animation': 'opacityCursor 0.2s'})
            },
            menuEnter(){
                $("#moveCursor2").css('display','none')
                $("#checkIt").css('display','block').offset({ top: (90-37+32), left: (1428-37+32)})
            },
            menuOut(){
                $("#moveCursor2").css('display','block')
                $("#checkIt").css('display','none')
            },
            myInterestDivEnter(i){
                $(".myInterestDiv:eq("+i+")").css('opacity','0.8')
                $(".myInterestDiv:eq("+i+") > .typeName").css('transform','translateY(-20px)')
            },
            myInterestDivOut(i){
                $(".myInterestDiv:eq("+i+")").css('opacity','1')
                $(".myInterestDiv:eq("+i+") > .typeName").css('transform','translateY(0px)')
            },
            editInter(){
                this.$router.push("/editInterest")
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
            findMaxIndex() {
                var maxIndex = this.arr[0];
                var index = 0;

                for (var i = 0;i < this.arr.length;i++) {
                    if (maxIndex < this.arr[i]){
                        maxIndex = this.arr[i]
                        index = i;
                    }
                }
                return index;
            },
            putImg() {
                for(var i = 0;i < this.imgListLen;i++){
                    if(i < 6){
                        $(".lie:eq("+i+")").css({top:10,left:250*i})
                        this.arr[i] = this.infoImg[i].imgHeight + 10
                    }else {
                        $(".lie:eq("+i+")").css({top:20+this.arr[this.findMinIndex()],left:250*this.findMinIndex()})
                        this.arr[this.findMinIndex()] +=  this.infoImg[i].imgHeight + 30
                    }

                    $("#mainIndex").css("height",this.arr[this.findMaxIndex()]+222+30)
                    $(".lie:eq("+i+") > a").css({top:this.infoImg[i].imgHeight-15})
                    $(".lie:eq("+i+") > .iconCollection").css({top:this.infoImg[i].imgHeight-15})
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
            newsClick(imgId,newsId){
                axios.post('http://localhost:8090/fy/news/yd',{
                    newsId:newsId
                }).then((res) => {
                })

                axios.post('http://localhost:8090/fy/img/imgClick',{
                    imgId: imgId
                }).then((res) => {
                    this.$store.commit("setImgId",imgId)
                    this.$router.push('/ImgDetails')
                })
            },
            delNews(id){
                var a=confirm("是否删除此条消息？")
                if(a){
                    axios.post('http://localhost:8090/fy/news/delNews',{
                        newsId:id
                    }).then((res) => {
                        axios.post('http://localhost:8090/fy/news/index', {
                            username: this.$cookieStore.getCookie('username')
                        }).then((res) => {
                            this.newsList = res.data.data;
                        })
                    })
                }
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
                    axios.post('http://localhost:8090/fy/img/interestImg',{
                        username: this.$cookieStore.getCookie('username')
                    }).then((res) => {
                        this.infoImg = res.data.data
                        this.imgListLen = this.infoImg.length
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
                    axios.post('http://localhost:8090/fy/img/interestImg',{
                        username: this.$cookieStore.getCookie('username')
                    }).then((res) => {
                        this.infoImg = res.data.data
                        this.imgListLen = this.infoImg.length
                        this.$nextTick(() => {
                            this.putImg()
                        })
                    })
                })
            },
            searchSomething(){
                if(this.searchV==''){

                }else {
                    if(this.optionV == 'img'){
                        this.$router.push({name:'imgList',params:{title:this.searchV}})
                    }else {
                        this.$router.push({name:'userList',params:{username:this.searchV}})
                    }
                }
            },
            userDetails(id){
                this.$router.push({name:'userDetails',params:{userId:id}})
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
// ----------------------------------------------------------------
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

                    alert('上传成功')
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
        },
    }
</script>

<style scoped>
    @import '../css/index.css';

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
    .myInterestDiv{
        width:100px;
        height:100px;
        margin:10px;
        position:relative;
        border-radius:10px;
        display:inline-block;
        overflow:hidden;
        cursor:pointer;
        /*z-index: 9999;*/
    }
    .typeName{
        width:100%;
        background-color:#E2E2E2;
        position:absolute;
        left:0;
        top:100px;
        font-size:15px;
        font-weight:bold;
        text-align:center;
        transition: all 0.2s linear;
    }
    #edit{
        width:60px;
        height:60px;
        margin:10px;
        border-radius:50%;
        background-color:#EFEFEF;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#8E8E8E;
        cursor:pointer;
        /*z-index: 9999;*/
    }
    #waterfall{
        width: 100%;
        position: relative;
        top: 222px;
        /*background-color: #F7EFE7;*/
        /*overflow: hidden;*/
    }
    .lie{
        width: 250px;
        padding: 8px;
        position: absolute;
        display: inline-block;
        cursor:pointer;
        /*transition: all 4s linear;*/
    }
    #edit , .lie :hover{
        opacity: 0.8;
        transform: scale(1.1);
    }
    .water{
        width: 100%;
        border-radius: 20px;
        overflow: hidden;
    }
    .water > img{
        width: 100%;
        /*display: block;*/
    }
    .downloadImg{
        position: absolute;
        /*color: white;*/
        left:85%;
    }
    .iconCollection{
        position: absolute;
        color:#2D8CF0;
        left:75%;
        cursor:pointer;
    }
    #bbb{
        width:100%;
        height:100%;
        border:1px solid black;
        display:none;
        position:fixed;
        top:0;
        left: 0;
        /*opacity: 0;*/
        z-index:9999;
    }
    /*--------------------------------------------------------------*/
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
        border:1px solid black;
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
        position: relative;
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
    .lxmc{ /*类型名称*/
        font-weight:bold;
        color:white;
        position:absolute;
        left:5px;
        top:140px;
    }
</style>