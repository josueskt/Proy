
-- object: inst | type: SCHEMA --
-- DROP SCHEMA IF EXISTS inst CASCADE;
CREATE SCHEMA inst;
-- ddl-end --
ALTER SCHEMA inst OWNER TO postgres;
-- ddl-end --
COMMENT ON SCHEMA inst IS E'scrhema de tablas de usuario';
-- ddl-end --

-- object: tramites | type: SCHEMA --
-- DROP SCHEMA IF EXISTS tramites CASCADE;
CREATE SCHEMA tramites;
-- ddl-end --
ALTER SCHEMA tramites OWNER TO postgres;
-- ddl-end --
COMMENT ON SCHEMA tramites IS E'escrema de todos los prosesos cre se raalizan';
-- ddl-end --

-- object: libros | type: SCHEMA --
-- DROP SCHEMA IF EXISTS libros CASCADE;
CREATE SCHEMA libros;
-- ddl-end --
ALTER SCHEMA libros OWNER TO postgres;
-- ddl-end --
COMMENT ON SCHEMA libros IS E'guarda todos los datos de un libro';
-- ddl-end --

-- object: inst_cp | type: SCHEMA --
-- DROP SCHEMA IF EXISTS inst_cp CASCADE;
CREATE SCHEMA inst_cp;
-- ddl-end --
ALTER SCHEMA inst_cp OWNER TO postgres;
-- ddl-end --
COMMENT ON SCHEMA inst_cp IS E'scrhema de tablas de usuario';
-- ddl-end --

-- object: biblioteca | type: SCHEMA --
-- DROP SCHEMA IF EXISTS biblioteca CASCADE;
CREATE SCHEMA biblioteca;
-- ddl-end --
ALTER SCHEMA biblioteca OWNER TO postgres;
-- ddl-end --

SET search_path TO pg_catalog,public,inst,tramites,libros,inst_cp,biblioteca;
-- ddl-end --

-- object: inst.rol_id_rol_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS inst.rol_id_rol_seq CASCADE;
CREATE SEQUENCE inst.rol_id_rol_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE inst.rol_id_rol_seq OWNER TO postgres;
-- ddl-end --

-- object: inst.rol | type: TABLE --
-- DROP TABLE IF EXISTS inst.rol CASCADE;
CREATE TABLE inst.rol (
	id_rol integer NOT NULL DEFAULT nextval('inst.rol_id_rol_seq'::regclass),
	nombre_rol character varying,
	CONSTRAINT rol_pk PRIMARY KEY (id_rol)
);
-- ddl-end --
COMMENT ON TABLE inst.rol IS E'tabla de rol de usuario';
-- ddl-end --
COMMENT ON COLUMN inst.rol.nombre_rol IS E'nombre del rol  que se asigna a un usuario';
-- ddl-end --
ALTER TABLE inst.rol OWNER TO postgres;
-- ddl-end --

-- object: inst.usuario | type: TABLE --
-- DROP TABLE IF EXISTS inst.usuario CASCADE;
CREATE TABLE inst.usuario (
	id_user character varying(10) NOT NULL,
	email character varying(80),
	password character varying(300),
	nombre character varying(80),
	activo boolean,
	fk_rol integer,
	fk_carrera integer,
	cambio boolean DEFAULT false,
	reseteo character varying,
	CONSTRAINT user_pk PRIMARY KEY (id_user)
);
-- ddl-end --
COMMENT ON TABLE inst.usuario IS E'usuario de la plataforma';
-- ddl-end --
COMMENT ON COLUMN inst.usuario.id_user IS E'cedula del suario';
-- ddl-end --
COMMENT ON COLUMN inst.usuario.email IS E'guarda el email de los usuario de la institucion';
-- ddl-end --
COMMENT ON COLUMN inst.usuario.password IS E'contraseña del usuario  cifrada';
-- ddl-end --
COMMENT ON COLUMN inst.usuario.nombre IS E'buarda el nombre y apellido completo del usuario';
-- ddl-end --
COMMENT ON COLUMN inst.usuario.fk_rol IS E'llave foranea de la tabla Rol';
-- ddl-end --
ALTER TABLE inst.usuario OWNER TO postgres;
-- ddl-end --

