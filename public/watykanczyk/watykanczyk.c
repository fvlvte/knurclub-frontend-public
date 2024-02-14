#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <emscripten.h>

int main() {
    srand(time(NULL));

    struct timespec ts;
    timespec_get(&ts, TIME_UTC);
    struct tm *papiezClock = localtime(&ts.tv_sec);

    const char* PAPIEZE_REAKCYJNE[] = {
        "https://www.youtube.com/shorts/2FTk3k-ibwU",
        "https://rzeszow.ipn.gov.pl/dokumenty/zalaczniki/86/86-704020.jpg",
        "https://www.youtube.com/watch?v=HrejDpSuGGY&pp=ygUFYmFya2E%3D",
        "https://www.minecraftskins.com/uploads/preview-skins/2022/01/05/john-paul-2-pope-skin-jan-pawel-2-papiez-polak-polish-pope-19652479.png?v609"
    };

    char buffer[2137]; // <- beware of holy overflows
    sprintf(buffer, "window.location = '%s'", PAPIEZE_REAKCYJNE[rand() % sizeof(PAPIEZE_REAKCYJNE) / sizeof(void*)]);

    if(papiezClock->tm_hour == 21 && papiezClock->tm_min == 37)
    {
        emscripten_run_script(buffer);
    }
}