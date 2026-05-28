import Script from 'next/script';

const nativeAdId = '70dbe9539ea44c04164ab0db875fc1ab';
const leaderboardAdKey = '4178face5750cd6d30f9ffd3df03e573';
const mediumRectangleAdKey = '117fee40031a86a731a68607690c02ec';
const mobileBannerAdKey = '37b31dd486d53c91ff7a055d7a4c1c07';

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

export function MediumRectangleAd() {
  return (
    <section className="ad-section container" aria-label="Advertisement">
      <div className="ad-card rectangle-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="rectangle-ad-frame" />
      </div>
      <Script
        id="adsterra-medium-rectangle-options"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var atOptions = {
              'key': '${mediumRectangleAdKey}',
              'format': 'iframe',
              'height': 250,
              'width': 300,
              'params': {}
            };
            window.atOptions = atOptions;
          `,
        }}
      />
      <Script
        id="adsterra-medium-rectangle-invoke"
        src={`https://www.highperformanceformat.com/${mediumRectangleAdKey}/invoke.js`}
        strategy="afterInteractive"
      />
    </section>
  );
}

export function MobileBannerAd() {
  return (
    <section className="ad-section container mobile-ad-section" aria-label="Advertisement">
      <div className="ad-card mobile-banner-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="mobile-banner-ad-frame" />
      </div>
      <Script
        id="adsterra-mobile-banner-options"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var atOptions = {
              'key': '${mobileBannerAdKey}',
              'format': 'iframe',
              'height': 50,
              'width': 320,
              'params': {}
            };
            window.atOptions = atOptions;
          `,
        }}
      />
      <Script
        id="adsterra-mobile-banner-invoke"
        src={`https://www.highperformanceformat.com/${mobileBannerAdKey}/invoke.js`}
        strategy="afterInteractive"
      />
    </section>
  );
}

export function HomeAdStack() {
  return (
    <>
      <LeaderboardAd />
      <div className="ad-pair container">
        <div className="ad-pair-item"><MediumRectangleAd /></div>
        <div className="ad-pair-item"><MobileBannerAd /></div>
      </div>
      <NativeBannerAd />
    </>
  );
}
