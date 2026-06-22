// Static country -> region grouping for the "founderRegion" directory filter.
// companies.country is free text, so filtering by region means resolving the
// slug to a country list rather than storing a region column.
const REGIONS = {
  'west-africa': [
    'Nigeria', 'Ghana', 'Senegal', "Côte d'Ivoire", 'Mali', 'Sierra Leone', 'Liberia',
    'Guinea', 'Benin', 'Togo', 'Burkina Faso', 'Niger', 'Gambia', 'Guinea-Bissau',
    'Cabo Verde', 'Mauritania',
  ],
  'east-africa': [
    'Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Ethiopia', 'Somalia', 'South Sudan',
    'Burundi', 'Djibouti', 'Eritrea',
  ],
  'southern-africa': [
    'South Africa', 'Zambia', 'Zimbabwe', 'Botswana', 'Namibia', 'Mozambique',
    'Malawi', 'Lesotho', 'Eswatini', 'Angola',
  ],
  'north-africa': ['Egypt', 'Morocco', 'Tunisia', 'Algeria', 'Libya', 'Sudan'],
  'central-africa': [
    'Democratic Republic of the Congo', 'Cameroon', 'Gabon', 'Congo', 'Chad',
    'Central African Republic', 'Equatorial Guinea',
  ],
};

module.exports = { REGIONS };
