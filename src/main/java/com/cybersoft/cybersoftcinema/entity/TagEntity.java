package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "tag")
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "tagEntity")
    private List<PreviewBlogTagEntity> previewBlogTagEntities;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PreviewBlogTagEntity> getPreviewBlogTagEntities() {
        return previewBlogTagEntities;
    }

    public void setPreviewBlogTagEntities(List<PreviewBlogTagEntity> previewBlogTagEntities) {
        this.previewBlogTagEntities = previewBlogTagEntities;
    }
}
