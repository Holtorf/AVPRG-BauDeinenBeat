#-------------------------------------------------
#
# Project created by QtCreator 2018-11-14T14:38:54
#
#-------------------------------------------------

QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = BauDeinenBeat
TEMPLATE = app

# The following define makes your compiler emit warnings if you use
# any feature of Qt which has been marked as deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if you use deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

CONFIG += c++11

SOURCES += \
        main.cpp \
        mainwindow.cpp \
    startcamera.cpp \
    gridframe.cpp

HEADERS += \
        mainwindow.h \
    startcamera.h \
    gridframe.h

FORMS += \
        mainwindow.ui

INCLUDEPATH += C:\opencv\OpenCV-MinGW-Build-OpenCV-3.4.1\include

LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/opencv_ffmpeg341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_calib3d341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_core341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_dnn341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_features2d341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_flann341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_highgui341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_imgcodecs341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_imgproc341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_ml341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_objdetect341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_photo341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_shape341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_stitching341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_superres341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_video341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_videoio341.dll
LIBS += C:/opencv/OpenCV-MinGW-Build-OpenCV-3.4.1/bin/libopencv_videostab341.dll


# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target
