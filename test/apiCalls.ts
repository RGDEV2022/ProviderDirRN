export const providerSearchIn = {
  page: 1,
  only_search_within_bound: false,
  records_per_page: 25,
  search_string: "",
  order_by: "Distance",
  order_by_desc: false,
  my_location: { latitude: 32.9822054, longitude: -96.7074236 },
  latitude_longitude_bounds: {
    south_west: {},
    north_east: {},
  },
  specialties: [],
  gender: 1,
  entity_type_code: null,
  accepting_new_patients: true,
  radius: 50,
  procedure_code: null,
  hospital_based_providers: false,
  plan_id: 1,
  fips_codes: null,
};

export const providerSearchOut = {
  related_specialties: [],
  corrected_search_string: null,
  current_page: 1,
  total_records: 13951,
  total_pages: 559,
  records_per_page: 25,
  has_next_page: true,
  has_previous_page: false,
  data: [
    {
      entity_type_code: "2",
      last_name: "METHODIST HOSPITAL FOR CONTINUING CARE",
      middle_name: "",
      first_name: "",
      suffix: "",
      prefix: "",
      title: "",
      full_name: "METHODIST HOSPITAL FOR CONTINUING CARE",
      specialties: [
        {
          value: "ACUTE INPATIENT HOSPITAL",
          id: "ACUTE INPATIENT HOSPITAL",
        },
      ],
      provider_directory_location_id: 9389,
      address1: "401 W CAMPBELL RD",
      address2: "",
      city: "RICHARDSON",
      state: "TX",
      zip: "75080",
      county: "DALLAS",
      latitude: 32.9743457,
      longitude: -96.7268631,
      distance: 1.2507094173982416,
      distance_from_center_of_map: 1.2507094173982416,
      phone_number: "4692041000",
      npi: "1811142359",
      gender: 3,
      group_name: "METHODIST HOSPITAL FOR CONTINUING CARE",
      accepting_new_patients: true,
      affiliations: ["METHODIST HEALTH SYSTEM"],
      accepting_plans: ["Evry Premier (EPO)", "Evry Premier Plus (PPO)"],
      tooltip: {
        tooltip_header: "Warning",
        tooltip_description:
          "When selecting a Provider Group is it important to ask for the physicians listed below.  Not all physicians within a Group Practice may accept Evry Health insurance.",
      },
      estimated_price: null,
      icon_url: null,
      procedure_code: null,
      short_description: null,
      long_description: null,
      hospital_based_provider: false,
    },
  ],
};

export type TProviderSearch = typeof providerSearchIn;
export type TProviderSearchOut = typeof providerSearchOut;

export type TLocationCoords = {
  latitude: number;
  longitude: number;
};

const GetSearchSuggestionsIn = {
  search_string: "fami",
  my_location: { latitude: 32.9822054, longitude: -96.7074236 },
  plan_id: 1,
  radius: 50,
};

export type TGetSearchSuggestionsIn = typeof GetSearchSuggestionsIn;

const GetSearchSuggestionsOut = [
  {
    provider_search_suggestion_type: 2,
    id: "NURSE PRACTITIONER - FAMILY",
    description: "NURSE PRACTITIONER - FAMILY",
    specialties: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    entity_type_code: null,
    hospital_based_provider: null,
  },
  {
    provider_search_suggestion_type: 1,
    id: "2272",
    description: "HUY QUOC NGUYEN MD",
    specialties: ["INTERNAL MEDICINE"],
    address1: "3465 W WALNUT ST",
    address2: "STE 225",
    city: "GARLAND",
    state: "TX",
    zip: "75042",
    entity_type_code: "1",
    hospital_based_provider: false,
  },
];

export type TGetSearchSuggestionsOut = typeof GetSearchSuggestionsOut;
