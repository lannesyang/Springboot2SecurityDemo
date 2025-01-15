package com.example.Springboot2SecurityDemo.service;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.example.Springboot2SecurityDemo.model.DemoMember;


public interface MemberService extends UserDetailsService{
	
	public int getMaxId(); 
	
	public void saveMember(DemoMember member);
	
	public List<DemoMember> getFullmemberList();
}
