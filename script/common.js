

var DEBUG = true


var consoledebug = (DEBUG) ? console : new nodebug()

function nodebug() {
}

nodebug.prototype.log = function (str) {
}
nodebug.prototype.warn = function (str) {
}



var TIP_STR = "信息提示";

var SUCCESS_CODE = 200;

var NET_ERROR_SRT = "网络错误，加载失败";

var DEFAULT_PAGE_SIZE = 25;

var START_DOT_COUNT = 9999;


var ticket = null;
var addvcd = null;
var uname = null;



if (!judgeIsAnyNullStr($api.getStorage("user_info"))) {
    //consoledebug.log("localstroage user_info:" + JSON.stringify($api.getStorage("user_info")))
    ticket = $api.getStorage("user_info").ticket;
    addvcd = $api.getStorage("user_info").addvcd;
    uname = $api.getStorage("user_info").uname;
}



function regetUserInfo() {
    user_code = $api.getStorage("user_info").user_code;
    token = $api.getStorage("user_info").token;
}

function getStorageUserInfo() {
    if (!judgeIsAnyNullStr($api.getStorage('user_info'))) {
        consoledebug.log('getStorageUserInfo ret is : ' + JSON.stringify($api.getStorage('user_info')))
        return $api.getStorage('user_info')
    } else {
        return null;
    }
}


function comOpenWin(winname, winurl, data, typeid) {
    var animationtype = ["none", "push", "movein"]
    if (typeid === 0) {
        api.openWin({
            name: winname,
            url: winurl + winname + '.html',
            allowEdit: true,
            animation: {
                type: animationtype[typeid],
                duration: 0
            },
            pageParam: {
                data: data
            }
        })
    } else {
        api.openWin({
            name: winname,
            url: winurl + winname + '.html',
            allowEdit: true,
            animation: {
                type: animationtype[typeid],
                duration: 300
            },
            pageParam: {
                data: data
            },
            delay: 100
        })
    }
}


function comReopenWin(winname, winurl, data, typeid) {
    var animationtype = ["none", "push", "movein"]
    if (typeid === 0) {
        api.openWin({
            name: winname,
            url: winurl + winname + '.html',
            allowEdit: true,
            reload: true,
            delay: 300,
            animation: {
                type: animationtype[typeid],
                duration: 0
            },
            pageParam: {
                data: data
            }
        });
    } else {
        api.openWin({
            name: winname,
            url: winurl + winname + '.html',
            allowEdit: true,
            reload: true,
            delay: 300,
            animation: {
                type: animationtype[typeid],
                duration: 200
            },
            pageParam: {
                data: item
            }
        })
    }
}


function comOpenFrame(framename, frameurl, type, item, frameType) {
    var headH, footH
    if (frameType === 0) {//有header无footer
        var header = $api.byId('header')
        _fixStatusBar('header')
        var headerPos = $api.offset(header)
        headH = headerPos.h
        footH = 0
    } else if (frameType === 1) {//无header有footer
        headH = 0;
        var footer = $api.byId('footer')
        var footerPos = $api.offset(footer);
        footH = footerPos.h;
    } else if (frameType === 2) {//均有
        var header = $api.byId('header')
        _fixStatusBar('header')
        var headerPos = $api.offset(header)
        var footer = $api.byId('footer')
        var footerPos = $api.offset(footer)
        headH = headerPos.h
        footH = footerPos.h
    } else {//均无
        headH = 0;
        footH = 0;
    }

    api.openFrame({

        name: framename,
        url: frameurl + framename + '.html',
        allowEdit: true,
        bounces: type,
        pageParam: {item: item},
        vScrollBarEnabled: false,
        rect: {x: 0, y: headH, w: 'auto', h: api.winHeight - headH - footH}
    })
}


function clone(obj) {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        var copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        var copy = [];
        for (var i = 0, len = obj.length; i < len; ++i) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        var copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}



