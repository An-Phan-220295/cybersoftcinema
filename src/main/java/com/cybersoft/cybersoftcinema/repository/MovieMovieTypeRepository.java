package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieMovieTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieMovieTypeRepository extends JpaRepository<MovieMovieTypeEntity,Integer> {
}
