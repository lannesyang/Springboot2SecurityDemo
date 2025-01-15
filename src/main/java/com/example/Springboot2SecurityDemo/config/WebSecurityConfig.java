package com.example.Springboot2SecurityDemo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.example.Springboot2SecurityDemo.service.MemberService;


@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired 
	MemberService memberService;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		System.out.println("run DemoProduct Security config");
		http.authorizeRequests()
		.antMatchers("/latestNews","/login","/saveProduct","/register","/registerResult","/images/**","/productList","/productInfo/**","/shoppingCar","/getAreas","/userInfo","/order","/orderList","/forgetPassword","/updatePassword","/sendMailSuccess").permitAll()
		.antMatchers("/test","/addArticle","/editArticle","/productSetting","/prodCodeSetting","/customerSetting").hasAnyAuthority("ADMIN")
		.anyRequest().authenticated() // 其他尚未匹配到的url都需要身份驗證
		.and().formLogin().loginPage("/login")
		.loginProcessingUrl("/login")
		.defaultSuccessUrl("/latestNews",true)
		.and().logout().permitAll();
		http.csrf().disable();
	}
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		System.out.println("run Security resource allow");
		web.ignoring().antMatchers("/css/*","/images/*","/js/*"); 
	}
}
