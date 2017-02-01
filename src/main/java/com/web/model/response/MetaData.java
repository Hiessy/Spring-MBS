package com.web.model.response;

import org.springframework.http.HttpStatus;

public class MetaData {

	 private HttpStatus message;
	    private String code;

	    public String getInfo() {
	        return this.code;
	    }

	    public void setInfo(String info) {
	        this.code = info;
	    }

	    public HttpStatus getHttpStatus() {
	        return this.message;
	    }

	    public void setHttpStatus(HttpStatus message) {
	        this.message = message;
	    }

	    @Override
	    public String toString() {
	        return "MetaData [message=" + this.message + ", code=" + this.code + "]";
	    }
	
}
