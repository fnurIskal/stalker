import {
  View,
  Dimensions,
  Image,
  FlatList,
  Text,
  Pressable,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import DefaultEmojis from "../data/DefaultImages";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Animated, {
  useAnimatedStyle,
  interpolate,
  useSharedValue,
  useAnimatedScrollHandler,
  runOnJS,
  FadeIn,
  FadeOut,
  clamp,
  Extrapolate,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
const _itemSize = width * 0.2;
const _spacing = 12;
const _itemTotalSize = _itemSize + _spacing;

function CarouselItem({ imageUri, index, scrollX }) {
  const styles = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollX.value,
      [index - 1.5, index - 1, index, index + 1, index + 1.5],
      [0.3, 0.6, 1, 0.6, 0.3],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          translateY: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [_itemSize / 3, 0, _itemSize / 3]
          ),
        },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={styles}>
      <Image
        source={imageUri}
        style={{
          width: _itemSize,
          height: _itemSize,
          borderRadius: _itemSize / 2,
        }}
      />
    </Animated.View>
  );
}

export default function CircularSlider({ changeIndex }) {
  const scrollX = useSharedValue(0);
  const flatListRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = clamp(
      event.contentOffset.x / _itemTotalSize,
      0,
      DefaultEmojis.length - 1
    );
    const newActiveIndex = Math.round(scrollX.value);

    if (activeIndex !== newActiveIndex) {
      runOnJS(setActiveIndex)(newActiveIndex);
    }
  });

  useEffect(() => {
    changeIndex(activeIndex);
  }, [activeIndex]);

  const onItemPress = (index) => {
    flatListRef.current?.scrollToOffset({
      offset: index * _itemTotalSize,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        entering={FadeIn.duration(500)}
        exiting={FadeOut.duration(500)}
        key={`image-${activeIndex}`}
        source={DefaultEmojis[activeIndex].file}
        style={{
          width: wp("60%"),
          height: wp("60%"),
          alignSelf: "center",
          marginBottom: wp("10%"),
        }}
      />
      <Animated.FlatList
        ref={flatListRef}
        style={{ flexGrow: 0, height: _itemSize * 2 }}
        contentContainerStyle={{
          paddingHorizontal: (width - _itemSize) / 2,
          gap: _spacing,
        }}
        data={DefaultEmojis}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => onItemPress(index)}>
            <CarouselItem
              imageUri={item.file}
              index={index}
              scrollX={scrollX}
            />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        snapToInterval={_itemTotalSize}
        decelerationRate="fast"
      />
    </View>
  );
}
