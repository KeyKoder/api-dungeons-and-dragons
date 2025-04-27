# api-dungeons-and-dragons

Una API prototipo para ser utilizada como base en un futuro proyecto de un tablero virtual para Dungeons and Dragons.

---

# Endpoints
| Status | Método | Endpoint | Descripción | Payload |
| ------ | ------ | -------- | ----------- | ------- |
| PLANNED FOR LATER | `POST` | `/auth/register` | Registra un nuevo usuario | [User Data](#user-data) |
| PLANNED FOR LATER | `POST` | `/auth/login` | Inicia la sesión del usuario | [User Data](#user-data) |
| DONE | `GET` | `/characters` | Devuelve los datos de los personajes del usuario (ver [Character Data](#character-data)) | - |
| DONE | `POST` | `/characters` | Crea un personaje nuevo y devuelve sus datos (usando el mismo formato que en `GET /characters`) | [Character Data](#character-data) |
| DONE | `PUT` | `/characters/:cid` | Modifica el personaje con id `:cid` y devuelve un 200 si se ha podido modificar y un 404 si no (porque no se encuentra) | [Character Data](#character-data) (se pueden omitir campos que no se vayan a modificar) |
| DONE | `GET` | `/characters/:cid` | Devuelve los datos del personaje con id `:cid` | - |
| DONE | `DELETE` | `/characters/:cid` | Elimina el personaje con id `:cid` (si el usuario es el que creó el personaje) y devuelve un 200 si se ha podido modificar y un 404 si no (porque no se encuentra) | - |
| DONE | `GET` | `/characters/:cid/equipment` | Devuelve los datos del equipamiento del personaje con id `:cid` | - |
| DONE | `POST` | `/characters/:cid/equipment` | Añade un objeto al equipamiento del personaje con id `:cid` | [Equipment Data](#equipment-data) |
| PLANNED FOR LATER | `GET` | `/characters/:cid/equipment/:eqid` | Devuelve los datos del objeto con id `:eqid` del equipamiento personaje con id `:cid` | - |
| DONE | `POST` | `/roll` | Tira unos dados y devuelve sus resultados (ver [Roll Output](#roll-output)) | [Roll Data](#roll-data) |

Todos los payloads y las respuestas serán formato JSON.

---

# Especificacion de los formatos

## User Data

El tipo User Data es un JSON simple con dos campos, `user` y `pass`.

```json
{
    "user": "admin",
    "pass": "admin"
}
```

## Character Data

El tipo Character Data es un JSON que contiene los datos de un personaje.

El formato es el siguiente:
```json
{
    "name": "",
    "race": "",
    "classes": [
        {
            "class": "",
            "level": 0
        }
    ],
    "hp": 0,
    "ac": 0,
    "stats": {
        "str": 0,
        "dex": 0,
        "con": 0,
        "int": 0,
        "wis": 0,
        "cha": 0
    },
    "equipment": []
}
```

Todos los campos son autoexplicativos para cualquiera que juegue DnD, para aquellos que no, se explican a continuación.
* `name`: El nombre del personaje
* `race`: La raza del personaje
* `hp`: La vida del personaje (sin sumar el modificador de constitución)
* `ac`: La Clase de Armadura (Armor Class) del personaje, se utiliza para comprobar si un ataque te golpea
* `stats`: Las puntuaciones de las stats del personaje, suelen ir de 1 a 20. Las stats tienen un componente más llamado modificador, que se calcula a partir de su puntuación siguiendo la siguiente fórmula:
	
	```math
    \displaystyle MOD = \lfloor \frac{ STAT - 10 }{2} \rfloor \displaystyle
    ```
* `classes`: Las clases del personaje, muchos personajes suelen tener solo una clase, pero es un array para poder soportar multiclases.
    
    Por ejemplo, si tu personaje es un `Clérigo 5 / Pícaro 3`, tus clases quedarían así:

    ```json
    {
        "classes": [
            {
                "class": "Clérigo",
                "level": 5
            },
            {
                "class": "Pícaro",
                "level": 3
            }
        ]
    }
    ```
* `equipment`: El equipamiento del personaje. Los objetos siguen el formato [Equipment Data](#equipment-data)

## Equipment Data

Por ahora, Equipment Data es un objeto JSON con un formato simple:

```json
{
    "name": "",
    "description": ""
}
```

En el futuro probablemente se amplíe este formato.

## Roll Data

El tipo Roll Data es un JSON compuesto por un campo `roll` y un campo `context`.

El campo `roll` contiene un string con los dados a lanzar siguiendo el formato `NdM`, donde `N` es el número de dados y `M` es el número de caras de los dados.

Además, puede contener `templates`, que son datos que se sustituirán por variables presentes en el contexto.
Algunos ejemplos de `templates` son:
* `{{var1}}`: Será reemplazado por el valor de `var1` en el contexto.
* `{{0:DEX}}`: Será reemplazado por el valor del modificador de destreza del primer personaje especificado en el contexto. (ver (Stats)[#stats] para más información)

Puedes sumar y/o restar cualquier número de tiradas de dados, números y templates entre sí.

El formato completo del string de la tirada se encuentra en la [wiki de Roll20](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference)

El campo `context` contiene un objeto JSON con variables a reemplazar en formato clave-valor y una lista de ids de personajes que vayan a ser referenciados en la tirada.
El campo `characters` del contexto tiene que estar presente siempre.

Formato base:
```json
{
    "roll": "",
    "context": {
        "characters": []
    }
}
```

Ejemplos
```json
{
    "roll": "1d20+{{mymod}}+{{0:CON}}",
    "context": {
        "characters": ["00000000-0000-0000-0000-000000000000"],
        "mymod": 4
    }
}
```


```json
{
    "roll": "{{tirada}}+{{0:STR}}",
    "context": {
        "characters": ["cid1"],
        "tirada": "3d6"
    }
}
```

## Roll Output

Para hacer las tiradas de dados utilizo la libería de node `@3d-dice/dice-roller-parser`.

El formato de salida se encuentra en [su wiki](https://www.npmjs.com/package/@3d-dice/dice-roller-parser#roll-result-output).

## Stats
Las stats de cada personaje se referencian con su correspondiente abreviatura de 3 letras, ya sea en inglés o en español.
* Fuerza: `STR` o `FUE`
* Destreza: `DEX` o `DES`
* Constitución: `CON` (es igual en ambos idiomas)
* Inteligencia: `INT` (es igual en ambos idiomas)
* Sabiduría: `WIS` o `SAB`
* Carisma: `CHA` o `CAR`

---

# Mejoras posibles

Continuar implementando más elementos de DnD como abilidades o hechizos.

Ampliar el formato de equipamiento.

Cambiar de un JSON en memoria a una base de datos con MariaDB/MySQL