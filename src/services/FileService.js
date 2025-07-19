import * as FileSystem from "expo-file-system";
import { getSupabaseClient } from "../supabase/supabaseClient";

export const uploadFile = async (localUri, pathName) => {
  try {
    const supabase = await getSupabaseClient();

    const base64 = await FileSystem.readAsStringAsync(localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const contentType = pathName.endsWith(".3gp")
      ? "audio/3gp"
      : pathName.endsWith(".jpg") || pathName.endsWith(".jpeg")
        ? "image/jpeg"
        : "application/octet-stream";

    const fileBinary = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

    const { error } = await supabase.storage
      .from("moods")
      .upload(pathName, fileBinary, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload hatası:", error.message);
      return null;
    }

    const { data } = supabase.storage.from("moods").getPublicUrl(pathName);
    return data.publicUrl;
  } catch (err) {
    console.error("Dosya yükleme genel hata:", err);
    return null;
  }
};

// export const getSignedPhotoUrl = async (path) => {
//   const supabase = await getSupabaseClient();

//   const { data, error } = await supabase.storage
//     .from("moods")
//     .createSignedUrl(path, 86400);

//   if (error) {
//     console.error("Foto signed URL hatası:", error.message);
//     return null;
//   }

//   return data.signedUrl;
// };
