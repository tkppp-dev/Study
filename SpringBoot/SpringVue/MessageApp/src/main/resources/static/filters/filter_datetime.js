const formatter = new Intl.DateTimeFormat('en-US',{
    year : 'numeric', month : 'long', day : 'numeric', 
    hour : 'numeric', minute : 'numeric', second : 'numeric',
})

// 전역 필터 등록
// 옵션을 통해 로컬 등록도 가능
Vue.filter('datetime', function (value) {
    if(!value) return ''
    return formatter.format(value)
});