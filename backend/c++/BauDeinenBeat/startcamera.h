#ifndef STARTCAMERA_H
#define STARTCAMERA_H


#include <opencv\cv.h>
#include <QDebug>
#include <vector>
#include <QObject>
#include <QWidget>

#include <opencv2/opencv.hpp>
#include <../drumstick/midioutput.h>
#include <../drumstick/midiinput.h>

using namespace std;
using namespace cv;

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

    drumstick::rt::MIDIOutput midiOutput;
    int midichannel;

public:

    StartCamera();
    ~StartCamera();
    int start();
 //   static Mat getHsvFrame();

};

#endif // STARTCAMERA_H
