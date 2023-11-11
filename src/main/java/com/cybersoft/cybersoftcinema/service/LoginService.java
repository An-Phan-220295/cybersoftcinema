package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.RoleEntity;
import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.payload.request.SignUpRequest;
import com.cybersoft.cybersoftcinema.repository.UserRepository;
import com.cybersoft.cybersoftcinema.service.imp.LoginServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService implements LoginServiceImp {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UsersEntity checkSignIn(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean insertUser(SignUpRequest signUpRequest) {

        boolean isSuccess = false;

        UsersEntity usersEntity = new UsersEntity();
        usersEntity.setFullName(signUpRequest.getFullName());
        usersEntity.setPhoneNumber(signUpRequest.getPhoneNumber());
        usersEntity.setGender(signUpRequest.getGender());
        usersEntity.setEmail(signUpRequest.getEmail());
        usersEntity.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        usersEntity.setDob(signUpRequest.getDob());

        RoleEntity roleEntity = new RoleEntity();
        roleEntity.setId(3);

        usersEntity.setRoleEntity(roleEntity);

        try {
            userRepository.save(usersEntity);
            isSuccess = true;
        } catch (Exception e) {
            System.out.println("Thêm thất bại" + e.getLocalizedMessage());
        }
        return isSuccess;
    }

    @Override
    public boolean checkEmailExist(String email) {
        boolean isExist = true;
        try {
            if (userRepository.findByEmail(email).getEmail().equals(null)) {
                System.out.println(userRepository.findByEmail(email).getEmail());
                isExist = false;
            }
        } catch (Exception e) {
            isExist = false;
        }
        System.out.println(isExist);

        return isExist;
    }
}
