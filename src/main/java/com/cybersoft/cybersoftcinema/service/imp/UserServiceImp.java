package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;

public interface UserServiceImp {
    UsersEntity checkSignIn(String email);
}
