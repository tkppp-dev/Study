# 스프링부트와 AWS로 혼자 구현하는 웹 서비스

## 1장

### Gradle 사용법 및 버전별 유의사항
plugin 사용법

![image](https://user-images.githubusercontent.com/71641938/124442181-6f3db200-ddb7-11eb-8afe-26307867c07c.png)

compile, testCompile => Soft Deprecated

implementation, testImplementation 사용


JUnit5 : Gradle5 부터 junit5 사용

import 위치 : org.junit.runner.~ => org.junit.jupiter.api.~

RunWith => ExtendWith

SpringRunner => SpringExtension

## 2장

### 단위 테스트란?
기능 단위의 테스트 코드를 작성하는 것을 의미
단위 테스트의 필요성
1. 개발단게 초기에 문제를 발견하게 도와준다
2. 개발자가 나중에 코드를 리팩토링하거나 라이브러리 업그레이드 등에서 기존 기능이 올바르게 작동하는지 확인 할 수 있다.
3. 기능에 대한 불확실성을 감소시킬 수 있다.
4. 시스템에 대한 실제 문서를 제공한다. 단위테스트 자체가 프로그램에 대한 명세가 될 수 있다.

이러한 장점 외에 실제 실무에서 도움이 되는 부분은 다음과 같다
단위 테스트가 없을 경우 개발 방식은
1. 코드 작성
2. 프로그램(톰캣) 실행
3. Postman 같은 api 테스트 도구로 http 요청
4. 요청 결과를 System.out.println 같은 로그로 확인
5. 결과가 다르면 프로그램을 내리고 코드 수정
원하는 결과가 나올 때까지 2 ~ 5 반복 => 매우 비효율적

테스트 코드 사용시 사람의 눈으로 로그를 검증하는 것이 아니라 자동으로 검증하므로 혹시 모를 실수를 방지하고 개발자가 만든 기능을 안전하게 보호할 수 있다. 예를 들어 이전에 만든 기능이 새로 기능을 추가할시 작동하지 않는 경우가 많음. 이럴 경우 기존 기능 잘 작동하는 것을 보장해 주는 것이 테스트 코드이다. 최근 많은 기업에서 테스트 자동화를 우대하고 있고 매우 중요하다 할 수 있다.

### 내장 WAS란
별도로 외장 WAS를 두지 않고 애플리케이션을 실행할때 내부에서 WAS를 실행하는 것으로 war가 아닌 runnable jar로 실행하게 된다.

내장 WAS를 사용하는 이유 : 언제 어디서나 같은 환경에서 스프링부트를 배포할 수 있게 된다. 외장 WAS를 쓰게 되면 모든 서버애서 WAS의 종류와 버전을 통일해야 하며 유지관리가 매우 힘들다.

### @RestController 와 Mapping
컨트롤러를 JSON을 반환하는 컨트롤러로 만들어주며 @Controller + @ResponseBody의 기능을 함.
@Get/@Post... + Mapping은 기존의 @RequestMaaping(method=Type)의 각 타입별 Mapping 수행

### Lombok
롬복은 게터와 세터 및 toString 등을 어노테이션으로 자동생성해 주는 라이브러리

implementation 'org.projectlombok:lombik'

annotationProcessor 'org.projectlombok:lombok'

롬복을 이용하여 의존성 주입을 하는 방법중 하나인 생성자 기반 주입을 생성자를 만들지 않고 수행 가능

@RequiredArgsConstructor : final로 선언된 필드들의 생성자를 만드는데 이를 통해 의존성 주입 

### @RequestParam("")
GET 요청으로 들어오는 파라미터 ex) dto?name=123에서 매개변수로 지정된 변수에 넣음

<pre><code>
@GetMapping("/hello/dto")
public HelloResponseDto helloDto(@RequestParam("name") String name, @RequestParam int amount){
        return new HelloResponseDto(name, amount);
}
</code></pre>
위의 코드에서 GET 요청 주소가 dto/name=123&amount=1000 이라면
String name에 123, int amount에 1000이 전달된다.


### 테스트 코드
JUnit Test

@ExtendWith(SpringExtension.class)      

@WebMvcTest(Controllers = testController)

어노테이션 설정 필요

cf) JUnit4 ExtendWith => RunWith, SpringExtension => SpringRunner

MockMvc 인스턴스를 이용해 테스트 수행

MockMvc.perform(get/post 등 요청(uri))로 요청
perform.get().param으로 쿼리 설정가능하며 스트링 데이터만 사용가능

perform().andExpect() 메소드로 검증

andExpect(검증타입.검증메소드)

ex
<pre><code>
    @Test
    public void shouldReturnHelloDto() throws Exception{
        String name = "hello";
        int amount = 1000;

        mvc.perform(get("/hello/dto")
                .param("name", name)
                .param("amount", String.valueOf(amount)))   // get 메소드에 체이닝해 param 메소드로 쿼리 데이터 설정. 단 String 값만 사용가능
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(name)))    // jsonPath 메소드 : json 데이터를 필드별로 검증
                .andExpect(jsonPath("$.amount", is(amount)));
    }
