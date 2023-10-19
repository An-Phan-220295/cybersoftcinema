package com.cybersoft.cybersoftcinema.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name = "previewblog")
public class PreviewBlogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id ;
    @Column(name = "name")
    private String name;
    @Column(name = "rating")
    private double rating;
    @Column(name = "images")
    private String images ;
    @Column(name = "content")
    private String content ;

    @ManyToOne
    @JoinColumn(name = "idTypepreviewblog")
    private TypePreviewBlogEntity typePreviewBlogEntity ;

    @OneToMany(mappedBy = "previewBlogEntity")
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

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public TypePreviewBlogEntity getTypePreviewBlogEntity() {
        return typePreviewBlogEntity;
    }

    public void setTypePreviewBlogEntity(TypePreviewBlogEntity typePreviewBlogEntity) {
        this.typePreviewBlogEntity = typePreviewBlogEntity;
    }

    public List<PreviewBlogTagEntity> getPreviewBlogTagEntities() {
        return previewBlogTagEntities;
    }

    public void setPreviewBlogTagEntities(List<PreviewBlogTagEntity> previewBlogTagEntities) {
        this.previewBlogTagEntities = previewBlogTagEntities;
    }
}
