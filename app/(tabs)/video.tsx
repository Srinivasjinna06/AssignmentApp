import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const videoSource = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export default function VideoScreen() {
  const [isBuffering, setIsBuffering] = useState(false);
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.play();
  });

  // Listen for buffering states
  useEffect(() => {
    const subscription = player.addListener('statusChange', ({ status }) => {
      setIsBuffering(status === 'loading');
    });
    return () => subscription.remove();
  }, [player]);

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(800)} style={styles.videoCard}>
        <View style={styles.playerWrapper}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen={true} 
            nativeControls={true} 
            allowsPictureInPicture={true}
          />
          
          {/* Buffering Overlay */}
          {isBuffering && (
            <Animated.View exiting={FadeOut} style={styles.bufferOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.bufferText}>Buffering...</Text>
            </Animated.View>
          )}
        </View>
        
        <View style={styles.controlsDescription}>
          <Text style={styles.title}>HLS High-Bitrate Stream</Text>
          <Text style={styles.subtitle}>Adaptive bitrate enabled for smooth playback</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', padding: 16 },
  videoCard: { backgroundColor: '#fff', borderRadius: 28, overflow: 'hidden', elevation: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 20 },
  playerWrapper: { width: '100%', height: 250, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  video: { width: '100%', height: '100%' },
  bufferOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  bufferText: { color: '#fff', marginTop: 10, fontWeight: '600' },
  controlsDescription: { padding: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1b' },
  subtitle: { fontSize: 13, color: '#6b7280', marginTop: 4 }
});