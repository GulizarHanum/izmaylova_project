package ru.solarlab.study.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI springShopOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Meow-meow")
                        .description("Доска объявлений")
                        .contact(new Contact()
                                .name("Измайлова Гулизар-Ханум Юнус-кызы"))
                        .version("v1.3.3"));
    }

}