</code></pre>

AssertJ 테스트

## 3장 : 데이터베이스

### JPA, Hibernate, Spring-Data-JPA

JPA(Java Persistence API) : 자바 ORM 기술에 대한 명세로 자바에서 제공하는 API => 인터페이스로 구현되어 있지 않음!

Hibernate : JPA의 인터페이스를 구현한 구현체이다. 즉 JPA를 사용하는 방식 중 하나. EclipseLink, DataNucleus, OpenJPA 등등 다른 여러 JPA 구현체가 존재함.

Spring Data JPA : 위의 구현체들의 더 쉽게 사용할 수 있게 추상화한 스프링 진영이 만든 것으로 구현체의 교체나 저장소의 교체를 쉽게 할 수 있는 장점이 있다.

DAO 와 DTO

DAO는 Data Access Object의 약자로 데이터베이스의 data에 접근하기 위한 객체로 데이터베이스 접근을 위한 로직과 비즈니스 로직을 분리하기 위해 사용. JPA에서는 따로 DAO를 정의하지 않고 DAO의 역할을 하는 Repoository 객체가 존재한다.

DTO는 Data Transfer Object의 약자로 계층간 데이터 교환 역할을 한다. DTO는 단지 계층간 데이터 교환이 이뤄 질 수 있도록 하는 객체이기 때문에 특별한 로직을 가지지 않는 순수한 데이터 객체이어야만 한다.

Entity란?

엔티티 클래스는 데이터베이스의 테이블과 1대1로 대응되느 객체이다. JPA를 사용할 때 엔티티 클래스에는 @Entity 어노테이션을 붙여서 엔티티임을 명시해야한다. 이때 Domain 로직만 구현하고 Presentation 로직은 구현하지 않는다.

cf) 레이어드 패턴(계층 패턴) : 백엔드 API를 구현할때 쓰이는 패턴중 하나로 API를 구현할 때 역할에 따라 독립된 모듈로 나누어서 코드를 구현한다. 

일반적으로 presentation layer, bussiness layer, persistence layer 의 3계층을 이루며 3개의 레이어가 층츠히 의존도에 따라 연결되어 전체 시스템을 구성한다.

![image](https://user-images.githubusercontent.com/71641938/124581881-77b3ec80-de8c-11eb-9444-8c9700de6cb5.png)

Presentation layer 
- 클라이언트와 직접적으로 연결되는 부분으로 웹사이트에서는 UI, 백엔드 API에서는 엔드포인트에 해당.
- Presentation layer 에서는 API의 엔드포인트를 정의하고 전송된 HTTP요청을 읽어드리는 로직을 구현한다. => 컨트롤러인가?

Bussiness layer
- 실제 시스템이 구현해야하는 로직들을 구현하는 계층. 예를들어 1000자 이하의 글을 쓸 수 있느 게시판을 구현한다면 1000자가 넘는지 안넘는지 확인하고 1000자가 넘으면 게스글을 저장할 수 없게 하는 등의 로직
- 필요한 데이터의 생성, 수정, 읽기, 삭제 처리

Persistence layer
- 데이터베이스와 관련된 로직 구현
- business layer 에서 필요한 데이터의 생성, 수정, 읽기, 삭제를 처리하고 실제 데이터베이스에서 데이터를 저장, 수정 읽어 들이는 역할

레이어드 패턴을 잘 보면 Controller - Service - Repository 관계라고 생각된다.

## 5장. 스프링 시큐리티와 로그인 구현(Google)

##### 스프링 시큐리티
spring.security.oauth2.client.registration.google.client-id=클라이언트ID

spring.security.oauth2.client.registration.google.client-secret=클라이언트보안키

spring.security.oauth2.client.registration.google.scope=profile,email

cf) 스코프 설정이 필요한 이유 : 기본 디폴트 설정은 openId, profile, email. 하지만 openId가 scope에 등록되어 있을 경우 스프링에 OpenId Provider로 인식이 되서 동일한 OAuth2Service를 사용할 수 없게 됨. 즉 openId Provider인 서비스와 그렇지 않은 서비스를 동시에 사용할 경우 서비스 종류에 따라 OAuth2Service를 만들어야 한다. 따라서 scope에 openId를 제외하여 설정.

cf) application-xxxx.properties 등록 방법 : application.properties에 spring.profile.include=xxxx 로 등록

cf) 스프링 시큐리티는 권한 코드 앞에 ROLE_ 이 앞에 있어야만 하므로 권한 enum에서 ROLE_ 접두사를 붙여야한다.

#### 스프링 세큐리티 설정
WebSecurityConfigureAdapter를 상속받은 SecurityConfig 클래스 생성하고 protected void configure(HttpSecurity http) 메소드 오버로딩

@EnableWebSecuriy : 스프링 시큐리티 설정 활성화


