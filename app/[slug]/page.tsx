import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CopyButton } from '@/components/CopyButton';
import { PromptCard } from '@/components/PromptCard';
import { PageShell, SectionHeader } from '@/components/SiteShell';
import { categoryLinks, extraLegalPages, prompts, site } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };
export const dynamic = 'force-dynamic';
type ResourcePrompt = {
  title: string;
  scenario: string;
  tool: 'Gemini' | 'ChatGPT' | 'Dreamina';
  prompt: string;
  tip: string;
};
type ResourcePage = {
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  intent: string;
  prompts: ResourcePrompt[];
  tutorial: string[];
  faq: Array<[string, string]>;
  links: Array<[string, string]>;
};

const noindexSlugs = new Set([
  'india-ai-photo-prompts',
  'nepal-ai-photo-prompts',
  'bangladesh-ai-photo-prompts',
  'pakistan-ai-photo-prompts',
  'sri-lanka-ai-photo-prompts',
  'arabic-ai-photo-prompts',
]);

const resourcePages: Record<string, ResourcePage> = {
  'diwali-ai-photo-prompts': {
    title: 'Diwali AI Photo Prompts for Realistic Festival Portraits, Couple Edits, and Instagram Posts',
    metaTitle: 'Diwali AI Photo Prompts for Gemini, ChatGPT & Dreamina',
    description: 'Copy detailed Diwali AI photo prompts for realistic festival portraits, couple edits, family photos, saree looks, diya scenes, and Instagram-ready Deepavali posts.',
    intro: 'Diwali photo edits work best when the prompt is specific about light, clothing, background, camera mood, and face preservation. This resource gives creators ready-to-copy Diwali AI photo prompts for Gemini, ChatGPT image tools, and Dreamina. Use them for Instagram profile photos, festive couple posts, family portraits, brand greetings, and short-form content covers. Each prompt avoids vague words like “make it beautiful” and instead gives the model a complete visual brief: diya glow, rangoli colors, silk textures, warm bokeh, respectful festive styling, and realistic skin detail.',
    intent: 'Use this page when you want a Diwali or Deepavali edit that still looks like the original person, not a generic AI avatar. Upload a clear portrait, keep the face visible, and choose the prompt closest to your scene.',
    prompts: [
      { title: 'Diya Glow Portrait', scenario: 'Instagram DP or profile update for Diwali week', tool: 'Gemini', prompt: 'Transform my portrait into a realistic Diwali evening profile photo, warm diya light on both sides, subtle rangoli colors in the background, elegant festive kurta or saree styling, natural skin texture, preserved facial identity, cinematic 85mm lens, soft golden bokeh, clean Instagram 4:5 composition.', tip: 'Use a front-facing selfie with simple background so the diya lighting does not distort the face.' },
      { title: 'Luxury Saree Editorial', scenario: 'Fashion creator post or festive lookbook cover', tool: 'ChatGPT', prompt: 'Create a premium Diwali fashion editorial from this photo: rich silk saree texture, tasteful gold jewelry, palace balcony at night, rows of diyas, warm amber highlights, soft shadows, realistic face preservation, magazine-style composition, high detail fabric, elegant confident pose.', tip: 'Mention the saree color you prefer if your original outfit should change.' },
      { title: 'Couple Diwali Balcony', scenario: 'Couple post, engagement edit, or festive greeting', tool: 'Dreamina', prompt: 'Turn this couple photo into an elegant Diwali balcony portrait, both faces realistic and recognizable, coordinated festive outfits, warm lanterns and diyas around the railing, distant fireworks softly blurred, romantic but natural pose, cinematic bokeh, premium Instagram post mood.', tip: 'Upload a photo where both faces are clear; avoid crowded group photos.' },
      { title: 'Family Puja Moment', scenario: 'Family greeting card or WhatsApp status image', tool: 'Gemini', prompt: 'Enhance this family photo into a respectful Diwali puja scene, warm temple-room lighting, diyas near a decorated thali, marigold flowers, gentle smiles, realistic skin tones, no face swapping, balanced family composition, festive but natural home atmosphere.', tip: 'Best for small family photos with everyone facing the camera.' },
      { title: 'Rangoli Creator Shot', scenario: 'Reels thumbnail or creator lifestyle post', tool: 'ChatGPT', prompt: 'Create a vibrant Diwali creator portrait beside a colorful rangoli, warm diya rim light, festive outfit with detailed fabric, clean background separation, realistic facial details, shallow depth of field, bright but tasteful colors, modern Instagram creator aesthetic.', tip: 'If your original image is full-body, ask for “keep full body visible”.' },
      { title: 'Fireworks Rooftop Portrait', scenario: 'High-impact festive cover image', tool: 'Dreamina', prompt: 'Convert my photo into a cinematic Diwali rooftop portrait at night, safe distant fireworks in the sky, warm gold and deep blue color grade, soft rim light on hair and shoulders, elegant festive clothing, realistic face preservation, editorial 4:5 framing, no cartoon effect.', tip: 'Add “subtle fireworks” if the model makes the background too busy.' },
      { title: 'Kids-Friendly Festival Card', scenario: 'Family-safe celebration graphic', tool: 'Gemini', prompt: 'Create a wholesome Diwali celebration portrait from this image, child-safe festive home setting, diyas placed safely on a table, marigold garlands, warm lights, natural smiles, realistic skin, gentle colors, greeting-card composition, no firecrackers near people.', tip: 'Use this for family content where safety and realism matter.' },
      { title: 'Minimal Premium Diwali DP', scenario: 'Clean professional profile photo', tool: 'ChatGPT', prompt: 'Turn this portrait into a minimal premium Diwali profile picture, dark clean background, two soft diya glows, subtle gold highlights, elegant traditional outfit, sharp realistic face, natural skin texture, professional lighting, LinkedIn and Instagram compatible crop.', tip: 'Good when you want festive mood without a crowded background.' },
      { title: 'Brand Founder Diwali Greeting', scenario: 'Founder post or small business greeting', tool: 'Dreamina', prompt: 'Create a polished Diwali founder greeting portrait from this photo, modern studio background with subtle diya and marigold accents, confident professional expression, warm festive lighting, realistic face preservation, clean negative space for text, premium brand campaign look.', tip: 'Leave space on one side if you plan to add greeting text later.' },
      { title: 'Traditional Kurta Street Lights', scenario: 'Male creator portrait or festival outfit post', tool: 'Gemini', prompt: 'Generate a realistic Diwali street portrait from my photo, stylish traditional kurta, warm market lights, rows of diyas in the distance, cinematic smoke-free atmosphere, natural skin texture, sharp eyes, preserved identity, editorial Instagram 4:5 composition.', tip: 'Works best with waist-up portraits and visible shoulders.' },
    ],
    tutorial: ['Pick one clear source photo with visible face and enough shoulder area for outfit changes.', 'Choose the prompt that matches your goal: profile photo, couple post, family greeting, or fashion editorial.', 'Paste the prompt into Gemini, ChatGPT, or Dreamina and upload your image if the tool supports image input.', 'If the output changes the face too much, add: “preserve the original face, identity, eye shape, and skin texture.”', 'Export a 4:5 version for Instagram feed and a square crop for profile photos.'],
    faq: [['What is the best Diwali AI photo prompt?', 'The best prompt specifies diya lighting, festive clothing, realistic face preservation, background, camera framing, and the platform you plan to post on.'], ['Can I use these prompts in Gemini?', 'Yes. Gemini works well for realistic identity-preserving edits when the uploaded photo is clear.'], ['Are these prompts safe for family Diwali photos?', 'Use the family and kids-friendly prompts, avoid unsafe firecracker scenes, and check every result before posting.'], ['Why does my Diwali AI photo look fake?', 'The source photo may be too blurry, or the prompt may be too broad. Add camera, lighting, face preservation, and clothing details.'], ['Should Diwali prompt pages be indexed by Google?', 'Yes, if the page contains original prompts, tutorial content, FAQs, and useful internal links instead of a thin template.']],
    links: [['India AI Photo Prompts', '/india-ai-photo-prompts'], ['Couple AI Photo Prompts', '/couple-ai-photo-prompts'], ['Eid AI Photo Prompts', '/eid-ai-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
  'chatgpt-photo-prompts': {
    title: 'ChatGPT Photo Prompts for Realistic Portraits, Instagram Edits, and Creator Looks',
    metaTitle: 'ChatGPT Photo Prompts for Realistic AI Photo Editing',
    description: 'Copy ChatGPT photo prompts for realistic portraits, profile pictures, couple photos, fashion edits, and viral Instagram creator images.',
    intro: 'ChatGPT photo prompts need more than a short style request. The model responds best when you describe the subject, lighting, outfit, scene, camera angle, realism level, and what must not change. This page collects practical ChatGPT photo prompts for creators who want polished images without losing identity. Use these for Instagram posts, profile pictures, Reels covers, thumbnails, and festival edits.',
    intent: 'Start with a clear photo, copy a prompt, and adjust the outfit, city, or platform details to match your own creator style.',
    prompts: [
      { title: 'Realistic Profile Upgrade', scenario: 'Clean profile picture for Instagram or LinkedIn', tool: 'ChatGPT', prompt: 'Upgrade this portrait into a realistic premium profile photo, preserve my facial identity, natural skin texture, sharp eyes, clean background, soft studio lighting, subtle warm highlights, confident expression, high-end creator profile composition.', tip: 'Ask for “not over-smoothed” if the result looks plastic.' },
      { title: 'Cinematic Street Portrait', scenario: 'Urban creator post', tool: 'ChatGPT', prompt: 'Transform this photo into a cinematic urban street portrait, evening city lights, shallow depth of field, stylish casual outfit, realistic face preservation, natural skin, moody teal and orange color grade, editorial Instagram 4:5 crop.', tip: 'Mention your city or background vibe for more local results.' },
      { title: 'Couple Editorial Edit', scenario: 'Couple feed post', tool: 'ChatGPT', prompt: 'Turn this couple photo into a romantic editorial portrait, preserve both faces, coordinated outfits, soft golden-hour light, elegant background blur, natural pose, realistic skin texture, magazine-quality Instagram composition.', tip: 'Use a photo where both people are equally visible.' },
      { title: 'Festival Glow Portrait', scenario: 'Diwali, Eid, or celebration post', tool: 'ChatGPT', prompt: 'Create a realistic festive portrait from this image, warm celebration lights, tasteful traditional outfit, subtle bokeh, preserved facial features, rich fabric detail, natural smile, premium social media look, no cartoon style.', tip: 'Replace “festive” with Diwali, Eid, Ramadan, or wedding as needed.' },
      { title: 'Dark Fashion Fit Check', scenario: 'Boys fashion or streetwear post', tool: 'ChatGPT', prompt: 'Convert my photo into a dark fashion fit-check editorial, black streetwear, clean urban corridor, cool cyan edge lighting, light cinematic haze, realistic face preservation, sharp fabric details, confident magazine pose.', tip: 'Add your outfit color if the model changes clothing too much.' },
      { title: 'Soft Beauty Portrait', scenario: 'Girls profile or beauty post', tool: 'ChatGPT', prompt: 'Enhance this portrait into a soft beauty editorial image, natural makeup, glowing skin without over-smoothing, pastel background, soft window light, realistic facial identity, elegant hair detail, clean Instagram portrait crop.', tip: 'Use “natural makeup” to avoid exaggerated beauty filters.' },
      { title: 'Founder Photo', scenario: 'Personal brand or small business owner', tool: 'ChatGPT', prompt: 'Create a polished founder portrait from this image, modern office or studio background, confident but friendly expression, realistic skin texture, clean lighting, professional outfit, subtle brand-ready composition with space for headline text.', tip: 'Great for product launch posts and about pages.' },
      { title: 'Travel Creator Poster', scenario: 'Vacation memory or travel reel cover', tool: 'ChatGPT', prompt: 'Turn this photo into a realistic travel creator poster, scenic landmark background, warm cinematic color grade, natural face preservation, stylish outfit, depth-of-field blur, premium Instagram travel edit, no fantasy distortion.', tip: 'Name the destination if you need a specific place.' },
    ],
    tutorial: ['Upload a sharp source image with good lighting.', 'Tell ChatGPT what must stay unchanged: face, age, expression, and pose.', 'Add scene details such as studio, street, festival, rooftop, or travel background.', 'Ask for a 4:5 Instagram crop if you want feed-ready output.', 'Revise with one constraint at a time: lighting, outfit, background, or realism.'],
    faq: [['Can ChatGPT edit photos with prompts?', 'Yes, when the product account has image features enabled. The same prompt can also guide other image tools.'], ['How do I keep my face realistic?', 'Add instructions to preserve facial identity, eye shape, skin texture, and natural proportions.'], ['What prompt length works best?', 'A clear 50-90 word prompt usually works better than a vague one-line request.'], ['Can I use these prompts commercially?', 'Check the AI tool terms, rights to the source photo, and local advertising rules before commercial use.']],
    links: [['Gemini Prompts', '/gemini-prompts'], ['Profile Photo Prompts', '/profile-photo-prompts'], ['Couple AI Photo Prompts', '/couple-ai-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
  'gemini-prompts': {
    title: 'Gemini Prompts for AI Photo Editing, Viral Portraits, and Creator Posts',
    metaTitle: 'Gemini Prompts for AI Photo Editing & Creator Portraits',
    description: 'Copy Gemini prompts for realistic AI photo editing, Instagram portraits, festival looks, cinematic profile pictures, and South Asian creator content.',
    intro: 'Gemini prompts are useful for creators who want realistic edits from a source photo. The strongest prompts give Gemini a clear visual target while telling it to preserve the original face. This resource focuses on creator-friendly Gemini prompts for profile pictures, festival posts, cricket edits, fashion covers, and cinematic portraits. Each prompt is written so you can paste it directly, then customize details like outfit color, market, background, and crop.',
    intent: 'Use these Gemini prompts when you want a polished image that still looks like you, with realistic lighting and social-media-ready composition.',
    prompts: [
      { title: 'Gemini Stadium DP', scenario: 'Cricket fan profile photo', tool: 'Gemini', prompt: 'Create a cinematic cricket stadium portrait from my photo, preserve my face and expression, stadium floodlights behind me, stylish jersey, dramatic rim light, shallow depth of field, realistic rain particles, sharp 4K Instagram DP composition.', tip: 'Use for India, Pakistan, Bangladesh, or IPL-style cricket edits.' },
      { title: 'Gemini Festival Glow', scenario: 'Diwali or Eid celebration post', tool: 'Gemini', prompt: 'Transform this portrait into a realistic festival photo, warm lantern and diya glow, elegant traditional outfit, soft golden bokeh, natural skin texture, preserved identity, tasteful celebration background, premium Instagram 4:5 frame.', tip: 'Replace the festival objects to match Diwali, Eid, or Ramadan.' },
      { title: 'Gemini Clean Headshot', scenario: 'Professional profile image', tool: 'Gemini', prompt: 'Upgrade this image into a clean professional headshot, realistic face preservation, neutral studio background, soft key light, crisp eyes, natural skin, confident expression, modern personal-brand portrait, no heavy retouching.', tip: 'Use a simple original portrait for best results.' },
      { title: 'Gemini Bollywood Poster', scenario: 'Cinematic creator poster', tool: 'Gemini', prompt: 'Turn my photo into a Bollywood-inspired rainy movie poster, neon street reflections, dramatic teal and amber lighting, expressive pose, realistic facial details, film grain, poster composition, high-fashion Instagram look.', tip: 'Ask for “subtle text-free poster” if it adds fake text.' },
      { title: 'Gemini Couple Portrait', scenario: 'Romantic couple edit', tool: 'Gemini', prompt: 'Create a realistic couple portrait from this image, preserve both faces, warm sunset light, elegant outfits, soft background blur, natural romantic pose, cinematic lens, detailed fabric texture, premium social media finish.', tip: 'Avoid photos where one face is too small.' },
      { title: 'Gemini Streetwear Fit', scenario: 'Boys fashion reel cover', tool: 'Gemini', prompt: 'Transform this photo into a premium streetwear fit-check portrait, black outfit, clean urban corridor, cool edge lighting, realistic face preservation, sharp clothing detail, confident pose, editorial 4:5 Instagram crop.', tip: 'Specify hoodie, jacket, or kurta if outfit matters.' },
      { title: 'Gemini Bridal Soft Light', scenario: 'Wedding or engagement portrait', tool: 'Gemini', prompt: 'Enhance this portrait into an elegant bridal-inspired photo, soft warm light, detailed fabric and jewelry, natural skin texture, preserved face, tasteful floral background, premium wedding editorial mood, realistic proportions.', tip: 'Keep it respectful and avoid overloading jewelry details.' },
      { title: 'Gemini Travel Creator', scenario: 'Travel profile or post cover', tool: 'Gemini', prompt: 'Create a travel creator portrait from this photo, scenic landmark in background, warm sunrise color grade, realistic face preservation, stylish outfit, depth of field, natural pose, Instagram-ready 4:5 composition.', tip: 'Name the landmark only if you have rights and context.' },
    ],
    tutorial: ['Choose the most specific Gemini prompt for your scene.', 'Upload a high-quality photo with visible face and simple lighting.', 'Add “preserve identity” and “realistic skin texture” for every portrait edit.', 'Generate 2-3 variations and compare the face, hands, and background realism.', 'Use the cleanest result as a feed post, DP, or Reel cover.'],
    faq: [['Are Gemini prompts different from ChatGPT prompts?', 'They can be similar, but Gemini often benefits from direct image-editing instructions and explicit face-preservation constraints.'], ['Can Gemini make viral AI photos?', 'It can create polished visuals, but virality depends on trend, timing, audience, and original photo quality.'], ['Why does Gemini change my face?', 'The source image may be unclear or the prompt may focus too much on style. Add stronger identity-preservation wording.'], ['Can I use these for Instagram?', 'Yes for personal creator content when you own the source photo and follow platform rules.']],
    links: [['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'], ['Cricket AI Photo Prompts', '/cricket-ai-photo-prompts'], ['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
  'india-ai-photo-prompts': {
    title: 'India AI Photo Prompts for Reels, Festivals, Cricket, Bollywood, and Profile Pictures',
    metaTitle: 'India AI Photo Prompts for Reels & Festival Portraits',
    description: 'Copy India AI photo prompts for cricket DPs, Diwali portraits, Bollywood posters, saree edits, streetwear looks, and Instagram creator posts.',
    intro: 'India AI photo prompts need strong cultural and visual specificity. A useful prompt should mention the scene, clothing, lighting, camera mood, and how to preserve the original face. This page gives Indian creators practical prompts for cricket moments, Diwali looks, Bollywood posters, saree editorials, campus portraits, and personal-brand photos. The prompts are written for Gemini, ChatGPT, and Dreamina style workflows.',
    intent: 'Use these prompts when your target audience searches for India AI photo edits, Indian Instagram DP prompts, festival photo prompts, or Bollywood-style AI portraits.',
    prompts: [
      { title: 'Indian Cricket Stadium DP', scenario: 'Cricket fan profile picture', tool: 'Gemini', prompt: 'Create a cinematic Indian cricket stadium profile photo from my portrait, blue or green jersey option, stadium floodlights, cheering crowd softly blurred, realistic face preservation, sharp eyes, rain particles, confident sports-fan mood, Instagram DP crop.', tip: 'Specify team colors without using protected logos if needed.' },
      { title: 'Diwali Saree Portrait', scenario: 'Festival fashion post', tool: 'ChatGPT', prompt: 'Transform this photo into an elegant Indian Diwali saree portrait, warm diya lights, rangoli background, detailed silk fabric, tasteful jewelry, natural skin texture, preserved facial identity, soft golden bokeh, premium 4:5 Instagram composition.', tip: 'Works best with waist-up portraits.' },
      { title: 'Bollywood Rain Poster', scenario: 'Cinematic Instagram post', tool: 'Gemini', prompt: 'Turn my photo into a Bollywood rain movie poster, neon reflections, dramatic expression, stylish outfit, teal and amber lighting, realistic face, film grain, high-fashion editorial composition, no fake text or logos.', tip: 'Ask for “text-free poster” to avoid gibberish typography.' },
      { title: 'Royal Palace Editorial', scenario: 'Luxury portrait or wedding mood', tool: 'Dreamina', prompt: 'Create an Indian royal palace editorial portrait from this image, ornate architecture softly blurred, warm sunset light, elegant traditional outfit, realistic face preservation, rich fabric detail, premium magazine mood, confident pose.', tip: 'Mention sherwani, lehenga, or saree if relevant.' },
      { title: 'Campus Graduation DP', scenario: 'Student profile photo', tool: 'ChatGPT', prompt: 'Generate a clean Indian campus graduation display picture, modern college background, confident smile, soft daylight, realistic skin, preserved identity, professional yet friendly pose, crisp social media profile crop.', tip: 'Good for LinkedIn and Instagram profile updates.' },
      { title: 'Mumbai Streetwear Edit', scenario: 'Urban fashion Reel cover', tool: 'Gemini', prompt: 'Transform this portrait into a Mumbai streetwear creator edit, clean urban lane, evening lights, stylish jacket, realistic facial identity, sharp clothing detail, cinematic color grade, confident Instagram Reel cover composition.', tip: 'Change Mumbai to Delhi, Bangalore, or your city if needed.' },
      { title: 'Haldi Ceremony Glow', scenario: 'Wedding or pre-wedding content', tool: 'Dreamina', prompt: 'Create a tasteful Haldi ceremony portrait from this photo, warm yellow floral decor, natural smiles, soft daylight, realistic skin, preserved face, festive Indian wedding mood, clean background, premium family-safe composition.', tip: 'Use with consent for wedding and family images.' },
      { title: 'Founder in India Market', scenario: 'Small business or creator brand post', tool: 'ChatGPT', prompt: 'Create a polished Indian founder portrait, modern market or studio background, subtle warm colors, confident professional expression, realistic skin texture, preserved identity, clean negative space for brand headline, premium campaign look.', tip: 'Useful for landing pages and LinkedIn launch posts.' },
    ],
    tutorial: ['Choose the cultural scene: cricket, Diwali, Bollywood, wedding, campus, or founder portrait.', 'Keep identity-preservation text in every prompt.', 'Avoid asking for real logos or celebrity likenesses unless you have rights.', 'Generate a 4:5 feed crop and square DP crop.', 'Review hands, jewelry, text, and facial realism before posting.'],
    faq: [['What are India AI photo prompts?', 'They are detailed visual instructions for creating Indian-context AI portraits and creator edits.'], ['Can I use these for Diwali photos?', 'Yes. Use the Diwali-specific prompt or the full Diwali resource page for more options.'], ['Do these prompts work for boys and girls?', 'Yes. Adjust outfit, pose, and styling based on the source photo and desired output.'], ['Can I use cricket team logos?', 'Avoid protected logos unless you have permission; use colors and stadium mood instead.']],
    links: [['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'], ['Cricket AI Photo Prompts', '/cricket-ai-photo-prompts'], ['Bollywood AI Photo Prompts', '/bollywood-ai-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
  'couple-ai-photo-prompts': {
    title: 'Couple AI Photo Prompts for Romantic, Festival, Wedding, and Instagram Edits',
    metaTitle: 'Couple AI Photo Prompts for Romantic Photo Edits',
    description: 'Copy couple AI photo prompts for romantic portraits, Eid and Diwali couple edits, wedding looks, anniversary posts, and realistic Instagram images.',
    intro: 'Couple AI photo prompts are harder than solo portraits because the model must preserve two identities, maintain natural body positions, and avoid awkward hands or mismatched lighting. This page gives couples and creators prompt templates for romantic portraits, festival greetings, wedding edits, anniversary posts, and premium Instagram covers. Each prompt includes a clear use case, model suggestion, and practical tip.',
    intent: 'Use these prompts when you want both people to remain recognizable while upgrading the scene, outfits, light, and emotional mood.',
    prompts: [
      { title: 'Golden Hour Couple Portrait', scenario: 'Romantic feed post', tool: 'ChatGPT', prompt: 'Transform this couple photo into a realistic golden-hour portrait, preserve both faces and natural expressions, coordinated outfits, warm sunset backlight, soft background blur, gentle romantic pose, detailed fabric, premium Instagram 4:5 composition.', tip: 'Use a source photo where both faces are similar size.' },
      { title: 'Eid Moonlight Couple', scenario: 'Eid greeting or festive post', tool: 'Dreamina', prompt: 'Turn this couple photo into an elegant Eid moonlight portrait, modest festive outfits, warm lanterns, glowing crescent moon in the background, cinematic bokeh, realistic skin texture, both identities preserved, tasteful celebration mood.', tip: 'Keep the phrase “modest festive outfits” for respectful results.' },
      { title: 'Diwali Balcony Couple', scenario: 'Diwali couple post', tool: 'Gemini', prompt: 'Create a realistic Diwali balcony portrait from this couple photo, rows of diyas, subtle fireworks far behind, coordinated traditional outfits, warm golden light, preserved faces, natural pose, premium social media composition.', tip: 'Avoid close-up fireworks near people for safer imagery.' },
      { title: 'Wedding Editorial Couple', scenario: 'Engagement or wedding-style edit', tool: 'ChatGPT', prompt: 'Enhance this couple image into a wedding editorial portrait, elegant outfits, floral background, soft lens blur, realistic faces, natural hand placement, warm luxury lighting, magazine cover mood, clean 4:5 crop.', tip: 'If hands look wrong, regenerate with “hands relaxed and natural”.' },
      { title: 'Rainy Movie Couple', scenario: 'Cinematic romantic post', tool: 'Gemini', prompt: 'Turn this photo into a cinematic rainy couple movie still, neon reflections, umbrella, soft rim light, emotional but natural expressions, preserved facial identity, realistic wet street texture, no text, Instagram poster composition.', tip: 'Best with full-body or waist-up photos.' },
      { title: 'Anniversary Studio Portrait', scenario: 'Anniversary greeting', tool: 'Dreamina', prompt: 'Create a premium anniversary studio portrait from this couple photo, warm neutral backdrop, subtle floral accents, realistic skin, preserved faces, elegant outfits, clean negative space for date text, polished greeting-card composition.', tip: 'Add your preferred color palette if you will overlay text.' },
      { title: 'Travel Couple Memory', scenario: 'Vacation post or travel reel cover', tool: 'ChatGPT', prompt: 'Transform this couple photo into a realistic travel memory portrait, scenic background, warm sunrise light, natural pose, preserved identities, stylish casual outfits, depth of field, premium Instagram travel creator look.', tip: 'Name the location only if that setting fits your source image.' },
      { title: 'Minimal Couple DP', scenario: 'Shared profile or simple post', tool: 'Gemini', prompt: 'Create a minimal realistic couple profile photo, clean dark background, soft warm rim light, preserved faces, natural skin texture, coordinated simple outfits, close portrait crop, elegant and not overly edited.', tip: 'Use for a subtle result when festival scenes feel too busy.' },
    ],
    tutorial: ['Start from the clearest couple photo you have.', 'Tell the model to preserve both faces, not just “the face”.', 'Choose one scene: festival, wedding, travel, studio, or movie still.', 'Generate multiple options and reject any result with distorted hands or swapped faces.', 'Crop separately for feed posts, profile photos, and story formats.'],
    faq: [['Why do couple AI edits distort faces?', 'Two-person edits are complex. Use a clear source photo and explicitly ask to preserve both identities.'], ['Can these prompts work for Eid and Diwali?', 'Yes. Use the festival prompts and adjust lanterns, diyas, outfits, or background details.'], ['Which tool is best for couple prompts?', 'Gemini, ChatGPT, and Dreamina can all work; choose based on the tool available to your account.'], ['Should couple generator URLs be indexed?', 'No. Personalized generate URLs should stay canonicalized or noindexed; resource pages like this should be indexed.']],
    links: [['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'], ['Eid AI Photo Prompts', '/eid-ai-photo-prompts'], ['Profile Photo Prompts', '/profile-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
  'instagram-prompts': {
    title: 'Instagram AI Photo Prompts for Viral Reels, Stories, Profile Grids, and Creator Edits',
    metaTitle: 'Instagram AI Photo Prompts for Reels, Stories & Creator Edits',
    description: 'Copy Instagram AI photo prompts for viral Reels covers, story templates, carousel posts, profile grids, and trending creator image edits for Gemini and ChatGPT.',
    intro: 'Instagram photo prompts need more than a style word. They need the right aspect ratio, visual density, and feed-native composition. This resource gives creators copy-ready Instagram AI photo prompts organized by surface: Reels covers, story templates, carousel posters, profile-grid DPs, and feed-post edits. Each prompt includes the tool, a use case, and a practical tip so you can adapt it for your own creator style.',
    intent: 'Use these prompts when you want an Instagram-ready photo edit that looks native to the platform — not a generic AI portrait dumped into a square crop.',
    prompts: [
      { title: 'Viral Reels Cover Frame', scenario: 'Reels thumbnail', tool: 'Gemini', prompt: 'Create a bold Instagram Reels cover portrait from this image, clean background with subtle gradient, confident expression, sharp eyes, cinematic rim light, text-safe top-third space, 9:16 vertical composition, high contrast, realistic face preservation, no text overlay.', tip: 'Leave the top third clear if you plan to add Reels text later.' },
      { title: 'Story Slide Glow Up', scenario: '24h story update', tool: 'ChatGPT', prompt: 'Transform this selfie into a clean Instagram story slide, warm soft light, subtle outfit upgrade, natural skin texture, preserved identity, blurred background depth, story-safe 9:16 crop, no heavy filters, premium but casual vibe.', tip: 'Works best with a front-facing selfie in natural light.' },
      { title: 'Carousel Poster Series', scenario: 'Multi-slide carousel', tool: 'Gemini', prompt: 'Convert this portrait into a bold Instagram carousel poster, editorial magazine layout, strong side lighting, deep shadows, cinematic color grade, clean negative space on one side for swipe text, 1:1 square, realistic facial detail, high-fashion creator look.', tip: 'Use one consistent prompt across all carousel slides for visual continuity.' },
      { title: 'Profile Grid DP Clean', scenario: 'Profile picture refresh', tool: 'ChatGPT', prompt: 'Upgrade this portrait into a premium Instagram profile picture, clean centered composition, soft studio light, natural skin, sharp eyes, subtle warm tone, professional but approachable expression, 1:1 square, no background clutter, realistic identity preservation.', tip: 'Use a well-lit front-facing portrait for best grid-DP results.' },
      { title: 'Feed Post Aesthetic Edit', scenario: 'Main feed post', tool: 'Gemini', prompt: 'Enhance this photo into a polished Instagram feed post, tasteful color grade, improved lighting, subtle background clean-up, preserved face and body proportions, elegant composition, 4:5 vertical crop, premium creator aesthetic, no cartoon or fantasy effect.', tip: 'Mention the vibe — cozy, urban, travel, or minimal — to guide the edit.' },
      { title: 'Trending Audio Cover Art', scenario: 'Reels with trending audio', tool: 'ChatGPT', prompt: 'Create an eye-catching Instagram Reels cover art from this photo, bold color pop background, motion-blur suggestion, confident expression, high-energy mood, 9:16 vertical, safe upper space for audio label, modern creator vibe, realistic face preservation.', tip: 'Use this when posting to a trending audio to grab scroll attention.' },
      { title: 'Couple Feed Portrait', scenario: 'Couple Instagram post', tool: 'Gemini', prompt: 'Transform this couple photo into a romantic Instagram feed portrait, soft golden hour light, elegant casual outfits, preserved identities for both people, natural poses, warm cinematic color grade, shallow depth of field, 4:5 vertical, premium creator couple look.', tip: 'Make sure both faces are clearly visible in the source image.' },
      { title: 'Brand Collab Post Style', scenario: 'Sponsored or partnership post', tool: 'ChatGPT', prompt: 'Enhance this image into a clean brand-friendly Instagram post, neutral elegant background, polished but natural look, product-safe negative space, realistic skin and fabric detail, subtle warm lighting, 1:1 square, professional creator quality, no fake logos or text.', tip: 'Leave space where you will place the brand tag or partnership label.' },
    ],
    tutorial: ['Pick the Instagram surface: Reels cover, story, carousel, DP, or feed post.', 'Choose a prompt that matches the crop and energy of that surface.', 'Copy and paste into Gemini or ChatGPT with your photo.', 'Check that the output aspect ratio matches Instagram specs: 9:16 for Reels/stories, 4:5 for feed posts, 1:1 for grid and carousel.', 'Review before posting: check face realism, hands, background artifacts, and text-safe zones.'],
    faq: [['What is the best Instagram AI photo prompt?', 'The best prompt names the surface type, the desired mood, lights, crop, face-preservation rules, and where text might go.'], ['Can I use these prompts in Gemini for Instagram?', 'Yes. Gemini works well for Instagram edits when the source photo is clear and the prompt requests a specific aspect ratio and mood.'], ['How do I make an Instagram Reels cover with AI?', 'Use a Reels cover prompt, request 9:16 vertical, and leave clean space at the top or bottom for text overlays.'], ['Why does my AI photo not fit Instagram?', 'Most AI tools default to square or wide crops. Add the exact Instagram ratio — 4:5, 9:16, or 1:1 — in your prompt.'], ['Can I use AI photos on Instagram commercially?', 'For personal creator content it is usually fine, but for sponsored posts or commercial use, check the AI tool terms and your rights to the source photo.']],
    links: [['Gemini Prompts', '/gemini-prompts'], ['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'], ['Trending Prompts', '/trending-prompts'], ['Profile Photo Prompts', '/profile-photo-prompts']],
  },
  'trending-prompts': {
    title: 'Trending AI Photo Prompts — Latest Viral Edits, Reels Covers, and Creator Looks',
    metaTitle: 'Trending AI Photo Prompts for Viral Instagram & Creator Edits',
    description: 'Copy the latest trending AI photo prompts for viral Reels, Instagram edits, cinematic DPs, seasonal festival looks, and creator trend covers.',
    intro: 'Trending AI photo prompts change with the season, platform, and creator culture. Updated for August 2026, this page now tracks the social formats repeatedly showing up in TikTok, Instagram, Pinterest, and AI photo prompt guides: generic action figure boxes, instant-film memories, Y2K camcorder flash, scrapbook journals, text-free movie posters, neon time travel, mirror selfies, monsoon rain portraits, and proven creator cover styles. Each prompt is written for Gemini or ChatGPT and includes the scenario, trend context, and a tip to help you adapt before the trend moves on.',
    intent: 'Use this page to catch a trending visual direction and generate a polished image with your own photo while the edit style is still fresh on Instagram Reels, TikTok, Shorts, and Pinterest.',
    prompts: [
      { title: '2026 Collectible Action Figure Box', scenario: 'Viral toy package edit', tool: 'ChatGPT', prompt: 'Turn the person in my uploaded photo into a generic collectible action figure sealed inside clear blister packaging. Preserve the face, hairstyle, body shape, outfit colors, and recognizable accessories. Use glossy molded plastic texture, premium studio lighting, a clean retail product-photo background, and 2-3 hobby accessories beside the figure. Add no real brand names, no logos, no celebrity references, and no readable text. Square 1:1 composition for Instagram.', tip: 'Use generic toy language only; avoid Barbie, Disney, celebrity, team, or brand names.' },
      { title: 'AI Polaroid Memory Frame', scenario: 'Nostalgic feed post', tool: 'Gemini', prompt: 'Transform this photo into a vintage instant-film snapshot from the late 1990s. Keep the subject recognizable, add a thick white instant-photo border with extra space at the bottom, hard on-camera flash, warm faded colors, fine film grain, slight softness, edge falloff, and a candid unposed memory feeling. Do not include celebrities or people without consent. 4:5 Instagram crop.', tip: 'Ask for imperfect flash, grain, and soft focus; perfect studio lighting kills the Polaroid feel.' },
      { title: 'Y2K Camcorder Flash Edit', scenario: 'TikTok or Reels cover', tool: 'Gemini', prompt: 'Edit my photo like a chaotic early-2000s camcorder still. Preserve my face and main outfit, add direct flash overexposure, cool indoor lighting, low-resolution VHS texture, subtle scanlines, small timestamp-style graphic shapes without readable text, slight motion blur, and a casual party snapshot mood. Use vertical 9:16 composition for TikTok, Reels, or Stories.', tip: 'Use this for short-video covers; specify 9:16 so the face is not cropped.' },
      { title: 'Scrapbook Digital Journal Collage', scenario: 'Pinterest-style carousel', tool: 'ChatGPT', prompt: 'Turn this photo into a handmade scrapbook journal collage. Keep the person recognizable, layer torn notebook paper, tape pieces, soft stickers, pressed flowers, faded magazine cutouts, doodle-like shapes, coffee-stain texture, and pastel color grading around the image. Make it feel tactile and personal, not polished AI. No readable fake handwriting or brand logos. 4:5 Instagram feed composition.', tip: 'Good for Pinterest, Tumblr-style moodboards, and Instagram carousel covers.' },
      { title: 'Text-Free Indie Movie Poster', scenario: 'Cinematic poster edit', tool: 'ChatGPT', prompt: 'Create a dramatic indie movie-poster style image from this portrait while preserving identity. Use cinematic shadows, subtle film grain, moody editorial color grading, atmospheric background depth, elegant negative space, and a powerful main-character expression. Do not add title text, actor names, critic quotes, studio logos, or copyrighted movie references. 2:3 poster composition.', tip: 'Keep it text-free; AI typography often looks fake and can create IP risk.' },
      { title: '1980s Neon Time Travel Portrait', scenario: 'Storytelling creator post', tool: 'Gemini', prompt: 'Place the person from my photo into a rainy 1980s neon city street at night. Preserve the face and natural proportions, adapt the outfit into era-appropriate retro streetwear, add glowing shop signs without readable text, wet pavement reflections, cinematic fog, realistic shadows, film-grain texture, and teal-magenta color grading. Use 4:5 vertical Instagram composition.', tip: 'Trend works best when the era, weather, light, and outfit all match.' },
      { title: 'Warm LED Mirror Selfie Prompt', scenario: 'Hyper-real selfie edit', tool: 'Gemini', prompt: 'Use my uploaded photo as a strict identity reference and create a realistic mirror selfie in a clean modern room. Preserve my face, hairstyle, skin tone, and body proportions. Add a warm LED arch mirror glow, stylish but believable outfit, phone-camera realism, natural skin texture, slight background blur, soft indoor shadows, and a casual confident pose. No brand logos, no fake text, 3:4 portrait crop.', tip: 'This matches the current Gemini mirror-selfie prompt pattern without copying any creator.' },
      { title: 'Cinematic Monsoon Rain Portrait', scenario: 'Rainy couple or solo edit', tool: 'ChatGPT', prompt: 'Transform this photo into a cinematic monsoon rain portrait. Preserve every visible person’s identity, add umbrellas or rain-soaked street atmosphere only if it fits the pose, warm street lights, wet pavement reflections, soft rim light, natural skin texture, realistic fabric detail, cozy emotional mood, and subtle film grain. Avoid fake logos or readable text. 4:5 Instagram composition.', tip: 'Useful for South Asian rain-season edits; avoid forced cultural costumes unless the source photo supports them.' },
      { title: 'Cinematic Night Street Portrait', scenario: 'Night reel cover or feed post', tool: 'Gemini', prompt: 'Transform this photo into a cinematic night street portrait, wet pavement reflections, neon signs softly blurred, warm amber street light, stylish casual outfit, realistic face preservation, film-grain texture, 4:5 Instagram composition, moody teal and orange color grade.', tip: 'Trending in urban creator Reels; use with waist-up portrait for best results.' },
      { title: 'Soft Golden Hour Glow', scenario: 'Warm aesthetic feed post', tool: 'ChatGPT', prompt: 'Enhance this photo with a warm golden-hour glow, soft backlight, subtle lens flare, natural skin texture, preserved facial identity, airy filmic color grade, relaxed expression, 4:5 portrait crop, premium lifestyle creator look.', tip: 'Trending for travel and lifestyle creators; avoid overexposing the face.' },
      { title: 'Festival Season Celebration Edit', scenario: 'Eid, Diwali, or Ramadan post', tool: 'Gemini', prompt: 'Create a celebratory festival portrait from this photo, warm lantern or diya light, elegant traditional outfit, tasteful festive background, natural skin tones, preserved face, soft bokeh, premium social media 4:5 crop, respectful celebration mood.', tip: 'Customize the festival objects and outfit based on the specific occasion.' },
      { title: 'Minimal Aesthetic DP Upgrade', scenario: 'Profile picture trend', tool: 'ChatGPT', prompt: 'Upgrade this portrait into a minimal aesthetic profile picture, clean studio background, soft diffused light, natural skin texture, sharp eyes, subtle warm tone, centered composition, 1:1 square, modern personal-brand look, no heavy editing.', tip: 'Trending among creators refreshing their profile for a cleaner brand look.' },
      { title: 'Dark Fit Check Editorial', scenario: 'Outfit or fashion Reels cover', tool: 'Gemini', prompt: 'Convert this photo into a dark editorial fit-check portrait, clean corridor or urban wall, cool cyan edge light, cinematic haze, sharp clothing detail, confident pose, realistic face preservation, editorial 4:5 Instagram crop, high-fashion mood.', tip: 'Works best with full-body or waist-up outfit shots.' },
      { title: 'Rainy Movie Poster Vibe', scenario: 'Dramatic Reels cover art', tool: 'ChatGPT', prompt: 'Turn this photo into a cinematic rainy movie poster, umbrella, neon reflections on wet ground, dramatic rim light, expressive mood, realistic facial detail, film-grain effect, 2:3 poster composition, no fake text, premium cinematic Instagram cover.', tip: 'Trending in Bollywood and K-drama inspired Reels covers.' },
      { title: 'Couple Sunset Silhouette', scenario: 'Romantic couple trend post', tool: 'Gemini', prompt: 'Create a romantic couple sunset silhouette from this photo, warm orange and pink sky, recognizable profiles, soft backlight, elegant casual outfits, natural pose, cinematic 4:5 Instagram crop, premium couple creator aesthetic.', tip: 'Use a side-profile or backlit source photo for better silhouette results.' },
      { title: 'Bold Color Pop Portrait', scenario: 'High-energy Reels thumbnail', tool: 'ChatGPT', prompt: 'Create a bold color-pop portrait from this image, vibrant monochrome background, contrasty lighting, sharp facial detail, confident expression, clean edges, 9:16 vertical, text-safe upper zone, modern pop-art creator vibe.', tip: 'Trending for high-energy Reels with bold audio; keep background one strong color.' },
    ],
    tutorial: ['Browse the trending prompts and pick one that matches your content calendar.', 'Upload a clear photo with good lighting — the source quality determines the output quality.', 'Paste the prompt into Gemini or ChatGPT, and generate 2-3 variations to compare.', 'Reject any output with distorted hands, swapped faces, or over-edited plastic skin.', 'Post before the trend cycle shifts — trending Reels covers have a short freshness window.'],
    faq: [['What are trending AI photo prompts?', 'They are prompt ideas matched to visual styles currently popular on Instagram Reels, Shorts, and creator feeds.'], ['How often do these trending prompts change?', 'Trend cycles shift every few weeks; check back for updated prompts as new visual styles surface.'], ['Can I use trending prompts for commercial content?', 'For personal creator content yes, but check AI tool terms, your source photo rights, and platform guidelines for sponsored posts.'], ['Which tool works best for trending edits?', 'Gemini and ChatGPT both work well; Gemini often gives better lighting control, ChatGPT better scene composition.'], ['Why does my AI photo not look like the trend?', 'The source photo quality, prompt specificity, and aspect ratio all matter. Add lighting, crop, and face-preservation details.']],
    links: [['Instagram Prompts', '/instagram-prompts'], ['Gemini Prompts', '/gemini-prompts'], ['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'], ['Browse All Prompts', '/prompts']],
  },
};

export async function generateStaticParams() {
  return [
    ...categoryLinks.map(([, href]) => ({ slug: href.replace('/', '') })),
    ...Object.keys(extraLegalPages).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const legal = extraLegalPages[slug as keyof typeof extraLegalPages];
  if (legal) return { title: legal.title, description: `${legal.title} for PromptSeen Online.`, alternates: { canonical: `/${slug}` } };
  const resource = resourcePages[slug];
  if (resource) {
    const meta: Metadata = { title: resource.metaTitle, description: resource.description, alternates: { canonical: `/${slug}` } };
    if (noindexSlugs.has(slug)) { meta.robots = 'noindex, follow'; }
    return meta;
  }
  const category = categoryLinks.find(([, href]) => href === `/${slug}`);
  if (!category) return {};
  const [label] = category;
  const meta: Metadata = {
    title: label,
    description: `${label} from PromptSeen Online: ready-to-copy AI photo prompts for creators.`,
    alternates: { canonical: `/${slug}` },
  };
  if (noindexSlugs.has(slug)) { meta.robots = 'noindex, follow'; }
  return meta;
}

function ResourceJsonLd({ slug, page }: { slug: string; page: ResourcePage }) {
  const url = `${site.domain}/${slug}`;
  const graph = [
    { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: site.domain }, { '@type': 'ListItem', position: 2, name: 'Prompts', item: `${site.domain}/prompts` }, { '@type': 'ListItem', position: 3, name: page.metaTitle, item: url }] },
    { '@type': 'CollectionPage', '@id': `${url}#collection`, name: page.title, url, description: page.description, isPartOf: { '@id': `${site.domain}/#website` }, hasPart: page.prompts.map((prompt, index) => ({ '@type': 'CreativeWork', position: index + 1, name: prompt.title, text: prompt.prompt, keywords: [prompt.tool, prompt.scenario] })) },
    { '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: page.faq.map(([name, answer]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
  return <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>;
}

function ResourcePage({ slug, page }: { slug: string; page: ResourcePage }) {
  return (
    <PageShell>
      <ResourceJsonLd slug={slug} page={page} />
      <section className="section wrap page-hero resource-hero">
        <p className="eyebrow">Creator resource</p>
        <h1>{page.title}</h1>
        <p className="lead">{page.intro}</p>
        <p className="resource-intent">{page.intent}</p>
        <div className="resource-links" aria-label="Related prompt resources">
          {page.links.map(([label, href]) => <Link key={href} className="chip blue" href={href}>{label}</Link>)}
        </div>
      </section>

      <section className="section wrap compact-section">
        <SectionHeader eyebrow="Copy-ready prompts" title="Original prompt cards with use cases, tools, and tips">
          Pick the closest card, copy the English prompt, then adjust clothing, location, or crop for your own photo.
        </SectionHeader>
        <div className="resource-prompt-grid">
          {page.prompts.map((prompt) => (
            <article className="resource-prompt card" key={prompt.title}>
              <div className="prompt-meta"><span className="chip lime">{prompt.tool}</span><span className="chip blue">{prompt.scenario}</span></div>
              <h2>{prompt.title}</h2>
              <p><strong>Use case:</strong> {prompt.scenario}</p>
              <pre className="snippet">{prompt.prompt}</pre>
              <p className="tip"><strong>Tip:</strong> {prompt.tip}</p>
              <CopyButton text={prompt.prompt} label="Copy this prompt" />
            </article>
          ))}
        </div>
      </section>

      <section className="section wrap resource-two-col">
        <div className="card resource-panel">
          <h2>How to use these prompts</h2>
          <ol className="resource-steps">{page.tutorial.map((step) => <li key={step}>{step}</li>)}</ol>
        </div>
        <div className="card resource-panel">
          <h2>Related pages to continue</h2>
          <p>Use these internal links to move from a broad idea to a more specific prompt set.</p>
          <div className="related-list">{page.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        </div>
      </section>

      <section className="section wrap compact-section">
        <SectionHeader eyebrow="FAQ" title="Common questions before generating" />
        <div className="faq-list">{page.faq.map(([q, a]) => <details className="card" key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </section>
    </PageShell>
  );
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const legal = extraLegalPages[slug as keyof typeof extraLegalPages];
  if (legal) {
    return (
      <PageShell>
        <section className="section wrap legal-page">
          <p className="eyebrow">Updated {legal.updated}</p>
          <h1>{legal.title}</h1>
          {legal.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
      </PageShell>
    );
  }

  const resource = resourcePages[slug];
  if (resource) return <ResourcePage slug={slug} page={resource} />;

  const category = categoryLinks.find(([, href]) => href === `/${slug}`);
  if (!category) notFound();
  const [label] = category;

  return (
    <PageShell>
      <section className="section wrap page-hero">
        <SectionHeader eyebrow="Category" title={label} as="h1">
          Ready-to-copy prompt ideas for this category. PromptSeen Online is an independent resource and results may vary by model.
        </SectionHeader>
        <div className="prompts-grid page-grid">{prompts.slice(0, 6).map((prompt) => <PromptCard key={prompt.title} prompt={prompt} />)}</div>
        <div className="center-actions"><Link className="btn btn-primary" href="/generate">Sign in to Generate</Link><Link className="btn btn-secondary" href="/prompts">Browse all prompts</Link></div>
      </section>
    </PageShell>
  );
}