-- object: tramites.descargas_id_descarga_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tramites.descargas_id_descarga_seq CASCADE;
CREATE SEQUENCE tramites.descargas_id_descarga_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE tramites.descargas_id_descarga_seq OWNER TO postgres;
-- ddl-end --

-- object: tramites.descargas | type: TABLE --
-- DROP TABLE IF EXISTS tramites.descargas CASCADE;
CREATE TABLE tramites.descargas (
	id_descarga integer NOT NULL DEFAULT nextval('tramites.descargas_id_descarga_seq'::regclass),
	fecha_descarga date,
	fk_user character varying(10),
	fk_libro integer,
	CONSTRAINT prestamo_pk PRIMARY KEY (id_descarga)
);
-- ddl-end --
COMMENT ON TABLE tramites.descargas IS E'tabla de presmamo guarda las descargas  que se an echo de un libro';
-- ddl-end --
COMMENT ON COLUMN tramites.descargas.id_descarga IS E'id autogenerado de cada descarga';
-- ddl-end --
COMMENT ON COLUMN tramites.descargas.fecha_descarga IS E'guarda la fecha de descarga  de un libro';
-- ddl-end --
COMMENT ON COLUMN tramites.descargas.fk_user IS E'lave foranea de la tabla users';
-- ddl-end --
ALTER TABLE tramites.descargas OWNER TO postgres;
-- ddl-end --

-- object: libros.libro_id_libro_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.libro_id_libro_seq CASCADE;
CREATE SEQUENCE libros.libro_id_libro_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.libro_id_libro_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.libro | type: TABLE --
-- DROP TABLE IF EXISTS libros.libro CASCADE;
CREATE TABLE libros.libro (
	id_libro integer NOT NULL DEFAULT nextval('libros.libro_id_libro_seq'::regclass),
	titulo character varying(100),
	year_of_publication character varying(4),
	review character varying(1000),
	imagen character varying,
	nombre_archivo character varying,
	isbn character varying(100),
	codigo character varying,
	editorial character varying,
	fk_creador character varying(10),
	fk_autor integer,
	fk_carrera integer,
	fk_tipo integer,
	fk_seccion integer,
	cantidad integer,
	kf_tipo_libro integer,
	fk_editorial integer,
	CONSTRAINT libro_pk PRIMARY KEY (id_libro)
);
-- ddl-end --
COMMENT ON TABLE libros.libro IS E'tabla de libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.id_libro IS E'id autogenerado de un libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.titulo IS E'guarda el nombre del libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.year_of_publication IS E'guarda el año de publicacion';
-- ddl-end --
COMMENT ON COLUMN libros.libro.review IS E'guarda una descripcion de el libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.imagen IS E'guarda la imagen del libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.isbn IS E'el isnb del libro';
-- ddl-end --
COMMENT ON COLUMN libros.libro.codigo IS E'no se para que  es pero es requisito xd  , codigo del libro unico';
-- ddl-end --
COMMENT ON COLUMN libros.libro.fk_creador IS E'guarda el id del usuario q  lo creo';
-- ddl-end --
COMMENT ON COLUMN libros.libro.fk_carrera IS E'llave foranea de carrera';
-- ddl-end --
COMMENT ON COLUMN libros.libro.fk_tipo IS E'llave foranea de la tabla de tipo';
-- ddl-end --
ALTER TABLE libros.libro OWNER TO postgres;
-- ddl-end --

