import 'dart:convert';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

final Uri _url = Uri.parse('https://flutter.dev');

class LibroView extends StatelessWidget {
  final Map<String, dynamic> datos;

  const LibroView({Key? key, required this.datos}) : super(key: key);

  Future<void> _launchUrl(String filename) async {
    const baseUrl = 'http://192.168.3.20:3000/descarga';

    final launch = Uri.parse('$baseUrl?filename=$filename');
    if (!await launchUrl(launch)) {
      throw Exception('Could not launch $_url');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: const Color.fromRGBO(76, 74, 95, 1),
      ),
      body: Container(
        decoration: BoxDecoration(color: Colors.brown[300]),
        child: Column(
          children: [
            Container(
              height: 70,
              width: double.infinity,
              color: const Color.fromARGB(255, 13, 13, 13),
              child: Text(
                datos["titulo"] as String,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 50, color: Colors.white),
              ),
            ),
            if (datos["imagen"].startsWith("data:image"))
              Image.memory(
                base64Decode(
                  datos["imagen"].split(",")[1],
                ),
                fit: BoxFit.cover,
                width: double.infinity,
                height: 300,
              )
            else
              CachedNetworkImage(
                imageUrl: datos["imagen"] as String,
                fit: BoxFit.cover,
                width: double.infinity,
                height: 300,
              ),
            Padding(
              padding: const EdgeInsets.only(left: 40, right: 40),
              child: Column(children: [
                const Text(
                  'Descripcion',
                  style: TextStyle(fontSize: 30),
                ),
                Text("${datos['descripcion']}", maxLines: 4),
                Padding(padding: EdgeInsets.all(10)),
                Text("CARRERA:  ${datos['nombre_carrera']}"),
                Padding(padding: EdgeInsets.all(10)),
                Text("NUMERO DE PAGINAS : ${datos['num_paginas']}"),
                Padding(padding: EdgeInsets.all(10)),
                Text("AUTOR: ${datos['autor_nombre']}"),
              ]),
            ),
            Padding(padding: EdgeInsets.all(20)),
            Center(
              child: ElevatedButton(
                style: ButtonStyle(
                  fixedSize: MaterialStateProperty.all<Size>(Size(180.0, 50.0)),
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.deepPurple),
                ),
                onPressed: () async {
                  await _launchUrl(datos["nombre_archivo"]);
                },
                child: const Row(
                  children: [
                    Text(
                      'DESCARGAR    ',
                      style: TextStyle(color: Colors.white),
                    ),
                    Icon(
                      Icons.download,
                      color: Colors.white,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
