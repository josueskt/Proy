import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Material App',
      home: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            backgroundColor: const Color.fromRGBO(97, 94, 144, 0.8),
            title: const Text('Biblioteca'),
          ),
          body: Container(
            decoration: const BoxDecoration(
                image: DecorationImage(
              image: NetworkImage(
                  'https://img.freepik.com/vector-gratis/interior-biblioteca-sala-vacia-leer-libros-estantes-madera_33099-1722.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701475200&semt=ais'),
              fit: BoxFit.cover,
            )),
            child: Center(
                child: ListView(
              children: [
                Container(
                  alignment: Alignment.center,
                  width: 200,
                  height: 250,
                  child: const Text(
                    'BIBIOTECA',
                    style: TextStyle(
                        fontWeight: FontWeight.w200,
                        fontSize: 50,
                        color: Colors.white),
                  ),
                ),
                TextField(
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                      color: Color.fromARGB(255, 255, 255,
                          255)), // Agregado para cambiar el color del texto
                  decoration: InputDecoration(
                    hintText: 'Buscar un libro',
                    hintStyle: const TextStyle(
                        color: Color.fromARGB(255, 255, 255,
                            255)), // Agregado para cambiar el color del texto de sugerencia
                    suffixIcon: const Icon(
                      Icons.search,
                      size: 40,
                      color: Colors.amber,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(30),
                    ),
                  ),
                )
              ],
            )),
          ),
        ),
      ),
    );
  }
}
