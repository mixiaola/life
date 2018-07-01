var ok = function (res) {
    var data = {
        ec: 200,
        em: 'ok',
        data: res
    };
    return data;
}
var err = function (ec, em, data) {
    var data = {
        ec: ec,
        em: em,
        data: data || null
    };
    return data;
}

module.exports = {
    ok,
    err
}