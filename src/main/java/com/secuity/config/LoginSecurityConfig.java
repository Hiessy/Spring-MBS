package com.secuity.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class LoginSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder authenticationMgr) throws Exception {
		authenticationMgr.inMemoryAuthentication().withUser("user").password("1234").authorities("ROLE_USER");
		authenticationMgr.inMemoryAuthentication().withUser("admin").password("1234").authorities("ADMIN_USER");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/home").access("hasRole('ROLE_USER')").and().formLogin().loginPage("/login").defaultSuccessUrl("/home").failureUrl("/login?error").usernameParameter("username").passwordParameter("password").and().logout()
				.logoutSuccessUrl("/login?logout");

		http.authorizeRequests().antMatchers("/home").access("hasRole('ADMIN_USER')").and().formLogin().loginPage("/login").defaultSuccessUrl("/home").failureUrl("/login?error").usernameParameter("username").passwordParameter("password").and().logout()
		.logoutSuccessUrl("/login?logout");
	}
}