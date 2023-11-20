package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.PersonTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonTypeRepository extends JpaRepository<PersonTypeEntity,Integer> {
}
