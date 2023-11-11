package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.MovieTheaterShowingEntity;
import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import org.hibernate.annotations.SQLUpdate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

@Repository
public interface MovieTheaterShowRepository extends JpaRepository<MovieTheaterShowingEntity,Integer> {

    @Modifying
    @Transactional
    @Query(value = "SET time_zone = '+07:00'",nativeQuery = true)
    void setTimezone();

    //Sort by movie
    @Query("SELECT m.movieEntity FROM movie_theater_showing m where (m.showingEntity.showingDate > current_date or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) GROUP BY m.movieEntity")
    List<MovieEntity> findMovieName();

    @Query("select m.theaterEntity FROM movie_theater_showing m WHERE m.movieEntity.id = :movieId and ((m.showingEntity.showingDate > current_date) or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time ))GROUP BY m.theaterEntity")
    List<TheaterEntity> findTheaterByMovie(int movieId);

    @Query("select m.showingEntity.showingDate FROM movie_theater_showing m WHERE m.movieEntity.id = :movieId and m.theaterEntity.id = :theaterId and ((m.showingEntity.showingDate > current_date) or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) group by m.showingEntity.showingDate" )
    List<Date> findShowingDateByMovieAndTheater(int movieId, int theaterId);

    @Query("select m.showingEntity FROM movie_theater_showing m WHERE m.movieEntity.id = :movieId and m.theaterEntity.id = :theaterId and m.showingEntity.showingDate = :showingDate and ((m.showingEntity.showingDate > current_date) or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time ))" )
    List<ShowingEntity> findShowingTimeByMovieAndTheaterAndDate(int movieId, int theaterId, Date showingDate);

    //Sort by date
    @Query("SELECT m.showingEntity.showingDate FROM movie_theater_showing m where (m.showingEntity.showingDate > current_date or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) GROUP BY m.showingEntity.showingDate")
    List<Date> findAllDate();

    @Query("select m.theaterEntity FROM movie_theater_showing m WHERE m.showingEntity.showingDate = :showingDate and ((m.showingEntity.showingDate > current_date) or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time ))GROUP BY m.theaterEntity")
    List<TheaterEntity> findTheaterByDate(Date showingDate);

    @Query("SELECT m.movieEntity FROM movie_theater_showing m where m.showingEntity.showingDate = :showingDate and m.theaterEntity.id = :theaterId and (m.showingEntity.showingDate > current_date or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) GROUP BY m.movieEntity")
    List<MovieEntity> findMovieEByDateAndTheater(Date showingDate,int theaterId);

    //Sort by theater
    @Query("select m.theaterEntity FROM movie_theater_showing m WHERE (m.showingEntity.showingDate > current_date or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) GROUP BY m.theaterEntity")
    List<TheaterEntity> getAllTheater();

    @Query("SELECT m.movieEntity FROM movie_theater_showing m where m.theaterEntity.id = :theaterId and (m.showingEntity.showingDate > current_date or (m.showingEntity.showingDate = current_date and m.showingEntity.startTime > current_time )) GROUP BY m.movieEntity")
    List<MovieEntity> findMovieEByTheater(int theaterId);

    @Query("select m FROM movie_theater_showing m where m.movieEntity.id= :idMovie and m.theaterEntity.id = :idTheater and m.showingEntity.id = :idShowing")
    MovieTheaterShowingEntity findInfoById(int idMovie, int idTheater, int idShowing);
}
