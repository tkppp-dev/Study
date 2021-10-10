/**
 * Node.js란?
 * 크롬 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임. 즉 자바스크립트를 브라우저 밖에서도 사용할 수 있게 하는 런타임.
 * 런타임 : 특정 언어로 만든 프로그램들을 실행할 수 있는 환경
 * 
 * 노드 내장 객체
 * global : 브라우저에서의 window 객체와 같은 전역 객체
 * console : global 객체에 내장된 출력 객체
 *  - console.time(timerName) : console.timeEnd(timerName)과 대응되어 time과 timeEnd 사이의 시간을 측정
 *  - console.table(object) : 객체의 프로퍼티 값 쌍을 테이블로 변환하여 출력
 *  - console.dir(object, opt) : 객체를 콘솔에 표시할 경우 사용
 * 
 * __filename, __dirname : 현재 파일명과 현재 디렉토리 경로
 * 
 * 모듈 : module.exports, exports
 * exports =참조=> module.exports =참조=> {} 이므로 exports와 module.exports의 참조 관계가 끊겨서는 안된다.
 * 따라서 exports 에는 .property = value 로 값을 대입해야 한다.
 * 
 * 노드의 최상위 스코프에서의 this
 * 노드의 최상위 스코프에서 this는 module.exports를 가리킨다.
 * 함수 내에서의 this는 global 객체를 가르키는 걸 유의해야 함.
 * 
 * require 객체
 * 모듈을 require하여 불러오면 모듈 정보가 require.cache에 저장된다.
 * 
 * process 객체
 * process.env : 환경변수
 * process.nextTick() : 이벤트 루프가 다른 콜백보다 nextTick()으로 넘어온 콜백함수를 우선해서 처리하게 한다.
 * 태스크 큐는 사실 우선순위를 가진 마이크로 태스크 큐와 일반 태스크 큐가 존재하는데 nextTick()은 마이크로 태스크 큐에 콜백을 넣는다.
 * 
 * 노드 내장 모듈
 * path 모듈 : 폴더와 파일의 경로를 쉽게 조작하도록 도와주는 모듈
 * 운영체제마다 경로 표시자가 다르기 때문에 path 모듈을 사용하여 통일시키는게 가능
 * path.join(경로, ...) : 여러 인수를 넣으면 하나의 경로로 합친다.
 * 
 * url 모듈
 * url 분류는 WHATWG 방식과 노드 방식이 있는데 url 모듈의 생성자 사용시 WHATWG 방식으로 분해
 * url 모듈 내장 함수인 url.parse(url)을 통해 기존 노드 방식의 url 분해가 가능
 * cf) WHATWG 와 노드 방식의 차이
 *     WHATWG는 쿼리문이 search로 합쳐져 있고 기존 방식은 query로 접근 가능
 *     WHATWG는 쿼리문이 맵에 분해되어 반환 => 뽑아쓰기 편함
 *     기존 방식은 querystring 모듈을 사용하여 querystring.parse()로 분해해줘야 함 
 * 
 * crypto 모듈
 * 
 * util 모듈
 * util.deprecate(func) : 함수가 deprecated 상태임을 나타냄
 * util.promisify(func) : 콜백 패턴을 가진 함수를 프로미스 패턴으로 바꿔 줌
 * 
 * worker_treads 모듈
 */

function funcThis(){
    console.log(this === global)
}
funcThis()
console.log(module.exports === this)

require('./cache')
console.log(require.cache)

