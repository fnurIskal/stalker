// supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import * as Application from "expo-application";

export const getDeviceId = () => {
  return Application.getAndroidId(); // sadece Android'de çalışır
};

export const getSupabaseClient = () => {
  const deviceId = getDeviceId();
  console.log("🟢 device-id header gönderiliyor:", deviceId);

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        "device-id": deviceId,
      },
    },
  });
};
