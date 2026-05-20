// Dynamic Sponsor Rosters for Bengal E-Summit 2026
import mediaPartnerLogo from '../../../assets/partners/Media Partner.jpg';

export const partnersData = {
  mediaPartner: {
    name: "91.9 Friends FM",
    role: "OFFICIAL MEDIA PARTNER",
    logo: mediaPartnerLogo
  },
  tiers: [
    {
      id: "title-sponsor",
      label: "TITLE SPONSOR-COMING SOON",
      className: "title-sponsor",
      sponsors: [
        { id: 1, name: "TITLE SPONSOR", isPlaceholder: true }
      ]
    },
    {
      id: "co-presenting",
      label: "CO-PRESENTING SPONSORS-COMING SOON",
      className: "co-presenting",
      sponsors: [
        { id: 1, name: "SPONSOR", isPlaceholder: true },
        { id: 2, name: "SPONSOR", isPlaceholder: true },
        { id: 3, name: "SPONSOR", isPlaceholder: true }
      ]
    },
    {
      id: "associates",
      label: "ASSOCIATES-COMING SOON",
      className: "associates",
      sponsors: [
        { id: 1, name: "ASSOCIATE", isPlaceholder: true },
        { id: 2, name: "ASSOCIATE", isPlaceholder: true },
        { id: 3, name: "ASSOCIATE", isPlaceholder: true },
        { id: 4, name: "ASSOCIATE", isPlaceholder: true },
        { id: 5, name: "ASSOCIATE", isPlaceholder: true },
        { id: 6, name: "ASSOCIATE", isPlaceholder: true }
      ]
    }
  ]
};
