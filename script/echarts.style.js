
//混合折线图
;

option = {
    backgroundColor: '',//背景色

    //设置标题
    title : {
        // 是否显示
        show: true,
        text: '各职务层次年龄占比情况',
        textStyle:{
            //文字颜色
            color:'red',
            //字体风格,'normal','italic','oblique'
            fontStyle:'normal',
            //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
            fontWeight:'500',
            //字体系列
            fontFamily:'sans-serif',
            //字体大小
            fontSize:17
        },
        left:'center',
        //设置标题距离
        top :'-5px',
        itemGap:20
    },
    tooltip: {
        title :  '混合這线图',
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    //右上角图标
//        toolbox: {
//            feature: {
//                dataView: {show: true, readOnly: false},
//                magicType: {show: true, type: ['line', 'bar']},
//                restore: {show: true},
//                saveAsImage: {show: true}
//            }
//        },
    legend: {
        //设置高度
        y: '20px',
        data:['30岁以下人数','30-40岁人数','40-50岁人数','60岁以上','平均年龄']
    },
    xAxis: [
        {

            type: 'category',
            data: ['省部正职','省部副职','厅局正职','厅局副职','县处正职','县处副职','乡处正职','乡处副职','科员级其他'],

            //获取点击事件
            axisLabel:{
                clickable:true
            },


            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '（万人）',
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
                formatter: '{value} '
            }
        },
        {
            type: 'value',
            name: '平均年龄',
            min: 0,
            max: 65,
            interval: 10,
            axisLabel: {
                //设置 y轴单位
                formatter: '{value} '
            }
        }
    ],
    series: [
        {
            name:'30岁以下人数',
            type:'bar',
            barWidth : 20,
            stack: '人数',
            data:[20, 20, 20, 20, 30, 30, 30, 30, 30]
        },
        {
            name:'30-40岁人数',
            type:'bar',
            stack: '人数',
            data:[20, 20, 20, 20, 30, 30, 30, 30, 30]
        },
        {
            name:'40-50岁人数',
            type:'bar',
            stack: '人数',
            data:[20, 20, 20, 20, 30, 30, 30, 30, 30]
        },
        {
            name:'60岁以上',
            type:'bar',
            stack: '人数',
            data:[20, 20, 20, 20, 30, 30, 30, 30, 30]
        },

        {
            name:'平均年龄',
            type:'line',
            yAxisIndex: 1,
            data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0]
        }
    ],
    grid : {
        top : 60,    //距离容器上边界40像素
        bottom: 30   //距离容器下边界30像素
    }


};

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}

//监听点击事件
myChart.on('click', function (params) {
    console.log("测试点击事件",params);
    if (params.name == '省部副职'){
        alert('说什么是什么')
    }else {
        alert('HELLOWORD')
    }

});
