package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<MovieEntity,Integer> {
}
