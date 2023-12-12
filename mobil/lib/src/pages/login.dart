import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobil/src/pages/home.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Login extends StatelessWidget {
  final TextEditingController cedulaController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  Future<void> _login(BuildContext context) async {
    final url = 'http://192.168.3.20:3000/login';
    final response = await http.post(
      Uri.parse(url),
      body: {
        'cedula': cedulaController.text,
        'password': passwordController.text,
      },
    );

    // La solicitud fue exitosa, puedes manejar la respuesta aquí

    var values = jsonDecode(response.body);
    var ms = values["message"];
    if (ms != null) {
      print(values["message"]);
    } else if (ms == null) {
      saveTokenToLocalStorage(values["token"]);
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => Home(),
        ),
      );
    }
  }

  void saveTokenToLocalStorage(String token) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.setString('token', token);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login Flutter'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: cedulaController,
              decoration: InputDecoration(labelText: 'Cédula'),
            ),
            SizedBox(height: 16),
            TextField(
              controller: passwordController,
              obscureText: true,
              decoration: InputDecoration(labelText: 'Contraseña'),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () =>
                  _login(context), // Pass the context to the _login method
              child: Text('Iniciar sesión'),
            ),
          ],
        ),
      ),
    );
  }
}
