package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "typepreviewblog")
public class TypePreviewBlogEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "typePreviewBlogEntity")
    private List<PreviewBlogEntity> previewBlogEntities;

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

    public List<PreviewBlogEntity> getPreviewBlogEntities() {
        return previewBlogEntities;
    }

    public void setPreviewBlogEntities(List<PreviewBlogEntity> previewBlogEntities) {
        this.previewBlogEntities = previewBlogEntities;
    }
}
