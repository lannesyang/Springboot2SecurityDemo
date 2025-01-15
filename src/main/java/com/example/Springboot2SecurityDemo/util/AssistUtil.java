package com.example.Springboot2SecurityDemo.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.Springboot2SecurityDemo.service.MemberService;

@Component
public class AssistUtil {
	
	@Autowired
	MemberService memberService;
	
	public static void saveFile(String uploadDir, String fileName, MultipartFile multipartFile) throws IOException {
		Path uploadPath = Paths.get(uploadDir);
		System.out.println("uploadDir:" + uploadDir);
		System.out.println("fileName:" + fileName);
		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		try (InputStream inputStream = multipartFile.getInputStream()) {
			Path filePath = uploadPath.resolve(fileName);
			System.out.println("filePath:" + filePath);
			Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException ioe) {
			throw new IOException("Could not save image file: " + fileName, ioe);
		}
	}
	//取號機
	public int getSerial(String tableName){
		int max = 0;
		switch(tableName){
			case "member":
				max = memberService.getMaxId();
				System.out.println("member max:" + max);
			case "product":
				max = memberService.getMaxId();
				System.out.println("member max:" + max);
		}
		return (max+1);
	}
}