-- object: libros.autor_id_autor_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.autor_id_autor_seq CASCADE;
CREATE SEQUENCE libros.autor_id_autor_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.autor_id_autor_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.autor | type: TABLE --
-- DROP TABLE IF EXISTS libros.autor CASCADE;
CREATE TABLE libros.autor (
	id_autor integer NOT NULL DEFAULT nextval('libros.autor_id_autor_seq'::regclass),
	nombre character varying(200),
	CONSTRAINT autor_pk PRIMARY KEY (id_autor)
);
-- ddl-end --
COMMENT ON TABLE libros.autor IS E'tabla de autores';
-- ddl-end --
COMMENT ON COLUMN libros.autor.id_autor IS E'guarda el ud de un autor';
-- ddl-end --
COMMENT ON COLUMN libros.autor.nombre IS E'guarda el nombre de un autor';
-- ddl-end --
ALTER TABLE libros.autor OWNER TO postgres;
-- ddl-end --

-- object: libros.carrera_id_carrera_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.carrera_id_carrera_seq CASCADE;
CREATE SEQUENCE libros.carrera_id_carrera_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.carrera_id_carrera_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.carrera | type: TABLE --
-- DROP TABLE IF EXISTS libros.carrera CASCADE;
CREATE TABLE libros.carrera (
	id_carrera integer NOT NULL DEFAULT nextval('libros.carrera_id_carrera_seq'::regclass),
	nombre character varying(80),
	CONSTRAINT carrera_pk PRIMARY KEY (id_carrera)
);
-- ddl-end --
COMMENT ON TABLE libros.carrera IS E'tabla de autores';
-- ddl-end --
COMMENT ON COLUMN libros.carrera.id_carrera IS E'guarda el ud de una carrera';
-- ddl-end --
COMMENT ON COLUMN libros.carrera.nombre IS E'guarda el nombre de una carrera';
-- ddl-end --
ALTER TABLE libros.carrera OWNER TO postgres;
-- ddl-end --

-- object: inst.secion_id_secion_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS inst.secion_id_secion_seq CASCADE;
CREATE SEQUENCE inst.secion_id_secion_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE inst.secion_id_secion_seq OWNER TO postgres;
-- ddl-end --

-- object: inst.secion | type: TABLE --
-- DROP TABLE IF EXISTS inst.secion CASCADE;
CREATE TABLE inst.secion (
	id_secion integer NOT NULL DEFAULT nextval('inst.secion_id_secion_seq'::regclass),
	fecha date,
	fk_user character varying(10),
	CONSTRAINT sesion_pk PRIMARY KEY (id_secion)
);
-- ddl-end --
COMMENT ON TABLE inst.secion IS E'guarda la fecha en la que un usuario se a iniciado';
-- ddl-end --
ALTER TABLE inst.secion OWNER TO postgres;
-- ddl-end --

-- object: libros.tipo_id_tipo_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.tipo_id_tipo_seq CASCADE;
CREATE SEQUENCE libros.tipo_id_tipo_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.tipo_id_tipo_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.tipo | type: TABLE --
-- DROP TABLE IF EXISTS libros.tipo CASCADE;
CREATE TABLE libros.tipo (
	id_tipo integer NOT NULL DEFAULT nextval('libros.tipo_id_tipo_seq'::regclass),
	nombre character varying(50),
	CONSTRAINT tipo_pk PRIMARY KEY (id_tipo)
);
-- ddl-end --
COMMENT ON TABLE libros.tipo IS E'guarda el tipo de libro que es  fisico , url , descargable';
-- ddl-end --
COMMENT ON COLUMN libros.tipo.id_tipo IS E'guarda el id  autogenerado del tipo de archivo';
-- ddl-end --
COMMENT ON COLUMN libros.tipo.nombre IS E'guarda el nombre del tipo de archivo';
-- ddl-end --
ALTER TABLE libros.tipo OWNER TO postgres;
-- ddl-end --

