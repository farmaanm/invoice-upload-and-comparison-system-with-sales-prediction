import 'dart:async';

import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:shimmer/shimmer.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:invois_mobile_app/palette.dart';

FirebaseAuth auth = FirebaseAuth.instance;

/*Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp();
  runApp(const MyApp());
}*/

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

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

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => SplashScreenState();
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class MyLoginPage extends StatefulWidget {
  const MyLoginPage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  //State<MyHomePage> createState() => _MyHomePageState();
  State<MyLoginPage> createState() => MyLoginPageState();
}

class SplashScreenState extends State<SplashScreen> {

  int methodToBeTested() {
    // dummy implementation that uses widget.XXX
    return 0;
  }

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
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image.asset(
            'assets/images/splash_logo.png',
            height: 200,
            scale: 1,
            // color: Color.fromARGB(255, 15, 147, 59),
          ),
        ],
      ),
    );
  }
}

class _MyHomePageState extends State<MyHomePage> {
  final Stream<QuerySnapshot> _usersStream =
      FirebaseFirestore.instance.collection('Contract').snapshots();
  String payReqName = '';
  String payReqUrl = '';
  String vendInvName = '';
  String vendInvUrl = '';
  String paymentDoneAt = '';

  String userEmail = '';

  TextStyle defaultStyle = const TextStyle(fontSize: 16.0, color: Colors.grey);
  TextStyle linkStyle = const TextStyle(color: Color(0xFF0D47A1));

