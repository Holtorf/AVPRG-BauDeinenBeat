#ifndef GRIDFRAME_H
#define GRIDFRAME_H

#include <QWidget>

class GridFrame{

    private: int x;
    private: int y;
    private: int fieldCounter;
    private: int columnCounter;

public:
    GridFrame();
    int scan();
    static int getHsvFrame();

};

#endif // GRIDFRAME_H
