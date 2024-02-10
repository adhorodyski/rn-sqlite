package com.mysqliteapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod fun createCalendarEvent(name: String, location: String) {
        Log.d("CalendarModule", "Called createCalendarEvent with name $name and location $location")
    }
}