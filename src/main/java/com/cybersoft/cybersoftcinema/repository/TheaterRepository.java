package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheaterRepository extends JpaRepository<TheaterEntity, Integer> {
}
