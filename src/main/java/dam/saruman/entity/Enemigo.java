package dam.saruman.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "enemigos")
public class Enemigo {
    @Id
    private String id;

    @Indexed(unique = true)
    private String nombre;

    private String genero;

    private String pais_origen;

    private Integer nivel_amenaza;

    private boolean activo;


    public Enemigo() {
    }

    public Enemigo(String id, String nombre, String genero, String pais_origen, Integer nivel_amenaza, boolean activo) {
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.pais_origen = pais_origen;
        this.nivel_amenaza = nivel_amenaza;
        this.activo = activo;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getPais_origen() {
        return pais_origen;
    }

    public void setPais_origen(String pais_origen) {
        this.pais_origen = pais_origen;
    }

    public Integer getNivel_amenaza() {
        return nivel_amenaza;
    }

    public void setNivel_amenaza(Integer nivel_amenaza) {
        this.nivel_amenaza = nivel_amenaza;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }


}
