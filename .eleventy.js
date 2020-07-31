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

  eleventyConfig.addFilter("expletives", function (r) {
    if (!r) {
      return rand(
        "possibly fucked but hard to say",
        "probably best we don't know how fucked they are",
        "if a county is fucked in the woods does it make a sound?",
        // "no data but plenty of jesus",
        "doesnt know how fucked it is"
      );
    }
    const n = Number(r);

    if (n < 0.6) {
      return rand(
        "not at all fucked",
        "fucking great",
        "showing they have their shit together"
      );
    } else if (n < 0.8) {
      return rand("not fucked", "pretty fucking fine", "not fucking bad");
    } else if (n < 1) {
      return rand(
        "not the most fucked",
        "only somewhat fucked",
        "could be way more fucked",
        "not completely fucked yet"
      );
    } else if (n < 1.1) {
      return rand(
        "fucked",
        "not fucking good",
        "increasingly fucked",
        "looking fucked",
        "getting pretty fucked",
        "pretty fucking screwed"
      );
    } else if (n < 1.25) {
      return rand(
        "fucking fucked",
        "pretty much fucked",
        "fucking fucked up",
        "so fucked",
        "fucking screwed",
        "fuckers aren't wearing masks",
        "fuckers need to stay the fucked home"
      );
    } else {
      return rand(
        "so fucking fucked",
        "totally fucked",
        "fucking horrible",
        "fucking fuck fucked",
        "way way fucked"
      );
    }
  });

  eleventyConfig.addFilter("randomAngle", function (r) {
    return Math.round(Math.random() * 10 - 5);
  });

  eleventyConfig.addFilter("roundRt", function (r) {
    return Number(r).toFixed(2);
  });

  eleventyConfig.addFilter("severityClass", function (r) {
    if (!r) {
      return "unknown";
    }
    const n = Number(r);
    if (n < 0.6) {
      return "verylow";
    } else if (n < 0.8) {
      return "low";
    } else if (n < 1) {
      return "medium";
    } else if (n < 1.1) {
      return "high";
    } else if (n < 1.25) {
      return "veryhigh";
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

function rand() {
  // "|" for a kinda "int div"
  return arguments[(arguments.length * Math.random()) | 0];
}
