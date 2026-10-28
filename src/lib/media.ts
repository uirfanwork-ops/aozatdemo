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
 * The hero explainer (omni-gc-promo.mp4 from the owner's Drive).
 * `local` is tried first; drop the file at public/explainer.mp4. If it is missing,
 * the player falls back to the Drive preview, which needs the file shared as
 * "anyone with the link".
 */
export const explainer = {
  local: "/explainer.mp4",
  driveId: "1nmJY8i5Up1Gwhci_YCMgpSejSx4tCO6y",
} as const;

/** Photorealistic staff imagery generated in the owner's Magnific library, self-hosted at 1024px. */
export const imagery = {
  foremanBlueprints: "/images/foreman-blueprints.jpg",
  superintendent: "/images/superintendent-steel-frame.jpg",
  blueprintsTable: "/images/blueprints-table.jpg",
  projectManagers: "/images/project-managers-fitout.jpg",
  estimator: "/images/estimator-site-office.jpg",
} as const;
