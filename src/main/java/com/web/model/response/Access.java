package com.web.model.response;

//TODO:pagina de registracion
public class Access {
    private String hash;
    private boolean accepted;

    public String getHash() {
	return hash;
    }

    public void setHash(String hash2) {
	this.hash = hash2;
    }

    public boolean isAccepted() {
	return accepted;
    }

    public void setAccepted(boolean accepted) {
	this.accepted = accepted;
    }

	String user;
	String pass;
	String token;
}
