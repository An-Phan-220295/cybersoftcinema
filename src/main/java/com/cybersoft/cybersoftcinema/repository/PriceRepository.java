package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.PriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface PriceRepository extends JpaRepository<PriceEntity,Integer> {

    @Query("SELECT COUNT(s) FROM seat s WHERE s.movieEntity.id = :movieId AND s.theaterEntity.id = :theaterId AND s.showingEntity.id = :showingId AND s.seatTypeEntity.id = :seatTypeId")
    Long countSeatSold(int movieId, int theaterId, int showingId, int seatTypeId);

}
