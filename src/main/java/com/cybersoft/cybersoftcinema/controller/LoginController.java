package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.service.imp.UserServiceImp;
import com.cybersoft.cybersoftcinema.util.JwtHelper;
import com.google.gson.Gson;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.crypto.SecretKey;
import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserServiceImp userServiceImp;

    @Autowired
    private AuthenticationManager authenticationManager;

    private Logger logger = LoggerFactory.getLogger(LoginController.class);

    private Gson gson = new Gson();

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestParam String email, @RequestParam String password) {
        logger.info("email: "+email + " - password: "+password);
        UsernamePasswordAuthenticationToken authen = new UsernamePasswordAuthenticationToken(email,password);
        authenticationManager.authenticate(authen);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<GrantedAuthority> roles = (List<GrantedAuthority>) authentication.getAuthorities();
        String jsonRole = gson.toJson(roles);
        String token = jwtHelper.generateToken(jsonRole);
        logger.info(("Response Signin: "));
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}
