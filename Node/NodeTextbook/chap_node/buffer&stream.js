/**
 * 버퍼와 스트림 이해하기
 * 버퍼링 : 무언가 전송/재생할 수 있을 때까지 데이터를 모으는 동작
 * 스트리밍 : 실시간으로 데이터를 전송하는 동작
 * 
 * 버퍼 : 메모리에 할당된 파일 데이터를 위한 공간
 * 노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 한다.
 * 이때 메모리에 할당된 공간을 버퍼라고 한다.
 * Buffer 클래스를 통해 버퍼를 다룰 수 있다.
 * 
 * Buffer.from(string) : 문자열을 버퍼로 변환하여 반환
 * Buffer.length : 버퍼의 길이(바이트)
 * Buffer.toString() : 버퍼 형식의 데이터를 문자열로 변환하여 반환
 * Buffer.alloc(byteSize) : byteSize 크기의 빈 버퍼를 생성
 * Buffer.allocUnsage(byteSize) : 메모리 공간을 0으로 초기화 하지 않은 버퍼를 생성 => 속도가 빠름
 * Buffer.concat(arr) : 배열에 든 버퍼를 하나의 버퍼로 만들어 반환
 * 
 * 노드의 readFile 파일 크기만큼 버퍼를 만들기에 동시에 100mb 파일을 10번 읽는다면 1GB의 메모리가 필요 => 메모리가 부족함
 * 스트림이란 작은 크기의 버퍼를 만들어서 여러번 나눠보내는 것 1mb 버퍼를 100번 읽으면 100mb
 * 
 * 읽기 스트림 생성 : fs.createReadStream(fileDir, opt)
 * opt.highWaterMark => 스트림으로 한번에 읽을 바이트 수. 기본값은 64kb
 * onData, onEnd, onError 이벤트에 리스너를 붙혀 작업을 수행
 * 
 * 쓰기 스트림 생성 : fs.createWriteStream(filDir, opt)
 * writeStream.write(data) 로 데이터를 쓰고 writeStream.end() 로 쓰기 스트림이 끝났다는 걸 onFinish 이벤트 리스너에 알림
 *
 * 읽기 스트림과 쓰기 스트림을 pipe로 연결해 읽기 스트림으로 읽은 데이터를 쓰기 스트림으로 쓸 수 있다.
 */
const fs = require('fs')

const buffer = Buffer.from('한글은 3바이트 숫자,공백,영어는 1바이트')
console.log(buffer)
console.log(buffer.length)
console.log(buffer.toString())

const readStream = fs.createReadStream('./readMeStream.txt', {highWaterMark : 16}) 
const data = []

readStream.on('data', (chunk) => {
    data.push(chunk)
    console.log('data', chunk, chunk.length)
})

readStream.on('end', chunk => {
    console.log(Buffer.concat(data).toString())
})  

readStream.on('error', err => {
    console.log(err)
})

console.log(Buffer.concat(data).toString())     // 출력 안되는 이유 => 스트림은 비동기 처리

const writeStream = fs.createWriteStream('./writeStream.txt')
writeStream.on('finish', () => {
    console.log('쓰기 완료')
}) 
writeStream.write('쓰기 스트림 데이터1\n')
writeStream.write('쓰기 스트림 데이터2')
writeStream.end()

const readStreamPipe = fs.createReadStream('./readMe.txt')
const writeStreamPipe = fs.createWriteStream('./pipeStream.txt')

readStreamPipe.pipe(writeStreamPipe)