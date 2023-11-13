package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;
import com.cybersoft.cybersoftcinema.repository.UserRepository;
import com.cybersoft.cybersoftcinema.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserInfoResponse findUserById(int userId) {
        Optional<UsersEntity> usersEntity = userRepository.findById(userId);
        UserInfoResponse userInfoResponse = new UserInfoResponse();
        userInfoResponse.setFullName(usersEntity.get().getFullName());
        userInfoResponse.setEmail(usersEntity.get().getEmail());
        userInfoResponse.setPhoneNumber(usersEntity.get().getPhoneNumber());
        userInfoResponse.setGender(usersEntity.get().getGender()=='m'?"Nam":"Nữ");
        userInfoResponse.setDob(usersEntity.get().getDob());
        return userInfoResponse;
    }
}
