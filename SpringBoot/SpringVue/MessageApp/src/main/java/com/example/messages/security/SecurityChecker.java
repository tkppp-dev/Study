package com.example.messages.security;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class SecurityChecker {
    /*
    * Spring AOP
    * Join Point : 특정 프로그램(메소드)가 실행되는 지점
    * Advise : 관심사(aspect)를 처리하는 행동이며 이 클래스에서는 checkSecurity 메소드가 해당된다
    *  어드바이스 지점
    *  @Before : 조인 포인트 이전에 실행되며 실행을 제어할 수 없다
    *  @AfterReturning : 예외없이 조인 포인트가 정상적으로 완료된후 실행
    *  @AfterThrowing : 예외를 던져 메소드가 종료될 때 실행
    *  @After : 예외의 존재 여부와 관련없이 조인포인트 이후에 실행, finally 구문이라고 생각하면 편함
    *  @Around : 코드 실행을 제어할 수 있는 어드바이스로 어드바이스 안에서 실행 여부를 결정한다
    * PointCut : 일치하는 여러 조인포인트를 결합한 것으로 포인트컷 표현식으로 실행 위치를 지정 가능
    *  포인트컷에 대한 시그니처를 생성해 변수처럼 사용할 수도 있다
    *  PCD(@annotation)을 통해 특정 메소드를 지정할 수 있다
    */
    private static final Logger logger = LoggerFactory.getLogger(SecurityChecker.class);

    @Pointcut("@annotation(com.example.messages.security.SecurityCheck)")
    public void checkMethodSecurity() {}

    @Around("checkMethodSecurity()")
    public Object checkSecurity(ProceedingJoinPoint joinPoint) throws Throwable{
        logger.debug("checking method security");
        // TODO 보안 로직 구현
        Object result = joinPoint.proceed();
        return result;
    }

    @Pointcut("execution(* com.example.messages..*.*(..))")
    public void everyMessageMethod(){}
    /*
    @Around("everyMessageMethod()")     // 시그니처 연결
    public Object checkSecurity(ProceedingJoinPoint joinPoint){
        return null;
    }
    */
}
