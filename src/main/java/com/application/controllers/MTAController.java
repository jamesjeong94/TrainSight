package com.application.controllers;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.protobuf.ByteString;
import com.google.protobuf.InvalidProtocolBufferException;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import java.util.stream.Stream;

import com.google.transit.realtime.GtfsRealtime.FeedEntity;
import com.google.transit.realtime.GtfsRealtime.FeedMessage;

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

        ResponseEntity<Resource> response = restTemplate.exchange(realUri, HttpMethod.GET, entity, Resource.class);
        InputStream responseInputStream;

        try {
            try {
                responseInputStream = response.getBody().getInputStream();
                FeedMessage feed = FeedMessage.parseFrom(responseInputStream);
                for (FeedEntity ent: feed.getEntityList()) {
                    if (ent.hasTripUpdate())
                        System.out.println(ent.getTripUpdate());
                    }
                } catch (IOException ioException) {
                ioException.printStackTrace();
            }

        } catch(Exception e) {

        }

    }

    /*
    Manual testing
     */
    public static void main(String[] args) {
        getGTFS("N");
    }
}
