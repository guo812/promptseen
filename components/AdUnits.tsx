"use client";

import { useEffect, useRef } from 'react';

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

function IframeAd({ id, keyValue, width, height }: IframeAdProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = ref.current;
    if (!slot || slot.dataset.loaded === 'true') return;
    slot.dataset.loaded = 'true';
    slot.innerHTML = '';

    const config = document.createElement('script');
    config.text = `window.atOptions = { key: '${keyValue}', format: 'iframe', height: ${height}, width: ${width}, params: {} };`;

    const invoke = document.createElement('script');
    invoke.id = `${id}-invoke`;
    invoke.src = `https://www.highperformanceformat.com/${keyValue}/invoke.js`;
    invoke.async = false;

    slot.append(config, invoke);
  }, [height, id, keyValue, width]);

  return <div ref={ref} className="ad-script-mount" style={{ minWidth: width, minHeight: height }} />;
}

function NativeAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slot = ref.current;
    if (!slot || slot.dataset.loaded === 'true') return;
    slot.dataset.loaded = 'true';
    slot.innerHTML = '';

    const container = document.createElement('div');
    container.id = `container-${nativeAdId}`;

    const invoke = document.createElement('script');
    invoke.id = 'adsterra-native-banner-invoke';
    invoke.src = `https://pl29576367.effectivecpmnetwork.com/${nativeAdId}/invoke.js`;
    invoke.async = true;
    invoke.dataset.cfasync = 'false';

    // Adsterra native widgets look for the stable container id after their loader runs.
    slot.append(invoke, container);
  }, []);

  return <div ref={ref} className="ad-native-container" />;
}

export function NativeBannerAd() {
  return (
    <section className="ad-section container" aria-label="Sponsored">
      <div className="ad-card native-ad-slot">
        <span className="ad-label">Sponsored</span>
        <NativeAd />
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
