import 'dart:async';
/* Android 5 to Android 11 */
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:invois_mobile_app/palette.dart';
import 'package:invois_mobile_app/Login.dart';

import 'package:flutter/gestures.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:invois_mobile_app/Customer.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';
import 'History.dart';

FirebaseAuth auth = FirebaseAuth.instance;
/*
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}
*/

/*
class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Invois',
      theme: ThemeData(
          primarySwatch: Palette.kToDark, //Colors.blue,
          appBarTheme: const AppBarTheme(
            color: Color(0xFF381ce4),
          ),
          scaffoldBackgroundColor: const Color(0xFFf5f5f5)), //381ce4
      //home: const MyHomePage(title: ''),
      home: const SplashScreen(),
    );
  }
}
*/

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => SplashScreenState();
}

class SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Timer(
        const Duration(seconds: 3), //3
        () => Navigator.pushReplacement(
            context,
            MaterialPageRoute(
                builder: (context) => const MyLoginPage(title: ''))));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: const Color(0xFFF5F5F5), //Colors.white,
      //child: FlutterLogo(size: MediaQuery.of(context).size.height)
      child: Column(
        key: const Key('splashScreenImage'),
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image.asset(
            //'assets/images/splash_logo.png',
            'assets/images/invois_logo.png',
            height: 200,
            scale: 1,
            // color: Color.fromARGB(255, 15, 147, 59),
          ),
        ],
      ),
    );
  }
}
