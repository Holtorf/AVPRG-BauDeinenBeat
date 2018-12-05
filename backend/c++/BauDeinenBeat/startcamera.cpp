#include <startcamera.h>
#include <QDebug>
#include <vector>
#include <iostream>
using namespace std;
using namespace cv;
using namespace drumstick::rt;

StartCamera::StartCamera(){

    midichannel = 1;

    QStringList connections = midiOutput.connections(true);
    midiOutput.open("LoopBe Internal MIDI");
}

int StartCamera::start(){

    startTime = clock();

    Mat bgrFrame(Scalar(640,480));

    VideoCapture cap(1);
    if(!cap.isOpened()){
        qDebug()<<"change the camera port number";
        return -1;
    }
    bool b = true;

//Während Kamera läuft, wird ein Raster erstellt und für jedes der Rasterfelder eine Farbe gespeichert, sofern vorhanden
    while(b){

        cap.read(bgrFrame);
        imshow("camera", bgrFrame);
        if(waitKey(30)==27){
            return 0;
        }

// Spiegeln des Videobildes
        flip(bgrFrame,bgrFrame,0);

// Umwandlung des Bildes in HSV-Farbwerte
        cvtColor(bgrFrame, hsvFrame, CV_BGR2HSV);

// Bild wird in 16 Spalten a 15 Zeilen gerastert, Rasterfeld hat 40x32 Pixel
        rasterCols = 8;
        rasterRows = 7;
        fieldCols = 80;
        fieldRows = 68;

//0= sonstiges, 1 = rot, 2 = gelb, 3 = gruen, 4 = blau
        int colorCode = 0;
        double test1 = ((clock()-startTime)/double (CLOCKS_PER_SEC));
        if (test1>=1){

            qDebug()<<"Schleife "<<test1;
// Rasterfelder werden erstellt
            for(int rasterY=0; rasterY<rasterRows; rasterY++){

                for(int rasterX=0; rasterX<rasterCols; rasterX++){

                   int redCounter=0;
                   int yellowCounter=0;
                   int greenCounter=0;
                   int blueCounter=0;
                   int othersCounter=0;


    // Pro Rasterfeld werden Pixel durchgeschaut
                   for(int fieldY=0; fieldY<fieldRows; fieldY++){

                       for(int fieldX=0; fieldX<fieldCols; fieldX++){

                           Vec3b hsvPixel = hsvFrame.at<Vec3b>(fieldY+(fieldRows*rasterY),fieldX+(fieldCols*rasterX));
    // H-Wert wird auf Farbbereich gecheckt
                           int hue = hsvPixel[0];

    // Wenn S- oder V-Werte zu niedrig, wird Farbwert nicht gespeichert
                           sat = hsvPixel[1];
                           val = hsvPixel[2];

    // Counter für jede Farbe erhöhen sich pro Pixel
                           if(sat>20 && val>20){
                               if(hue<=15 || hue>=355){         //Pixel rot
                                   redCounter += 1;
                               }
                               else if (hue<=30 && hue>=20) {   //Pixel gelb
                                   yellowCounter += 1;
                               }
                               else if (hue<=90 && hue>=60){    //Pixel gruen
                                   greenCounter += 1;
                               }
                               else if (hue<=110 && hue>=100){  //Pixel blau
                                   blueCounter += 1;
                               }
                               else{                            //Pixel sonstiges
                                   othersCounter += 1;
                               }
                           }
                           else{
                               othersCounter+=1;
                           }
                       }
                   }
                    //qDebug()<<"s " << sat << "  v " << val;


    // Für ein Rasterfeld wird die dominierende Farbe gespeichert,
                    if(yellowCounter<=redCounter && greenCounter<=redCounter && blueCounter<=redCounter && othersCounter<=redCounter){                   //Rasterfeld rot
                       //qDebug()<<rasterX<<" "<<rasterY<<" Rot";
                       colorCode = 1;
                   }
                   else if (redCounter<=yellowCounter && greenCounter<=yellowCounter && blueCounter<=yellowCounter && othersCounter<=yellowCounter) {   //Rasterfeld gelb
                       //qDebug()<<rasterX<<" "<<rasterY<<"Gelb";
                       colorCode = 2;
                   }
                   else if (yellowCounter<=greenCounter && redCounter<=greenCounter && blueCounter<=greenCounter && othersCounter<=greenCounter){       //Rasterfeld gruen
                       //qDebug()<<rasterX<<" "<<rasterY<<"Gruen";
                       colorCode = 3;
                   }
                   else if (yellowCounter<=blueCounter && greenCounter<=blueCounter && redCounter<=blueCounter && othersCounter<=blueCounter){          //Rasterfeld blau
                       //qDebug()<<rasterX<<" "<<rasterY<<"Blau";
                       colorCode = 4;
                   }
                   else{                                                                                                                                //Rasterfeld sonstige
                       //qDebug()<<rasterX<<" "<<rasterY<<"Sonstiges";
                       colorCode = 0;
                   }

                   //Array zur Übertragung für MIDI
                   //QByteArray data;
                   data.resize(5);

                   data[0] = 0xf0;             //start byte
                       data[1] = colorCode;    //colorCode
                       data[2] = rasterX;   //x-coordinates
                       data[3] = rasterY;   //y-coordinates
                   data[4] = 0xf7;             //end byte

                   midiOutput.sendSysex(data);

                }
            }
            startTime = clock();
        }
    }
}

