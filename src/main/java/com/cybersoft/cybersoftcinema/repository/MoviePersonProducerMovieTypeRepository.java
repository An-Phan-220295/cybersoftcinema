package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.MoviePersonProducerMovieTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface MoviePersonProducerMovieTypeRepository extends JpaRepository<MoviePersonProducerMovieTypeEntity, Integer> {

    //Sort Movie
    @Query("SELECT m FROM movie_person_producer_movietype m ORDER BY m.movieEntity")
    List<MoviePersonProducerMovieTypeEntity> findAllMovie();

    //Delete By id_Movie
    @Transactional
    @Modifying
    @Query("DELETE FROM movie_person_producer_movietype m WHERE m.movieEntity.id = :idMovie")
    int deleteByIdMovie(int idMovie);
}
