import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";
import * as Application from "expo-application";

export const getDeviceId = async () => {
  return Application.getAndroidId();
};

export const getSupabaseClient = async () => {
  const deviceId = await getDeviceId();

  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    global: {
      headers: {
        "device-id": deviceId,
      },
    },
  });
};
