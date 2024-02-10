package com.mysqliteapp

import android.util.Log
import java.util.UUID
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "CalendarModule"

    @ReactMethod fun createCalendarEvent(name: String, content: String, promise: Promise) {
        try {
            val eventId = UUID.randomUUID().toString()
            Log.d("CalendarModule", "[eventId: $eventId] Called createCalendarEvent with name $name and content $content")
            promise.resolve(eventId);
        } catch (error: Throwable) {
            promise.reject("Create an event", error)
        }
    }

    override fun getConstants(): MutableMap<String, Any>? = hashMapOf("DEFAULT_EVENT_NAME" to "Message reminder")
}

