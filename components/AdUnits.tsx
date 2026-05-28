import Script from 'next/script';

const nativeAdId = '70dbe9539ea44c04164ab0db875fc1ab';
const leaderboardAdKey = '4178face5750cd6d30f9ffd3df03e573';

export function NativeBannerAd() {
  return (
    <section className="ad-section container" aria-label="Sponsored">
      <div className="ad-card native-ad-slot">
        <span className="ad-label">Sponsored</span>
        <div id={`container-${nativeAdId}`} className="ad-native-container" />
      </div>
      <Script
        id="adsterra-native-banner"
        src={`https://pl29576367.effectivecpmnetwork.com/${nativeAdId}/invoke.js`}
        strategy="afterInteractive"
        async
        data-cfasync="false"
      />
    </section>
  );
}

export function LeaderboardAd() {
  return (
    <section className="ad-section container" aria-label="Advertisement">
      <div className="ad-card leaderboard-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="leaderboard-ad-frame" />
      </div>
      <Script
        id="adsterra-leaderboard-options"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var atOptions = {
              'key': '${leaderboardAdKey}',
              'format': 'iframe',
              'height': 90,
              'width': 728,
              'params': {}
            };
            window.atOptions = atOptions;
          `,
        }}
      />
      <Script
        id="adsterra-leaderboard-invoke"
        src={`https://www.highperformanceformat.com/${leaderboardAdKey}/invoke.js`}
        strategy="afterInteractive"
      />
    </section>
  );
}

export function HomeAdStack() {
  return (
    <>
      <LeaderboardAd />
      <NativeBannerAd />
    </>
  );
}
