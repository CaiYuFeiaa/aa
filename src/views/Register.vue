<template>
    <div id="mainReg">

        <Steps :current="current" id="regSteps">
            <Step title=""></Step>
            <Step title=""></Step>
            <Step title=""></Step>
            <Step title=""></Step>
        </Steps>
        <hr id="regHr">

        <div id="con0" style="width:100%;">
            <div style="height: 195px;">
                <div class="d1" style="top: 115px;left: 208px;animation-delay:0s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 145px;left: 220px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1s;background-color: #0175E8;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 40px;left: 175px;animation-delay:3s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:3s;background-color: #FF6501;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 30px;left: 186px;animation-delay:0.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0.5s;background-color: #B46AEB;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: 200px;animation-delay:0s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0s;background-color: #F8B904;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 95px;left: 205px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1s;background-color: #10A574;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 118px;left: 192px;animation-delay:1.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1.5s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 130px;left: 136px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #0175E8;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 80px;left: -15px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #FF6501;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: 97px;animation-delay:2.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2.5s;background-color: #B46AEB;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: -100px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #F8B904;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 55px;left: -110px;animation-delay:0.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0.5s;background-color: #10A574;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 40px;left: -5px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div id="tx">
                    <Icon type="md-person" size="100"/>
                </div>
            </div>

            <h1 style="text-align: center;">欢迎来到飞鱼图片网!</h1>
            <p class="pClass" style="margin-top: 5px;">接下来几个问题的答案会让我们对彼此更加了解</p>

            <div id="infoReg">
                <p>一个优秀的用户怎么可以没有名字呢!</p>
                <input v-model="uname" style="width:80%;border:none;border-bottom:1px solid #E2E2E2;outline:none;" @blur="checkName" />

                <p style="margin-top: 20px;">账号是每个用户不可或缺的一部分!</p>
                <Input v-model="username" prefix="ios-contact" placeholder="输入账号" style="width: 80%;" @on-blur="checkUsername" />

                <p style="margin-top:20px;">一个好的密码真的可以让人摸不着头脑!</p>
                <Input v-model="password" prefix="ios-lock" type="password" password placeholder="输入密码" style="width:80%;" />
            </div>
        </div>

        <div id="con1" style="width:100%;display:none;">
            <div style="height: 195px;">
                <div class="d1" style="top: 115px;left: 208px;animation-delay:0s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 145px;left: 220px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1s;background-color: #0175E8;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 40px;left: 175px;animation-delay:3s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:3s;background-color: #FF6501;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 30px;left: 186px;animation-delay:0.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0.5s;background-color: #B46AEB;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: 200px;animation-delay:0s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0s;background-color: #F8B904;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 95px;left: 205px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1s;background-color: #10A574;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 118px;left: 192px;animation-delay:1.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:1.5s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 130px;left: 136px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #0175E8;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 80px;left: -15px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #FF6501;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: 97px;animation-delay:2.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2.5s;background-color: #B46AEB;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 50px;left: -100px;animation-delay:2s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #F8B904;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 55px;left: -110px;animation-delay:0.5s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:0.5s;background-color: #10A574;">
                        </div>
                    </div>
                </div    >
                <div class="d1" style="top: 40px;left: -5px;animation-delay:1s;">
                    <div class="d2">
                        <div class="d3" style="animation-delay:2s;background-color: #E60023;">
                        </div>
                    </div>
                </div    >
                <div style="width: 100px;height: 100px;border-radius: 50%;position: absolute;top: 120px;left: 225px;background-color: #E2E2E2;overflow: hidden;z-index: 10;">
                    <Icon type="ios-lock" size="100"/>
                </div>
            </div>

            <h1 style="text-align: center;">设置账号密保</h1>
            <p class="pClass" style="margin-top: 10px;">密保问题用于账号被盗,或忘记密码时找回账号,</p>
            <p class="pClass" style="margin-top: 10px;">切记不要轻易将密保答案告诉他人!!!</p>

            <p style="margin-top:20px;margin-left:10%;font-weight: bold;">密保问题:</p>
            <Select v-model="sel" style="width:80%;margin-top:10px;margin-left:10%;">
                <Option v-for="item in questionList" :value="item.question">{{ item.question }}</Option>
            </Select>

            <p style="margin-top:15px;;margin-left:10%;font-weight: bold;">密保答案:</p>
            <Input v-model="mbda" placeholder="密保答案" style="width:80%;margin-top:10px;margin-left:10%;" />
        </div>

        <div id="con2" style="width:100%;display:none;">
            <h1 style="text-align: center;">选择五个你感兴趣的选项</h1>

            <div id="allInterest" style="width:90%;height:400px;margin-left:5%;overflow-y:auto;">
                <!--<div class="interestDiv" @click="optInterest(0)">0</div>-->
                <div class="xzlx" v-for="(item,index) in categoryList">
                    <img class="lxtp" @click="optInterest($event,index)" :src="item.categoryImg"/>
                    <p class="lxmc">{{item.categoryName}}</p>
                </div>
            </div>

            <p style="margin-top: 15px;font-weight: bold;text-align: center;">{{optNum}}/5</p>
        </div>

        <div id="con3" style="width:100%;display:none;">
            <h1 style="text-align: center;">欢迎加入飞鱼</h1>

            <div style="width: 70%;margin-left: 15%;border-radius: 50%;overflow: hidden;">
                <img src="http://image-db04.test.upcdn.net/d78ca4ae-62f6-4c6f-bd69-a9a43f72936c.jpg" style="width: 100%;">
            </div>

            <h2 style="margin-top:10px;font-weight:bold;text-align:center;">点击下一步开始新的旅程吧!</h2>
        </div>

        <div style="width:100%;position:absolute;top:570px;">
            <Button id="regNextBtn" type="primary" @click="nextClick">下一步</Button>
            <p style="margin-top:15px;font-weight:bold;text-align:center;">
                <router-link  :to="{path:'/Login'}" >使用现有账号登录</router-link>
            </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import $ from 'jquery'

    export default {
        name: "register",
        data () {
            return {
                current: 0,
                questionList:[],
                uname:'',
                username:'',
                password:'',
                typeList:[],
                nameNull:false,
                usernameNull:false,
                passNull:false,
                nameCanUse:false,
                usernameCanUse:false,
                sel:'',
                mbda:'',
                optNum:0,
                categoryList:[],
            }
        },
        created: function () {
            //向后端获取所有的密保问题
            axios.get('http://localhost:8090/fy/question/index')
                .then((res) => {
                    this.questionList = res.data.data;
                })
            //向后端获取所有的图片类型
            axios.get('http://localhost:8090/fy/category/index')
                .then((res) => {
                    this.categoryList = res.data.data;
                })
        },
        mounted(){

        },
        watch:{
            uname(){
                if(this.uname != '' && this.uname != null){
                    this.nameNull = true;
                }else {
                    this.nameNull = false;
                }
            },
            username(){
                if(this.username != '' && this.username != null){
                    this.usernameNull = true;
                }else {
                    this.usernameNull = false;
                }
            },
            password(){
                if(this.password != '' && this.password != null){
                    this.passNull = true;
                }else {
                    this.passNull = false;
                }
            }
        },
        methods: {
            checkName(){//检查name有无重复
                if(this.uname != ''){
                    axios.post('http://localhost:8090/fy/user/findExitName', {
                        uname: this.uname
                    }).then((res) => {
                        // console.log(res.data)
                        this.nameCanUse = res.data;
                    })
                }
            },
            checkUsername(){//检查username有无重复
                if(this.username != ''){
                    axios.post('http://localhost:8090/fy/user/findExitUsername', {
                        username: this.username
                    }).then((res) => {
                        this.usernameCanUse = res.data;
                    })
                }
            },
            next(){//切换到下一个步骤页面
                if (this.current == 3) {
                    $("#regNextBtn").css("display","none")
                } else {
                    this.current += 1;
                }

                for(var i = 0;i < 4;i++){
                    if(this.current == i){
                        $("#con"+this.current).css("display","inline-block")

                        for(var j = 0;j < 4;j++){
                            if(j != i){
                                $("#con"+j).css("display","none")
                            }
                        }
                        break;
                    } else {
                        continue;
                    }
                }
            },
            optInterest(e,i){//步骤3选5个兴趣项
                if(this.optNum < 5){
                    this.optNum++;
                    $(e.target).toggleClass("opacityDiv")
                    this.typeList.push(i)
                }else {
                    console.log(this.typeList)
                }
            },
            nextClick() {//点击下一步后的动作
                if(this.current == 0){
                    if(!this.nameNull){
                        alert("还未取名")
                    }else if(!this.usernameNull){
                        alert("还未填写账号")
                    }else if(!this.passNull){
                        alert("还未填写密码")
                    }else if(!this.nameCanUse){
                        alert("该名称已被使用")
                    }else if(!this.usernameCanUse){
                        alert("该账号已被使用")
                    }

                    if(this.nameNull && this.usernameNull && this.passNull && this.nameCanUse && this.usernameCanUse){
                        this.next()
                    }
                } else if(this.current == 1){
                    if(this.sel == ''){
                        alert("还未选择密保问题")
                    }else if(this.mbda == ''){
                        alert("还未填写密保答案")
                    }else {
                        this.next()
                    }
                } else if(this.current == 2){
                    if(this.optNum < 5){
                        alert("兴趣选项还未选满五项")
                    }else {
                        console.log(this.interest)
                        this.next();
                    }
                }else if(this.current == 3){
                    axios.post('http://localhost:8090/fy/user/reg', {
                        name: this.uname,
                        username: this.username,
                        password: this.password,
                        question: this.sel,
                        answer: this.mbda,
                        interest:this.typeList
                    }).then((res) => {
                        this.$cookieStore.setCookie( 'username' ,this.username,86400);
                        this.$router.push('/');
                    })
                }

            },

        }
    }
</script>

<style scoped>
    @import '../css/register.css';

    .opacityDiv{
        opacity:0.5;
    }
    .xzlx{ /*选择类型*/
        width:155px;
        height:155px;
        margin-left:5px;
        padding-top:5px;
        padding-left:7px;
        border-radius:5px;
        position:relative;
        display:inline-block;
        overflow:hidden;
    }
    .lxtp{
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