package dam.saruman.repository;

/*
Esto va a ser para operaciones CRUD
*/
import dam.saruman.entity.Enemigo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EnemigoRepository extends MongoRepository<Enemigo,String> {
}
