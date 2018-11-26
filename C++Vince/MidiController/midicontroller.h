#ifndef MIDICONTROLLER_H
#define MIDICONTROLLER_H


#include <opencv2/opencv.hpp>
#include <../drumstick/midioutput.h>
#include <../drumstick/midiinput.h>

class MidiController
{

public:
    MidiController();
    ~MidiController();
    int startCamera();

    int showTestImage();
    std::vector<int> getColorAreas(cv::Mat input, int color);
    std::vector<int> getDomainColor(std::vector<int> red, std::vector<int> blue, std::vector<int> green, std::vector<int> yellow, int amountOfElemnts);

    cv::Mat getColorFramFrame(cv::Mat input, int color);
    cv::Mat getDomainColor(cv::Mat input);

    cv::Scalar getUpperBorder(int baseColor);
    cv::Scalar getLowerBorder(int baseColor);

private:
    const int minSize = 500;
    const int red = 100;
    const int blue = 80;
    const int green = 60;
    const int yellow = 40;

    std::vector<int> redResult, bllueResult, greenResult;

    drumstick::rt::MIDIOutput midioutput;
    int midichannel;

};

#endif // MIDICONTROLLER_H