-- object: libros.palabras_clave_id_palabra_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.palabras_clave_id_palabra_seq CASCADE;
CREATE SEQUENCE libros.palabras_clave_id_palabra_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.palabras_clave_id_palabra_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.palabras_clave | type: TABLE --
-- DROP TABLE IF EXISTS libros.palabras_clave CASCADE;
CREATE TABLE libros.palabras_clave (
	id_palabra integer NOT NULL DEFAULT nextval('libros.palabras_clave_id_palabra_seq'::regclass),
	nombre character varying(50),
	CONSTRAINT palabras_clave_pk PRIMARY KEY (id_palabra)
);
-- ddl-end --
COMMENT ON TABLE libros.palabras_clave IS E'guarda las palabras clave para una mejor busqueda del libro';
-- ddl-end --
COMMENT ON COLUMN libros.palabras_clave.id_palabra IS E'odigo unico de la palabra clave';
-- ddl-end --
COMMENT ON COLUMN libros.palabras_clave.nombre IS E'guarda el nombre de la palabra clave';
-- ddl-end --
ALTER TABLE libros.palabras_clave OWNER TO postgres;
-- ddl-end --

-- object: libros.palabras_libro_id_pl_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.palabras_libro_id_pl_seq CASCADE;
CREATE SEQUENCE libros.palabras_libro_id_pl_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.palabras_libro_id_pl_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.palabras_libro | type: TABLE --
-- DROP TABLE IF EXISTS libros.palabras_libro CASCADE;
CREATE TABLE libros.palabras_libro (
	id_pl integer NOT NULL DEFAULT nextval('libros.palabras_libro_id_pl_seq'::regclass),
	fk_libro integer,
	fk_palabra integer,
	CONSTRAINT palabras_libro_pk PRIMARY KEY (id_pl)
);
-- ddl-end --
COMMENT ON TABLE libros.palabras_libro IS E'tabla de muchos a muchos de  libro - palabras_lave';
-- ddl-end --
COMMENT ON COLUMN libros.palabras_libro.id_pl IS E'pk de la tabla autogenerada';
-- ddl-end --
COMMENT ON COLUMN libros.palabras_libro.fk_libro IS E'llave foranea de tabla libro';
-- ddl-end --
COMMENT ON COLUMN libros.palabras_libro.fk_palabra IS E'llave foranea de tabla  palabras_clave';
-- ddl-end --
ALTER TABLE libros.palabras_libro OWNER TO postgres;
-- ddl-end --

-- object: tramites.prestamo_libro_id_prestamo_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tramites.prestamo_libro_id_prestamo_seq CASCADE;
CREATE SEQUENCE tramites.prestamo_libro_id_prestamo_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE tramites.prestamo_libro_id_prestamo_seq OWNER TO postgres;
-- ddl-end --

-- object: tramites.prestamo_libro | type: TABLE --
-- DROP TABLE IF EXISTS tramites.prestamo_libro CASCADE;
CREATE TABLE tramites.prestamo_libro (
	id_prestamo integer NOT NULL DEFAULT nextval('tramites.prestamo_libro_id_prestamo_seq'::regclass),
	fecha_reserva timestamp,
	feha_real_devolcion timestamp,
	observaciones character varying(500),
	fk_usuario character varying(10),
	fk_libro integer,
	fk_estado integer,
	CONSTRAINT prestamo_libro_pk PRIMARY KEY (id_prestamo)
);
-- ddl-end --
ALTER TABLE tramites.prestamo_libro OWNER TO postgres;
-- ddl-end --

-- object: tramites.estados_id_estado_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tramites.estados_id_estado_seq CASCADE;
CREATE SEQUENCE tramites.estados_id_estado_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE tramites.estados_id_estado_seq OWNER TO postgres;
-- ddl-end --

-- object: tramites.estados | type: TABLE --
-- DROP TABLE IF EXISTS tramites.estados CASCADE;
CREATE TABLE tramites.estados (
	id_estado integer NOT NULL DEFAULT nextval('tramites.estados_id_estado_seq'::regclass),
	nombre character varying(10),
	CONSTRAINT estados_pk PRIMARY KEY (id_estado)
);
-- ddl-end --
COMMENT ON COLUMN tramites.estados.nombre IS E'guanrda el nombre del estado';
-- ddl-end --
ALTER TABLE tramites.estados OWNER TO postgres;
-- ddl-end --

