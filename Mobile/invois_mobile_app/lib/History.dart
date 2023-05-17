import 'dart:async';
/* Android 5 to Android 11 */
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:invois_mobile_app/Customer.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:invois_mobile_app/Login.dart';

import 'package:shimmer/shimmer.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:invois_mobile_app/palette.dart';
import 'main.dart';

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
      home: const MyHomePage(title: 'History'),
    );
  }
}
*/

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => MyHomePageState();
}

class MyHomePageState extends State<MyHomePage> {
  final Stream<QuerySnapshot> _usersStream = FirebaseFirestore.instance
      .collection('Contract')
      .orderBy('timestamp', descending: true)
      .snapshots();
  String payReqName = '';
  String payReqUrl = '';
  String vendInvName = '';
  String vendInvUrl = '';
  String paymentDoneAt = '';

  String userEmail = '';

  String defaultPayReq = "Cost Confirmation Document - SCMBXXXXXXX.pdf";
  String defaultVendInv = "Customer Invoice No-CMBBXXXXXXXX.pdf";
  String defaultPaymentDoneAt = "XX/XX/XXXX XX:XX:XX";

  TextStyle defaultStyle = const TextStyle(fontSize: 16.0, color: Colors.grey);
  TextStyle disableStyle = const TextStyle(fontSize: 16.0, color: Color(0xa4d3d3d3));
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
                                    subtitle: Text(data['dateTime'] +
                                        " | " +
                                        data['status']),
                                    trailing: data['paymentStatus'] == 'Done'
                                        ? const Icon(
                                            Icons.done,
                                            color: Colors.green,
                                          )
                                        : data['status'] == 'Rejected'
                                            ? const Icon(
                                                Icons.close,
                                                color: Colors.red,
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
                              payReqName == ""
                                  ? TextSpan(
                                      text: defaultPayReq,
                                      style: disableStyle,
                                    )
                                  : TextSpan(
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
                              vendInvName == ""
                                  ? TextSpan(
                                      text: defaultVendInv,
                                      style: disableStyle,
                                    )
                                  : TextSpan(
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
                              paymentDoneAt == ""
                                  ? TextSpan(
                                      text: defaultPaymentDoneAt,
                                      style: disableStyle,
                                    )
                                  : TextSpan(
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
                        scale: 2,
                        image: AssetImage(
                          "assets/images/invois_logo.png",
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
                  selected: false,
                  leading: const Icon(Icons.person_pin_outlined),
                  title: const Text(
                    ' Customer',
                    style: TextStyle(fontSize: 16),
                  ),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const MyCustomerPage(
                                title: 'Customer',
                              )),
                    );
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
