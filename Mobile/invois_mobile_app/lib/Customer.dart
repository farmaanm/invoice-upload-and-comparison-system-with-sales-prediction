import 'dart:async';
/* Android 5 to Android 11 */
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:invois_mobile_app/Login.dart';
import 'package:invois_mobile_app/History.dart';
import 'package:firebase_auth/firebase_auth.dart';

import 'package:flutter/gestures.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:invois_mobile_app/main.dart';
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
      home: const MyCustomerPage(title: 'Customer'),
    );
  }
}
*/

class MyCustomerPage extends StatefulWidget {
  const MyCustomerPage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyCustomerPage> createState() => MyCustomerPageState();
}

class MyCustomerPageState extends State<MyCustomerPage> {
  final Stream<QuerySnapshot> _usersStream = FirebaseFirestore.instance
      .collection('Customer')
      .orderBy('customerName', descending: false)
      .snapshots();

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
          body: Scrollbar(
            child: RefreshIndicator(
            child: SingleChildScrollView(
              physics: const AlwaysScrollableScrollPhysics(),
              child: Container(
                //height: 1500,
                margin: EdgeInsets.symmetric(
                    vertical: MediaQuery.of(context).size.height * 0.04, //0.04
                    horizontal: MediaQuery.of(context).size.width * 0.06),
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
                              //height: 480,
                              //decoration: myBoxDecoration(),

                              child: ListView(
                            shrinkWrap: true,
                            children: snapshot.data!.docs
                                .map((DocumentSnapshot document) {
                              Map<String, dynamic> data =
                                  document.data()! as Map<String, dynamic>;
                              List<String> items = [
                                'Item 1',
                                'Item 2',
                                'Item 3'
                              ];

                              return ExpansionTile(
                                title: Text(data['customerName']),
                                subtitle: Text(data['validity']),
                                children: <Widget>[
                                  ListView.builder(
                                    shrinkWrap: true,
                                    itemCount: data['records'].length,
                                    itemBuilder: (context, index) {
                                      return ListTile(
                                        title: Text(data['records'][index]
                                            ['destination']),
                                        subtitle: Text("Rate: " +
                                            data['records'][index]['rate']
                                                .toString() +
                                            " | Size: " +
                                            data['records'][index]
                                                ['containerSize'] +
                                            " | Line: " +
                                            data['records'][index]
                                                ['shippingLine']),
                                      );
                                    },
                                  ),
                                ],
                              );
                            }).toList(),
                          ));
                        }),
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
                  selected: false,
                  leading: const Icon(Icons.history),
                  title: const Text(
                    ' History',
                    style: TextStyle(fontSize: 16),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const MyHomePage(
                            title: 'History',
                          )),
                    );
                  },
                ),
                ListTile(
                  selected: true,
                  leading: const Icon(Icons.person_pin_outlined),
                  title: const Text(
                    ' Customer',
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


