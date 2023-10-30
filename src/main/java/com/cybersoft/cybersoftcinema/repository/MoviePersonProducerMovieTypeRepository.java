package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MoviePersonProducerMovieTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoviePersonProducerMovieTypeRepository extends JpaRepository<MoviePersonProducerMovieTypeEntity, Integer> {
}
