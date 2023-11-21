package com.cybersoft.cybersoftcinema.service;

import com.cybersoft.cybersoftcinema.entity.PreviewBlogEntity;
import com.cybersoft.cybersoftcinema.payload.response.PreviewBlogResponse;
import com.cybersoft.cybersoftcinema.repository.PreviewBlogRepository;
import com.cybersoft.cybersoftcinema.service.imp.PreviewBlogServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PreviewBlogService implements PreviewBlogServiceImp {

    @Value("${root.folder}")
    private String rootFolder;

    @Autowired
    private PreviewBlogRepository previewBlogRepository;


    @Override
    public List<PreviewBlogResponse> getPreviewBlogByTypePreviewBlogId(int id) {

        List<PreviewBlogEntity> list =  previewBlogRepository.findByTypePreviewBlogEntityId(id);

        List<PreviewBlogResponse> responseList = new ArrayList<>();
        for (PreviewBlogEntity item : list){
            PreviewBlogResponse previewBlogResponse = new PreviewBlogResponse();
            previewBlogResponse.setId(item.getId());
            previewBlogResponse.setName(item.getName());
            previewBlogResponse.setRating(item.getRating());
            previewBlogResponse.setContent(item.getContent());
            previewBlogResponse.setImages("http://" + rootFolder + "/person/file/" + item.getImages());
            responseList.add(previewBlogResponse);
        }


        return responseList;
    }

}
