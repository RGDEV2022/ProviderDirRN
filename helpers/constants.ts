export const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const TELE_HEALTH_URL = 'https://doctorondemand.com/microsite/evryhealth/';

export const PHCS_URL = 'https://www.multiplan.com/webcenter/portal/ProviderSearch';

export const MAGELLAN_URL = 'https://magellanrx.com/member/find-a-pharmacy/';

export const RATING_TYPE = 5;
export const RATING_VALUE_TYPE = 11;

export const typeToRoute = {
  landing: '/',
  search: '/search-results/',
  details: '/provider-profile/',
  compare: '/compare/'
};

export const defaultFilters = {
  gender: null,
  acceptingNew: null,
  entityTypeCode: null,
  radius: 50,
  page: 1
};

export const filters = {
  places: [
    { label: 'All People & Places', value: null },
    { label: 'Places', value: '2' },
    { label: 'People', value: '1' }
  ],
  types: [
    { label: 'All Types', value: null },
    { label: 'Hospital Based', value: true },
    { label: 'Non Hospital Based', value: false }
  ],
  genders: [
    { label: 'All Genders', value: null },
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 }
  ],
  acceptingStatus: [
    { label: 'All Availability', value: null },
    { label: 'Accepting New Patients', value: true },
    { label: 'Not Accepting New Patients', value: false }
  ],
  radius: [
    { label: '30 miles', value: 30 },
    { label: '50 miles', value: 50 },
    { label: '100 miles', value: 100 }
  ],
  sortBy: [
    { label: 'Price', value: 'Price' },
    { label: 'Distance', value: 'Distance' },
    { label: 'A-Z', value: 'A-Z' },
    { label: 'Z-A', value: 'Z-A' }
  ],
  plans: [
    { label: 'Evry Premier (EPO)', value: 1 },
    { label: 'Evry Premier Plus (PPO)', value: 2 }
  ]
};

const IMG_OPACITY = 0.3;

export const providerTypes: {
  id: string;
  label: TSpecialtyTypeLabels;
  value: TSpecialtyTypeValues;
  hasSubTypes?: boolean;
  color: string;
}[] = [
  {
    id: 'primaryCareDoctors',
    label: 'Primary Care',
    value: 'Primary Care',
    hasSubTypes: true,
    color: `rgba(178 240 251, ${IMG_OPACITY})`
  },
  {
    id: 'specialtyDoctors',
    label: 'Specialty Doctors',
    value: 'Specialty Doctors',
    color: `rgba(255, 190, 188, ${IMG_OPACITY})`
  },
  {
    id: 'hospitals',
    label: 'Hospitals',
    value: 'Hospital',
    hasSubTypes: true,
    color: `rgba(226, 196, 255, ${IMG_OPACITY})`
  },
  {
    id: 'urgentCares',
    label: 'Urgent Cares',
    value: 'Urgent Care',
    color: `rgba(255, 189, 187, ${IMG_OPACITY})`
  },
  {
    id: 'emergencyRooms',
    label: 'Emergency Rooms',
    value: 'Emergency Room',
    color: `rgba(255, 190, 188, ${IMG_OPACITY})`
  },
  {
    id: 'labs',
    label: 'Labs & Testing',
    value: 'Lab',
    color: `rgba(226, 196, 255, ${IMG_OPACITY})`
  },
  {
    id: 'imagingCenters',
    label: 'Imaging Centers',
    value: 'Imaging Center',
    hasSubTypes: true,
    color: `rgba(178, 240, 251, ${IMG_OPACITY})`
  },
  {
    id: 'behavioralHealth',
    label: 'Behavioral Health',
    value: 'Behavioral Health',
    hasSubTypes: true,
    color: `rgba(255, 189, 187, ${IMG_OPACITY})`
  },
  {
    id: 'infusionCenters',
    label: 'Infusion Centers',
    value: 'Infusion Center',
    color: `rgba(226, 196, 255, ${IMG_OPACITY})`
  },
  {
    id: 'ambulatorySurgeryCenter',
    label: 'Ambulatory Surgery Centers',
    value: 'Ambulatory Surgery Center',
    color: `rgba(178, 240, 251, ${IMG_OPACITY})`
  }
];

export const specialtyTypeValues = [
  'Primary Care',
  'Specialty Doctors',
  'Hospital',
  'Urgent Care',
  'Emergency Room',
  'Lab',
  'Imaging Center',
  'Behavioral Health',
  'Ambulatory Surgery Center',
  'Infusion Center'
] as const;

export const specialtyTypeLabels = [
  'Primary Care',
  'Hospitals',
  'Specialty Doctors',
  'Urgent Cares',
  'Emergency Rooms',
  'Labs & Testing',
  'Imaging Centers',
  'Behavioral Health',
  'Ambulatory Surgery Centers',
  'Infusion Centers'
] as const;

export type TSpecialtyTypeValues = typeof specialtyTypeValues[number];
export type TSpecialtyTypeLabels = typeof specialtyTypeLabels[number];

