// ignore_for_file: library_private_types_in_public_api, unnecessary_null_comparison, unnecessary_brace_in_string_interps

import 'package:flutter/material.dart';
import 'package:flutter_blue/flutter_blue.dart';
import 'package:oscilloscope/oscilloscope.dart';

import 'dart:async';
import 'dart:convert' show utf8;
import 'package:flutter/foundation.dart';

class SensorPage extends StatefulWidget {
  const SensorPage({Key? key, required this.device}) : super(key: key);
  final BluetoothDevice device;

  @override
  _SensorPageState createState() => _SensorPageState();
}

class _SensorPageState extends State<SensorPage> {
  final String SERVICE_UUID = "********-****-****-****-************";
  final String CHARACTERISTIC_UUID = "********-****-****-****-************";
  late bool isReady;
  late Stream<List<int>> stream;
  late List<double> traceEletro = List.empty(growable: true);

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    isReady = false;
    connectToDevice();
  }

  connectToDevice() async {
    if (widget.device == null) {
      _Pop();
      return;
    }

    Timer(const Duration(seconds: 15), () {
      if (!isReady) {
        disconnectFromDevice();
        _Pop();
      }
    });

    await widget.device.connect();
    discoverServices();
  }

  disconnectFromDevice() {
    if (widget.device == null) {
      _Pop();
      return;
    }

    widget.device.disconnect();
  }

  discoverServices() async {
    if (widget.device == null) {
      _Pop();
      return;
    }

    List<BluetoothService> services = await widget.device.discoverServices();
    services.forEach((service) {
      if (service.uuid.toString() == SERVICE_UUID) {
        service.characteristics.forEach((characteristic) {
          if (characteristic.uuid.toString() == CHARACTERISTIC_UUID) {
            characteristic.setNotifyValue(!characteristic.isNotifying);
            stream = characteristic.value;

            setState(() {
              isReady = true;
            });
          }
        });
      }
    });

    if (!isReady) {
      _Pop();
    }
  }

  Future _onWillPop() {
    return showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Are you sure?"),
        content: const Text("Do you want disconnect device and go back?"),
        actions: <Widget>[
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text("No"),
          ),
          TextButton(
            onPressed: () {
              disconnectFromDevice();
              Navigator.of(context).pop(true);
            },
            child: const Text("Yes"),
          ),
        ],
      ),
    );
  }

  double _dataParser(List<int> dataFromDevice) {
    String dataString = utf8.decode(dataFromDevice);
    try {
      double parsedValue = double.parse(dataString);
      return parsedValue;
    } catch (e) {
      debugPrint("Error parsing data: $e");
      return 0.0; // Return default value in case of parsing error
    }
  }

  // ignore: non_constant_identifier_names
  _Pop() {
    Navigator.of(context).pop(true);
  }

  @override
  Widget build(BuildContext context) {
    Oscilloscope oscilloscope = Oscilloscope(
      showYAxis: true,
      // ignore: deprecated_member_use
      padding: 0.0,
      backgroundColor: Colors.black87,
      traceColor: Colors.white70,
      yAxisMax: 4000.0,
      yAxisMin: 0.0,
      dataSet: traceEletro,
    );
    // ignore: deprecated_member_use
    return WillPopScope(
      onWillPop: () async => await _onWillPop(),
      child: Scaffold(
        appBar: AppBar(
          title: const Text("Transdutor Avaliador de Bruxismo"),
        ),
        body: Container(
          child: !isReady
              ? Center(
                  child: Text(
                    "Waiting...",
                    style: TextStyle(fontSize: 24, color: Colors.red[400]),
                  ),
                )
              : StreamBuilder<List<int>>(
                  stream: stream,
                  builder: (BuildContext context,
                      AsyncSnapshot<List<int>> snapshot) {
                    if (snapshot.hasError) {
                      return Text("Error: ${snapshot.error}");
                    }
                    if (snapshot.connectionState == ConnectionState.active) {
                      var currentValue = _dataParser(snapshot.data!);
                      debugPrint("Current value: $currentValue");

                      traceEletro.add(currentValue);

                      return Center(
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Expanded(
                              flex: 1,
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  const Text(
                                    "Current value from sensor",
                                    style: TextStyle(fontSize: 14),
                                  ),
                                  Text(
                                    "${currentValue} mV",
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 24,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Expanded(
                              flex: 1,
                              child: oscilloscope,
                            ),
                          ],
                        ),
                      );
                    } else {
                      return const Text("Check the stream");
                    }
                  },
                ),
        ),
      ),
    );
  }
}
