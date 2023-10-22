package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.UsersEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UsersEntity, Integer> {
    UsersEntity findByEmail(String email);
}