function comReopenFrame(framename, frameurl, type, item, frameType) {
    var headH, footH
    if (frameType === 0) {//有header无footer
        var header = $api.byId('header')
        _fixStatusBar('header')
        var headerPos = $api.offset(header)
        headH = headerPos.h
        footH = 0;
    } else if (frameType === 1) {//无header有footer
        headH = 0;
        var footer = $api.byId('footer')
        var footerPos = $api.offset(footer)
        footH = footerPos.h
    } else if (frameType === 2) {//均有
        var header = $api.byId('header')
        _fixStatusBar('header')
        var headerPos = $api.offset(header)
        var footer = $api.byId('footer')
        var footerPos = $api.offset(footer)
        headH = headerPos.h
        footH = footerPos.h
    } else {//均无
        headH = 0
        footH = 0
    }

    api.openFrame({
        name: framename,
        url: frameurl + framename + '.html',
        allowEdit: true,
        reload: true,
        bounces: type,
        pageParam: {item: item},
        vScrollBarEnabled: false,
        rect: {x: 0, y: headH, w: 'auto', h: api.winHeight - headH - footH}
    })
}


function comOpenFrameWithHeaderFooter(framename, frameurl, header_h, footer_h, item, isBounce) {

    var body_h = api.winHeight

    consoledebug.log('body_h is : ' + body_h)
    consoledebug.log('header_h is : ' + header_h)
    consoledebug.log('footer_h is : ' + footer_h)
    consoledebug.log('rect_h is : ' + (body_h - header_h - footer_h))

    api.openFrame({
        name: framename,
        url: frameurl + framename + '.html',
        rect: {
            x: 0,
            y: header_h,
            w: 'auto',
            h: body_h - header_h - footer_h
        },
        pageParam: {item: item},
        bounces: isBounce,
        vScrollBarEnabled: false,
        hScrollBarEnabled: false,
        delay: 200
    })
}

function clickBack(winName) {
    api.closeWin(winName)
}

function closeToWin(win_name) {
    api.closeToWin({
        name: win_name
    })
}

function closeFrame(name) {
    api.closeFrame({
        name: name
    })
}

function _fixStatusBar(headerid) {
    consoledebug.log("_fixStatusBar headerid is " + headerid)
    var header = $api.byId(headerid)
    var headerPos = $api.offset(header)
    consoledebug.log('_fixStatusBar headerPos is : ' + JSON.stringify(headerPos))
    return headerPos
}

function showToast(msg, location) {
    if (!location) {
        location = 'bottom'
    }

    api.toast({
        msg: msg,
        duration: 3000,
        location: location
    })
}

function showAlert(title, msg) {
    api.alert({
        title: title,
        msg: msg
    }, function (ret, err) {

    })
}

function befshowProgress(msg) {
    if (judgeIsAnyNullStr(msg)) {
        msg = "加载中";
    }
    api.showProgress({
        title: msg,
        modal: true
    });
}

function befhideProgress() {
    api.hideProgress()
}

function setFrameGroupAttrScrollEnabled(frameGroupName, value) {
    api.setFrameGroupAttr({
        name: frameGroupName,
        scrollEnabled: value
    })
}

function setFrameGroupAttrHidden(frameGroupName, value) {
    api.setFrameGroupAttr({
        name: frameGroupName,
        hidden: value
    });
}

function setFrameAttrHidden(frameName, value) {
    api.setFrameAttr({
        name: frameName,
        hidden: value
    });
}

function judgeIsAnyNullStr() {
    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            if (!isArray(arguments[i])) {
                if (arguments[i] == null || arguments[i] == "" || arguments[i] == undefined || arguments[i] == "未设置" || arguments[i] == "undefined") {
                    return true
                }
            }
        }
    }
    return false
}



function judgeIsAnyNullStrImp(obj) {
    if (obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            var value = obj[i].value;
            var name = obj[i].name;
            if (!isArray(value)) {
                if (value == null || value == "" || value == undefined || value == "未设置") {
                    showToast(name + "不能为空");
                    return true;
                }
            }
        }
    }
    return false;
}


function setDefaultValue(val, default_val, more_val) {
    if (judgeIsAnyNullStr(val)) {
        return default_val;
    } else {
        return val + more_val;
    }
}

function isArray(object) {
    return Object.prototype.toString.call(object) == '[object Array]';
}

function convertDateToChinese(date_str) {
    if (judgeIsAnyNullStr(date_str)) {
        return "";
    }
    var year = date_str.substr(0, 4);
    var month = date_str.substr(5, 2);
    var day = date_str.substr(8, 2);
    return year + "年" + month + "月" + day + "日";
}

