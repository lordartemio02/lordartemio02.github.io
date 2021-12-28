var myId = 5;
var X = [0, 10, 20, 30];
var t = 12 + 0.5 * myId;
var y_min = 0;
var y_sredniy = 0;

var V_y=[];
var V_x=[];

function Main() {
    for (var i = 0; i < 5; i++) {
        FunctionPrinadlejnosty(i);
        FunctionModification(i)
        Superpoz(i)
        t = t + 0.3;
    }
    DrawChart('main',V_x,[V_y])
}

function Superpoz(i) {
    var XY = FindXY();
    var x = XY[0];
    var y = XY[1];

    F1X=5;
    F2X=40/3;
    F3X=(40+x)/3;
    F4X=70/3;

    FX=[F1X,F2X,F3X,F4X];

    F1Y=y_min/2;
    F2Y=y_min/3;
    F3Y=(y_sredniy+y)/3;
    F4Y=y_sredniy/3;

    FY=[F1Y,F2Y,F3Y,F4Y];

    S1 = y_min * 10;
    S2 = y_min * 10 / 2;
    S3 = (y_sredniy * (20 - x)) - (((20 - x) * (y_sredniy - y)) / 2) - (((20 - x) * y) / 2);
    S4 = y_sredniy * 10 / 2;

    S=[S1,S2,S3,S4];

    Xct=(F1X*S1+F2X*S2+F3X*S3+F4X*S4)/(S1+S2+S3+S4);
    Yct=(F1Y*S1+F2Y*S2+F3Y*S3+F4Y*S4)/(S1+S2+S3+S4);
    V_x[i]=Xct
    V_y[i]=Yct;

    $(".t"+i+".mod").after($("<p class='my-2'>x=" + x + ";</p>"));
    $(".t"+i+".mod").after($("<p class='my-2'>y=" + y + ";</p>"));

    $(FX).each(function(index,el) {

        $(".t"+i+".function").append($("<p class='my-1 "+i+"'>FX" +(index+1)+"="+ el + ";</p>"));
        $(".t"+i+".function").append($("<p class='my-1'>FY" +(index+1)+"="+ FY[index] + ";</p>"));
        $(".t"+i+".square").append($("<p class='my-1'>S" +(index+1)+"="+ S[index] + ";</p>"));
    });
    $(".t"+i+".square").append($("<h6 class='my-3'>Vx=" +V_x[i]+ ";</p>"));
    $(".t"+i+".square").append($("<h6 class='my-3'>Vy=" +V_y[i]+ ";</p>"));

}

function FindXY() {
    var b1 = 2 * y_min;
    var b2 = -y_sredniy;

    var x = (b1 - b2) / ((y_min / 10) + (y_sredniy / 10));
    var y = (-y_min / 10) * x + b1;
    return [x, y]
}

function FunctionModification(i) {

    Y1 = [y_min, y_min, 0, 0];
    Y2 = [0, 0, y_sredniy, 0];
    Y = [Y1, Y2]
    DrawChart(i + '.mod', X, Y);

}

function FunctionPrinadlejnosty(i) {

    Y1 = T_min(t);
    Y2 = T_max(t);

    Y = [Y1, Y2];

    y_min = Y1[2];
    y_sredniy = Y2[2];

    DrawChart(i, X, Y);
    DrawTitle(i, t);
    DrawComment(i, t, y_min, y_sredniy, '.fun_pr')
}

function T_min(t) {
    var y = -(t / 10) + 2;
    var Y = [1, 1, y, 0];
    return Y;
}

function T_max(t) {
    var y = (t / 10) - 1;
    var y1 = -(t / 10) + 3;
    var Y = [0, 0, y, y1];
    return Y;
}



function DrawChart(i, X, Y) {

    var data = {
        labels: X,
        series: Y
    };
    var options = {
        lineSmooth: false
    }

    new Chartist.Line('.ct-chart.t' + i + '', data, options);

}

function DrawTitle(i, t) {
    $('.wrapper.t' + i).before($('<h4 class="text-center  col-12 mb-4">Итерация <span class="t-number">' + i + '</span>   t=<span class="t-count">' + t + '</span></h4>'))

}

function DrawComment(i, t, y_min, y_sredniy, fun) {
    $(fun + '.t' + i).after($('<p class="my-2">μTсредняя(' + t + ') = ' + y_sredniy + '</p>'));
    $(fun + '.t' + i).after($('<p class="my-2">μTнизкая(' + t + ') = ' + y_min + '</p>'));
}

Main();