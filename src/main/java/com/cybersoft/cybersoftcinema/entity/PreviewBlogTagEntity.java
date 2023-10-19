package com.cybersoft.cybersoftcinema.entity;

import com.cybersoft.cybersoftcinema.entity.compositeKey.PreviewBlogTagKey;

import javax.persistence.*;

@Entity(name = "previewblog_tag")
public class PreviewBlogTagEntity {

    @EmbeddedId
    private PreviewBlogTagKey previewBlogTagKey;

    @ManyToOne
    @JoinColumn(name = "idTag", insertable = false, updatable = false)
    private TagEntity tagEntity;

    @ManyToOne
    @JoinColumn(name = "idPreviewblog", insertable = false, updatable = false)
    private PreviewBlogEntity previewBlogEntity;

    public PreviewBlogTagKey getPreviewBlogTagKey() {
        return previewBlogTagKey;
    }

    public void setPreviewBlogTagKey(PreviewBlogTagKey previewBlogTagKey) {
        this.previewBlogTagKey = previewBlogTagKey;
    }

    public TagEntity getTagEntity() {
        return tagEntity;
    }

    public void setTagEntity(TagEntity tagEntity) {
        this.tagEntity = tagEntity;
    }

    public PreviewBlogEntity getPreviewBlogEntity() {
        return previewBlogEntity;
    }

    public void setPreviewBlogEntity(PreviewBlogEntity previewBlogEntity) {
        this.previewBlogEntity = previewBlogEntity;
    }
}
