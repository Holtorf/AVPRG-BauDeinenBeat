#include <opencv\cv.h>
#include <QDebug>
#include <vector>
using namespace std;
using namespace cv;
#ifndef STARTCAMERA_H
#define STARTCAMERA_H

#include <QObject>
#include <QWidget>

class StartCamera{

    private:int colorArray[16][15];
    private:int rasterFieldArray[40][32];
    private:int rasterX;
    private:int rasterY;
    private:int fieldX;
    private:int fieldY;
    private:int rasterRows;
    private:int rasterCols;
    private:int fieldRows;
    private:int fieldCols;
    private:bool b;



public:
    StartCamera();
    int start();
 //   static Mat getHsvFrame();
};

#endif // STARTCAMERA_H
