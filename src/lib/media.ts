/**
 * Hosted media for the marketing site.
 *
 * These are licensed Freepik stock assets pulled through the Magnific library.
 * The signed URLs are valid for roughly one year from October 2026. Before
 * launch, download each file from the Magnific library (links below) and
 * place it in /public, then point these constants at the local path.
 *
 * Library: https://www.magnific.com/app/creation/cp1Yiux0eP
 *          https://www.magnific.com/app/creation/IfOoTlMtvE
 */
export const media = {
  heroVideo:
    "https://videocdn.cdnpk.net/videos/dba58ca8-ed54-50b2-b80d-7398bef6a174/horizontal/downloads/1080p.mp4?filename=0_Aerial_Drone_1920x1080.mp4&user_id=1280435&token=exp=1793204159~id=1280435~hmac=7e7994ae55c099d4d68f8bf6aff267017f8ad7c2269de58f29f9bc14f4d19370",
  concreteBeams:
    "https://pikaso.cdnpk.net/private/production/5871670472/3793263071.jpg?token=exp=1793404800~hmac=8693ba81d3aa0ad720f757406c64aa3c3476569a73f15f6785266a7748ec7c7f",
  craneSunset:
    "https://pikaso.cdnpk.net/private/production/5871670797/3793263213.jpg?token=exp=1793404800~hmac=00f74f9ebcc3392b3a2d63ba6510fbab02801a4be97ee339b806e6e858e33770",
} as const;

/**
 * The Omni GC tour (the four steps, then every part of the business), self-hosted in public/
 * as H.264 and a WebM copy for browsers built without H.264, with its poster frame. The
 * version query makes browsers fetch a new cut instead of a cached one; bump it with each. The hero dialog and
 * the tour section both play it. If the file ever fails to load, the dialog falls back to
 * the Drive preview, which still holds the earlier 30-second cut.
 */
export const explainer = {
  local: "/explainer.mp4?v=4",
  webm: "/explainer.webm?v=4",
  poster: "/explainer-poster.jpg?v=4",
  driveId: "1nmJY8i5Up1Gwhci_YCMgpSejSx4tCO6y",
} as const;

/** The tour file this browser can play: H.264 where it is supported, otherwise WebM. */
export function explainerSrc() {
  if (typeof document === "undefined") return explainer.local;
  const probe = document.createElement("video");
  return probe.canPlayType('video/mp4; codecs="avc1.640028, mp4a.40.2"') ? explainer.local : explainer.webm;
}

/** Photorealistic staff imagery generated in the owner's Magnific library, self-hosted at 1024px. */
export const imagery = {
  foremanBlueprints: "/images/foreman-blueprints.jpg",
  superintendent: "/images/superintendent-steel-frame.jpg",
  blueprintsTable: "/images/blueprints-table.jpg",
  projectManagers: "/images/project-managers-fitout.jpg",
  estimator: "/images/estimator-site-office.jpg",
} as const;
