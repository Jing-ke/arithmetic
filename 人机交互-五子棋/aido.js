
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
var arr_three =  [     [     [    5    ],[    8   ]],[[7],[3]]];


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