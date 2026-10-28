# Reference sites and what Omni GC takes from each

Research was done in October 2026 through web search summaries, since the site hosts themselves are outside this build environment's allowed network. Sources are listed at the bottom.

| Site | How they position | What we borrowed | What we deliberately avoided |
| --- | --- | --- | --- |
| Procore | Enterprise construction project management. Heavy on proof, modules and industry pages. | The module-by-module walkthrough. Owners expect to see each department covered. | The enterprise catalogue feel. Omni GC sells one seat, so the page stays one narrative. |
| Billdr.ai | "AI operating system for general contractors." Names its AI agents and leads with "AI workforce." Publishes pricing. Targets residential GCs. | The single-system story and the operator framing. | Naming the AI, "trusted by N" counters, and anything that reads as a chatbot pitch. Our proof is traceability, not agents with first names. |
| Bobyard | AI takeoff for trade contractors. "Win the bids you used to skip." Product UI on a monitor as the hero visual. | A concrete product view in the hero area and code-drawn product vignettes rather than icons. | Trade-specific feature marketing. Omni GC is the whole office, not one task. |
| Contractor Foreman | Low-cost all-in-one for small and mid-size contractors. Feature list, free trial, money-back guarantee. | The breadth checklist, reframed as the capabilities ticker. | Price-led messaging and trial CTAs. Premium buyers book a walkthrough. |
| JACK App | All-in-one for residential builders and trades. CRM, estimating, cashflow forecasting, WIP, Xero sync. Launching US and Canada. | Cashflow and WIP as first-class dashboard items. Canada and US framing. | Residential and trades audience. Omni GC targets commercial, industrial and franchise GCs. |

## Design direction that came out of this

- White with a blue-to-teal gradient as the only colour, at the owner's request. The references also sit on white, so the separation comes from type scale, the single gradient used as a material (buttons, frames, data) rather than a wash on everything, and the scroll storytelling below.
- Scroll as the demo. Instead of a feature grid, the page pins and reveals: masked headline, word-by-word statement, stacking module cards with a sticky rail, a dashboard that tilts into place, a horizontal day timeline.
- No invented proof. Billdr and Contractor Foreman lean on counters and review scores. Omni GC has none yet, so the page uses mechanism (every number traces to a source) and a private-rollout posture instead.

## Skills and plugins used or found

- `slopmonster` (installed): every line of page copy linted to 5/5.
- `frontend-design` (Anthropic plugin directory, fetched from its GitHub source): applied as a design review, see the README.
- "Skills For Real React/React Native Engineers" (plugin directory): bundles `gsap-scroll-trigger`, `ui-motion`, `css-animations` and `unslop` skills. The closest match to a scroll-craft skill in the catalogue. Not installed in this session; the scroll work uses `motion` and `lenis` directly.
- `Motion Reel` and `Remotion` (plugin directory): code-rendered video skills, an option if the hero clip is ever re-rendered with more production value.

## Sources

- Billdr homepage and feature pages: https://www.billdr.ai/ and https://www.billdr.ai/ai-features
- Bobyard homepage and about page: https://www.bobyard.com/ and https://www.bobyard.com/about
- Bobyard 2.0 announcement: https://www.businesswire.com/news/home/20260408131586/en/
- Procore homepage: https://www.procore.com/
- Contractor Foreman on Capterra: https://www.capterra.com/p/166113/Contractor-Foreman/
- JACK App press kit (IBS 2026): https://www.buildersshow.com/assets/docs/ibs/pressKits/PK_206092_JACK_App_Press_Kit_2026.pdf
- JACK App on the App Store: https://apps.apple.com/ca/app/jack-app-construction-software/id6738333361
