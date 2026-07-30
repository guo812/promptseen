export const site = {
  name: 'PromptSeen Online',
  domain: 'https://promptseen.online',
  contactEmail: 'zjjhgtw@gmail.com',
  description:
    'Find Prompt Seen style AI photo prompts for Gemini, ChatGPT and Instagram. Copy cricket, Bollywood, Eid, Ramadan and South Asian creator ideas.',
  clarityId: 'x0vmlezgsz',
  gaId: 'G-HJ16WBEHPL',
  gscVerification: '',
} as const;

export const mainRoutes = [
  { href: '/', label: 'Home' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/categories', label: 'Categories' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/generate', label: 'Generate' },
  { href: '/account', label: 'Account' },
] as const;

export type Prompt = {
  title: string;
  market: string;
  tag: string;
  tool: 'Gemini' | 'ChatGPT' | 'Dreamina' | 'Any AI image tool';
  useCase: string;
  prompt: string;
  image: string;
  imageAlt: string;
};

export const prompts: Prompt[] = [
  {
    title: 'Prompt Seen Cricket Stadium DP',
    market: 'India / Pakistan',
    tag: 'Sports',
    tool: 'Gemini',
    useCase: 'Reels profile photo',
    prompt:
      'Prompt Seen style Gemini photo editing prompt: create a cinematic AI portrait of me standing under stadium floodlights, wearing a stylish cricket jersey, dramatic rim light, shallow depth of field, rain particles, confident expression, ultra-realistic 4K Instagram DP edit.',
    image: '/assets/prompt-scenes/cricket-stadium-india-pakistan.png',
    imageAlt: 'Indian and Pakistani cricket creator portrait concept under stadium floodlights for Instagram Reels',
  },
  {
    title: 'Eid Moonlight Couple Edit',
    market: 'Arabic / Bangladesh',
    tag: 'Festival',
    tool: 'ChatGPT',
    useCase: 'Couple photo',
    prompt:
      'Transform this couple photo into an elegant Eid moonlight portrait, warm lanterns, modest festive outfits, glowing crescent moon in the background, cinematic bokeh, soft gold highlights, realistic skin texture.',
    image: '/assets/prompt-scenes/eid-couple-bangladesh-arabic.png',
    imageAlt: 'Bangladesh and Arabic Eid couple moonlight portrait prompt with lanterns for Instagram posts',
  },
  {
    title: 'Bollywood Retro Rain Poster',
    market: 'India / Nepal',
    tag: 'Cinematic',
    tool: 'Gemini',
    useCase: 'Poster edit',
    prompt:
      'Prompt Seen style Gemini prompt: turn my photo into a Bollywood-style rainy retro movie poster, neon street reflections, expressive pose, dramatic teal and amber lighting, 90s film grain, poster composition, high-fashion Instagram look.',
    image: '/assets/prompt-scenes/bollywood-rain-india-nepal.png',
    imageAlt: 'India and Nepal Bollywood rain movie poster AI prompt scene for cinematic Instagram edits',
  },
  {
    title: 'Ramadan Street Portrait',
    market: 'Arabic',
    tag: 'Ramadan',
    tool: 'Any AI image tool',
    useCase: 'Night portrait',
    prompt:
      'Create a respectful Ramadan night street portrait with glowing market lights, elegant traditional styling, soft cinematic shadows, realistic face preservation, warm lantern background, premium Instagram profile photo.',
    image: '/assets/prompt-scenes/ramadan-street-arabic.png',
    imageAlt: 'Arabic Ramadan night street portrait concept with warm market lights for profile photos',
  },
  {
    title: 'South Asian Graduation DP',
    market: 'India / Sri Lanka',
    tag: 'Profile',
    tool: 'ChatGPT',
    useCase: 'Display picture',
    prompt:
      'Generate a clean premium graduation display picture from my photo, modern campus background, confident smile, soft daylight, professional cinematic color grade, crisp details, realistic identity preservation.',
    image: '/assets/prompt-scenes/graduation-south-asia.png',
    imageAlt: 'India and Sri Lanka graduation display picture AI prompt scene with campus daylight',
  },
  {
    title: 'Dark Pinterest Boys Fit Check',
    market: 'South Asia',
    tag: 'Boys',
    tool: 'Gemini',
    useCase: 'Shorts cover',
    prompt:
      'Create a dark Pinterest fit-check edit for a young South Asian creator: black streetwear, clean urban corridor, cinematic smoke, cool cyan edge lighting, sharp realistic face preservation, editorial 4:5 Instagram composition, premium magazine mood.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'South Asian viral attitude boys neon street edit concept for Instagram Reels cover',
  },
  {
    title: 'Dreamina Arabic Luxury Portrait',
    market: 'Gulf / Arabic',
    tag: 'Luxury',
    tool: 'Dreamina',
    useCase: 'Profile photo',
    prompt:
      'Create a luxury editorial profile portrait with warm desert sunset tones, premium fabric texture, soft cinematic highlights, clean background separation, realistic face details, confident creator look.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Gulf Arabic luxury editorial profile portrait prompt with desert sunset tones',
  },
  {
    title: 'Festival Family Photo Upgrade',
    market: 'South Asia',
    tag: 'Family',
    tool: 'Any AI image tool',
    useCase: 'Festival post',
    prompt:
      'Enhance this family photo into a polished festival celebration portrait, warm lights, tasteful traditional outfits, natural smiles, realistic skin, balanced composition, social media-ready color grade.',
    image: '/assets/prompt-scenes/festival-family-south-asia.png',
    imageAlt: 'South Asian festival family portrait upgrade prompt with warm lights for Instagram posts',
  },
  {
    title: 'Gemini Clean Studio Portrait',
    market: 'Global',
    tag: 'Gemini',
    tool: 'Gemini',
    useCase: 'Profile photo',
    prompt: 'Use Gemini to create a clean studio portrait from my photo, preserve my facial identity, natural skin texture, crisp eyes, soft neutral background, flattering key light, confident creator expression, 1:1 profile crop, no cartoon effect.',
    image: '/assets/prompt-scenes/graduation-south-asia.png',
    imageAlt: 'Clean Gemini studio profile portrait prompt concept for creators',
  },
  {
    title: 'Gemini Golden Hour Creator Edit',
    market: 'Global',
    tag: 'Gemini',
    tool: 'Gemini',
    useCase: 'Instagram feed',
    prompt: 'Transform my photo in Gemini into a warm golden-hour creator portrait, preserved identity, soft backlight, natural skin tones, stylish casual outfit, shallow depth of field, premium 4:5 Instagram composition.',
    image: '/assets/prompt-scenes/festival-family-south-asia.png',
    imageAlt: 'Golden hour Gemini creator portrait prompt for Instagram feed',
  },
  {
    title: 'ChatGPT Founder Headshot',
    market: 'Global',
    tag: 'ChatGPT',
    tool: 'ChatGPT',
    useCase: 'Personal brand',
    prompt: 'Create a polished founder headshot from this image, modern studio or office background, realistic face preservation, natural skin texture, confident friendly expression, clean lighting, subtle negative space for a launch headline.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'ChatGPT founder headshot prompt with professional studio background',
  },
  {
    title: 'ChatGPT Casual Street Portrait',
    market: 'Global',
    tag: 'ChatGPT',
    tool: 'ChatGPT',
    useCase: 'Creator post',
    prompt: 'Turn this photo into a realistic casual street portrait, preserve my face and expression, soft city background blur, stylish everyday outfit, natural skin, cinematic but not over-edited lighting, 4:5 Instagram crop.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'ChatGPT casual street creator portrait prompt for Instagram posts',
  },
  {
    title: 'Instagram Reels Hook Cover',
    market: 'Global',
    tag: 'Instagram',
    tool: 'Gemini',
    useCase: 'Reels cover',
    prompt: 'Create a high-contrast Instagram Reels cover from my portrait, preserved face, bold color background, sharp eyes, clean text-safe area at the top, energetic creator mood, 9:16 vertical format, no text added.',
    image: '/assets/prompt-scenes/bollywood-rain-india-nepal.png',
    imageAlt: 'Instagram Reels cover prompt with bold color background and text safe area',
  },
  {
    title: 'Instagram Carousel First Slide',
    market: 'Global',
    tag: 'Instagram',
    tool: 'ChatGPT',
    useCase: 'Carousel cover',
    prompt: 'Design a premium Instagram carousel first-slide portrait from this photo, realistic identity preservation, editorial lighting, clean negative space on the right, 1:1 square composition, magazine-like creator branding, no fake text.',
    image: '/assets/prompt-scenes/cricket-stadium-india-pakistan.png',
    imageAlt: 'Instagram carousel cover prompt with editorial portrait and negative space',
  },
  {
    title: 'Trending Neon Rain Edit',
    market: 'Global',
    tag: 'Trending',
    tool: 'Gemini',
    useCase: 'Viral edit',
    prompt: 'Transform this image into a trending neon rain portrait, wet street reflections, cinematic teal and amber lighting, preserved facial identity, stylish outfit, film grain, dramatic but realistic mood, 4:5 vertical crop.',
    image: '/assets/prompt-scenes/bollywood-rain-india-nepal.png',
    imageAlt: 'Trending neon rain AI photo prompt for viral creator edits',
  },
  {
    title: 'Trending Soft Film DP',
    market: 'Global',
    tag: 'Trending',
    tool: 'ChatGPT',
    useCase: 'Profile refresh',
    prompt: 'Upgrade my portrait into a trending soft-film display picture, gentle window light, realistic skin texture, preserved eyes and face shape, muted warm color grade, clean 1:1 crop, subtle film grain, natural expression.',
    image: '/assets/prompt-scenes/graduation-south-asia.png',
    imageAlt: 'Trending soft film profile photo prompt with natural window light',
  },
  {
    title: 'Profile Photo Minimal Black Background',
    market: 'Global',
    tag: 'Profile',
    tool: 'ChatGPT',
    useCase: 'DP upgrade',
    prompt: 'Create a minimal black-background profile photo from my portrait, preserve identity, sharp eyes, soft rim light, natural skin texture, professional but approachable expression, clean 1:1 crop, no heavy retouching.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Minimal black background profile photo prompt for creators',
  },
  {
    title: 'Profile Photo Warm Creator Bio',
    market: 'Global',
    tag: 'Profile',
    tool: 'Gemini',
    useCase: 'Bio image',
    prompt: 'Enhance this portrait into a warm creator bio photo, preserved face, soft daylight, clean blurred background, natural skin, relaxed confidence, modern personal brand style, square profile crop and 4:5 feed crop friendly.',
    image: '/assets/prompt-scenes/festival-family-south-asia.png',
    imageAlt: 'Warm creator bio profile photo prompt for personal branding',
  },
  {
    title: 'Cinematic Rooftop Portrait',
    market: 'Global',
    tag: 'Cinematic',
    tool: 'Gemini',
    useCase: 'Poster edit',
    prompt: 'Create a cinematic rooftop portrait from my photo, dusk skyline background, soft rim light, realistic face preservation, stylish jacket, shallow depth of field, premium film still mood, no fake text or logos.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'Cinematic rooftop portrait prompt for poster style creator edits',
  },
  {
    title: 'Cinematic Window Light Portrait',
    market: 'Global',
    tag: 'Cinematic',
    tool: 'ChatGPT',
    useCase: 'Editorial portrait',
    prompt: 'Turn this photo into a cinematic window-light portrait, soft shadows, preserved facial identity, natural skin texture, elegant outfit, shallow depth of field, filmic contrast, quiet premium editorial mood.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Cinematic window light portrait prompt for editorial AI photos',
  },
  {
    title: 'Couple Cafe Date Edit',
    market: 'Global',
    tag: 'Couple',
    tool: 'ChatGPT',
    useCase: 'Couple post',
    prompt: 'Transform this couple photo into a realistic cozy cafe date portrait, preserve both faces, warm ambient lights, natural pose, soft background blur, tasteful outfits, romantic but casual Instagram 4:5 composition.',
    image: '/assets/prompt-scenes/eid-couple-bangladesh-arabic.png',
    imageAlt: 'Couple cafe date AI photo prompt for romantic Instagram posts',
  },
  {
    title: 'Couple Travel Memory Poster',
    market: 'Global',
    tag: 'Couple',
    tool: 'Gemini',
    useCase: 'Travel post',
    prompt: 'Create a realistic couple travel memory poster from this image, preserve both identities, scenic background, warm sunrise color, stylish casual outfits, natural smiles, depth of field, premium 4:5 feed composition.',
    image: '/assets/prompt-scenes/eid-couple-bangladesh-arabic.png',
    imageAlt: 'Couple travel memory prompt for Instagram photo edits',
  },
  {
    title: 'Festival Diya Portrait',
    market: 'South Asia',
    tag: 'Festival',
    tool: 'Gemini',
    useCase: 'Festival greeting',
    prompt: 'Create a realistic festival portrait with warm diya glow, tasteful traditional outfit, preserved facial identity, natural skin, marigold accents, soft golden bokeh, family-safe celebration mood, 4:5 Instagram crop.',
    image: '/assets/prompt-scenes/festival-family-south-asia.png',
    imageAlt: 'Festival diya portrait AI prompt for South Asian creator greetings',
  },
  {
    title: 'Festival Lantern Profile',
    market: 'Arabic / South Asia',
    tag: 'Festival',
    tool: 'ChatGPT',
    useCase: 'Profile post',
    prompt: 'Enhance this portrait into a respectful lantern-lit festival profile photo, warm lights, elegant modest outfit, preserved face, natural skin texture, soft bokeh, premium creator DP composition, no exaggerated costume.',
    image: '/assets/prompt-scenes/ramadan-street-arabic.png',
    imageAlt: 'Lantern-lit festival profile prompt for Arabic and South Asian creators',
  },
  {
    title: 'South Asia Campus Creator',
    market: 'South Asia',
    tag: 'South Asia',
    tool: 'Gemini',
    useCase: 'Student profile',
    prompt: 'Generate a South Asian campus creator portrait from this photo, preserved identity, modern college walkway, soft daylight, clean outfit, confident natural smile, realistic skin, 4:5 Instagram and 1:1 DP friendly crop.',
    image: '/assets/prompt-scenes/graduation-south-asia.png',
    imageAlt: 'South Asian campus creator portrait prompt for student profile photos',
  },
  {
    title: 'South Asia Street Market Edit',
    market: 'South Asia',
    tag: 'South Asia',
    tool: 'ChatGPT',
    useCase: 'Lifestyle post',
    prompt: 'Transform this portrait into a South Asian street market creator edit, warm evening lights, tasteful local atmosphere, preserved face, stylish casual or traditional outfit, natural skin, cinematic depth, no brand logos.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'South Asian street market creator photo prompt for lifestyle posts',
  },
  {
    title: 'Arabic Luxury Studio DP',
    market: 'Arabic',
    tag: 'Arabic',
    tool: 'Dreamina',
    useCase: 'Luxury profile',
    prompt: 'Create a refined Arabic luxury studio profile portrait, preserved identity, warm desert-inspired color palette, premium fabric texture, soft cinematic highlights, modest elegant styling, clean background, realistic skin.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Arabic luxury studio profile prompt with warm desert-inspired colors',
  },
  {
    title: 'Arabic Night Market Portrait',
    market: 'Arabic',
    tag: 'Arabic',
    tool: 'Gemini',
    useCase: 'Night portrait',
    prompt: 'Transform this portrait into a tasteful Arabic night market photo, warm lantern glow, elegant outfit, preserved face, realistic skin texture, soft background bokeh, premium Instagram 4:5 crop, no religious claims.',
    image: '/assets/prompt-scenes/ramadan-street-arabic.png',
    imageAlt: 'Arabic night market AI photo prompt with warm lantern glow',
  },
  {
    title: 'Dreamina Premium Portrait Pack',
    market: 'Global',
    tag: 'Dreamina',
    tool: 'Dreamina',
    useCase: 'Creator portrait',
    prompt: 'Create a premium Dreamina-style creator portrait, preserved face, high-end fabric detail, soft cinematic highlights, clean background separation, confident expression, realistic skin, editorial 4:5 Instagram composition.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Dreamina premium creator portrait prompt for editorial AI photo edits',
  },
  {
    title: 'Dreamina Fashion Reel Cover',
    market: 'Global',
    tag: 'Dreamina',
    tool: 'Dreamina',
    useCase: 'Reels cover',
    prompt: 'Generate a Dreamina-style fashion Reels cover from my photo, preserved identity, dramatic studio light, sharp outfit details, bold background, 9:16 vertical composition, clean space for title, premium creator look.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'Dreamina fashion Reels cover prompt with vertical creator composition',
  }
];

