package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.ShowingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface ShowingRepository extends JpaRepository<ShowingEntity,Integer> {
    boolean existsByShowingDateAndStartTime(Date showingDate, Time startTime);

    @Query("select s from showing s order by s.showingDate asc ,s.startTime asc ")
    List<ShowingEntity> findAll();

    ShowingEntity findByShowingDateAndStartTime(Date showingDate, Time startTime);
}
