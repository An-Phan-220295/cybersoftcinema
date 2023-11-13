package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;

public interface UserServiceImp {
    UserInfoResponse findUserById(int userId);
}
