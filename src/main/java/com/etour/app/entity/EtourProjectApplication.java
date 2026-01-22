package com.etour.app.entity;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.etour.app")
public class EtourProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(EtourProjectApplication.class, args);
    }

}
