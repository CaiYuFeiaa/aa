const ease = {
    cubicOut: (t) => {
        const f = t - 1.0;
        return f * f * f + 1.0;
    },
    cubicInOut: (t) => {
        return t < 0.5
            ? 4.0 * t * t * t
            : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
}

var numPoints = 2;
var duration = 600;
var delayPointsArray = [];
var timeStart = Date.now();
var isOpened = false;

$("#menu_link").click(function () {
    console.log("menu")
    $("#menu_link").css('animation','none');
    for (var i = 0; i < numPoints; i++) {
        delayPointsArray[i] = 0;
    }
    isOpened = !isOpened
    timeStart = Date.now();

    renderLoop()
    isOpened?
        $("#menu_link").css({'border':'1px dashed #A39D98','animation': 'circularFlip 0.6s'}):
        $("#menu_link").css({'border': '1px solid #dc3545','animation': 'circularFlip2 0.6s'})

    setTimeout(function () {
        isOpened?$("#menu_link").text('Home.'):$("#menu_link").text('menu.')
    },250)
})

function renderLoop() {
    $("#shape-overlays__path").attr('d', updatePath(Date.now() - this.timeStart));

    if (Date.now() - timeStart < duration ) {
        requestAnimationFrame(() => {
            renderLoop();
        });
    }
}

function updatePath(time) {
    const points = [];
    for (var i = 0; i < numPoints; i++) {
        const thisEase = isOpened ?
            (i == 1) ? ease.cubicOut : ease.cubicInOut:
            (i == 1) ? ease.cubicInOut : ease.cubicOut;
        points[i] = thisEase(Math.min(Math.max(time - delayPointsArray[i], 0) / duration, 1)) * 100
    }

    let str = "";
    str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
    for (var i = 0; i < numPoints - 1; i++) {
        const p = (i + 1) / (numPoints - 1) * 100;
        const cp = p - (1 / (numPoints - 1) * 100) / 2;
        str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
    }
    str += (isOpened) ? `V 0 H 0` : `V 100 H 0`;
    // console.log(str)
    return str;
}

$("html").mousemove(function (e) {
    $("#moveCursor").css({'transform':'translate('+e.clientX+'px,'+e.clientY+'px)','animation': 'opacityCursor 0.1s'})
    $("#moveCursor2").css({'transform':'translate('+e.clientX+'px,'+e.clientY+'px)','animation': 'opacityCursor 0.1s'})
})

$("#menu_link").hover(function (e) {
    $("#moveCursor2").css('display','none')
    $("#checkIt").css('display','block').offset({ top: (43-37+32), left: (1428-37+32)})
})

$("#menu_link").mouseout(function (e) {
    $("#moveCursor2").css('display','block')
    $("#checkIt").css('display','none')
})

export default {}
