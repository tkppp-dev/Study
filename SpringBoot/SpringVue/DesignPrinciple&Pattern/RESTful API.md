# REpresentational State Transfer - REST

HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고, HTTP Method(POST, GET, PUT, DELETE)를 통해 해당 자원에 대한 CRUD Operation을 적용하는 것을 의미한다.
간단하게 HTTP 메소드를 통해 리소스를 처리하도록 설계된 아키텍쳐

REST 아키텍쳐의 제약 사항

1. 클라이언트-서버 구조
2. 무상태성
3. 캐싱 가능
4. 유니폼 인터페이스
5. 계층형 시스템
6. 주문형 코드(Code on Demand) - Optional

## 무상태성

REST는 HTTP의 특성을 이용하기 때문에 무상태성을 갖는다. 서버와 클라이언트간의 통신에 있어 각 요청은 서버가 해당 요청을 이해하는 데 필요한 모든 정보를 포함한다.
즉 서버에서 어떤 작업을 하기 위해 상태정보를 기억할 필요가 없고 들어온 요청에 대해 처리만 해주면 되기 때문에 구현이 쉽고 단순해진다.

그렇다면 무상태성을 위해 쿠키나 세션을 사용하면 안되는 것인가? --> 잘모르겠음

## 유니폼 인터페이스

사실 대부분의 REST API는 RESTful하지 않다. 바로 유니폼 인터페이스 제약을 지키지 않기 때문이다.

유니폼 인터페이스 제약의 구성은 다음과 같다.

1. 리소스 식별 : URI를 통한 리소스 식별 - 리소스의 정의는 명사를 기반
2. 표현을 통한 리소스 조작 : HTTP Method(POST, GET, PUT, DELETE)를 통한 리소스 조작
3. 자기 서술 메세지
4. HATEOAS : 클라이언트와 리소스 URI의 분리

1과 2는 주로 잘지켜진다. 하지만 3,4가 거의 지켜지지 않는다.

그렇다면 RESTful하기 위해서 3,4를 적용해야하는가에 대해 생각해보면 그렇지는 않다.
REST의 창시자 로이 필딩은 제약을 지키지 않는다면 RESTful하지 않다고 하지만 실제로는 각 리소스와 HTTP 메소드에 대한 URI를 구현한 서비스를 순수 RESTful, 각 리소스에 대한 URI와 단일 HTTP 메소드를 구현한 서비스를 실용적 RESTful이라고 한다.

## Spring MVC에서 RESTful API 구현

**MVC 어노테이션**
1. @RestController : @Contoller와 @ResponseBody 어노테이션의 결합
2. @RequestMapping, Get/Post/Patch/Put/DeleteMapping을 통해 리소스의 URI 생성
3. @ResponseEntity : 응답 몸체 뿐만아니라 헤더와 상태코드를 제어하기 위한 기능을 제공
4. @RequestParam : API의 URI쿼리 매개변수를 지정
5. @PathVariable : /user/{id}와 같이 URI에서 변수를 추출하는 기능을 제공
6. @RequestBody : 요청의 본문과 객체를 매핑하는 기능을 제공




