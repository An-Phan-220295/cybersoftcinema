package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.RoleEntity;
import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.request.UpdateUserRequest;
import com.cybersoft.cybersoftcinema.payload.response.UserInfoResponse;
import com.cybersoft.cybersoftcinema.repository.UserRepository;
import com.cybersoft.cybersoftcinema.service.imp.UserServiceImp;
import org.apache.tomcat.jni.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserInfoResponse findUserById(int userId) {
        Optional<UsersEntity> usersEntity = userRepository.findById(userId);
        UserInfoResponse userInfoResponse = new UserInfoResponse();
        userInfoResponse.setId(usersEntity.get().getId());
        userInfoResponse.setFullName(usersEntity.get().getFullName());
        userInfoResponse.setEmail(usersEntity.get().getEmail());
        userInfoResponse.setPhoneNumber(usersEntity.get().getPhoneNumber());
        userInfoResponse.setGender(usersEntity.get().getGender()=='m'?"Nam":"Nữ");
        userInfoResponse.setDob(usersEntity.get().getDob());
        userInfoResponse.setRole(usersEntity.get().getRoleEntity().getName());
        return userInfoResponse;
    }

    @Override
    public List<UserInfoResponse> findAllUser() {
        List<UserInfoResponse> list = new ArrayList<>();
        List<UsersEntity> usersEntityList = userRepository.findAll();
        for (UsersEntity data:usersEntityList) {
            UserInfoResponse userInfoResponse = new UserInfoResponse();
            userInfoResponse.setId(data.getId());
            userInfoResponse.setFullName(data.getFullName());
            userInfoResponse.setEmail(data.getEmail());
            userInfoResponse.setPhoneNumber(data.getPhoneNumber());
            userInfoResponse.setGender(data.getGender()=='m'?"Nam":"Nữ");
            userInfoResponse.setDob(data.getDob());
            userInfoResponse.setRole(data.getRoleEntity().getName());
            list.add((userInfoResponse));
        }
        return list;
    }

    @Override
    public boolean updateUserInfo(UpdateUserRequest updateUserRequest) {
        boolean isSuccess = false;

        UsersEntity usersEntity = new UsersEntity();
        usersEntity.setId(updateUserRequest.getId());
        usersEntity.setFullName(updateUserRequest.getFullName());
        usersEntity.setPhoneNumber(updateUserRequest.getPhoneNumber());
        usersEntity.setGender(updateUserRequest.getGender());
        usersEntity.setEmail(updateUserRequest.getEmail());
        usersEntity.setDob(updateUserRequest.getDob());
        RoleEntity roleEntity= new RoleEntity();
        roleEntity.setId(updateUserRequest.getIdRole());
        usersEntity.setRoleEntity(roleEntity);
        try {
            userRepository.save(usersEntity);
            isSuccess = true;
        }catch (Exception e){
            System.out.println("Update failed");
        }
        return isSuccess;
    }

    @Override
    public boolean deleteUserById(int userId) {
        boolean isSuccess = false;
        try {
            userRepository.deleteById(userId);
            isSuccess = true;
        }catch (Exception e){
            System.out.println("Delete failed");
        }
        return isSuccess;
    }
}
