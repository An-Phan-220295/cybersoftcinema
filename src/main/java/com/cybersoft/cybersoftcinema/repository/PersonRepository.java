package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.PersonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<PersonEntity, Integer> {
}
