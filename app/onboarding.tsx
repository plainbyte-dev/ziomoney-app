import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientButton } from '@/components/gradient-button';
import { onboardingSlides } from '@/components/onboarding/onboarding-data';
import { OnboardingDots } from '@/components/onboarding/onboarding-dots';
import { OnboardingLoginPrompt } from '@/components/onboarding/onboarding-login-prompt';
import { OnboardingSlide } from '@/components/onboarding/onboarding-slide';
import { OnboardingText } from '@/components/onboarding/onboarding-text';

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const isProgrammaticScroll = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboardingSlides.length - 1;
  const activeSlide = onboardingSlides[activeIndex];

  const finishOnboarding = () => router.replace('/(tabs)');

  const handleLogin = () => router.push('/login');

  const goToSlide = (index: number) => {
    isProgrammaticScroll.current = true;
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setActiveIndex(index);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isProgrammaticScroll.current) return;
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const handleScrollEnd = () => {
    isProgrammaticScroll.current = false;
  };

  const handleNext = () => {
    if (isLastSlide) {
      router.push('/register');
    } else {
      goToSlide(activeIndex + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Image
          source={require('@/assets/images/logo/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {!isLastSlide && (
          <Pressable onPress={finishOnboarding} hitSlop={12}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        )}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        style={styles.scroll}>
        {onboardingSlides.map((slide) => (
          <OnboardingSlide key={slide.title} image={slide.image} />
        ))}
      </ScrollView>

      <View style={styles.dotsWrapper}>
        <OnboardingDots count={onboardingSlides.length} activeIndex={activeIndex} />
      </View>

      <OnboardingText title={activeSlide.title} subtitle={activeSlide.subtitle} />

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <GradientButton label={isLastSlide ? 'Get Started' : 'Next →'} onPress={handleNext} />
        {isLastSlide && <OnboardingLoginPrompt onPress={handleLogin} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  logo: {
    width: 110,
    height: 36,
  },
  skip: {
    fontSize: 15,
    color: '#7A8894',
  },
  scroll: {
    flex: 1,
  },
  dotsWrapper: {
    marginBottom: 24,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 24,
    paddingTop: 32,
  },
});
