package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.SeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<SeatEntity,Integer> {

    @Query("select s from seat s where s.movieEntity.id = :idMovie and s.theaterEntity.id = :idTheater and s.showingEntity.id = :idShowing")
    List<SeatEntity> findUnavalableSeat(int idMovie, int idTheater, int idShowing);
}
