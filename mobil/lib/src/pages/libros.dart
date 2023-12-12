import 'dart:convert';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:mobil/src/pages/libro_view.dart';

class Libros extends StatelessWidget {
  // ignore: prefer_typing_uninitialized_variables
  final datos;

  const Libros({Key? key, required this.datos}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List myLiyst;
    myLiyst = datos;
    if (myLiyst.isEmpty) {
      return Scaffold(
        backgroundColor: Colors.black,
        appBar: AppBar(
          iconTheme: IconThemeData(color: Colors.white),
          backgroundColor: const Color.fromRGBO(76, 74, 95, 1),
        ),
        body: Center(
            child: Text(
          'NO SE A ENCONTRADO ESE LIBRO',
          style: TextStyle(color: Colors.white, fontSize: 30),
        )),
      );
    }

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: Colors.white),
        backgroundColor: const Color.fromRGBO(76, 74, 95, 1),
      ),
      body: ListView.builder(
        itemCount: myLiyst.length,
        itemBuilder: (context, i) {
          Map<String, dynamic> libro = myLiyst[i];

          return Padding(
            padding: const EdgeInsets.only(bottom: 30, left: 20, right: 20),
            child: GestureDetector(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => LibroView(
                      datos: libro,
                    ),
                  ),
                );
              },
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(),
                  borderRadius: BorderRadius.circular(14),
                  color: Colors.black,
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      libro["titulo"] as String,
                      maxLines: 2,
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 30, color: Colors.white),
                    ),
                    if (libro["imagen"].startsWith("data:image"))
                      Image.memory(
                          base64Decode(
                            libro["imagen"].split(",")[1],
                          ),
                          fit: BoxFit.cover,
                          width: double.infinity,
                          height: 500)
                    else
                      CachedNetworkImage(
                        imageUrl: libro["imagen"] as String,
                        fit: BoxFit.cover,
                        width: double.infinity,
                        height: 500, // Adjust the height as needed
                      ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
