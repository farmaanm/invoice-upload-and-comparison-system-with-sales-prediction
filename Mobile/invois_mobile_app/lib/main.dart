import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:url_launcher/url_launcher.dart';

Future<void> main() async {
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
          primarySwatch: Colors.blue,
          appBarTheme: const AppBarTheme(
            color: Color(0xFF381ce4),
          ),
          scaffoldBackgroundColor: const Color(0xFFf8f4f4)),
      home: const MyHomePage(title: ''),
    );
  }
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
  State<MyLoginPage> createState() => _MyLoginPageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final Stream<QuerySnapshot> _usersStream =
      FirebaseFirestore.instance.collection('Contract').snapshots();
  String payReqName = '';
  String payReqUrl = '';
  String vendInvName = '';
  String vendInvUrl = '';
  String paymentDoneAt = '';

  TextStyle defaultStyle = const TextStyle(color: Colors.grey);
  TextStyle linkStyle = const TextStyle(color: Color(0xFF0D47A1));

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          //title: Text(widget.title),
          title: const Text('History'),
        ),
        body: RefreshIndicator(
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            child: Container(
              margin: EdgeInsets.symmetric(
                  vertical: MediaQuery.of(context).size.height * 0.04,
                  horizontal: MediaQuery.of(context).size.width * 0.04),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  /*const Text(
                    'Click to see more',
                    style: TextStyle(fontSize: 16),
                  ),*/
                  /*const SizedBox(
                    height: 10,
                  ),*/
                  /*TextField(
                onChanged: (value) {
                  //Do something with the user input.
                },
                decoration: const InputDecoration(
                  hintText: 'Enter your password.',
                  contentPadding:
                      EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(Radius.circular(6.0)),
                  ),
                ),
              ),*/
                  StreamBuilder<QuerySnapshot>(
                      stream: _usersStream,
                      builder: (BuildContext context,
                          AsyncSnapshot<QuerySnapshot> snapshot) {
                        if (snapshot.hasError) {
                          return const Text('Something went wrong');
                        }
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return const CircularProgressIndicator();
                        }
                        return ListView(
                          shrinkWrap: true,
                          children: snapshot.data!.docs
                              .map((DocumentSnapshot document) {
                            Map<String, dynamic> data =
                                document.data()! as Map<String, dynamic>;
                            return ListTile(
                              title: Text(data['uploadedBy']),
                              subtitle: Text(data['dateTime']),
                              trailing: data['paymentStatus'] == 'done'
                                  ? const Icon(
                                      Icons.done,
                                      color: Colors.green,
                                    )
                                  : const Icon(
                                      Icons.access_time_filled,
                                      color: Colors.yellow,
                                    ),
                              onTap: () {
                                setState(() {
                                  if (payReqName == '') {
                                    payReqName = data['paymentRequisitionName'];
                                    payReqUrl = data['paymentRequisitionUrl'];
                                    vendInvName = data['vendorInvoiceName'];
                                    vendInvUrl = data['vendorInvoiceUrl'];
                                    paymentDoneAt = data['paymentDoneAt'];
                                  } else {
                                    payReqName = '';
                                    payReqUrl = '';
                                    vendInvName = '';
                                    vendInvUrl = '';
                                    paymentDoneAt = '';
                                  }
                                });
                              },
                            );
                          }).toList(),
                        );
                      }),
                  RichText(
                    text: TextSpan(
                      style: defaultStyle,
                      children: <TextSpan>[
                        const TextSpan(text: 'Pay Req: '),
                        TextSpan(
                            text: payReqName,
                            style: linkStyle,
                            recognizer: TapGestureRecognizer()
                              ..onTap = () async {
                                //launchUrl(Uri.parse('https://www.google.com'));
                                await launch(payReqUrl,
                                    forceSafariVC: false, forceWebView: false);
                              }),
                        const TextSpan(text: '\nVend Inv: '),
                        TextSpan(
                            text: vendInvName,
                            style: linkStyle,
                            recognizer: TapGestureRecognizer()
                              ..onTap = () async {
                                //launchUrl(Uri.parse(vendInvUrl));
                                await launch(vendInvUrl,
                                    forceSafariVC: false, forceWebView: false);
                              }),
                        TextSpan(text: '\nPayment Done At: $paymentDoneAt'),
                      ],
                    ),
                  )
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
                  backgroundColor: Colors.grey[200],
                );
              });
            });
          },
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              DrawerHeader(
                  decoration: const BoxDecoration(
                      color: Color(0xFFf8f4f4),
                      image: DecorationImage(
                        scale: 1.8,
                        image: AssetImage("assets/images/logo.png"),
                      )),
                  child: Container(
                    alignment: Alignment.bottomCenter,
                    child: const Text(
                      'User Email',
                      style: TextStyle(
                        fontSize: 20,
                      ),
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
                title: const Text(' History '),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
              ListTile(
                leading: const Icon(Icons.logout),
                title: const Text('LogOut'),
                onTap: () {
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        ));
  }
}

class _MyLoginPageState extends State<MyLoginPage> {
  final Stream<QuerySnapshot> _usersStream =
      FirebaseFirestore.instance.collection('Contract').snapshots();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          margin: EdgeInsets.symmetric(
              vertical: MediaQuery.of(context).size.height * 0.35,
              horizontal: MediaQuery.of(context).size.width * 0.04),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'assets/images/logo.png',
                height: 100,
                scale: 2.5,
                // color: Color.fromARGB(255, 15, 147, 59),
              ),
              const SizedBox(
                height: 10,
              ),
              TextField(
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
              const SizedBox(
                height: 10,
              ),
              TextField(
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
              const SizedBox(
                height: 10,
              ),
              SizedBox(
                width: MediaQuery.of(context).size.width,
                child: ElevatedButton(
                  onPressed: () {},
                  // style: ButtonStyle(elevation: MaterialStateProperty(12.0 )),
                  style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF381ce4),
                      elevation: 10.0,
                      textStyle: const TextStyle(color: Colors.white)),
                  child: const Text('Login'),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
