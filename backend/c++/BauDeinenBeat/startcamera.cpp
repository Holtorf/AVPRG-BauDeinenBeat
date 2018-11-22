#include "startcamera.h"
#include <opencv\cv.h>
#include <opencv2\imgproc\imgproc.hpp>
#include <opencv2\highgui\highgui.hpp>
#include <QDebug>
#include <vector>
#include <opencv2/core/core.hpp>
#include <opencv2/imgcodecs.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <iostream>
#include <string>
using namespace std;
using namespace cv;

StartCamera::StartCamera()
{

}


int StartCamera::start(){

    Mat bgrFrame (Scalar(640,480));
    Mat hsvFrame;


    VideoCapture cap(1);
    if(!cap.isOpened()){
        qDebug()<<"change the camera port number";
        return -1;
    }
    while(true){

        cap.read(bgrFrame);
        imshow("camera", bgrFrame);
        if(waitKey(30)==27){
            return 0;
        }

        cvtColor(bgrFrame, hsvFrame, CV_BGR2HSV);

        rasterCols = 16;
        rasterRows = 15;
        colorArray[rasterCols][rasterRows];

        fieldCols = 40;
        fieldRows = 32;
        rasterFieldArray[fieldCols][fieldRows];

        int testCounter=0;

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
                       int hue = hsvPixel[0];
// der H-Wert wird auf seinen Farbbereich gecheckt und der Farbbereich wird als Zahl im Array gespeichert

                       if(hue<=5 || hue>=355){                  //Pixel rot
                           //rasterFieldArray[fieldX][fieldY]= 1;
                           redCounter += 1;
                       }
                       else if (hue<=30 && hue>=20) {           //Pixel gelb
                           //rasterFieldArray[fieldX][fieldY]= 2;
                           yellowCounter += 1;
                       }
                       else if (hue<=75 && hue>=60){          //Pixel gruen
                           //rasterFieldArray[fieldX][fieldY]= 3;
                           greenCounter += 1;
                       }
                       else if (hue<=110 && hue>=100){          //Pixel blau
                           //rasterFieldArray[fieldX][fieldY]= 4;
                           blueCounter += 1;
                       }
                       else{                                    //Pixel sonstige
                           //rasterFieldArray[fieldX][fieldY]= 1;
                           othersCounter += 1;
                       }

                       if(rasterX==8 && rasterY==7 && fieldX==21 && fieldY==16){

                           qDebug()<<hue;
                       }

                   }
               }

               if(yellowCounter<=redCounter && greenCounter<=redCounter && blueCounter<=redCounter && othersCounter<=redCounter){                   //Rasterfeld rot
                   colorArray[rasterX][rasterY]= 1;
                   qDebug()<<"Rot";
               }
               else if (redCounter<=yellowCounter && greenCounter<=yellowCounter && blueCounter<=yellowCounter && othersCounter<=yellowCounter) {   //Rasterfeld gelb
                   colorArray[rasterX][rasterY]= 2;
                   qDebug()<<"Gelb";
               }
               else if (yellowCounter<=greenCounter && redCounter<=greenCounter && blueCounter<=greenCounter && othersCounter<=greenCounter){       //Rasterfeld gruen
                   colorArray[rasterX][rasterY]= 3;
                   qDebug()<<"Gruen";
               }
               else if (yellowCounter<=blueCounter && greenCounter<=blueCounter && redCounter<=blueCounter && othersCounter<=blueCounter){          //Rasterfeld blau
                   colorArray[rasterX][rasterY]= 4;
                   qDebug()<<"Blau";
               }
               else{                                                                                                                                //Rasterfeld sonstige
                   colorArray[rasterX][rasterY]= 0;
                   qDebug()<<"Sonstiges";
               }

            }
            testCounter +=1;

            if(testCounter==14){
                break;
            }
        }

    }

}
//static Mat StartCamera::getHsvFrame(){
//    return hsvFrame;
//}
