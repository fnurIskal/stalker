import { useEffect, useState } from "react";
import { Text, Image } from "react-native";
import { getSignedPhotoUrl } from "../services/FileService";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export default function MoodImageSection({ mood }) {
  const [signedUrl, setSignedUrl] = useState(null);

  useEffect(() => {
    const fetchSignedUrl = async () => {
      if (mood.photo_url) {
        const url = await getSignedPhotoUrl(mood.photo_url);
        setSignedUrl(url);
      }
    };

    fetchSignedUrl();
  }, [mood.photo_url]);

  return (
    signedUrl && (
      <>
        <Text
          style={{
            paddingHorizontal: wp("4%"),
            marginTop: wp("5%"),
            marginBottom: wp("2%"),
          }}
          className="font-bold text-sm"
        >
          My Image
        </Text>
        <Image
          source={{ uri: signedUrl }}
          style={{
            width: wp("35%"),
            height: wp("35%"),
            margin: wp("3%"),
          }}
        />
      </>
    )
  );
}
