import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobil/src/pages/libros.dart';
import 'package:mobil/src/pages/login.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(const MyApp());

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
          Uri.parse('http://192.168.3.20:3000/buscador?cadena=$searchString'),
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
                  child: Text('Eliminar Token'),
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
              'https://img.freepik.com/vector-gratis/interior-biblioteca-sala-vacia-leer-libros-estantes-madera_33099-1722.jpg?size=626&ext=jpg&ga=GA1.1.1803636316.1701475200&semt=ais',
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
                    fontWeight: FontWeight.w200,
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
                          hintText: 'Buscar un libro',
                          hintStyle: const TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255),
                          ),
                          border: const OutlineInputBorder(
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
                          child: Icon(
                            Icons.search,
                            size: 40,
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
