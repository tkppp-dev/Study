// mixin : 사용자 정의 라이프사이클 훅
// 전역이나 로컬에 등록해 사용 가능
export default {
    created(){
        console.log(this.$options.name + 'created')
    },
    beforeMount() {
        console.log(this.$options.name + 'beforeMount')
    },
    mounted() {
        console.log(this.$options.name + 'mounted')
    },
    destroyed() {
        console.log(this.$options.name + 'destroyed')
    },
}