export const categoryGroups: Array<{ title: string; items: Array<[string, string]> }> = [
  {
    title: 'By AI tool',
    items: [
      ['Gemini Prompts', '/gemini-prompts'],
      ['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'],
      ['Dreamina Prompts', '/dreamina-prompts'],
      ['Instagram Prompts', '/instagram-prompts'],
    ],
  },
  {
    title: 'By market',
    items: [
      ['India AI Photo Prompts', '/india-ai-photo-prompts'],
      ['Nepal AI Photo Prompts', '/nepal-ai-photo-prompts'],
      ['Bangladesh AI Photo Prompts', '/bangladesh-ai-photo-prompts'],
      ['Pakistan AI Photo Prompts', '/pakistan-ai-photo-prompts'],
      ['Sri Lanka AI Photo Prompts', '/sri-lanka-ai-photo-prompts'],
      ['Arabic AI Photo Prompts', '/arabic-ai-photo-prompts'],
    ],
  },
  {
    title: 'By creator job',
    items: [
      ['Couple AI Photo Prompts', '/couple-ai-photo-prompts'],
      ['Profile Photo Prompts', '/profile-photo-prompts'],
      ['Cinematic AI Photo Prompts', '/cinematic-ai-photo-prompts'],
      ['Boys AI Photo Prompts', '/boys-ai-photo-prompts'],
      ['Girls AI Photo Prompts', '/girls-ai-photo-prompts'],
      ['Trending Prompts', '/trending-prompts'],
    ],
  },
  {
    title: 'By festival / culture',
    items: [
      ['Cricket AI Photo Prompts', '/cricket-ai-photo-prompts'],
      ['Bollywood AI Photo Prompts', '/bollywood-ai-photo-prompts'],
      ['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'],
      ['Eid AI Photo Prompts', '/eid-ai-photo-prompts'],
      ['Ramadan AI Photo Prompts', '/ramadan-ai-photo-prompts'],
    ],
  },
];

