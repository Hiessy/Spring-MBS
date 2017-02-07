package com.web.model.response;

import org.springframework.http.HttpStatus;

public class MetaData {

	private HttpStatus httpStatus;
	private String code;
	private String message;

	public String getInfo() {
		return this.code;
	}

	public void setInfo(String info) {
		this.code = info;
	}

	public HttpStatus getHttpStatus() {
		return httpStatus;
	}

	public void setHttpStatus(HttpStatus httpStatus) {
		this.httpStatus = httpStatus;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "MetaData [httpStatus=" + httpStatus + ", code=" + code + ", message=" + message + "]";
	}


}