  @override
  Widget build(BuildContext context) {

    FirebaseAuth.instance.authStateChanges().listen((User? user) {
      if (user != null) {
        userEmail = user.email!;
      }
    });

    BoxDecoration myBoxDecoration() {
      return BoxDecoration(
        border: Border.all(
          color: Colors.black12,
          width: 0.2,
        ),
        borderRadius: const BorderRadius.all(Radius.circular(5.0)),
      );
    }

    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
          appBar: AppBar(
            title: Text(widget.title),
            //title: const Text('History'),
          ),
          body: RefreshIndicator(
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Container(
                //height: 1500,
                margin: EdgeInsets.symmetric(
                    vertical: MediaQuery.of(context).size.height * 0.04, //0.04
                    horizontal: MediaQuery.of(context).size.width * 0.04),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    StreamBuilder<QuerySnapshot>(
                        stream: _usersStream,
                        builder: (BuildContext context,
                            AsyncSnapshot<QuerySnapshot> snapshot) {
                          if (snapshot.hasError) {
                            return const Text('Something went wrong');
                          }
                          if (snapshot.connectionState ==
                              ConnectionState.waiting) {
                            return const Center(
                                heightFactor: 10,
                                child: CircularProgressIndicator());
                          }
                          return Container(
                              height: 480,
                              decoration: myBoxDecoration(),
                              child: ListView(
                                shrinkWrap: true,
                                children: snapshot.data!.docs
                                    .map((DocumentSnapshot document) {
                                  Map<String, dynamic> data =
                                      document.data()! as Map<String, dynamic>;
                                  return ListTile(
                                    title: Text(data['uploadedBy']),
                                    subtitle: Text(data['dateTime']),
                                    trailing: data['paymentStatus'] == 'Done'
                                        ? const Icon(
                                            Icons.done,
                                            color: Colors.green,
                                          )
                                        : const Icon(
                                            Icons.access_time_filled,
                                            color: Color(0xFFe09c1c),
                                          ),
                                    onTap: () {
                                      setState(() {
                                        if (data['paymentStatus'] == 'Done') {
                                          //if (payReqName == '') {
                                          payReqName =
                                              data['paymentRequisitionName'];
                                          payReqUrl =
                                              data['paymentRequisitionUrl'];
                                          vendInvName =
                                              data['vendorInvoiceName'];
                                          vendInvUrl = data['vendorInvoiceUrl'];
                                          paymentDoneAt =
                                              data['paymentDoneAt']!;
                                          /*} else {
                                        payReqName = '';
                                        payReqUrl = '';
                                        vendInvName = '';
                                        vendInvUrl = '';
                                        paymentDoneAt = '';
                                      }*/
                                        } else {
                                          //if (payReqName == '') {
                                          payReqName =
                                              data['paymentRequisitionName'];
                                          payReqUrl =
                                              data['paymentRequisitionUrl'];
                                          vendInvName =
                                              data['vendorInvoiceName'];
                                          vendInvUrl = data['vendorInvoiceUrl'];
                                          paymentDoneAt = '';
                                          /*} else {
                                        payReqName = '';
                                        payReqUrl = '';
                                        vendInvName = '';
                                        vendInvUrl = '';
                                      }*/
                                        }
                                      });
                                    },
                                  );
                                }).toList(),
                              ));
                        }),
                    Container(
                        margin: EdgeInsets.symmetric(
                            vertical: MediaQuery.of(context).size.height *
                                0.002, //0.04
                            horizontal:
                                MediaQuery.of(context).size.width * 0.04),
                        child: RichText(
                          text: TextSpan(
                            style: defaultStyle,
                            children: <TextSpan>[
                              const TextSpan(
                                text: 'Pay Req: ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF4f4f4f),
                                    height: 2),
                              ),
                              TextSpan(
                                  text: payReqName,
                                  style: linkStyle,
                                  recognizer: TapGestureRecognizer()
                                    ..onTap = () async {
                                      //launchUrl(Uri.parse('https://www.google.com'));
                                      await launch(payReqUrl,
                                          forceSafariVC: false,
                                          forceWebView: false);
                                    }),
                              const TextSpan(
                                text: '\nVend Inv: ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF4f4f4f),
                                    height: 2),
                              ),
                              TextSpan(
                                  text: vendInvName,
                                  style: linkStyle,
                                  recognizer: TapGestureRecognizer()
                                    ..onTap = () async {
                                      //launchUrl(Uri.parse(vendInvUrl));
                                      await launch(vendInvUrl,
                                          forceSafariVC: false,
                                          forceWebView: false);
                                    }),
                              const TextSpan(
                                text: '\nPayment Done At: ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: Color(0xFF4f4f4f),
                                    height: 2),
                              ),
                              TextSpan(
                                text: paymentDoneAt,
                                style: const TextStyle(
                                  color: Color(0xFF4f4f4f),
                                ),
                              ),
                            ],
                          ),
                        )),
                  ],
                ),
              ),
            ),
            onRefresh: () {
              return Future.delayed(const Duration(seconds: 1), () {
                setState(() {
                  //txt = 'Page Refreshed';
                  Fluttertoast.showToast(
                    msg: "Page Refreshed",
                    toastLength: Toast.LENGTH_SHORT,
                    textColor: Colors.black,
                    fontSize: 14,
                    backgroundColor: Colors.grey[300],
                  );
                });
              });
            },
          ),
          drawer: Drawer(
              child: Container(
            color: const Color(0xFFF5F5F5),
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                DrawerHeader(
                    //padding: EdgeInsets.symmetric(horizontal: 50.0, vertical: 30.0),
                    decoration: const BoxDecoration(
                      color: Color(0xFFf8f4f4),
                      image: DecorationImage(
                        fit: BoxFit.scaleDown,
                        scale: 5,
                        image: AssetImage(
                          "assets/images/splash_logo.png",
                        ),
                      ),
                    ),
                    child: Container(
                      alignment: Alignment.bottomCenter,
                      child: Text(
                        'Welcome\n$userEmail',
                        style: const TextStyle(
                          fontSize: 17,
                          letterSpacing: 3,
                          color: Color(0xFF4f4f4f),
                        ),
                        textAlign: TextAlign.center,
                      ),
                    )),
                const SizedBox(
                  height: 3,
                  child: DecoratedBox(
                    decoration: BoxDecoration(color: Color(0xFF381ce4)),
                  ),
                ),
                ListTile(
                  selected: true,
                  leading: const Icon(Icons.history),
                  title: const Text(
                    ' History',
                    style: TextStyle(fontSize: 16),
                  ),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
                ListTile(
                  leading: const Icon(Icons.logout),
                  title: const Text(
                    ' LogOut',
                    style: TextStyle(fontSize: 16),
                  ),
                  onTap: () async {
                    //Navigator.pop(context);
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const MyLoginPage(
                                title: '',
                              )),
                    );
                    await FirebaseAuth.instance.signOut();
                  },
                ),
              ],
            ),
          ))),
    );
  }
}

@visibleForTesting
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
                transform: Matrix4.translationValues(0.0, -60.0, 0.0),
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
                      vertical: MediaQuery.of(context).size.height * 0.05,
                      horizontal: MediaQuery.of(context).size.width * 0.10),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      const Text(
                        'Login to your account',
                        key: Key('loginLabel'),
                        style: TextStyle(
                          fontSize: 25,
                          color: Color(0xFF4f4f4f),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(
                        height: 60,
                      ),
                      TextField(
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
                        controller: passwordController,
                        obscureText: true, // hidden password
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
