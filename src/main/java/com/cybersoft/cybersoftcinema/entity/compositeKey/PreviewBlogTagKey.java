package com.cybersoft.cybersoftcinema.entity.compositeKey;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class PreviewBlogTagKey implements Serializable {
    @Column(name = "idTag", nullable = false)
    private int idTag;
    @Column(name = "idPreviewblog", nullable = false)
    private int idPreviewblog;

    public int getIdTag() {
        return idTag;
    }

    public void setIdTag(int idTag) {
        this.idTag = idTag;
    }

    public int getIdPreviewblog() {
        return idPreviewblog;
    }

    public void setIdPreviewblog(int idPreviewblog) {
        this.idPreviewblog = idPreviewblog;
    }
}