-- object: inst.config | type: TABLE --
-- DROP TABLE IF EXISTS inst.config CASCADE;
CREATE TABLE inst.config (
	id_config smallint NOT NULL,
	d_m_p character varying(100),
	CONSTRAINT config_pk PRIMARY KEY (id_config)
);
-- ddl-end --
COMMENT ON TABLE inst.config IS E'guarda las configuraiones';
-- ddl-end --
COMMENT ON COLUMN inst.config.d_m_p IS E'guarda la candiad de dias maximos a prestar el libro';
-- ddl-end --
ALTER TABLE inst.config OWNER TO postgres;
-- ddl-end --

-- object: libros.seccion_id_seccion_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.seccion_id_seccion_seq CASCADE;
CREATE SEQUENCE libros.seccion_id_seccion_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.seccion_id_seccion_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.seccion | type: TABLE --
-- DROP TABLE IF EXISTS libros.seccion CASCADE;
CREATE TABLE libros.seccion (
	id_seccion integer NOT NULL DEFAULT nextval('libros.seccion_id_seccion_seq'::regclass),
	nombre character(50),
	fk_estante integer,
	CONSTRAINT seccion_pk PRIMARY KEY (id_seccion)
);
-- ddl-end --
ALTER TABLE libros.seccion OWNER TO postgres;
-- ddl-end --

-- object: libros.estante_id_estante_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.estante_id_estante_seq CASCADE;
CREATE SEQUENCE libros.estante_id_estante_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.estante_id_estante_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.estante | type: TABLE --
-- DROP TABLE IF EXISTS libros.estante CASCADE;
CREATE TABLE libros.estante (
	id_estante integer NOT NULL DEFAULT nextval('libros.estante_id_estante_seq'::regclass),
	nombre character varying(50),
	CONSTRAINT estante_pk PRIMARY KEY (id_estante)
);
-- ddl-end --
ALTER TABLE libros.estante OWNER TO postgres;
-- ddl-end --

-- object: tramites.ingreso_id_ingreso_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS tramites.ingreso_id_ingreso_seq CASCADE;
CREATE SEQUENCE tramites.ingreso_id_ingreso_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE tramites.ingreso_id_ingreso_seq OWNER TO postgres;
-- ddl-end --

