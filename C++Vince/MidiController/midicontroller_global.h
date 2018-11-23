#ifndef MIDICONTROLLER_GLOBAL_H
#define MIDICONTROLLER_GLOBAL_H

#include <QtCore/qglobal.h>

#if defined(MIDICONTROLLER_LIBRARY)
#  define MIDICONTROLLERSHARED_EXPORT Q_DECL_EXPORT
#else
#  define MIDICONTROLLERSHARED_EXPORT Q_DECL_IMPORT
#endif

#endif // MIDICONTROLLER_GLOBAL_H
