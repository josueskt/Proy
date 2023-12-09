import 'package:flutter/material.dart';
import 'package:mobil/src/pages/home.dart';
import 'package:mobil/src/pages/login.dart';

void main() => runApp(MyApp());

final bool iniciado = true;

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    if (iniciado) {
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
          home: Login()); // Puedes ajustar esto según tus necesidades.
    }
  }
}
