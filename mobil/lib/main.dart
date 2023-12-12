import 'package:flutter/material.dart';
import 'package:mobil/src/pages/home.dart';
import 'package:mobil/src/pages/login.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<String?>(
      future: getTokenFromLocalStorage(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.done) {
          String? savedToken = snapshot.data;

          if (savedToken != null) {
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Material App',
              home: Home(),
            );
          } else {
            // Si no está iniciado, puedes devolver un widget diferente,
            // como un contenedor vacío o un widget de carga.
            return MaterialApp(
              debugShowCheckedModeBanner: false,
              title: 'Material App',
              home: Login(), // Puedes ajustar esto según tus necesidades.
            );
          }
        } else {
          // Mientras se está obteniendo el token, puedes mostrar un indicador de carga
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'Material App',
            home: Scaffold(
              body: Center(child: CircularProgressIndicator()),
            ),
          );
        }
      },
    );
  }

  Future<String?> getTokenFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }
}
