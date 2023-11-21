package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieStatusRepository extends JpaRepository<MovieStatusEntity, Integer> {
}
