package com.application.controllers;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.stream.Stream;

public class MTAController {
    static HashMap<String, String> feedUri;

    /*
    Initialize urls to respective subway line
     */
    static {
        feedUri = new HashMap<>();
        String[] ace = {"A","C","E"}, bdfm = {"B","D","F","M"},jz = {"J","Z"}, nqrw = {"N","Q","R","W"},
                _123456 = {"1","2","3","4","5","6"};
        String ACE = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace";
        String BDFM = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-bdfm";
        String G = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-g";
        String JZ = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-jz";
        String NQRW = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-nqrw";
        String L = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-l";
        String __123456 = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs";
        String __7 = "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-7";
        Stream<String> stream = Arrays.stream(ace);
        stream.forEach(line -> feedUri.put(line, ACE));
        stream = Arrays.stream(bdfm);
        stream.forEach(line -> feedUri.put(line, BDFM));
        stream = Arrays.stream(jz);
        stream.forEach(line -> feedUri.put(line, JZ));
        stream = Arrays.stream(nqrw);
        stream.forEach(line -> feedUri.put(line, NQRW));
        stream = Arrays.stream(_123456);
        stream.forEach(line -> feedUri.put(line, __123456));
        feedUri.put("G",G);
        feedUri.put("L",L);
        feedUri.put("7",__7);

    }
    public static void getGTFS(String subwayLine){
        String uri = feedUri.get(subwayLine);
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(uri).build(true);
        URI realUri = uriComponents.toUri();

        String _apiKey = System.getenv("mta");

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key",_apiKey);
        HttpEntity entity = new HttpEntity(headers);

        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<String> response = restTemplate.exchange(realUri, HttpMethod.GET, entity, String.class);
        System.out.println(response);
    }

    /*
    Manual testing
     */
    public static void main(String[] args) {
        getGTFS("N");
    }
}
