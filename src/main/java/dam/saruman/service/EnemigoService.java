package dam.saruman.service;

import dam.saruman.entity.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnemigoService {
    @Autowired
    private EnemigoRepository enemigoRepository;

    public List<Enemigo> obtenerEnemigos (){
        List<Enemigo> enemigos = enemigoRepository.findAll();
        if(enemigos.isEmpty()){
            System.out.println("No enemigos");
        } else {
            System.out.println("Sí hay enemigos");
            enemigos.forEach(enemigo -> System.out.println(enemigo.getNombre()));
        }
        return enemigos;
    }

    public Enemigo guardar(Enemigo enemigo){
        return enemigoRepository.save(enemigo);
    }

    public void eliminar(Long id){
        enemigoRepository.deleteById(id);
    }

    public Enemigo actualizar(Long id, Enemigo enemigo){
        enemigo.setId(id);
        return enemigoRepository.save(enemigo);
    }
}
