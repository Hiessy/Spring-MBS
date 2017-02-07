package com.web.controller;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.web.model.ServerResponse;
import com.web.model.response.Access;
import com.web.model.response.MetaData;

@Controller
public class LoginController {

    private static Logger LOGGER = LoggerFactory.getLogger(Controller.class.getName());

    @RequestMapping(value = { "/" }, method = RequestMethod.GET)
    public ModelAndView welcomePage() {
	ModelAndView model = new ModelAndView();
	model.setViewName("welcomePage");
	return model;
    }

    @RequestMapping(value = { "/home" }, method = RequestMethod.GET)
    public ModelAndView homePage() {
	ModelAndView model = new ModelAndView();
	model.setViewName("homepage");
	return model;
    }

    @RequestMapping(value = "/login", method = { RequestMethod.GET, RequestMethod.POST })
    public ModelAndView loginPage(@RequestParam(value = "error", required = false) String error, @RequestParam(value = "logout", required = false) String logout) {

	ModelAndView model = new ModelAndView();
	if (error != null) {
	    model.addObject("error", "Invalid Credentials provided.");
	}

	if (logout != null) {
	    model.addObject("message", "Logged out from JournalDEV successfully.");
	}

	model.setViewName("loginPage");
	return model;
    }

    // http://localhost:8080/validate?email=martin@mail.com&string=passwordHaseadha
    @RequestMapping(value = "/validate", params = { "email", "string" }, method = { RequestMethod.GET })
    public ResponseEntity<ServerResponse<Access>> validate(@RequestParam("email") String email, @RequestParam("string") String pass) {

	ServerResponse<Access> accesResponse = new ServerResponse<Access>();
	MetaData accessMetaData = new MetaData();

	try {
	    // this.userManager.delete(code);
	    accessMetaData.setInfo("User access request");
	    accessMetaData.setHttpStatus(HttpStatus.OK);
	    accesResponse.setMetaData(accessMetaData);

	    // TODO validation method
	    accesResponse.setData(checkUserAuthorization(email, pass));

	    LOGGER.info("User was validated succesfully");

	} catch (Exception e) {

	    accessMetaData.setInfo("User not deleted");
	    accessMetaData.setHttpStatus(HttpStatus.BAD_REQUEST);
	    accesResponse.setMetaData(accessMetaData);
	    LOGGER.error("User not deleted" + e.getMessage());
	}

	return new ResponseEntity<ServerResponse<Access>>(accesResponse, HttpStatus.OK);
    }
    // @RequestMapping(value = "/validate", method = {RequestMethod.GET,
    // RequestMethod.POST})
    // public ResponseEntity<ServerResponse<AccessRequest>>
    // validateUser(@RequestBody AccessRequest accessRequest){
    // String token = null;
    //
    // return ResponseEntity<String>(token);
    // }

    private Access checkUserAuthorization(String email, String pass) {

	Access access = new Access();

	// TODO
	String hash = "validate from data source user and pass are correct";

	if (hash != null) {
	    access.setHash(getHash(email + ":" + pass));
	    access.setAccepted(true);
	} else {
	    access.setAccepted(false);
	}

	return access;
    }

    private String getHash(String toHash) {

	MessageDigest messageDigest = null;
	StringBuffer sb = null;
	try {
	    messageDigest = MessageDigest.getInstance("MD5");
	    messageDigest.update(toHash.getBytes());
	    byte[] mdbytes = messageDigest.digest();
	    sb = new StringBuffer();
	    for (int i = 0; i < mdbytes.length; i++) {
		sb.append(Integer.toString((mdbytes[i] & 0xff) + 0x100, 16).substring(1));
	    }
	} catch (NoSuchAlgorithmException e) {
	    // TODO Auto-generated catch block
	    e.printStackTrace();
	}

	return sb.toString();
    }

}