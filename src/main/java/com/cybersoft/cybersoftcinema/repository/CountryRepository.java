package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<CountryEntity, Integer> {
}