function loadLazyImages(doms) {
    doms.lazyload()
    doms.removeClass("lazy")
}

function qiniuUrlTool(img_url, type) {
    //consoledebug.log("img_url:" + img_url + " indexOf('isart.me'):" + img_url.indexOf('isart.me'));
    if (img_url.indexOf('7xku37.com') < 0 && img_url.indexOf('isart.me') < 0) {
        return img_url;
    }
    //七牛链接
    var qn_img_url
    const size_w_500_h_200 = '?imageView2/1/w/500/h/200/interlace/1/q/75'
    const size_w_200_h_200 = '?imageView2/1/w/200/h/200/interlace/1/q/75'
    const size_w_500_h_300 = '?imageView2/1/w/500/h/300/interlace/1/q/75'
    const size_w_500_h_250 = '?imageView2/1/w/500/h/250/interlace/1/q/75'
    const size_w_460_h_460 = '?imageView2/1/w/460/h/460/interlace/1/q/75'
    const size_w_600_h_600 = '?imageView2/1/w/600/h/600/interlace/1/q/75'

    const size_w_500 = '?imageView1/1/w/500/interlace/1/q/75'

    if (img_url.indexOf("?") >= 0) {
        img_url = img_url.split('?')[0]
    }
    switch (type) {
        case  'list':      //头像信息
            qn_img_url = img_url + size_w_200_h_200
            break;
        case 'rect460':
            qn_img_url = img_url + size_w_460_h_460
            break;
        case 'rect600':
            qn_img_url = img_url + size_w_600_h_600
            break;
        default:
            qn_img_url = img_url
            break
    }
    return qn_img_url
}


function getFileType(file_url) {
    var pos = file_url.indexOf(".");
    var type = file_url.substr(pos + 1, file_url.length - 1);
    return type;
}

function getQiniuKey() {
    var date = new Date();
    var generate_key = "";
    generate_key = date.getFullYear() + "" + date.getMonth() + "" + date.getDate() + ""
        + date.getHours() + "" + date.getMinutes() + "" + date.getSeconds() + "" + date.getMilliseconds() + ""
        + getRandomNum(6);
    return generate_key;
}



function getHeadIcon(dir, hi) {
    // console.log(hi);
    if (judgeIsAnyNullStr(hi) || hi.length < 15) {
        return dir + "image/default_head_logo.png";
    }
    return qiniuUrlTool(hi, "head_icon");
}

function getNickName(ni) {
    if (judgeIsAnyNullStr(ni)) {
        return "匿名者";
    } else {
        return ni;
    }
}

function getMySign(ms) {
    if (judgeIsAnyNullStr(ms)) {
        return "让世界享受艺术生活";
    } else {
        return ms;
    }
}


function getRandomNum(mutils) {
    var rand = "";
    for (var i = 0; i < mutils; i++) {
        var a = parseInt(10 * Math.random());
        rand += a + "";
    }
    return rand;
}


var gProgressTag = 0

function waitingForTimeout(times) {

    if (gProgressTag) {
        clearTimeout(gProgressTag)
        gProgressTag = 0
    }

    showProgress()

    if (!times) {
        var times = 30000
    }

    gProgressTag = setTimeout(function () {
        if (gProgressTag) {
            hideProgress()
            showToast('网络超时，请稍后重试')
            gProgressTag = 0
        }
    }, times)
}

function clearWaitingForTimeout() {
    if (gProgressTag) {
        clearTimeout(gProgressTag)
        gProgressTag = 0
    }
    hideProgress()
}

function showPage() {
    $("#page").removeClass("aui-hide");
}


var xw = [{value: 1, name: "全部"}, {value: 2, name: "博士", ziduan: "RS_A01.ZGXW", where: "like '1%'"}, {
    value: 3,
    name: "硕士",
    ziduan: "RS_A01.ZGXW",
    where: "like '3%'"
}, {value: 4, name: "学士", ziduan: "RS_A01.ZGXW", where: "like '4%'"}]

var cylb = [{value: 1, name: "全部"}, {value: 2, name: "正职", ziduan: "RS_A01.AT0201E", where: "= '1'"}, {
    value: 3,
    name: "副职",
    ziduan: "RS_A01.AT0201E",
    where: "= '3'"
}, {value: 4, name: "其他", ziduan: "RS_A01.AT0201E", where: "= 'Z'"}]


