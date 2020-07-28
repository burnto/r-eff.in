const stateAbbrevs = {
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

const stateLookup = {};
Object.keys(stateAbbrevs).forEach(function (abbrev) {
  const name = stateAbbrevs[abbrev];
  stateLookup[name.toLowerCase()] = abbrev;
});

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "liquid",
    "ico",
    "png",
    "webmanifest",
    "xml",
    "css", // css is not yet a recognized template extension in Eleventy
  ]);

  eleventyConfig.addFilter("roundRt", function (r) {
    return Number(r).toFixed(2);
  });

  eleventyConfig.addFilter("severityClass", function (r) {
    // if (!r) {
    //   return "unknown";
    // }
    const n = Number(r);
    console.log(n, r);
    if (n < 0.8) {
      return "safe";
    } else if (n < 1) {
      return "moderate";
    } else if (n < 1.1) {
      return "risk";
    } else if (n < 1.25) {
      return "danger";
    } else {
      return "severe";
    }
  });

  eleventyConfig.addFilter("stripCounty", function (s) {
    return s.split("-county")[0];
  });
  eleventyConfig.addFilter("stateAbbrev", function (s) {
    return stateLookup[s.toLowerCase()];
  });

  // You can return your Config object (optional).
  return {};
};
