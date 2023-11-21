package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovieTypeRepository extends JpaRepository<MovieTypeEntity,Integer> {

}