export const categoryLinks: ReadonlyArray<readonly [string, string]> = categoryGroups.reduce<ReadonlyArray<readonly [string, string]>>(
  (items, group) => [...items, ...group.items],
  [],
);

export const pricing = [
  { name: 'Free', price: '$0', desc: 'Copy prompts for free and claim 1 free image generation after sign-in.', cta: 'Sign in for Free Plan', href: '/app/sign-in?plan=free&next=/generate', items: ['Unlimited prompt browsing', 'Unlimited free prompt copying', '1 free AI photo generation after sign-in', 'Selfie upload for the free generation'] },
  { name: 'Starter', price: '$4.99', desc: 'Starter pack for testing more creator looks.', cta: 'Buy Starter Credits', href: '/app/sign-in?plan=starter&next=/pricing', items: ['60 generation credits', 'About 6 standard AI photo generations', 'Gemini / ChatGPT prompt styles', 'Standard downloads'] },
  { name: 'Pro', price: '$9.99', desc: 'For creators posting new edits every week.', cta: 'Buy Pro Credits', href: '/app/sign-in?plan=pro&next=/pricing', items: ['160 generation credits', 'About 16 standard AI photo generations', 'HD-ready prompt workflows', 'Priority trend packs'] },
  { name: 'Creator', price: '$19.99', desc: 'For agencies and prompt pages running larger batches.', cta: 'Buy Creator Credits', href: '/app/sign-in?plan=creator&next=/pricing', items: ['420 generation credits', 'About 42 standard AI photo generations', 'Bulk prompt planning', 'Priority support'] },
] as const;

