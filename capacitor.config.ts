import type { CapacitorConfig } from '@capacitor/cli'

/**
 * Google Play (ve ileride iOS) kabuğu.
 *
 * Uygulama canlı siteyi açar (server.url): API route'lar sunucuda çalıştığı için statik
 * export mümkün değil; ayrıca her deploy uygulamaya mağaza güncellemesi gerekmeden yansır.
 * Aynı origin olduğu için httpOnly oturum çerezi olduğu gibi çalışır.
 *
 * webDir yalnızca sunucuya ulaşılamazsa gösterilen çevrimdışı sayfasını içerir.
 * Yerel geliştirmede: CAP_SERVER_URL=http://<bilgisayar-ip>:3100 npx cap run android
 *
 * DİKKAT: appId Play Store'a ilk yüklemeden sonra değiştirilemez.
 */
const serverUrl = process.env.CAP_SERVER_URL || 'https://whodat.burakkutlu.com'

const config: CapacitorConfig = {
  appId: 'com.burakkutlu.kimbu',
  appName: 'KimBu',
  webDir: 'mobile/www',
  server: {
    url: serverUrl,
    // Yerel geliştirmede http sunucuya bağlanabilmek için; üretimde https.
    cleartext: serverUrl.startsWith('http://'),
    errorPath: 'index.html',
  },
  android: {
    // Mağaza sürümünde WebView hata ayıklaması kapalı.
    webContentsDebuggingEnabled: Boolean(process.env.CAP_SERVER_URL),
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: false,
      backgroundColor: '#F5F0E8',
      showSpinner: false,
    },
    StatusBar: {
      backgroundColor: '#F5F0E8',
      style: 'LIGHT',
      overlaysWebView: false,
    },
  },
}

export default config
