package com.example.Springboot2SecurityDemo.service.impl;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.Springboot2SecurityDemo.model.DemoMember;
import com.example.Springboot2SecurityDemo.repository.MemberRepository;
import com.example.Springboot2SecurityDemo.service.MemberService;

@Component
public class MemberServiceImpl implements MemberService {
	
	@Autowired
	MemberRepository memberRepository;
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public int getMaxId() {
		long count = memberRepository.count();
		if(0 < count)
			return memberRepository.getMaxId();
		else
			return 0;
	}
	
	@Override
	public UserDetails loadUserByUsername(String account) throws UsernameNotFoundException {
		System.out.println("run loadUserByUsername:" + account);
		DemoMember member = memberRepository.getMember(account);
	    String userName = member.getAccount();
	    if(userName == null){
	        throw new UsernameNotFoundException("User not authorized.");
	    }
	    GrantedAuthority authority = new SimpleGrantedAuthority(member.getRole());
	    UserDetails userDetails = (UserDetails)new User(userName, member.getPassword(), Arrays.asList(authority));
        return userDetails;
	}
	
	@Override
	public void saveMember(DemoMember member) {
		member.setRole("USER");
		System.out.println("savaMember Id:" + member.getId());
		member.setUpdateBy(member.getAccount().trim());
		Date currentDate = new Date(System.currentTimeMillis());
		member.setUpdateDate(currentDate);
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		memberRepository.save(member);
	}


	@Override
	public List<DemoMember> getFullmemberList() {
		return memberRepository.findAll();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
	    return new BCryptPasswordEncoder();
	}

	
}
