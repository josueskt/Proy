import 'dart:convert';
import 'dart:io';

import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_downloader/flutter_downloader.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

class LibroView extends StatelessWidget {
  final Map<String, dynamic> datos;

  LibroView({Key? key, required this.datos}) : super(key: key);

  Future<void> _initDownloader() async {
    WidgetsFlutterBinding.ensureInitialized();
    await FlutterDownloader.initialize(
      debug: true, // Puedes cambiar esto a false en producción
    );
  }

  Future<void> _descargarLibro(String filename, BuildContext context) async {
    await _initDownloader(); // Inicializar flutter_downloader

    final url = 'http://192.168.3.20:3000/descarga?filename=$filename';

    try {
      // Obtener el directorio de descargas
      final downloadsDirectory = await getExternalStorageDirectory();
      final savedDir = downloadsDirectory?.path ?? 'Download';

      // Crear el directorio si no existe
      final savedDirExists = await Directory(savedDir).exists();
      if (!savedDirExists) {
        await Directory(savedDir).create(recursive: true);
      }

      final taskId = await FlutterDownloader.enqueue(
        url: url,
        savedDir: savedDir,
        fileName: filename,
        showNotification: true,
        openFileFromNotification: true,
      );

      print('Descarga iniciada con la tarea ID: $taskId');
    } catch (error) {
      print('Error en la descarga: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error en la descarga: $error'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: const Color.fromRGBO(76, 74, 95, 1),
      ),
      body: Column(
        children: [
          Container(
            child: Text(
              datos["titulo"] as String,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 50),
            ),
            height: 70,
            width: double.infinity,
            color: Colors.amber,
          ),
          Center(
            child: ElevatedButton(
              style: ButtonStyle(
                fixedSize: MaterialStateProperty.all<Size>(Size(180.0, 50.0)),
                backgroundColor: MaterialStateProperty.all<Color>(Colors.amber),
              ),
              onPressed: () async {
                await _descargarLibro(
                    datos["nombre_archivo"] as String, context);
              },
              child: const Row(
                children: [
                  Text('DESCARGAR'),
                  Icon(Icons.download),
                ],
              ),
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
        ],
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tu Aplicación',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LibroView(
        datos: {
          "titulo": "Título del Libro",
          "nombre_archivo": "nombre_del_archivo.pdf",
          "imagen": "URL_de_la_imagen_o_datos_en_base64",
        },
      ),
    );
  }
}
