#include "mainwindow.h"
#include <QApplication>
#include "startcamera.h"
#include "gridframe.h"

int main(int argc, char *argv[])
{

    StartCamera *sC = new StartCamera();
    sC -> start();

//    GridFrame *gF = new GridFrame();
//   gF -> scan();


    QApplication a(argc, argv);
    MainWindow w;
    w.show();

    return a.exec();
}