-- object: tramites.ingreso | type: TABLE --
-- DROP TABLE IF EXISTS tramites.ingreso CASCADE;
CREATE TABLE tramites.ingreso (
	id_ingreso integer NOT NULL DEFAULT nextval('tramites.ingreso_id_ingreso_seq'::regclass),
	hora_entrada timestamp,
	hora_salida timestamp,
	fk_usuario character varying(10),
	fk_actividad integer,
	fk_jornada integer,
	fk_paralelo integer,
	fk_nivel integer,
	CONSTRAINT ingreso_pk PRIMARY KEY (id_ingreso)
);
-- ddl-end --
COMMENT ON TABLE tramites.ingreso IS E'tabal que guarda los datos del ingreso a la biblioteca fisica';
-- ddl-end --
COMMENT ON COLUMN tramites.ingreso.fk_usuario IS E'usuario que ingreso a la biblioteca';
-- ddl-end --
COMMENT ON COLUMN tramites.ingreso.fk_actividad IS E'guarda al actividad que se a a realizar';
-- ddl-end --
COMMENT ON COLUMN tramites.ingreso.fk_jornada IS E'jornada del estudiante';
-- ddl-end --
COMMENT ON COLUMN tramites.ingreso.fk_paralelo IS E'paralelo del estudiante';
-- ddl-end --
ALTER TABLE tramites.ingreso OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.actividades_id_actividad_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS biblioteca.actividades_id_actividad_seq CASCADE;
CREATE SEQUENCE biblioteca.actividades_id_actividad_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE biblioteca.actividades_id_actividad_seq OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.actividades | type: TABLE --
-- DROP TABLE IF EXISTS biblioteca.actividades CASCADE;
CREATE TABLE biblioteca.actividades (
	id_actividad integer NOT NULL DEFAULT nextval('biblioteca.actividades_id_actividad_seq'::regclass),
	nombre character varying(100),
	CONSTRAINT actividades_pk PRIMARY KEY (id_actividad)
);
-- ddl-end --
COMMENT ON COLUMN biblioteca.actividades.nombre IS E'nombre de la actividad';
-- ddl-end --
ALTER TABLE biblioteca.actividades OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.jornada_id_jornada_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS biblioteca.jornada_id_jornada_seq CASCADE;
CREATE SEQUENCE biblioteca.jornada_id_jornada_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE biblioteca.jornada_id_jornada_seq OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.jornada | type: TABLE --
-- DROP TABLE IF EXISTS biblioteca.jornada CASCADE;
CREATE TABLE biblioteca.jornada (
	id_jornada integer NOT NULL DEFAULT nextval('biblioteca.jornada_id_jornada_seq'::regclass),
	nombre character varying(100),
	CONSTRAINT actividades_pk_cp PRIMARY KEY (id_jornada)
);
-- ddl-end --
COMMENT ON COLUMN biblioteca.jornada.nombre IS E'nombre de la actividad';
-- ddl-end --
ALTER TABLE biblioteca.jornada OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.paralelo_id_paralelo_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS biblioteca.paralelo_id_paralelo_seq CASCADE;
CREATE SEQUENCE biblioteca.paralelo_id_paralelo_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE biblioteca.paralelo_id_paralelo_seq OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.paralelo | type: TABLE --
-- DROP TABLE IF EXISTS biblioteca.paralelo CASCADE;
CREATE TABLE biblioteca.paralelo (
	id_paralelo integer NOT NULL DEFAULT nextval('biblioteca.paralelo_id_paralelo_seq'::regclass),
	nombre character varying(100),
	CONSTRAINT actividades_pk_cp_cp PRIMARY KEY (id_paralelo)
);
-- ddl-end --
COMMENT ON COLUMN biblioteca.paralelo.nombre IS E'nombre de la actividad';
-- ddl-end --
ALTER TABLE biblioteca.paralelo OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.nivel_id_nivel_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS biblioteca.nivel_id_nivel_seq CASCADE;
CREATE SEQUENCE biblioteca.nivel_id_nivel_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE biblioteca.nivel_id_nivel_seq OWNER TO postgres;
-- ddl-end --

-- object: biblioteca.nivel | type: TABLE --
-- DROP TABLE IF EXISTS biblioteca.nivel CASCADE;
CREATE TABLE biblioteca.nivel (
	id_nivel integer NOT NULL DEFAULT nextval('biblioteca.nivel_id_nivel_seq'::regclass),
	nombre character varying,
	CONSTRAINT nivel_pk PRIMARY KEY (id_nivel)
);
-- ddl-end --
ALTER TABLE biblioteca.nivel OWNER TO postgres;
-- ddl-end --

