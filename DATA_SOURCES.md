# Data Sources for meniny365.sk

This document describes the data sources used for Slovak name days (meniny) and how the data is collected and maintained.

## Primary Sources

The name days data is collected from publicly available Slovak sources:

### 1. kalendar.aktuality.sk
- **URL**: https://kalendar.aktuality.sk
- **Description**: Official Slovak calendar with name days
- **Reliability**: High - official source
- **Update Frequency**: Annual
- **Data Format**: HTML pages with structured data

### 2. calendar.zoznam.sk
- **URL**: https://calendar.zoznam.sk
- **Description**: Slovak calendar service
- **Reliability**: High - established service
- **Update Frequency**: Annual
- **Data Format**: HTML pages

### 3. namedaycalendar.com
- **URL**: https://namedaycalendar.com
- **Description**: International name day calendar
- **Reliability**: Medium - international source
- **Update Frequency**: Annual
- **Data Format**: HTML pages with Slovakia section

## Data Collection Process

### Annual Import Script

The data is refreshed annually using the import script:

```bash
npm run import:sk2025
```

This script:
1. Fetches data from primary sources
2. Parses and normalizes the data
3. Creates monthly JSON files
4. Merges into a single annual file
5. Validates data integrity

### Data Structure

Each data file contains a JSON object mapping dates to names:

```json
{
  "2025-01-01": ["Gašpar", "Melchior", "Baltazar"],
  "2025-01-02": ["Alexandra", "Karina", "Sandra"],
  "2025-01-03": ["Daniel", "Danuša"]
}
```

### Data Normalization

The collected data is normalized to ensure consistency:

- **Date Format**: ISO 8601 (YYYY-MM-DD)
- **Name Format**: Proper Slovak capitalization
- **Diacritics**: Preserved Slovak diacritics
- **Deduplication**: Duplicate names removed
- **Validation**: Data integrity checks

## Data Accuracy

### Validation Process

1. **Source Verification**: Data cross-referenced across multiple sources
2. **Format Validation**: Ensures proper date and name formats
3. **Completeness Check**: Verifies all days have name assignments
4. **Consistency Check**: Ensures no conflicting data

### Known Limitations

- **Regional Variations**: Some names may vary by region
- **Historical Changes**: Name assignments may change over time
- **Source Discrepancies**: Minor differences between sources
- **Update Delays**: Sources may not update immediately

## Legal Considerations

### Data Usage Rights

- **Public Domain**: Name days are factual information
- **No Copyright**: Dates and names are not copyrightable
- **Fair Use**: Data used for informational purposes
- **Attribution**: Sources properly credited

### Compliance

- **GDPR**: No personal data collected
- **Terms of Service**: Compliant with source terms
- **Attribution**: Sources properly credited
- **Updates**: Data refreshed annually

## Maintenance Schedule

### Annual Updates

- **January**: Import new year's data
- **Validation**: Cross-check with multiple sources
- **Testing**: Verify all functionality works
- **Deployment**: Update production data

### Monitoring

- **Data Quality**: Regular validation checks
- **Source Availability**: Monitor source accessibility
- **User Reports**: Address any data discrepancies
- **Performance**: Ensure fast data loading

## Contact Information

For questions about data sources or to report discrepancies:

- **Email**: info@meniny365.sk
- **GitHub**: [meniny365-sources](https://github.com/meniny365/sources)
- **Website**: [meniny365.sk](https://meniny365.sk)

## Changelog

### 2025-01-15
- Initial data import for 2025
- Added three primary sources
- Implemented validation process
- Created annual update schedule

---

*This document is updated annually with the data import process.*
