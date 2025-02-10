export const memberData = {
    "_id": "aise-8c7507e0-02ec-4120-a54e-6e261b391465-aise-0",
    "measurementType": "aise",
    "memberId": "aise-8c7507e0-02ec-4120-a54e-6e261b391465",
    "timeStamp": "2024-12-28T19:49:25.705Z",
    "coverage": [
        {
            "status": {
                "value": "active"
            },
            "type": {
                "coding": [
                    {
                        "system": {
                            "value": "https://terminology.hl7.org/CodeSystem/v3-ActCode"
                        },
                        "code": {
                            "value": "MCPOL"
                        },
                        "display": {
                            "value": "Managed Care Policy"
                        }
                    }
                ]
            },
            "subscriber": {
                "reference": {
                    "value": "Patient/aise-8c7507e0-02ec-4120-a54e-6e261b391465"
                }
            },
            "beneficiary": {
                "reference": {
                    "value": "Patient/aise-8c7507e0-02ec-4120-a54e-6e261b391465"
                }
            },
            "relationship": {
                "coding": [
                    {
                        "code": {
                            "value": "self"
                        }
                    }
                ]
            },
            "period": {
                "start": {
                    "value": "2023-12-24"
                },
                "end": {
                    "value": "2025-12-24"
                }
            },
            "payor": [
                {
                    "reference": {
                        "value": "Organization/2"
                    }
                }
            ],
            "id": {
                "value": "a70f9595-9d82-4aec-9310-d59fe7b9faab"
            }
        }
    ],
    "providers": [
        {
            "reference": "Organization?identifier=667531",
            "display": "Hollifield Clinics"
        },
        {
            "reference": "Practitioner?identifier=7882499",
            "display": "Nurse Practitioner Sharon Arthurs"
        }
    ],
    "aise-8c7507e0-02ec-4120-a54e-6e261b391465": {
        "Initial Population 1": true,
        "Initial Population 2": true,
        "Initial Population 3": true,
        "Initial Population 4": true,
        "Exclusions 1": true,
        "Exclusions 2": true,
        "Exclusions 3": true,
        "Exclusions 4": true,
        "Denominator 1": true,
        "Denominator 2": true,
        "Denominator 3": true,
        "Denominator 4": true,
        "Numerator 1": true,
        "Numerator 2": true,
        "Numerator 3": true,
        "Numerator 4": true,
        "id": "aise-8c7507e0-02ec-4120-a54e-6e261b391465"
    }
}
export const selectedMeasure = 'aise';
 export const storeInfo = {
    "composite": {
        "title": "Composite Score",
        "displayLabel": "Composite",
        "hasSubMeasures": false
    },
    "aise": {
        "domainOfCare": "ECDS",
        "title": "Adult Immunization Status",
        "displayLabel": "AIS-E",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": true
    },
    "aise-1": {
        "domainOfCare": "ECDS",
        "title": "Adult Immunization Status: Influenza",
        "displayLabel": "AIS-E: Influenza",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "aise-2": {
        "domainOfCare": "ECDS",
        "title": "Adult Immunization Status: Td/Tdap",
        "displayLabel": "AIS-E: Td/Tdap",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "aise-3": {
        "domainOfCare": "ECDS",
        "title": "Adult Immunization Status: Zoster",
        "displayLabel": "AIS-E: Zoster",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "aise-4": {
        "domainOfCare": "ECDS",
        "title": "Adult Immunization Status: Pneumococcal",
        "displayLabel": "AIS-E: Pneumococcal",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "aab": {
        "domainOfCare": "EOC",
        "title": "Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis",
        "displayLabel": "AAB",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "aab-1": {
        "domainOfCare": "EOC",
        "title": "Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis",
        "displayLabel": "AAB",
        "measureType": "process",
        "weight": 1,
        "hasSubMeasures": false
    },
    "drre": {
        "domainOfCare": "ECDS",
        "title": "Depression Remission or Response for Adolescents and Adults",
        "displayLabel": "DRR-E",
        "measureType": "outcome",
        "weight": 1,
        "hasSubMeasures": true
    },
    "drre-1": {
        "domainOfCare": "ECDS",
        "title": "Depression Follow-Up",
        "displayLabel": "DRR-E: Follow-Up",
        "measureType": "outcome",
        "weight": 1,
        "hasSubMeasures": false
    },
    "drre-2": {
        "domainOfCare": "ECDS",
        "title": "Depression Remission",
        "displayLabel": "DRR-E: Remission",
        "measureType": "outcome",
        "weight": 1,
        "hasSubMeasures": false
    },
    "drre-3": {
        "domainOfCare": "ECDS",
        "title": "Depression Response",
        "displayLabel": "DRR-E: Response",
        "measureType": "outcome",
        "weight": 1,
        "hasSubMeasures": false
    },
    "imae": {
        "domainOfCare": "ECDS",
        "title": "Immunizations for Adolescents",
        "displayLabel": "IMA-E",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": true
    },
    "imae-1": {
        "domainOfCare": "ECDS",
        "title": "Meningococcal Serogroups A, C, W, Y",
        "displayLabel": "IMA-E: Meningococcal",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": false
    },
    "imae-2": {
        "domainOfCare": "ECDS",
        "title": "Tdap",
        "displayLabel": "IMA-E: Tdap",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": false
    },
    "imae-3": {
        "domainOfCare": "ECDS",
        "title": "HPV",
        "displayLabel": "IMA-E: HPV",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": false
    },
    "imae-4": {
        "domainOfCare": "ECDS",
        "title": "Combination 1: Meningococcal, Tdap",
        "displayLabel": "IMA-E: Combination 1",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": false
    },
    "imae-5": {
        "domainOfCare": "ECDS",
        "title": "Combination 2: Meningococcal, Tdap, HPV",
        "displayLabel": "IMA-E: Combination 2",
        "measureType": "outcome",
        "weight": 3,
        "hasSubMeasures": false
    }
}