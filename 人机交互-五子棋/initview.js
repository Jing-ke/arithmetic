//获取画布
var chess = document.getElementById("chess"),
    context = chess.getContext('2d');

context.strokeStyle = '#000'; //设置画笔颜色
// 初始化界面
window.onload = function init() {
    drawview();
}
// 绘制界面
function drawview() {
    // 绘制网格
    for (var i = 0; i < 15; i++) {
        context.moveTo(15, 15 + i * 30);
        context.lineTo(435, 15 + i * 30);
        context.stroke();
        context.moveTo(15 + i * 30, 15);
        context.lineTo(15 + i * 30, 435);
        context.stroke();
    }
}
//  根据所下位置以及棋的颜色设置棋子样式以及位置
var oneStep = function (i, j, me) {
    // 设置路径
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    // 设置填充
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 15, 15 + i * 30, 15 + j * 30, 0);
    // 根据棋子颜色设置填充
    // true 为黑色棋子  false为白色棋子
    if (me) {
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
    } else {
        gradient.addColorStop(0, '#d1d1d1');
        gradient.addColorStop(1, '#f9f9f9');
    }
    context.fillStyle = gradient;
    context.fill();
}

// 鼠标点击落子
var me = true; //默认棋子为黑色
chess.onclick = function (e) {
    // if(!me){
    //     return;
    // }
    // 判断游戏是否结束，默认为false
    if(over){
        return;
    }
    var x = e.offsetX,
        y = e.offsetY,
        i = Math.floor(x / 30),
        j = Math.floor(y / 30);
    // 判断当前i，j位置上是否有棋子，没有棋子默认为0，黑棋子时为1，白棋子为2；
    if(chessBorad[i][j] == 0){
        oneStep(i, j, me)
        chessBorad[i][j] = 1;
        // 落下后棋子统计
        for(var k = 0; k < count; k++){
            if(wins[i][j][k]){   //某种赢的某子true
                myWin[k]++;
                computerWin[k] = 6;
                if(myWin[k] == 5 ){ //达到5就赢
                    window.alert("Win");
                    // 游戏结束
                    over = true;
                }
            }
        }
        // 计算机下
        if(!over){
            me = !me;
            computerAI();
        }
       
    }
}

var computerAI = function(){
    // 定义两个数组，用于存放每个点的分值
    var myScore = [],
        computerScore = [];
    var max = 0;  //落子的价值
    var u = 0, v = 0; //落子的坐标
    for(var i=0; i<15; i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0; j<15; j++){
            myScore[i][j] = 0;
        computerScore[i][j] = 0;
        }
    }
    // 为所有赢法打分
    for(var i=0; i<15; i++){
        for(var j=0; j<15;j++){
            if(chessBorad[i][j] == 0){ //该点可下棋
                for(var k=0; k<count; k++){  //遍历所有赢法
                    if(wins[i][j][k]){ //该中赢法已经有子
                        // 人分值
                        if(myWin[k] == 1){ //黑子，有一个子
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 400;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 2000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 10000;
                        }
                        // 计算机分值
                        if(computerWin[k] == 1){ //白子，有一个子
                            computerScore[i][j] += 200;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 400;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 2000;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 10000;
                        }
                    }
                }
                // 判断计算机落子的最佳位置
                if(myScore[i][j] > max){ //当人在某步的权值更高时
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] = max){ //当权值相同时
                    if(computerScore[i][j] > computerScore[u][v]){  //而i，j点的权值较u，v大时
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){ //当计算机的权值更大时
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] = max){ //当权值是最大时
                    if(myScore[i][j] > myScore[u][v]){ //而计算机在此处落子更有利
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u, v, false);  //得出最佳落子点，落白棋
    chessBorad[u][v] ==2;
    // 计算机落完子后进行统计
    for(var k=0; k<count; k++){
        if(wins[u][v][k]){ //某种赢时某子true
            computerWin[k]++; //距离胜利更近
            myWin[k] = 6; //该种赢法人已经没有机会
            if(computerWin[k] == 5){
                window.alert("计算机Win");
                over = true;
            }
        }
    }
    if(!over){
        me = !me;
    }
}




// 判断当前位置是否有棋子
var chessBorad = [];
for(var i = 0; i < 15; i++){
    chessBorad[i] = [];
    for(var j = 0; j < 15; j++){
        chessBorad[i][j] = 0;
    }
}






// AI实现输赢以及计算机与用户的对战
/*
1.实现输赢
    1.1 创建数组存储所有赢的情况
    1.2 每种赢法的统计数组
    1.3 判断输赢
2.计算机对战
*/ 

// 用于存放所有赢的情况
var wins = [];
for(var i = 0; i < 15; i++){
    wins[i] = [];
    for(var j = 0; j < 15; j++){
        wins[i][j] = [];
    }
}
// 三维数组     wins    i     j   ij0         ij1
// var arr_three =  [     [     [    5    ],[    8   ]],[[7],[3]]];


// 创建变量记录所有赢得方法的种类数量，包括横向、纵向、斜向、反斜向
var count = 0;
// 横向
for(var i = 0; i < 15; i++){  //该层循环表示循环每一行
    for(var j = 0; j < 11; j++){   //该层循环表示当摆成五个连续棋子时，第一个棋子的纵坐标
        for(var k = 0; k < 5; k++){  //该层循环表示摆满五个棋子
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
// 纵向
for(var i = 0; i < 15; i++){  //该层循环表示循环每一列
    for(var j = 0; j < 11; j++){   //该层循环表示当摆成五个连续棋子时，第一个棋子的纵坐标
        for(var k = 0; k < 5; k++){  //该层循环表示摆满五个棋子
            wins[j+k][i][count] = true;
        }
        count++;
    }
}
// 正斜向
for(var i = 0; i < 11; i++){  //该层循环表示循环每一行
    for(var j = 0; j < 11; j++){   //该层循环表示当摆成五个连续棋子时，第一个棋子的纵坐标
        for(var k = 0; k < 5; k++){  //该层循环表示摆满五个棋子
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
// 反斜向
for(var i = 0; i < 11; i++){  //该层循环表示循环每一行
    for(var j = 14; j > 3; j--){   //该层循环表示当摆成五个连续棋子时，第一个棋子的纵坐标
        for(var k = 0; k < 5; k++){  //该层循环表示摆满五个棋子
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}

'赢的总情况数'+console.log(count);
'赢的数组'+console.log(wins);


var over = false;
// 统计加法数组
var myWin = [];
var computerWin = [];
// 统计数组的实例化
for(var i = 0; i < count; i++){
    myWin[i] = 0;
    computerWin[i] = 0;
}



