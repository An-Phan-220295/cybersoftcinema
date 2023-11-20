package com.cybersoft.cybersoftcinema.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminTheaterRequest {
    private int id;
    private String name;
    private String address;
    private String content;
}
