package com.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.web.model.ServerResponse;
import com.web.model.request.User;

@Controller
public class RegisterUserController {

	//toekn con md5
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<ServerResponse<User>> registerUser(@RequestBody User user) {
		ServerResponse serverResponse = null;

		return new ResponseEntity<ServerResponse<User>>(serverResponse, HttpStatus.OK);
	}

}
