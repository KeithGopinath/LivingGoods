/* eslint-disable */
export const replaceNull = (obj) => {
    for (let x in obj) {
        if (obj[x] instanceof Object) {
            for (let y in obj[x]) {
                if (y !== 'roles' && y !== 'user' && y !== 'deviceInfo' && y !== 'deviceLocation') {
                    if (obj[x][y] === null || RegExp(/^ *$/).test(obj[x][y])) {
                        obj[x][y] = '--'
                    }
                }
            }
        } else {
            if (obj[x] == null) {
                obj[x] = '--'
            }
        }
    }
    return obj
}

export const enforceNull = (obj) => {
    for (let x in obj) {
        if (obj[x] instanceof Object) {
            for (let y in obj[x]) {
                if (obj[x][y] == '--') {
                    obj[x][y] = null
                }
            }
        } else {
            if (obj[x] == '--') {
                obj[x] = null
            }
        }
    }
    return obj
}

export const superAdminCheck = (username) => {
    return sessionStorage.username == username || sessionStorage.rolename == 'SUPER_ADMIN' ? true : false
}

export const alertMessage = (alertMsg) =>
    alertMsg.split(",").map((item, index) => {
        if (alertMsg.includes(",")) {
            return `${index + 1}. ${item}`;
        } else {
            return item
        }
    });

export const removeUnderscore = (obj) => {
    for (let x in obj) {
        if (obj[x] instanceof Object) {
            for (let y in obj[x]) {
                if (typeof obj[x][y] === 'string') {
                    obj[x][y] = obj[x][y].replace(/\_/g, ' ');
                }
            }
        }
    }
    return obj
}

export const enforceUnderscore = (obj) => {
    for (let x in obj) {
        if (obj[x] instanceof Object) {
            for (let y in obj[x]) {
                if (typeof obj[x][y] === 'string') {
                    obj[x][y] = obj[x][y].replace(/\ /g, '_' );
                }
            }
        }
    }
    return obj
}