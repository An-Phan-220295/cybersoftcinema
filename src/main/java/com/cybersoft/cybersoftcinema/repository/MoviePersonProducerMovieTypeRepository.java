package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.MoviePersonProducerMovieTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MoviePersonProducerMovieTypeRepository extends JpaRepository<MoviePersonProducerMovieTypeEntity, Integer> {

    //Sort Movie
    @Query("SELECT m FROM movie_person_producer_movietype m ORDER BY m.movieEntity")
    List<MoviePersonProducerMovieTypeEntity> findAllMovie();
}