var rygl = [{value: 1, name: "全部"}, {value: 2, name: "现职", ziduan: "A0163", where: "= '1'"}, {
    value: 3,
    name: "非现职",
    ziduan: "A0163",
    where: "<> '0'"
}]

var rzzt = [{value: 1, name: "全部"}, {value: 2, name: "在任", ziduan: "RS_A02.A0255", where: "= '1'"}, {
    value: 3,
    name: "已免",
    ziduan: "RS_A02.A0255",
    where: "= '0'"
}]



var ndkh = [{value: 2, name: "2014", ziduan: "", where: "'2014'"}, {
    value: 3,
    name: "2015",
    ziduan: "",
    where: "'2015'"
}, {value: 4, name: "2016", ziduan: "", where: "'2016'"}]

var khjl = [{value: 1, name: "全部"}, {value: 2, name: "优秀", ziduan: "", where: "'1'"}, {
    value: 3,
    name: "称职",
    ziduan: "",
    where: "'2'"
}, {value: 4, name: "基本称职", ziduan: "", where: "'3'"}, {value: 5, name: "不称职", ziduan: "", where: "'4'"}, {
    value: 6,
    name: "不定等次",
    ziduan: "",
    where: "'5'"
}, {value: 7, name: "不进行考核", ziduan: "", where: "'6'"}]


var sfld = [{value: 1, name: "全部"}, {value: 2, name: "领导成员", ziduan: "RS_A01.AT0201D", where: "='1'"}, {
    value: 3,
    name: "非领导成员",
    ziduan: "RS_A01.AT0201D",
    where: "='0'"
}]

var ldzw = [{value: 1, name: "全部"}, {value: 2, name: "领导职务", ziduan: "RS_A01.A0219", where: "='1'"}, {
    value: 3,
    name: "非领导职务",
    ziduan: "RS_A01.A0219",
    where: "='0'"
}]


var nsf = [{value: 1, name: "全部"}, {value: 2, name: "女干部", ziduan: "A0104", where: "= '2'"}, {
    value: 3,
    name: "少数民族",
    ziduan: "A0117",
    where: "!= '01'"
}, {value: 4, name: "党外干部", ziduan: "A0171", where: "not in ('01', '02')"}]

var mz = [{value: 1, name: "全部"}, {value: 2, name: "汉族", ziduan: "rs_a01.A0117", where: "in ('01')"}, {
    value: 3,
    name: "回族",
    ziduan: "rs_a01.A0117",
    where: "in ('03')"
}, {value: 4, name: "满族", ziduan: "rs_a01.A0117", where: "in ('11')"}, {
    value: 5,
    name: "维吾尔族",
    ziduan: "rs_a01.A0117",
    where: "in ('05')"
}, {value: 6, name: "其他", ziduan: "rs_a01.A0117", where: "not in ('01','03','05','11')"}]


var xl = [{value: 1, name: "全部"}, {value: 2, name: "研究生", ziduan: "ZGXL", where: "like '1%'"}, {
    value: 3,
    name: "大学本科",
    ziduan: "ZGXL",
    where: "like '2%'"
}, {value: 4, name: "大学专科", ziduan: "ZGXL", where: "like '3%'"}, {
    value: 5,
    name: "高中及以下",
    ziduan: "ZGXL",
    where: "not in ('41', '61', '71', '81', '47')"
}]

var zwcj = [{value: 1, name: "全部"}, {value: 2, name: "省部级正职", ziduan: "A0172 = '1A11'"}, {
    value: 3,
    name: "省部级副职",
    ziduan: "A0172 = '1A12'"
}, {value: 4, name: "厅局级正职", ziduan: "A0172 = '1A21'"}, {
    value: 5,
    name: "厅局职副职",
    ziduan: "A0172 = '1A22'"
}, {value: 6, name: "县处级正职", ziduan: "A0172 = '1A31'"}, {
    value: 7,
    name: "县处级副职",
    ziduan: "A0172 = '1A32'"
}, {value: 8, name: "乡科级正职", ziduan: "A0172 = '1A41'"}, {
    value: 9,
    name: "乡科级副职",
    ziduan: "A0172 = '1A42'"
}, {value: 10, name: "科员及其他", ziduan: "A0172 in ( '1A50','1A60','1A98','1A99')"}];



