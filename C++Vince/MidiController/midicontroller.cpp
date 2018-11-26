#include <midicontroller.h>
#include <vector>
#include <QtDebug>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;
using namespace drumstick::rt;



MidiController::MidiController()
{
   int midichannel = 1;

   QStringList connections = midiOutput.connections(true);
   midiOutput.open("Sag einfach irgendetwas...");

}

int MidiController::startCamera(){

    VideoCapture cap(0);
    if(!cap.isOpend()){
        cout<<"erroe capturing camera.";
        return -1;
    }


    while(true){
        Mat frame;
        cap >> frame;

        redResult = getColoredAreas(frame, red);
        blueResult = getColoredAreas(frame, blue);
        greenResult = getColoredAreas(frame, green);
        yellowResult = getColoredAreas(frame, yellow);

        /*
         *   results[0] = size
         *   results[1] = x-coordinates
         *   results[2] = y-coordinates
         *   results[3] = color value
         */
        vector<int> results = getDominantColor (redResult, blueResult, greenResult, yellowResult, 4);

        qDebug() <<"size: "<< results[0] <<" x: " << results[1] << "y: " << results[2] << "color: " << results[3];

        //setzt die Farbe für die Midi Übertragung

        int colorCode = 0;

        switch (results[3]) {
            case 100: colorCode = 1;    //red = 1 ; case = filltext
            break;

            case 80: colorCode = 2;     // blue = 2;
            break;

            case 60: colorCode = 3;     // green = 3;
            break;

            case 40: colorCode  = 4;    //yellow = 4;
            break;
        }

        QByteArray data;    //Array zur Übertragung für MIDI
        data.resize(5);

        data[0] = 0xf0;          //start byte
            data[1] = colorCode;     //color code
            data[2] = 42;  //x-coordinates
            data[3] = 22;  //y-coordinates      coordinates divided by 3 because biggest allowed value is 0xef (239)
            data[4] = 0xf7;          //end byte

            midiOutput.sendSysex(data);

    }
}
