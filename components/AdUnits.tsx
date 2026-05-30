"use client";

const nativeAdId = '70dbe9539ea44c04164ab0db875fc1ab';
const leaderboardAdKey = '4178face5750cd6d30f9ffd3df03e573';
const mediumRectangleAdKey = '117fee40031a86a731a68607690c02ec';
const mobileBannerAdKey = '37b31dd486d53c91ff7a055d7a4c1c07';

type IframeAdProps = {
  id: string;
  keyValue: string;
  width: number;
  height: number;
};

function iframeAdSrcDoc({ keyValue, width, height }: IframeAdProps) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=${width}, initial-scale=1" />
  <style>
    html, body { margin: 0; padding: 0; width: ${width}px; min-height: ${height}px; overflow: hidden; background: transparent; }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key': '${keyValue}',
      'format': 'iframe',
      'height': ${height},
      'width': ${width},
      'params': {}
    };
  </script>
  <script type="text/javascript" src="https://www.highperformanceformat.com/${keyValue}/invoke.js"></script>
</body>
</html>`;
}

function nativeAdSrcDoc() {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    html, body { margin: 0; padding: 0; width: 100%; min-height: 150px; overflow: hidden; background: transparent; }
    #container-${nativeAdId} { width: 100%; min-height: 150px; }
  </style>
</head>
<body>
  <script async="async" data-cfasync="false" src="https://pl29576367.effectivecpmnetwork.com/${nativeAdId}/invoke.js"></script>
  <div id="container-${nativeAdId}"></div>
</body>
</html>`;
}

function AdsterraFrame({ id, title, srcDoc, width, height, className }: { id: string; title: string; srcDoc: string; width: number | string; height: number; className?: string }) {
  return (
    <iframe
      id={id}
      title={title}
      className={className}
      srcDoc={srcDoc}
      width={width}
      height={height}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, display: 'block', width, height }}
    />
  );
}

function IframeAd(props: IframeAdProps) {
  return (
    <AdsterraFrame
      id={`${props.id}-frame`}
      title="Advertisement"
      srcDoc={iframeAdSrcDoc(props)}
      width={props.width}
      height={props.height}
      className="adsterra-frame"
    />
  );
}

function NativeAd() {
  return (
    <AdsterraFrame
      id="adsterra-native-banner-frame"
      title="Sponsored content"
      srcDoc={nativeAdSrcDoc()}
      width="100%"
      height={150}
      className="adsterra-native-frame"
    />
  );
}

export function NativeBannerAd() {
  return (
    <section className="ad-section container" aria-label="Sponsored">
      <div className="ad-card native-ad-slot">
        <span className="ad-label">Sponsored</span>
        <div className="ad-native-container"><NativeAd /></div>
      </div>
    </section>
  );
}

export function LeaderboardAd() {
  return (
    <section className="ad-section container" aria-label="Advertisement">
      <div className="ad-card leaderboard-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="leaderboard-ad-frame">
          <IframeAd id="adsterra-leaderboard" keyValue={leaderboardAdKey} height={90} width={728} />
        </div>
      </div>
    </section>
  );
}

export function MediumRectangleAd() {
  return (
    <section className="ad-section container" aria-label="Advertisement">
      <div className="ad-card rectangle-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="rectangle-ad-frame">
          <IframeAd id="adsterra-medium-rectangle" keyValue={mediumRectangleAdKey} height={250} width={300} />
        </div>
      </div>
    </section>
  );
}

export function MobileBannerAd() {
  return (
    <section className="ad-section container mobile-ad-section" aria-label="Advertisement">
      <div className="ad-card mobile-banner-ad-slot">
        <span className="ad-label">Advertisement</span>
        <div className="mobile-banner-ad-frame">
          <IframeAd id="adsterra-mobile-banner" keyValue={mobileBannerAdKey} height={50} width={320} />
        </div>
      </div>
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