-- object: libros.tipo_libro_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.tipo_libro_id_seq CASCADE;
CREATE SEQUENCE libros.tipo_libro_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.tipo_libro_id_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.tipo_libro | type: TABLE --
-- DROP TABLE IF EXISTS libros.tipo_libro CASCADE;
CREATE TABLE libros.tipo_libro (
	id integer NOT NULL DEFAULT nextval('libros.tipo_libro_id_seq'::regclass),
	nombre character varying(50) NOT NULL,
	CONSTRAINT tipo_libro_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE libros.tipo_libro OWNER TO postgres;
-- ddl-end --

-- object: libros.editorial_id_seq | type: SEQUENCE --
-- DROP SEQUENCE IF EXISTS libros.editorial_id_seq CASCADE;
CREATE SEQUENCE libros.editorial_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START WITH 1
	CACHE 1
	NO CYCLE
	OWNED BY NONE;

-- ddl-end --
ALTER SEQUENCE libros.editorial_id_seq OWNER TO postgres;
-- ddl-end --

-- object: libros.editorial | type: TABLE --
-- DROP TABLE IF EXISTS libros.editorial CASCADE;
CREATE TABLE libros.editorial (
	id integer NOT NULL DEFAULT nextval('libros.editorial_id_seq'::regclass),
	nombre character varying(50) NOT NULL,
	CONSTRAINT editorial_pkey PRIMARY KEY (id)
);
-- ddl-end --
ALTER TABLE libros.editorial OWNER TO postgres;
-- ddl-end --

-- object: user_rol | type: CONSTRAINT --
-- ALTER TABLE inst.usuario DROP CONSTRAINT IF EXISTS user_rol CASCADE;
ALTER TABLE inst.usuario ADD CONSTRAINT user_rol FOREIGN KEY (fk_rol)
REFERENCES inst.rol (id_rol) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --
COMMENT ON CONSTRAINT user_rol ON inst.usuario IS E'conecions entre user y rol';
-- ddl-end --


-- object: user_carrera | type: CONSTRAINT --
-- ALTER TABLE inst.usuario DROP CONSTRAINT IF EXISTS user_carrera CASCADE;
ALTER TABLE inst.usuario ADD CONSTRAINT user_carrera FOREIGN KEY (fk_carrera)
REFERENCES libros.carrera (id_carrera) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_c | type: CONSTRAINT --
-- ALTER TABLE tramites.descargas DROP CONSTRAINT IF EXISTS fk_user_c CASCADE;
ALTER TABLE tramites.descargas ADD CONSTRAINT fk_user_c FOREIGN KEY (fk_user)
REFERENCES inst.usuario (id_user) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --
COMMENT ON CONSTRAINT fk_user_c ON tramites.descargas IS E'conecion entre usuario y tabla prestamo';
-- ddl-end --


-- object: fk_descarga | type: CONSTRAINT --
-- ALTER TABLE tramites.descargas DROP CONSTRAINT IF EXISTS fk_descarga CASCADE;
ALTER TABLE tramites.descargas ADD CONSTRAINT fk_descarga FOREIGN KEY (fk_libro)
REFERENCES libros.libro (id_libro) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_user_libro | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS fk_user_libro CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT fk_user_libro FOREIGN KEY (fk_creador)
REFERENCES inst.usuario (id_user) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "autor-libro" | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS "autor-libro" CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT "autor-libro" FOREIGN KEY (fk_autor)
REFERENCES libros.autor (id_autor) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: "materia-libro" | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS "materia-libro" CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT "materia-libro" FOREIGN KEY (fk_carrera)
REFERENCES libros.carrera (id_carrera) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: libro_tipo | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS libro_tipo CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT libro_tipo FOREIGN KEY (fk_tipo)
REFERENCES libros.tipo (id_tipo) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE NO ACTION;
-- ddl-end --

-- object: "libro-seion" | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS "libro-seion" CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT "libro-seion" FOREIGN KEY (fk_seccion)
REFERENCES libros.seccion (id_seccion) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: fk_editorial | type: CONSTRAINT --
-- ALTER TABLE libros.libro DROP CONSTRAINT IF EXISTS fk_editorial CASCADE;
ALTER TABLE libros.libro ADD CONSTRAINT fk_editorial FOREIGN KEY (fk_editorial)
REFERENCES libros.editorial (id) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: logueado | type: CONSTRAINT --
-- ALTER TABLE inst.secion DROP CONSTRAINT IF EXISTS logueado CASCADE;
ALTER TABLE inst.secion ADD CONSTRAINT logueado FOREIGN KEY (fk_user)
REFERENCES inst.usuario (id_user) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: libro_catalogo | type: CONSTRAINT --
-- ALTER TABLE libros.palabras_libro DROP CONSTRAINT IF EXISTS libro_catalogo CASCADE;
ALTER TABLE libros.palabras_libro ADD CONSTRAINT libro_catalogo FOREIGN KEY (fk_libro)
REFERENCES libros.libro (id_libro) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE NO ACTION;
-- ddl-end --

-- object: palabras_catalgo | type: CONSTRAINT --
-- ALTER TABLE libros.palabras_libro DROP CONSTRAINT IF EXISTS palabras_catalgo CASCADE;
ALTER TABLE libros.palabras_libro ADD CONSTRAINT palabras_catalgo FOREIGN KEY (fk_palabra)
REFERENCES libros.palabras_clave (id_palabra) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE NO ACTION;
-- ddl-end --

-- object: libro_estado | type: CONSTRAINT --
-- ALTER TABLE tramites.prestamo_libro DROP CONSTRAINT IF EXISTS libro_estado CASCADE;
ALTER TABLE tramites.prestamo_libro ADD CONSTRAINT libro_estado FOREIGN KEY (fk_estado)
REFERENCES tramites.estados (id_estado) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: prestamo_libro_fisico | type: CONSTRAINT --
-- ALTER TABLE tramites.prestamo_libro DROP CONSTRAINT IF EXISTS prestamo_libro_fisico CASCADE;
ALTER TABLE tramites.prestamo_libro ADD CONSTRAINT prestamo_libro_fisico FOREIGN KEY (fk_libro)
REFERENCES libros.libro (id_libro) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: prestamo_user | type: CONSTRAINT --
-- ALTER TABLE tramites.prestamo_libro DROP CONSTRAINT IF EXISTS prestamo_user CASCADE;
ALTER TABLE tramites.prestamo_libro ADD CONSTRAINT prestamo_user FOREIGN KEY (fk_usuario)
REFERENCES inst.usuario (id_user) MATCH SIMPLE
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: estante_secion | type: CONSTRAINT --
-- ALTER TABLE libros.seccion DROP CONSTRAINT IF EXISTS estante_secion CASCADE;
ALTER TABLE libros.seccion ADD CONSTRAINT estante_secion FOREIGN KEY (fk_estante)
REFERENCES libros.estante (id_estante) MATCH SIMPLE
ON DELETE CASCADE ON UPDATE NO ACTION;
-- ddl-end --

-- object: ingreso_actividad | type: CONSTRAINT --
-- ALTER TABLE tramites.ingreso DROP CONSTRAINT IF EXISTS ingreso_actividad CASCADE;
ALTER TABLE tramites.ingreso ADD CONSTRAINT ingreso_actividad FOREIGN KEY (fk_actividad)
REFERENCES biblioteca.actividades (id_actividad) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: ingreso_jornada | type: CONSTRAINT --
-- ALTER TABLE tramites.ingreso DROP CONSTRAINT IF EXISTS ingreso_jornada CASCADE;
ALTER TABLE tramites.ingreso ADD CONSTRAINT ingreso_jornada FOREIGN KEY (fk_jornada)
REFERENCES biblioteca.jornada (id_jornada) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: ingreso_paralelo | type: CONSTRAINT --
-- ALTER TABLE tramites.ingreso DROP CONSTRAINT IF EXISTS ingreso_paralelo CASCADE;
ALTER TABLE tramites.ingreso ADD CONSTRAINT ingreso_paralelo FOREIGN KEY (fk_paralelo)
REFERENCES biblioteca.paralelo (id_paralelo) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: ingreso_nivel | type: CONSTRAINT --
-- ALTER TABLE tramites.ingreso DROP CONSTRAINT IF EXISTS ingreso_nivel CASCADE;
ALTER TABLE tramites.ingreso ADD CONSTRAINT ingreso_nivel FOREIGN KEY (fk_nivel)
REFERENCES biblioteca.nivel (id_nivel) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --

-- object: ingreso_usuario | type: CONSTRAINT --
-- ALTER TABLE tramites.ingreso DROP CONSTRAINT IF EXISTS ingreso_usuario CASCADE;
ALTER TABLE tramites.ingreso ADD CONSTRAINT ingreso_usuario FOREIGN KEY (fk_usuario)
REFERENCES inst.usuario (id_user) MATCH SIMPLE
ON DELETE SET NULL ON UPDATE NO ACTION;
-- ddl-end --


