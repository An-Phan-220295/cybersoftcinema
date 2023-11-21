package com.cybersoft.cybersoftcinema.service.imp;

import com.cybersoft.cybersoftcinema.payload.response.PreviewBlogResponse;

import java.util.List;

public interface PreviewBlogServiceImp {

    List<PreviewBlogResponse> getPreviewBlogByTypePreviewBlogId(int id);

}