export const faqs = [
  ['What is PromptSeen Online?', 'PromptSeen Online is an independent prompt discovery and AI photo workflow site for creators who want ready-to-copy photo prompts for Instagram, Reels, Shorts, and profile pictures.'],
  ['Is PromptSeen Online free to use?', 'You can browse and copy prompt ideas for free. Personalized image generation uses login and credits.'],
  ['Can I use these prompts in Gemini or ChatGPT?', 'Yes. The prompts are written to be adapted for common AI image workflows, including Gemini and ChatGPT image tools.'],
  ['Do I need to upload a photo?', 'Only if you want a personalized AI photo result. You can still browse and copy prompts without uploading.'],
  ['Are my uploaded photos stored?', 'Uploaded photos should only be processed for the requested generation workflow according to the published privacy policy and production storage settings.'],
  ['Can I use generated images on Instagram?', 'Usually yes for personal creator content, but you are responsible for rights, likeness, platform rules, and local regulations.'],
  ['How do credits work?', 'Credits are used for generation actions, not for browsing or copying prompt ideas.'],
  ['Is PromptSeen Online the official Prompt Seen website?', 'No. PromptSeen Online is an independent prompt resource and does not claim official affiliation with any third-party brand or account.'],
] as const;

export const legalPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    updated: 'June 2026',
    body: [
      'PromptSeen Online collects information needed to operate the site, provide account features, process AI photo generation requests, improve product quality, and respond to support requests.',
      'If photo upload and AI generation features are enabled, uploaded photos are used to process the requested generation workflow. Do not upload photos you do not have permission to use, sensitive identity documents, private images, or content involving minors without appropriate rights and consent.',
      'Analytics may include privacy-conscious pageview and product event measurement such as prompt copy, filter selection, sign-in clicks, and pricing clicks. Configured analytics providers may include Microsoft Clarity and other tools listed in the site configuration.',
      'Payment processing is handled by the payment provider. PromptSeen Online should not expose payment secrets in frontend code and should only store billing references required for credits, subscriptions, support, and compliance.',
      'Contact zjjhgtw@gmail.com for privacy, deletion, or support requests.',
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    updated: 'June 2026',
    body: [
      'PromptSeen Online provides prompt discovery and AI photo workflow assistance for creator content. It is an independent resource and does not claim official affiliation with any third-party Prompt Seen account, AI platform, or social network.',
      'You are responsible for the content you upload, the prompts you use, and how you publish generated outputs. Do not use the service to impersonate others, violate privacy, create deceptive content, or infringe intellectual property rights.',
      'AI results may vary by model, image quality, prompt choice, and provider availability. PromptSeen Online does not guarantee viral performance, copyright-free outputs, platform approval, or unlimited generation.',
      'Paid credits and subscriptions, if enabled, are subject to the final checkout terms, refund policy, and payment provider rules shown before purchase.',
      'Contact zjjhgtw@gmail.com for support or legal questions.',
    ],
  },
} as const;

export const extraLegalPages = {
  'cookie-policy': {
    title: 'Cookie Policy',
    updated: 'June 2026',
    body: ['PromptSeen Online may use essential cookies for product functionality and optional analytics cookies to improve the service.', 'Where required, analytics and marketing cookies should be enabled only after appropriate notice or consent.', 'You can control cookies through your browser settings.'],
  },
  'refund-policy': {
    title: 'Refund Policy',
    updated: 'June 2026',
    body: ['If paid credits or subscriptions are enabled, refunds follow the published checkout terms and payment provider rules.', 'Contact support with your account email, payment reference, and issue details.'],
  },
  'ai-content-policy': {
    title: 'AI Content Policy',
    updated: 'June 2026',
    body: ['Use AI generation responsibly. Do not create sexual, hateful, violent, deceptive, or non-consensual content.', 'Do not upload or generate content involving private individuals without permission, and do not misrepresent AI-generated images as real events.'],
  },
  contact: {
    title: 'Contact',
    updated: 'June 2026',
    body: ['For product questions, partnerships, privacy requests, deletion requests, refunds, or support, contact zjjhgtw@gmail.com.', 'We aim to review support and privacy requests within a reasonable timeframe. Include your account email and payment reference when relevant.'],
  },
} as const;
