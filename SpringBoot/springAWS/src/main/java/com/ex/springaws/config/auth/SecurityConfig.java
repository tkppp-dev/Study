package com.ex.springaws.config.auth;


import com.ex.springaws.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@RequiredArgsConstructor
@EnableWebSecurity      // Spring Security 설정 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customUserTypesOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .headers().frameOptions().disable()  // h2-console 사용하기 위한 설정
                .and()
                    .authorizeRequests()   // 권한 관리 대상 지정 : URL, HTTP 메소드 별로 관리 가능
                    .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**").permitAll()      // 지정된 url은 전체 열람 권한 설정
                    .antMatchers("/api/v1/**").hasRole(Role.USER.name())    // 유저 권한을 가진 사람만 접근 가능하게 설정
                    .anyRequest().authenticated()   // 지정한 url 이외의 나머지 url 권한 지정. authenticated() : 인증된 사용자들에게만 허용/로그인한 사용자
                .and()
                    .logout().logoutSuccessUrl("/")    // 로그아웃 기능에 대한 여러 설정의 진입점. logoutSuccessUrl() : 로그아웃 성공시 이동할 url 지정
                .and()
                    .oauth2Login().userInfoEndpoint()   // ouath2Login : 소셜로그인 기능에 대한 여러 설정의 진입점.
                        .userService(customUserTypesOAuth2UserService);     // 소셜 로그인 성공후 수행할 후속 조치를 UserService 인터페이스의 구현체를 등록. 즉 리소스 서버에서 가져온 사용자 정보로 수행할 기능.
    }
}
