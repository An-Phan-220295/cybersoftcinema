package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.request.AdminUserAddRequest;
import com.cybersoft.cybersoftcinema.payload.request.SignUpRequest;

public interface LoginServiceImp {
    UsersEntity checkSignIn(String email);
    boolean insertUser(SignUpRequest signUpRequest);
    boolean checkEmailExist(String email);
    boolean adminInsertUser(AdminUserAddRequest adminUserAddRequest);
}
