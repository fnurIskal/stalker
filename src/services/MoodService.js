import { getSupabaseClient, getDeviceId } from "../supabase/supabaseClient";
import { uploadFile } from "./FileService";

export const insertMoodWithMedia = async (
  moodType,
  moodDesc,
  photoUri,
  audioUri
) => {
  const supabase = await getSupabaseClient();
  const deviceId = await getDeviceId();

  const timestamp = Date.now();
  const photoPath = photoUri ? `photos/photo_${timestamp}.jpg` : null;
  const audioPath = audioUri ? `audio/audio_${timestamp}.m4a` : null;

  const photoUrl = photoUri ? await uploadFile(photoUri, photoPath) : null;
  const audioUrl = audioUri ? await uploadFile(audioUri, audioPath) : null;

  const { error } = await supabase.from("daily_moods").insert({
    mood_type: moodType,
    mood_desc: moodDesc,
    device_id: deviceId,
    photo_url: photoUrl,
    audio_url: audioUrl,
  });

  if (error) {
    console.error("Mood medya ile eklenemedi:", error.message);
  } else {
    console.log("Mood + medya başarıyla eklendi!");
  }
};

export const getMyMoods = async () => {
  const supabase = await getSupabaseClient();
  const deviceId = await getDeviceId();

  const { data, error } = await supabase
    .from("daily_moods")
    .select("*")
    .eq("device_id", deviceId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Mood verileri çekilemedi:", error.message);
    return [];
  }
  return data;
};
