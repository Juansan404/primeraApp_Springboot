package dam.saruman.controller;

import dam.saruman.entity.Enemigo;
import dam.saruman.service.EnemigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EnemigoController {
    @Autowired
    private EnemigoService enemigoService;

    @GetMapping("/enemigo")
    public List<Enemigo> getEnemigos(){
        return enemigoService.obtenerEnemigos();
    }

    @PostMapping("/enemigo")
    public Enemigo addEnemigo(@RequestBody Enemigo enemigo){
        return  enemigoService.guardar(enemigo);
    }

    @DeleteMapping("/enemigo/{id}")
    public void deleteEnemigo(@PathVariable String id){
        enemigoService.eliminar(id);
    }

    @PutMapping("/enemigo/{id}")
    public Enemigo updateEnemigo(@PathVariable String id, @RequestBody Enemigo enemigo){
        return enemigoService.actualizar(id, enemigo);
    }
}
