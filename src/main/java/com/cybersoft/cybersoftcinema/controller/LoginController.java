package com.cybersoft.cybersoftcinema.controller;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.BaseResponse;
import com.cybersoft.cybersoftcinema.payload.request.SignInRequest;
import com.cybersoft.cybersoftcinema.payload.request.SignUpRequest;
import com.cybersoft.cybersoftcinema.payload.response.SignInResponse;
import com.cybersoft.cybersoftcinema.service.imp.LoginServiceImp;
import com.cybersoft.cybersoftcinema.util.JwtHelper;
import com.google.gson.Gson;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/login")
@CrossOrigin
public class LoginController {

    @Autowired
    private LoginServiceImp loginServiceImp;

    @Autowired
    private AuthenticationManager authenticationManager;

    private Logger logger = LoggerFactory.getLogger(LoginController.class);

    private Gson gson = new Gson();

    @Autowired
    private JwtHelper jwtHelper;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInRequest signInRequest) {
        logger.info("email: " + signInRequest.getEmail() + " - password: " + signInRequest.getPassword());
        UsernamePasswordAuthenticationToken authen = new UsernamePasswordAuthenticationToken(signInRequest.getEmail(), signInRequest.getPassword());
        BaseResponse baseResponse = new BaseResponse();
        try {
            authenticationManager.authenticate(authen);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            List<GrantedAuthority> roles = (List<GrantedAuthority>) authentication.getAuthorities();
            String jsonRole = gson.toJson(roles);
            String token = jwtHelper.generateToken(jsonRole);

            SignInResponse signInResponse = new SignInResponse();
            signInResponse.setEmail(signInRequest.getEmail());
            signInResponse.setUserId(loginServiceImp.checkSignIn(signInRequest.getEmail()).getId());
            signInResponse.setToken(token);
            System.out.println(jwtHelper.parserToken(token));

            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Đăng nhập thành công");
            baseResponse.setData(signInResponse);

            logger.info(("Response Signin: " + baseResponse.getMessage()));
        }catch (Exception e) {
            baseResponse.setStatusCode(403);
            baseResponse.setMessage("Đăng nhập thất bại");
            baseResponse.setData("");

            logger.info(("Response Signin: " + baseResponse.getMessage()));
        }
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
        logger.info("SignUpRequest: " + signUpRequest);
        BaseResponse baseResponse = new BaseResponse();
        if (loginServiceImp.checkEmailExist(signUpRequest.getEmail())) {
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Email đã tồn tại");
            baseResponse.setData("");
        } else {
            boolean isSuccess = loginServiceImp.insertUser(signUpRequest);
            baseResponse.setStatusCode(200);
            baseResponse.setMessage("Đăng ký thành công");
            baseResponse.setData(isSuccess);
        }

        logger.info(("Response Signin: " + baseResponse.getMessage()));
        return new ResponseEntity<>(baseResponse, HttpStatus.OK);
    }
}
