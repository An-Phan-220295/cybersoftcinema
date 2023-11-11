package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.PriceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<PriceEntity,Integer> {
}
