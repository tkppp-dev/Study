let blocking = function(callback){
    callback()
}

let nonBlocking = function(callback){
    process.nextTick(callback)
}

nonBlocking(function(){
    console.log('nonBlocking')
})

blocking(function(){
    console.log('blocking')
})
