// Speaker information exactly as supplied. Do not add biographies that were
// not provided. The image assigned to Dauda Adekunle Folarin is confirmed by
// a captioned photo; the Keynote and Lead Speaker images are placed by best
// guess from the uploaded set and should be confirmed/swapped if wrong.
//
// `objectPosition` keeps each face inside the 4:5 portrait crop — tune it per
// photograph if you replace an image.
export type Speaker = {
  role: string;
  name: string;
  designations: string;
  position: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  objectPosition: string;
  /** Optional zoom (>1) to crop out captions/borders baked into a supplied photo. */
  zoom?: number;
};

export const speakers: Speaker[] = [
  {
    role: "Chief Host",
    name: "Dr. Abiodun Oluseye",
    designations: "FBDM, FCA, FCPA",
    position: "Rector, Ogun State Institute of Technology, Igbesa",
    image: "/speakers/chief-host-rector.jpeg",
    imageWidth: 407,
    imageHeight: 491,
    objectPosition: "50% 14%",
    zoom: 1.14,
  },
  {
    role: "Host",
    name: "Engr. Dr. Dauda Adekunle Folarin",
    designations: "FNSE, FNIEEE, CEE, FIPMD, Reg. Eng. COREN",
    position: "Dean, School of Engineering Technology, Ogun State Institute of Technology, Igbesa",
    image: "/speakers/host-dean.jpeg",
    imageWidth: 765,
    imageHeight: 1020,
    objectPosition: "50% 4%",
    zoom: 1.28,
  },
  {
    role: "Keynote Speaker",
    name: "Engr. Prof. Kazeem Adenkunle Adebiyi",
    designations: "FNSE, FNIMech, FNISafety, Reg. Eng. COREN",
    position: "Chairman, Governing Council, Adeseun Ogundoyin Polytechnic, Eruwa, Oyo State, Nigeria",
    image: "/speakers/keynote-speaker.jpeg",
    imageWidth: 1066,
    imageHeight: 1280,
    objectPosition: "50% 30%",
    zoom: 1.2,
  },
  {
    role: "Lead Speaker",
    name: "Engr. Dr. Taofeek Adenike Abdul-Hameed",
    designations: "FNSE, FNIEEE, FCMC, FIPMD, Reg. Eng. COREN",
    position: "Immediate Past Rector, Federal Polytechnic Ayede, Oyo State, Nigeria",
    image: "/speakers/lead-speaker.jpeg",
    imageWidth: 683,
    imageHeight: 1080,
    objectPosition: "50% 16%",
    zoom: 1.18,
  },
];
