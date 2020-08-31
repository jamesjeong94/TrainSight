package com.application;


import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StopsTests {

    private String[] subwayLines = new String[] {"1","2","3","4","5","6","7","N","Q","R","W","A","C","E"};

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    @DisplayName("Checking if /stops endpoint returns a hashmap with maps and stops key")
    public void stopsEndPointShouldReturnHashMap() throws Exception{
        String endPt = "http://localhost:" + port + "/stops";
        for (String line: subwayLines) {
            HashMap<String, String> params = new HashMap<>();
            params.put("subwayline",line);
            assertThat(this.restTemplate.getForObject(endPt, HashMap.class, params)).containsKey("map");
            assertThat(this.restTemplate.getForObject(endPt, HashMap.class, params)).containsKey("stops");

        }
    }

    @Test
    @DisplayName("Checking if /stopsLive endpoint returns a list")
    public void liveStopsEndPointShouldReturnList() throws Exception{
        String endPt = "http://localhost:" + port + "/stopsLive";
        for (String line: subwayLines) {
            HashMap<String, String> params = new HashMap<>();
            params.put("subwayline",line);
            assertThat(this.restTemplate.getForObject(endPt, List.class, params)).isNotEmpty();
        }
    }
}
