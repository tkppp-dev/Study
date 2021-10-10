/**
 * 브라우저의 자바스크립트와 다르게 Node는 파일 시스템에 접근이 가능함.
 * 
 * fs 모듈
 * 
 * 콜백 패턴 메서드
 * readFile('fileDir', callback(err, data))
 * writeFile('fileDir', callback(err, data))
 * 
 * 프로미스 패턴으로 변환 require('fs').promises
 * 
 * cf) 읽고 쓰기의 파일 디렉터리는 상대 경로임을 유의해야 함. 
 * ~/ 에서 node folder/file.js 로 실행하는 것과 ~/folder/ 에서 node file.js 로 실행하는 것은 다른 파일 위치를 나타냄
 * ~/ => ~/file.js 호출, ~/folder/ => ~/folder/file.js 호출
 * 
 * 동기 메세드
 * readFileSync('fileDir')
 * writeFileSync('fileDir')
 */


const fs = require('fs')
const fsPromises = require('fs').promises

fs.readFile('./readMe.txt',(err, data) => {
    if(err){
        throw new Error(err)
    }
    console.log(data)
    console.log(data.toString())
});

(async function(){
    let file = await fsPromises.readFile('./readMe.txt')
    
    console.log(file)
    console.log(file.toString())
})()