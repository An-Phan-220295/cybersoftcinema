package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import com.cybersoft.cybersoftcinema.repository.UserRepository;
import com.cybersoft.cybersoftcinema.service.imp.UserServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UsersEntity checkSignIn(String email) {
        return userRepository.findByEmail(email);
    }
}
