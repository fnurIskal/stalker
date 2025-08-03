import { getSupabaseClient, getDeviceId } from "../supabase/supabaseClient";

export const insertHabit = async (
  habitCategory,
  habitName,
  habitStreak,
  day
) => {
  const supabase = await getSupabaseClient();
  const deviceId = await getDeviceId();

  const { error, data } = await supabase.from("daily_habits").insert([
    {
      device_id: deviceId,
      habit_name: habitName,
      habit_category: habitCategory,
      habit_streak: habitStreak || 0,
      days: [],
    },
  ]);

  if (error) {
    console.error("Habit eklenemedi:", error.message);
  } else {
    console.log("Habit eklendi!");
  }

  return data;
};

export const getMyHabits = async () => {
  const supabase = await getSupabaseClient();

  const { data, error } = await supabase
    .from("daily_habits")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Habit çekilemedi", error.message);
  }

  return data;
};

export const updateHabit = async (habitId, habitStreak, newDay) => {
  const supabase = await getSupabaseClient();

  const { data: existingData, error: fetchError } = await supabase
    .from("daily_habits")
    .select("days")
    .eq("id", habitId)
    .single();

  if (fetchError) {
    console.error("Güncelleme öncesi veri çekme hatası:", fetchError.message);
    return null;
  }

  const existingDays = Array.isArray(existingData?.days)
    ? existingData.days
    : [];

  if (existingDays.includes(newDay)) {
    console.log("Bu gün zaten mevcut.");
    return existingDays;
  }

  const updatedDays = [...existingDays, newDay];

  const { data, error: updateError } = await supabase
    .from("daily_habits")
    .update({ days: updatedDays, habit_streak: habitStreak })
    .eq("id", habitId)
    .select();

  if (updateError) {
    console.error("Güncelleme hatası:", updateError.message);
    return null;
  }

  console.log("Güncellenen days verisi:", data[0].days);
  return data[0].days;
};
