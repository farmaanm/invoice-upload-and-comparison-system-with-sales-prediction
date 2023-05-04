import 'dart:async';
/* Android 5 to Android 11 */
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:invois_mobile_app/History.dart';

import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:invois_mobile_app/Customer.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:invois_mobile_app/palette.dart';

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

class MyLoginPage extends StatefulWidget {
  const MyLoginPage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  //State<MyHomePage> createState() => _MyHomePageState();
  State<MyLoginPage> createState() => MyLoginPageState();
}

class MyLoginPageState extends State<MyLoginPage> {
  /*final Stream<QuerySnapshot> _usersStream =
      FirebaseFirestore.instance.collection('Contract').snapshots();*/

  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  String useremailerror = '';
  String userpassworderror = '';

  updateLoginError(err) {
    setState(() {
      if (err == 'user-not-found') {
        useremailerror += "No user found for that email.";
        userpassworderror = '';
        Fluttertoast.showToast(
          msg: "No user found for that email.",
          toastLength: Toast.LENGTH_SHORT,
          textColor: Colors.black,
          fontSize: 14,
          backgroundColor: Colors.grey[200],
        );
      } else if (err == 'wrong-password') {
        useremailerror = '';
        userpassworderror = "Invalid password.";
        Fluttertoast.showToast(
          msg: "Wrong password provided for that user.",
          toastLength: Toast.LENGTH_SHORT,
          textColor: Colors.black,
          fontSize: 14,
          backgroundColor: Colors.grey[200],
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        body: SingleChildScrollView(
          child: Column(children: <Widget>[
            Container(
              width: MediaQuery.of(context).size.width,
              height: 350,
              decoration: const BoxDecoration(
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: AssetImage("assets/images/login_background.jpg"),
                ),
              ),
            ),
            Container(
                transform: Matrix4.translationValues(0.0, -100.0, 0.0),
                margin: const EdgeInsets.symmetric(
                    vertical: 0.01, horizontal: 0.01),
                decoration: const BoxDecoration(
                  color: Color(0xFFf5f5f5), //Colors.red,
                  borderRadius: BorderRadius.only(
                      topRight: Radius.circular(40.0),
                      topLeft: Radius.circular(40.0)),
                ),
                child: Container(
                  margin: EdgeInsets.symmetric(
                      vertical: MediaQuery.of(context).size.height * 0.01,
                      horizontal: MediaQuery.of(context).size.width * 0.10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Image.asset(
                        'assets/images/splash_logo.png',
                        height: 150,
                        scale: 1,
                      ),
                      const Text(
                        'Login to your account',
                        key: Key('loginLabel'),
                        style: TextStyle(
                          fontSize: 25,
                          color: Color(0xFF4f4f4f),
                          fontWeight: FontWeight.bold,
                          letterSpacing: 1.0,
                        ),
                      ),
                      const SizedBox(
                        height: 40,
                      ),
                      TextField(
                        key: const Key('userEmailInput'),
                        controller: emailController,
                        onChanged: (value) {},
                        style: const TextStyle(color: Color(0xFF4f4f4f)),
                        decoration: const InputDecoration(
                          labelText: "Email",
                          fillColor: Color(0xFFf5f5f5),
                          //Colors.white,
                          filled: true,
                          contentPadding: EdgeInsets.symmetric(
                              vertical: 10.0, horizontal: 20.0),
                          enabledBorder: OutlineInputBorder(
                            // width: 0.0 produces a thin "hairline" border
                            borderSide:
                            BorderSide(color: Colors.grey, width: 0.0),
                          ),
                          border: OutlineInputBorder(
                            borderRadius:
                            BorderRadius.all(Radius.circular(6.0)),
                          ),
                        ),
                      ),
                      SizedBox(
                          height: 35,
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              key: const Key('userEmailError'),
                              useremailerror,
                              style: const TextStyle(color: Colors.red),
                            ),
                          )),
                      TextField(
                        key: const Key('userPasswordInput'),
                        controller: passwordController,
                        obscureText: true,
                        // hidden password
                        onChanged: (value) {},
                        decoration: const InputDecoration(
                          labelText: "Password",
                          fillColor: Color(0xFFf5f5f5),
                          //Colors.white,
                          filled: true,
                          contentPadding: EdgeInsets.symmetric(
                              vertical: 10.0, horizontal: 20.0),
                          enabledBorder: OutlineInputBorder(
                            // width: 0.0 produces a thin "hairline" border
                            borderSide:
                            BorderSide(color: Colors.grey, width: 0.0),
                          ),
                          border: OutlineInputBorder(
                            borderRadius:
                            BorderRadius.all(Radius.circular(6.0)),
                          ),
                        ),
                      ),
                      SizedBox(
                          height: 35,
                          child: Align(
                            alignment: Alignment.centerLeft,
                            child: Text(
                              key: const Key('userPasswordError'),
                              userpassworderror,
                              style: const TextStyle(color: Colors.red),
                            ),
                          )),
                      SizedBox(
                        width: MediaQuery.of(context).size.width,
                        height: 50,
                        child: ElevatedButton(
                          key: const Key('loginButton'),
                          onPressed: () async {
                            //setState(() async {
                            try {
                              final credential = await FirebaseAuth.instance
                                  .signInWithEmailAndPassword(
                                  email: emailController.text,
                                  password: passwordController.text);
                              if (!context.mounted) return;
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) => const MyHomePage(
                                      title: 'History',
                                    )),
                              );
                            } on FirebaseAuthException catch (e) {
                              /*if (e.code == 'user-not-found') {
                                useremailerror +=
                                    "No user found for that email.";
                                userpassworderror = '';
                                Fluttertoast.showToast(
                                  msg: "No user found for that email.",
                                  toastLength: Toast.LENGTH_SHORT,
                                  textColor: Colors.black,
                                  fontSize: 14,
                                  backgroundColor: Colors.grey[200],
                                );
                              } else if (e.code == 'wrong-password') {
                                useremailerror = '';
                                userpassworderror = "Invalid password.";
                                Fluttertoast.showToast(
                                  msg: "Wrong password provided for that user.",
                                  toastLength: Toast.LENGTH_SHORT,
                                  textColor: Colors.black,
                                  fontSize: 14,
                                  backgroundColor: Colors.grey[200],
                                );
                              }*/
                              updateLoginError(e.code);
                            }
                            //});
                          },
                          // style: ButtonStyle(elevation: MaterialStateProperty(12.0 )),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF381ce4),
                            elevation: 10.0,
                            textStyle: const TextStyle(color: Colors.white),
                            shape: const StadiumBorder(),
                            /*RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(12), // <-- Radius
                                      ),*/
                            //padding: const EdgeInsets.fromLTRB(20, 10, 20, 10)
                          ),
                          child: const Text(
                            'LOGIN',
                            style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                letterSpacing: 2),
                          ),
                        ),
                      )
                    ],
                  ),
                ))
          ]
            /*margin: EdgeInsets.symmetric(
                //vertical: MediaQuery.of(context).size.height * 0.25,
                horizontal: MediaQuery.of(context).size.width * 0.04),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                Image.asset(
                  'assets/images/login_background.jpg',
                  height: 200,
                  scale: 1,
                  // color: Color.fromARGB(255, 15, 147, 59),
                ),

                const SizedBox(
                  height: 10,
                ),
                TextField(
                  controller: emailController,
                  onChanged: (value) {},
                  decoration: const InputDecoration(
                    labelText: "Email",
                    fillColor: Colors.white,
                    filled: true,
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(6.0)),
                    ),
                  ),
                ),
                SizedBox(
                    height: 25,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        useremailerror,
                        style: const TextStyle(color: Colors.red),
                      ),
                    )),
                TextField(
                  controller: passwordController,
                  obscureText: true, // hidden password
                  onChanged: (value) {},
                  decoration: const InputDecoration(
                    labelText: "Password",
                    fillColor: Colors.white,
                    filled: true,
                    contentPadding:
                        EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.all(Radius.circular(6.0)),
                    ),
                  ),
                ),
                SizedBox(
                    height: 25,
                    child: Align(
                      alignment: Alignment.centerLeft,
                      child: Text(
                        userpassworderror,
                        style: const TextStyle(color: Colors.red),
                      ),
                    )),
                SizedBox(
                  width: MediaQuery.of(context).size.width,
                  child: ElevatedButton(
                    onPressed: () async {
                      //setState(() async {
                      try {
                        final credential = await FirebaseAuth.instance
                            .signInWithEmailAndPassword(
                                email: emailController.text,
                                password: passwordController.text);
                        if (!context.mounted) return;
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const MyHomePage(
                                    title: 'History',
                                  )),
                        );
                      } on FirebaseAuthException catch (e) {
                        if (e.code == 'user-not-found') {
                          useremailerror = "No user found for that email.";
                          userpassworderror = '';
                          Fluttertoast.showToast(
                            msg: "No user found for that email.",
                            toastLength: Toast.LENGTH_SHORT,
                            textColor: Colors.black,
                            fontSize: 14,
                            backgroundColor: Colors.grey[200],
                          );
                        } else if (e.code == 'wrong-password') {
                          useremailerror = '';
                          userpassworderror = "Invalid password.";
                          Fluttertoast.showToast(
                            msg: "Wrong password provided for that user.",
                            toastLength: Toast.LENGTH_SHORT,
                            textColor: Colors.black,
                            fontSize: 14,
                            backgroundColor: Colors.grey[200],
                          );
                        }
                      }
                      //});
                    },
                    // style: ButtonStyle(elevation: MaterialStateProperty(12.0 )),
                    style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFF381ce4),
                        elevation: 10.0,
                        textStyle: const TextStyle(color: Colors.white)),
                    child: const Text('Login'),
                  ),
                )
              ],
            ),*/
          ),
        ),
      ),
    );
  }
}
