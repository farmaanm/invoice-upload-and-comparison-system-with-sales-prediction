import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:invois_mobile_app/main.dart';
import 'package:firebase_core/firebase_core.dart';

void main() async {

  group('Splash Screen', () {
    testWidgets('Image Asset', (WidgetTester tester) async {
      
      const widget = SplashScreen();
      final element = widget.createElement(); // this will set state.widget
      final state = element.state as SplashScreenState;

      expect(state.methodToBeTested(), 0);

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

  });

}

//flutter test test/widget_test.dart
