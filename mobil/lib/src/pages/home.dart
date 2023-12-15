import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobil/src/pages/libros.dart';
import 'package:mobil/src/pages/login.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/services.dart';

void main() {
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp])
      .then((_) {
    runApp(MyApp());
  });
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Material App',
      home: Home(),
    );
  }
}

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final TextEditingController _controller = TextEditingController();
  List myList = [];

  Future<void> fetchData(String searchString) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('token');

    try {
      if (token != null) {
        final response = await http.get(
          Uri.parse('http://192.168.23.129:3000/buscador?cadena=$searchString'),
          headers: {
            'Authorization': 'Bearer $token',
          },
        );

        if (response.statusCode == 200) {
          setState(() {
            final lista = List.from(json.decode(response.body));
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => Libros(
                  datos: lista,
                ),
              ),
            );
          });
        } else {
          // Manejar error
          print('Error en la solicitud: ${response.statusCode}');
        }
      } else {
        // El token no está presente, redirigir al login o realizar alguna acción
        // ignore: use_build_context_synchronously
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => Login(),
          ),
        );
      }
    } catch (e) {
      // Manejar excepción
      print('Error en la solicitud: $e');
    }
  }

  Future<void> removeTokenFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('token');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(76, 74, 95, 1),
        title: GestureDetector(
          onTap: () {},
          child: const Text(
            'Biblioteca',
            style: TextStyle(color: Colors.white),
          ),
        ),
        actions: [
          PopupMenuButton<String>(
            iconColor: Colors.amber,
            icon: const Icon(
              Icons.menu,
              size: 40,
            ),
            onSelected: (value) {
              if (value == 'eliminarToken') {
                removeTokenFromLocalStorage();
                // Puedes realizar otras acciones después de eliminar el token.
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (context) => Login(),
                  ),
                );
              }
            },
            itemBuilder: (context) {
              return [
                PopupMenuItem(
                  value: 'eliminarToken',
                  child: const Text('SALIR'),
                ),
              ];
            },
          ),
        ],
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(
              'https://img.freepik.com/premium-photo/rows-books-shelves-library-generative-ai_123447-29376.jpg',
            ),
            fit: BoxFit.cover,
          ),
        ),
        child: Center(
          child: ListView(
            children: [
              Container(
                alignment: Alignment.center,
                width: 200,
                height: 250,
                child: const Text(
                  'BIBLIOTECA',
                  style: TextStyle(
                    fontWeight: FontWeight.w300,
                    fontSize: 50,
                    color: Colors.white,
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _controller,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Color.fromARGB(255, 255, 255, 255),
                        ),
                        decoration: InputDecoration(
                          fillColor: Colors.amber,
                          focusColor: Colors.amber,
                          hintText: 'Buscar un libro',
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255),
                          ),
                          border: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.white),
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(20.0),
                              bottomLeft: Radius.circular(10.0),
                            ),
                          ),
                          focusedBorder: OutlineInputBorder(
                            borderSide: BorderSide(color: Colors.amber),
                            borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(20.0),
                              bottomLeft: Radius.circular(10.0),
                            ),
                          ),
                        ),
                      ),
                    ),
                    Builder(
                      builder: (BuildContext context) {
                        return GestureDetector(
                          onTap: () {
                            fetchData(_controller.text);
                          },
                          child: const Icon(
                            Icons.search,
                            size: 45,
                            color: Colors.amber,
                          ),
                        );
                      },
                    ),
                  ],
                ),
              ),
              // Mostrar la lista de libros
              Column(
                children: myList.map((libro) {
                  return ListTile(
                    title: Text(libro['nombre']),
                    subtitle: Text(libro['imagen']),
                  );
                }).toList(),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
