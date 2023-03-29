import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:invois_mobile_app/main.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {
  Widget createWidgetForTesting({required Widget child}) {
    return MaterialApp(
      home: child,
    );
  }

  group('Splash Screen', () {
    testWidgets('Image Asset', (WidgetTester tester) async {

      /* Pumping class */
      await tester.pumpWidget(createWidgetForTesting(
          child: const SplashScreen()
      ));

      await tester.pumpAndSettle(const Duration(seconds: 5));

      var splashScreenImageFinder = find.byKey(const Key('splashScreenImage'));

      expect(splashScreenImageFinder, findsNothing);

    });
  });

  group('Login Screen', () {
    testWidgets('Login Credentials error', (WidgetTester tester) async {
      const widget = MyLoginPage(title: '');
      final element = widget.createElement();
      final state = element.state as MyLoginPageState;

      expect(state.useremailerror, '');
      expect(state.userpassworderror, '');
    });

    testWidgets('Login Page Contents', (WidgetTester tester) async {

      /* Pumping class */
      await tester.pumpWidget(createWidgetForTesting(
          child: const MyLoginPage(
        title: '',
      )));

      await tester.pumpAndSettle();

      /* Finding main label */
      var labelFinder = find.text("Login to your account");
      expect(labelFinder, findsOneWidget);

      /* Finding User Input Fields */
      var emailInputFinder = find.byKey(const Key('userEmailInput'));
      var passwordInputFinder = find.byKey(const Key('userPasswordInput'));

      expect(emailInputFinder, findsOneWidget);
      expect(passwordInputFinder, findsOneWidget);

      /* Finding Error Fields */
      var emailErrorFinder = find.byKey(const Key('userEmailError'));
      var passwordErrorFinder = find.byKey(const Key('userPasswordError'));

      expect(emailErrorFinder, findsOneWidget);
      expect(passwordErrorFinder, findsOneWidget);

      /* Finding Button Field */
      var loginButtonFinder = find.byKey(const Key('loginButton'));

      expect(loginButtonFinder, findsOneWidget);

    });

    testWidgets('Login Credentials', (WidgetTester tester) async {
      /* Pumping class */
      await tester.pumpWidget(createWidgetForTesting(
          child: const MyLoginPage(
            title: '',
          )));

      await tester.pumpAndSettle();

      /* Finding User Input Fields */
      var emailInputFinder = find.byKey(const Key('userEmailInput'));
      var passwordInputFinder = find.byKey(const Key('userPasswordInput'));

      expect(emailInputFinder, findsOneWidget);
      expect(passwordInputFinder, findsOneWidget);

      /* Entering text for user input fields */
      await tester.enterText(emailInputFinder, 'test123@user.com');
      await tester.enterText(passwordInputFinder, 'testuser123');
      await tester.pump();

      /* Finding text for user input fields */
      var emailFinder = find.text("test123@user.com");
      var passwordFinder = find.text("testuser123");

      expect(emailFinder, findsOneWidget);
      expect(passwordFinder, findsOneWidget);

      var loginButtonFinder = find.byKey(const Key('loginButton'));

      //await tester.tap(loginButtonFinder);
      //await tester.pump();
    });

  });

  group('Home Screen', () {

    testWidgets('Home Page Contents', (WidgetTester tester) async {

      /* Pumping class */
      /*await tester.pumpWidget(createWidgetForTesting(
          child: const MyHomePage(
            title: '',
          )));

      await tester.pumpAndSettle();*/

      /* Finding main label */
      /*var labelFinder = find.text("\nVend Inv: ");
      expect(labelFinder, findsOneWidget);*/

    });

  });
}

//flutter test test/widget_test.dart



/*/WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());*/

/*testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MyApp());
    // Verify that our counter starts at 0.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);
    // Tap the '+' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();
    // Verify that our counter has incremented.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });*/


