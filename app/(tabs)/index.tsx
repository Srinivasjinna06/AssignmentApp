import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import React, { useState } from 'react';
import { ActivityIndicator, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message'; // Import Toast
import { WebView } from 'react-native-webview';

export default function WebViewScreen() {
  const [loading, setLoading] = useState(true);
  const targetUrl = 'https://expo.dev';

const handleAction = (title: string, message: string) => {
    // 1. Assignment Requirement: 2-5 second delay 
    const delay = Math.floor(Math.random() * 4) + 2; 

    // 2. Immediate Toast: User feedback for all platforms
    Toast.show({
      type: 'info',
      text1: 'Action Processed',
      text2: `Notification scheduled in ${delay}s...`,
      visibilityTime: 1500, 
      autoHide: true,
    });

    // 3. Trigger after requested delay 
    setTimeout(async () => {
      // Show Toast on ALL platforms (Web, Android, iOS)
      Toast.show({
        type: 'success',
        text1: title,
        text2: message,
        visibilityTime: 3000,
      });

      // Additionally trigger Native Local Notification for Mobile 
      if (Platform.OS !== 'web') {
        await Notifications.scheduleNotificationAsync({
          content: { title, body: message, sound: true },
          trigger: null, // Trigger immediately now that delay is over
        });
      }
    }, delay * 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.webWrapper}>
        {Platform.OS === 'web' ? (
          <View style={styles.webFallback}>
            <Ionicons name="globe-outline" size={64} color="#6366f1" />
            <Text style={styles.webFallbackText}>WebView is optimized for Mobile App</Text>
            <TouchableOpacity onPress={() => Linking.openURL(targetUrl)} style={styles.linkBtn}>
              <Text style={styles.linkBtnText}>Open Expo.dev in New Tab</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <WebView 
            source={{ uri: targetUrl }} 
            onLoadEnd={() => {
              setLoading(false);
              // Bonus: Toast when loaded
              Toast.show({
                type: 'success',
                text1: 'System',
                text2: 'WebView Content Loaded!',
              });
            }}
            style={styles.webview} 
          />
        )}
        {loading && Platform.OS !== 'web' && <ActivityIndicator style={styles.loader} size="large" color="#6366f1" />}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>Notification Triggers</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={[styles.customBtn, { backgroundColor: '#6366f1' }]} 
            onPress={() => handleAction("Alert 1", "Check the Video Player now!")}
          >
            <Ionicons name="notifications" size={18} color="white" />
            <Text style={styles.btnText}>Send Alert 1</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.customBtn, { backgroundColor: '#10b981' }]} 
            onPress={() => handleAction("Alert 2", "HLS Stream is ready to play!")}
          >
            <Ionicons name="flash" size={18} color="white" />
            <Text style={styles.btnText}>Send Alert 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f5' },
  webWrapper: { flex: 1, margin: 10, borderRadius: 20, overflow: 'hidden', backgroundColor: 'white', elevation: 2 },
  webview: { flex: 1 },
  webFallback: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  webFallbackText: { fontSize: 18, fontWeight: '600', color: '#3f3f46', textAlign: 'center', marginVertical: 20 },
  linkBtn: { backgroundColor: '#6366f1', padding: 15, borderRadius: 12 },
  linkBtnText: { color: 'white', fontWeight: 'bold' },
  loader: { position: 'absolute', top: '50%', left: '48%' },
  footer: { padding: 20, backgroundColor: 'white', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: "#000", shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 5 },
  footerTitle: { fontSize: 12, fontWeight: 'bold', color: '#a1a1aa', marginBottom: 15, textAlign: 'center', letterSpacing: 1.5 },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between' },
  customBtn: { flex: 0.48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 15, gap: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 14 }
});