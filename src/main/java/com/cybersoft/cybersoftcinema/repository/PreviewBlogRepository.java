package com.cybersoft.cybersoftcinema.repository;

import com.cybersoft.cybersoftcinema.entity.MovieEntity;
import com.cybersoft.cybersoftcinema.entity.PreviewBlogEntity;
import com.cybersoft.cybersoftcinema.entity.TheaterEntity;
import com.cybersoft.cybersoftcinema.entity.TypePreviewBlogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PreviewBlogRepository extends JpaRepository<PreviewBlogEntity, Integer> {
    List<PreviewBlogEntity> findByTypePreviewBlogEntityId(int id);

}