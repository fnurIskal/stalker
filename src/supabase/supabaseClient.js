// supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

export const getDeviceId = async () => {
  let id = await AsyncStorage.getItem("device_id");
  if (!id) {
    id = uuid.v4();
    await AsyncStorage.setItem("device_id", id);
  }
  return id;
};

export const getSupabaseClient = async () => {
  const deviceId = await getDeviceId();
  console.log("🟢 device-id header gönderiliyor:", deviceId); // BU ÇIKMALI

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        "device-id": deviceId, // 🟢 HEADER BURADA OLMALI
      },
    },
  });
};