var mncode_list = [
    {
        "value": "01",
        "name": "汉族"
    }, {
        "value": "02",
        "name": "蒙古族"
    }, {
        "value": "03",
        "name": "回族"
    }, {
        "value": "04",
        "name": "藏族"
    }, {
        "value": "05",
        "name": "维吾尔族"
    }, {
        "value": "06",
        "name": "苗族"
    }];

function getAddvcdObj(code) {
    for (var i = 0; i < mncode_list.length; i++) {
        if (mncode_list[i].CODE == code) {
            return addvcd_list[i];
        }
    }
    return {};
}



function select_SQL(databases, databasesFile, table, field, where) {
    var db = api.require('db');
    db.openDatabase({
        name: databases,
        path: databasesFile
    }, function (ret, err) {
        if (ret.status) {
            db.selectSql({
                name: databases,
                sql: "SELECT * FROM " + table + " WHERE " + field + " = '" + where + "'"
            }, function (ret, err) {
                if (ret.status) {
                    return ret;
                } else {
                    return err;
                }
            });
        } else {
            return err;
        }
    });
}



function getFormatDate(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}



function getDayName(day) {
    switch (day) {
        case 1:
            return "一";
        case 2:
            return "二";
        case 3:
            return "三";
        case 4:
            return "四";
        case 5:
            return "五";
        case 6:
            return "六";
        case 7:
            return "日";
    }
}

function strToDate(fDate) {
    var fullDate = fDate.split("-");

    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
}

function compareDate(start, end) {
    start = strToDate(start);
    end = strToDate(end);
    var time = 0
    if (start > end) {
        time = start - end;
    } else {
        time = end - start;
    }
    return Math.floor(time / 86400000)
}


function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


function getNodataTipHtml(dir) {
    var noData_tip_html;
    if (judgeIsAnyNullStr(dir)) {
        noData_tip_html = "<div>" +
            "<div class='aui-flex-col aui-flex-center' style='padding-top:145px;'>" +
            "<img src='../../image/no_data.png' style='width: 120px;height: 80px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            "没有搜索到数据" +
            "</div>" +
            "</div>";
    } else {
        noData_tip_html = "<div>" +
            "<div class='aui-flex-col aui-flex-center' style='margin-top:145px;'>" +
            "<img src='" + dir + "/image/no_data.png' style='width: 120px;height: 80px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'>" +
            "没有搜索到数据" +
            "</div>" +
            "</div>";
    }
    return noData_tip_html;
}


function getNodataTipHtmlxt(dir) {
    var noData_tip_html;
    if (judgeIsAnyNullStr(dir)) {
        noData_tip_html = "<div>" +
            "<div class='aui-flex-col aui-flex-center' style='padding-top:60px;padding-bottom: 20px'>" +
            "<img src='../../image/no_data.png' style='width: 120px;height: 80px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12'style='padding-bottom: 20px'>" +
            "没有搜索到数据" +
            "</div>" +
            "</div>";
    } else {
        noData_tip_html = "<div>" +
            "<div class='aui-flex-col aui-flex-center' style='margin-top:60px;padding-bottom: 20px'>" +
            "<img src='" + dir + "/image/no_data.png' style='width: 120px;height: 80px;'>" +
            "</div>" +
            "<div class='aui-margin-t-5 aui-flex-col aui-flex-center aui-text-grey aui-font-size-12' style='padding-bottom: 20px'>" +
            "没有搜索到数据" +
            "</div>" +
            "</div>";
    }
    return noData_tip_html;
}


function getImgRealUrl(url) {
    return "http://dsyy.isart.me/" + url;
}


function convertDateToCh(date_str) {
    var data_str_arr = date_str.split('-');
    if (data_str_arr.length > 2) {
        return data_str_arr[0] + "年" + data_str_arr[1] + "月" + data_str_arr[2] + "日";
    } else {
        return data_str_arr[0] + "年" + data_str_arr[1] + "月";
    }
}

function getCurrentYear() {
    var myDate = new Date();
    return myDate.getFullYear(); //获取当前年份(2位)
}



function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份
    var month = arr[1]; //获取当前日期的月份
    var day = arr[2]; //获取当前日期的日
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2;
    return t2;
}