export const costCategories = [
  {
    label: 'All Procedures',
    value: 'All Procedures',
    ids: null,
    imgId: 'allProcedures',
    color: `rgb(164, 252, 196, ${IMG_OPACITY})`
  },
  {
    label: 'Office Visits',
    value: 'Office Visits',
    ids: [303, 272, 298],
    imgId: 'nurse',
    color: `rgb(226, 196, 255, ${IMG_OPACITY})`
  },
  {
    label: 'Immunizations',
    value: 'Immunizations',
    ids: [343, 361, 282, 350, 347, 362, 345, 363],
    imgId: 'immunization',
    color: `rgb(255, 189, 189, ${IMG_OPACITY})`
  },
  {
    label: 'Behavioral',
    value: 'Behavioral Health',
    ids: [247, 321],
    imgId: 'behavioralHealth',
    color: `rgb(255, 189, 187, ${IMG_OPACITY})`
  },
  {
    label: 'Imaging',
    value: 'Imaging Centers',
    ids: [256, 260, 293, 323, 356, 360],
    imgId: 'imagingCenters',
    color: `rgb(178, 240, 251, ${IMG_OPACITY})`
  },
  {
    label: 'Labs',
    value: 'Labs & Testing',
    ids: [288],
    imgId: 'labs',
    color: `rgb(226, 196, 255, ${IMG_OPACITY})`
  },
  {
    label: 'Physical / Occupation Therapy',
    value: 'Physical',
    ids: [317],
    imgId: 'physicals',
    color: `rgb(255, 189, 188, ${IMG_OPACITY})`
  }
] as const;

export type TCostCategories = typeof costCategories[number]['label'];

export const telehealthCodes = ['98967', '98968', '99441', '99442', '99443'];

export const standardMetaTitle = 'Find Healthcare Providers: Compare Care Near You | Evry Health';
export const standardMetaDescription =
  'Find healthcare providers near you. Compare care and compare prices. Evry Health Provider Portal.';

export const specialtyDoctorList = [
  'ALLERGY & IMMUNOLOGY',
  'ANESTHESIOLOGY',
  'AUDIOLOGY',
  'BEHAVIORAL HEALTH',
  'CARDIOLOGY',
  'CHIROPRACTOR',
  'DERMATOLOGY',
  'DURABLE MEDICAL EQUIPMENT',
  'ENDOCRINOLOGY',
  'ENT/OTOLARYNGOLOGY',
  'EYE DOCTOR',
  'GASTROENTEROLOGY',
  'GENERAL SURGERY',
  'GERIATRIC MEDICINE',
  'IMAGING CENTER',
  'INFECTIOUS DISEASES',
  'LAB',
  'COUNSELOR',
  'NEPHROLOGY',
  'NEUROLOGY',
  'OBGYN',
  'OCCUPATIONAL THERAPY',
  'OPHTHALMOLOGY',
  'OPTOMETRY',
  'ORTHOPEDIC',
  'PAIN MANAGEMENT',
  'PEDIATRIC',
  'PSYCHIATRY',
  'PSYCHOLOGY',
  'PHYSICAL THERAPY',
  'PODIATRY',
  'PSYCHIATRY',
  'PSYCHOLOGY',
  'PULMONOLOGY',
  'SPORTS MEDICINE',
  'SURGERY',
  'UROLOGY'
];

export const specialtyToCategory = {
  Radiology: ['DIAGNOSTIC RADIOLOGY', 'RADIOLOGY'],
  Pathology: ['PATHOLOGY'],
  'Emergency Medicine': ['EMERGENCY MEDICINE'],
  Anesthesiology: ['ANESTHESIOLOGY'],
  Neonatology: ['NEONATOLOGY'],
  'Assistant Surgeons': ['CARDIOVASCULAR DISEASE']
};

export type TSpecialty =
  | 'Radiology'
  | 'Pathology'
  | 'Emergency Medicine'
  | 'Anesthesiology'
  | 'Neonatology'
  | 'Assistant Surgeons';

export const affiliationSpecialties = [
  'Radiology',
  'Pathology',
  'Emergency Medicine',
  'Anesthesiology',
  'Neonatology',
  'Assistant Surgeons'
] as TSpecialty[];

export const PRICE_TRANSPARENCY_DISCLAIMER =
  'Evry Healthcare, Inc. (“Evry”) makes all commercially reasonable efforts to ensure all information displayed in our provider directory and cost transparency tool is accurate and up-to-date. This directory is updated regularly. However, Evry cannot guarantee that provider details are free of errors or omissions. Changes in our network and pricing can occur after this information is published. Your coverage depends on the contract status of the provider and some providers listed may not longer be available. Please call the provider’s office or Evry member services at 855-579-EVRY to confirm network status.\n\n Directory information displayed such as specialty, affiliations, board certification, acceptance of new patients and languages is obtained from a signed credentialing application or from a roster supplied by the health care provider. Physician board certification is validated. Information is updated when a provider or facilities notifies Evry of changes, or at least every three years.\n\n All cost estimates from our price transparency tool are intended to provide information that can assist individuals in health care decision-making. This information utilizes contracted rates in its calculation and not historical information. It should not be used as the sole basis for decision-making as such measures have a risk of error. Evry members are encouraged to consider all relevant information and to speak with a provider before scheduling treatment.';

export const DEFAULT_RECORDS_PER_PAGE = 25;

export const DEFAULT_FILTERS = {
  page: 1,
  recordsPerPage: DEFAULT_RECORDS_PER_PAGE,
  specialties: [],
  searchWithinBound: false,
  gender: null,
  acceptingNew: null,
  entityTypeCode: null,
  radius: 50,
  hospitalBased: false
};

export const PHCS_NOTICE =
  "Your Evry Premier Plus (PPO) plan includes access to PHCS physicians. Please note that PHCS providers must be searched for on PHCS's external directory. See instructions below on how to search this network or visit MultiPlan's directory.";

export const GENDER_ENUM = {
  1: 'Male',
  2: 'Female',
  3: 'Unknown'
};

export const ENTITY_TYPE_ENUM = {
  1: 'Person',
  2: 'Organization'
};
