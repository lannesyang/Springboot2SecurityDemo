package com.example.Springboot2SecurityDemo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.Springboot2SecurityDemo.model.DemoMember;
import com.example.Springboot2SecurityDemo.service.MemberService;
import com.example.Springboot2SecurityDemo.util.AssistUtil;


@Controller
public class MainController {
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	MemberService memberService;
	
	@Autowired
	AssistUtil util;
	
	@RequestMapping("/index")
	public String home(Model model) {
		return "index";
	}
	
	@GetMapping("/login")
	public String login(Model model) {
		return "login";
	}
	
	@GetMapping("/register")
	public String register(Model model) {
		DemoMember member = new DemoMember();
		member.setAccount(null);
		model.addAttribute("member", member);
		return "register";
	}
	
	@PostMapping("/register")
	public String registerResult(Model model,@Valid @ModelAttribute("member") DemoMember member,BindingResult bindingResult) {
		System.out.println("start register...");
		if (bindingResult.hasErrors()) {
			model.addAttribute("member", member);
	    	return "register";
	    }else{
			System.out.println("memberAccount:" + member.getAccount());
			System.out.println("password:" + member.getPassword());
			member.setId(util.getSerial("member"));
			memberService.saveMember(member);
			return "registerResult";
	    }
	}
	
	@RequestMapping("/latestNews")
	public String latestNews(Model model) {
		return "latestNews";
	}
}
