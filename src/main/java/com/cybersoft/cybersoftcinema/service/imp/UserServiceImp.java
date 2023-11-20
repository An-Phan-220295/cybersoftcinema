package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.request.UpdateUserRequest;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;

import java.util.List;

public interface UserServiceImp {
    UserInfoResponse findUserById(int userId);
    List<UserInfoResponse> findAllUser();
    boolean updateUserInfo(UpdateUserRequest updateUserRequest);
    boolean deleteUserById(int userId);
}
