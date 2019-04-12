

var widget_file_path = 'widget://res/'
var fs_file_path = 'fs://file/'
var db_file_name = 'bkhr.db'
var db_file_path = 'fs://file/bkhr.db'
var db_zip_file_path = 'fs://file/bkhr.SQLite.db.zip'
var db_name = 'bkhr'


var  db_file_path_arr = ['fs://file/userPhoto','fs://file/rmspbA','fs://file/rmspbB']


// fs_file_path + db_file_name
// fs://file/bkhr.SQLite.db
function is_empty_object(object) {
    for (var i in object) { // 如果不为空，则会执行到这一步，返回true
        return true
    }
    return false
}


function setStorage(key, value) {
    $api.setStorage(key, value)
}


function getStorage(key) {
    return $api.getStorage(key)
}


function removeStorage(key) {
    $api.rmStorage(key)
}


function clearStorage() {
    $api.clearStorage()
}


function isHasUserInfo() {
    if (isObjectEmpty(getStorageUser())) {
        return false
    }

    return true
}


function getStorageUser() {
    consoledebug.log('getStorageUser ret is : ' + JSON.stringify(getStorage('user')))
    return getStorage('user')
}


function isObjectOwnProperty(object, property) {
    if (isObjectEmpty) {
        return false
    }

    if (object.hasOwnProperty(property)) {
        return true
    }

    return false
}


function isObjectEmpty(object) {
    if ($.isEmptyObject(object)) {
        return true
    }

    return false
}

function readDirSync(path, callback) {
    var fs = api.require('fs')

    fs.readDir({
        path: path
    }, function(ret, err) {
        consoledebug.log('readDirSync ret is : ' + JSON.stringify(ret))
        consoledebug.log('readDirSync err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function _is_file_exist (path, callback) {
    var fs = api.require('fs')

    fs.exist({
        path: path
    }, function(ret, err) {
        consoledebug.log('_is_file_exist ret is : ' + JSON.stringify(ret))
        consoledebug.log('_is_file_exist err is : ' + JSON.stringify(err))
        callback(ret,err)
    })
}


function is_file_exist (url, callback) {
    var path_array = url.split('/')
    var file = path_array[path_array.length - 1]
    var file_array = file.split('.')
    var type = file_array[file_array.length - 1]
    var name_array = file_array.pop()
    var name = file_array.join('.')

    var fs = api.require('fs')

    fs.exist({
        path : "fs://file/" + name + '.' + type
    }, function(ret, err) {
        consoledebug.log('is_file_exist ret is : ' + JSON.stringify(ret))
        consoledebug.log('is_file_exist err is : ' + JSON.stringify(err))
        if (ret) {
            if (ret.exist) {
                var param = {
                    is_exist: true,
                    path: "fs://file/" + name + '.' + type,
                    type: type
                }
            } else {
                var param = {
                    is_exist: false,
                    url: url
                }
            }
            callback(param)
        } else {
            callback(err)
        }
    })
}

function fsRemove (path, callback) {
    var fs = api.require('fs')
    fs.remove({
        path: path
    }, function(ret, err) {
        consoledebug.log('fsRemove ret is : ' + JSON.stringify(ret))
        consoledebug.log('fsRemove err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function fsMoveTo (oldPath, newPath, callback) {
    var fs = api.require('fs')

    fs.moveTo({
        oldPath: oldPath,
        newPath: newPath
    }, function(ret, err) {
        consoledebug.log('fsMoveTo ret is : ' + JSON.stringify(ret))
        consoledebug.log('fsMoveTo err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function fsCreateDir (path, callback) {
    var fs = api.require('fs');
    fs.createDir({
        path: path
    }, function(ret, err) {
        consoledebug.log('fsCreateDir ret is : ' + JSON.stringify(ret))
        consoledebug.log('fsCreateDir err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function is_widget_file_exist (file_name, callback) {
    api.readFile({
        path: widget_file_path + file_name
    }, function(ret, err) {
        consoledebug.log('is_widget_file_exist ret is : ' + JSON.stringify(ret))
        consoledebug.log('is_widget_file_exist err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function openDatabase (callback) {
    var db = api.require('db')
    db.openDatabase({
        name: db_name,
        path: fs_file_path + db_file_name
    }, function(ret, err) {
        consoledebug.log('openDatabase ret is : ' + JSON.stringify(ret))
        consoledebug.log('openDatabase err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function openDatabaseSync () {
    var db = api.require('db')
    var ret = db.openDatabaseSync({
        name: fs_file_path + db_file_name
    })

    return ret
}

function selectSql (sql, callback) {
    var db = api.require('db')
    db.selectSql({
        name: db_name,
        sql: sql
    }, function(ret, err) {
        consoledebug.log('selectSql ret is : ' + JSON.stringify(ret))
        consoledebug.log('selectSql err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function unarchive (file, toPath, callback) {
    var zip = api.require('zip')

    zip.unarchive({
        file: file,
        toPath: toPath
    }, function(ret, err) {
        consoledebug.log('unarchive ret is : ' + JSON.stringify(ret))
        consoledebug.log('unarchive err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function selectFile (callback) {
    var selectFile = api.require('selectFile')
    selectFile.open(function(ret, err){
        consoledebug.log('selectFile ret is : ' + JSON.stringify(ret))
        consoledebug.log('selectFile err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function rmDir (path, callback) {
    var fs = api.require('fs')
    fs.rmdir({
        path: path
    }, function(ret, err) {
        consoledebug.log('rmdir ret is : ' + JSON.stringify(ret))
        consoledebug.log('rmdir err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}

function copyTo (oldPath, newPath, callback) {
    var fs = api.require('fs')
    fs.copyTo({
        oldPath: oldPath,
        newPath: newPath
    }, function(ret, err) {
        consoledebug.log('copyTo ret is : ' + JSON.stringify(ret))
        consoledebug.log('copyTo err is : ' + JSON.stringify(err))
        callback(ret, err)
    })
}


function copyToSync (oldPath, newPath, callback) {
    var fs = api.require('fs');
    var ret = fs.copyToSync({
        oldPath: oldPath,
        newPath: newPath
    });


    callback(ret,oldPath)
}



function _is_file_existSync (path, callback) {
    var fs = api.require('fs');
    var ret = fs.existSync({
        path: path
    });
    callback(ret)
}