var EARTH_RADIUS = 6378137.0;    //单位M
var PI = Math.PI;

function getRad(d) {
    return d * PI / 180.0;
}


function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);

    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;

    return s;
}


function openPhotoOrAlbum(type, callBackFun, dom_id) {
    api.getPicture({
        sourceType: type,
        encodingType: 'jpg',
        mediaValue: 'pic',
        destinationType: 'url',
        allowEdit: false,
        quality: 50,
        targetWidth: 1200,
        saveToPhotoAlbum: false
    }, function (ret, err) {
        if (ret) {
            if (jQuery.isEmptyObject(ret.data) || ret.data == null || ret.data == "") {

            } else {
                callBackFun(ret, err, dom_id);
            }
        } else {
        }
    });
}


function getCurrentHMS() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    return (hours + ":" + minutes + ":" + seconds);
}


function convertDateFormate(date_str, type) {
    var date_arr = date_str.split('-');
    switch (type) {
        case 1:
            return date_arr[1] + "月" + date_arr[2] + "日";
        case 2:
            return date_arr[0] + "年" + date_arr[1] + "月" + date_arr[2] + "日";
    }
    return date_str;
}



function convertDateFormateM(date_str) {

    var date_arr = date_str.split(' ');
    //consoledebug.log("data_arr:" + JSON.stringify(date_arr))
    return convertDateFormate(date_arr[0], 1) + " " + date_arr[1].substring(0, 5);
}


function convertDateToChi(date_str) {
    var ys_arr = date_str.split(" ");
    return convertDateFormate(ys_arr[0], 2) + " " + ys_arr[1].substring(0, 5);
}



function unArray(Arr) {
    var newArr = []
    for (var i = 0; i < Arr.length; i++) {
        if (newArr.indexOf(Arr[i]) === -1) {
            newArr.push(Arr[i])
        }
    }
    return newArr
}


function delHtmlTag(str) {
    var r_str = str.replace(/<[^>]+>/g, "").replace(/&NBSP;/g, "").replace(/&nbsp;/g, "");
    return r_str;//去掉所有的html标记
}



function isStrInArr(str, arr) {
    if (judgeIsAnyNullStr(arr)) {
        return false;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(str) >= 0) {
            return true;
        }
    }
    return false;
}

function getPicRealUrl(url) {
    if (url.indexOf('/app/') >= 0) {
        return "http://47.94.253.217:8580/qhapp" + url;
    }
    return url;

}

function showProgress(title, modal, animationType, text) {
    consoledebug.log('showProgress')
    if (!title) {
        title = "努力加载中..."
    }

    if (!modal) {
        modal = true
    }

    if (!animationType) {
        animationType = 'fade'
    }

    var param

    if (!text) {
        param = {
            title: title,
            modal: modal
        }
    } else {
        param = {
            title: title,
            text: text,
            modal: modal
        }
    }

    param.animationType = animationType

    api.showProgress(param)
}

function hideProgress() {
    consoledebug.log('hideProgress')
    api.hideProgress()
}

function getSum(array) {
    var arr = array
    var sum = arr.reduce(function (prev, curr, idx, arr) {
        return prev + curr
    })
    return sum
}


Array.prototype.intersect = function(b) {
    var flip = {};
    var res = [];
    for(var i=0; i< b.length; i++) flip[b[i]] = i;
    for(i=0; i<this.length; i++)
        if(flip[this[i]] != undefined) res.push(this[i]);
    return res;
}



function indexOf(arr, item) {

    for(var i =0;i<arr.length;i++){
        if(arr[i].ID == item){
            return i
        }
    }
    return -1
}

function dealNum1(num){
    var ns = num + "";
    if(num==""||num==null||num=="null"){
        return "0";
    }
    if(ns.indexOf(".")!=-1){
        return num;
    }
    var reg = /^[0-9]*$/;
    if (!reg.test(ns)) {
        return num;
    }
    if(num<100){
        return num;
    }
    var arr = ns.split("");
    var str = "";
    var j = 0;
    for(var i=arr.length-1;i>=0;i--){
        if(j==3){
            j = 0;
            str = arr[i]+","+str;
        }else{
            str = arr[i]+str;
        }
        j++;
    }
    return str;
}


