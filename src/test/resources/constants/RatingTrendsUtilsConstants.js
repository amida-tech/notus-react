// IMAE
export const activeMeasureImae = {
    "_id": "imae-2022-02-27",
    "measure": "imae",
    "date": "2022-02-27T00:00:00.000Z",
    "value": 26.666666666666668,
    "starRating": 1.5,
    "denominator": 45,
    "numerator": 12,
    "initialPopulation": 49,
    "exclusions": 35,
    "subScores": [
        {
            "measure": "imae-1",
            "date": "2022-02-27T00:00:00.000Z",
            "value": 40,
            "denominator": 10,
            "numerator": 4,
            "initialPopulation": 10,
            "exclusions": 7,
            "label": "IMA-E - Meningococcal Serogroups A, C, W, Y"
        },
        {
            "measure": "imae-2",
            "date": "2022-02-27T00:00:00.000Z",
            "value": 50,
            "denominator": 10,
            "numerator": 5,
            "initialPopulation": 10,
            "exclusions": 7,
            "label": "IMA-E - Tdap"
        },
        {
            "measure": "imae-3",
            "date": "2022-02-27T00:00:00.000Z",
            "value": 30,
            "denominator": 10,
            "numerator": 3,
            "initialPopulation": 10,
            "exclusions": 7,
            "label": "IMA-E - HPV"
        },
        {
            "measure": "imae-4",
            "date": "2022-02-27T00:00:00.000Z",
            "value": 0,
            "denominator": 9,
            "numerator": 0,
            "initialPopulation": 10,
            "exclusions": 7,
            "label": "IMA-E - Combination 1: Meningococcal, Tdap"
        },
        {
            "measure": "imae-5",
            "date": "2022-02-27T00:00:00.000Z",
            "value": 0,
            "denominator": 6,
            "numerator": 0,
            "initialPopulation": 9,
            "exclusions": 7,
            "label": "IMA-E - Combination 2: Meningococcal, Tdap, HPV"
        }
    ],
    "label": "IMA-E - Immunizations for Adolescents",
    "shortLabel": "IMA-E",
    "title": "Immunizations for Adolescents"
}
export const measureTrendImae = {
    "measure": "imae",
    "percentChange": -52,
    "subScoreTrends": [
        {
            "measure": "imae-2",
            "percentChange": -36
        },
        {
            "measure": "imae-3",
            "percentChange": -46
        },
        {
            "measure": "imae-1",
            "percentChange": -54
        },
        {
            "measure": "imae-4",
            "percentChange": -60
        },
        {
            "measure": "imae-5",
            "percentChange": -72
        }
    ],
    "futurePrediction": {
        "2022-02-20": 50.402090735134756,
        "2022-02-21": 51.03935987194361,
        "2022-02-22": 51.67662900875246
    }
}
export const trendsImae = [
    {
        "measure": "aab",
        "percentChange": 9,
        "subScoreTrends": [
            {
                "measure": "aab-1",
                "percentChange": 9
            }
        ],
        "futurePrediction": {
            "2022-02-20": 85.58591329086472,
            "2022-02-21": 86.04889652344241,
            "2022-02-22": 86.5118797560201
        }
    },
    {
        "measure": "aise",
        "percentChange": -16,
        "subScoreTrends": [
            {
                "measure": "aise-1",
                "percentChange": -20
            },
            {
                "measure": "aise-2",
                "percentChange": -10
            },
            {
                "measure": "aise-3",
                "percentChange": 6
            },
            {
                "measure": "aise-4",
                "percentChange": -50
            }
        ],
        "futurePrediction": {}
    },
    {
        "measure": "drre",
        "percentChange": 34,
        "subScoreTrends": [
            {
                "measure": "drre-1",
                "percentChange": 63
            },
            {
                "measure": "drre-2",
                "percentChange": 27
            },
            {
                "measure": "drre-3",
                "percentChange": 19
            }
        ],
        "futurePrediction": {
            "2022-02-20": 68.23699713014412,
            "2022-02-21": 68.17193548082246,
            "2022-02-22": 68.10687383150078
        }
    },
    {
        "measure": "imae",
        "percentChange": -52,
        "subScoreTrends": [
            {
                "measure": "imae-2",
                "percentChange": -36
            },
            {
                "measure": "imae-3",
                "percentChange": -46
            },
            {
                "measure": "imae-1",
                "percentChange": -54
            },
            {
                "measure": "imae-4",
                "percentChange": -60
            },
            {
                "measure": "imae-5",
                "percentChange": -72
            }
        ],
        "futurePrediction": {
            "2022-02-20": 50.402090735134756,
            "2022-02-21": 51.03935987194361,
            "2022-02-22": 51.67662900875246
        }
    },
    {
        "measure": "composite",
        "percentChange": -9,
        "subScoreTrends": [],
        "futurePrediction": {}
    }
]
export const sortedTrendsResultImae = [
    {
        "measure": "imae-2",
        "percentChange": -36
    },
    {
        "measure": "imae-3",
        "percentChange": -46
    },
    {
        "measure": "imae-1",
        "percentChange": -54
    },
    {
        "measure": "imae-4",
        "percentChange": -60
    },
    {
        "measure": "imae-5",
        "percentChange": -72
    }
]

// Composite
export const activeMeasureComposite = {
    "_id": "composite-2022-02-27",
    "measure": "composite",
    "date": "2022-02-27T00:00:00.000Z",
    "value": 45.863095238095234,
    "starRating": 2.5,
    "numerator": 78,
    "denominator": 177,
    "initialPopulation": 183,
    "exclusions": 129,
    "label": "Composite - Composite Score",
    "shortLabel": "Composite",
    "title": "Composite Score"
}
export const measureTrendComposite = {
    "measure": "composite",
    "percentChange": -9,
    "subScoreTrends": [],
    "futurePrediction": {}
}
export const trendsComposite = [
    {
        "measure": "aab",
        "percentChange": 9,
        "subScoreTrends": [
            {
                "measure": "aab-1",
                "percentChange": 9
            }
        ],
        "futurePrediction": {
            "2022-02-20": 85.58591329086472,
            "2022-02-21": 86.04889652344241,
            "2022-02-22": 86.5118797560201
        }
    },
    {
        "measure": "aise",
        "percentChange": -16,
        "subScoreTrends": [
            {
                "measure": "aise-1",
                "percentChange": -20
            },
            {
                "measure": "aise-2",
                "percentChange": -10
            },
            {
                "measure": "aise-3",
                "percentChange": 6
            },
            {
                "measure": "aise-4",
                "percentChange": -50
            }
        ],
        "futurePrediction": {}
    },
    {
        "measure": "drre",
        "percentChange": 34,
        "subScoreTrends": [
            {
                "measure": "drre-1",
                "percentChange": 63
            },
            {
                "measure": "drre-2",
                "percentChange": 27
            },
            {
                "measure": "drre-3",
                "percentChange": 19
            }
        ],
        "futurePrediction": {
            "2022-02-20": 68.23699713014412,
            "2022-02-21": 68.17193548082246,
            "2022-02-22": 68.10687383150078
        }
    },
    {
        "measure": "imae",
        "percentChange": -52,
        "subScoreTrends": [
            {
                "measure": "imae-1",
                "percentChange": -54
            },
            {
                "measure": "imae-2",
                "percentChange": -36
            },
            {
                "measure": "imae-3",
                "percentChange": -46
            },
            {
                "measure": "imae-4",
                "percentChange": -60
            },
            {
                "measure": "imae-5",
                "percentChange": -72
            }
        ],
        "futurePrediction": {
            "2022-02-20": 50.402090735134756,
            "2022-02-21": 51.03935987194361,
            "2022-02-22": 51.67662900875246
        }
    },
    {
        "measure": "composite",
        "percentChange": -9,
        "subScoreTrends": [],
        "futurePrediction": {}
    }
]
export const sortedTrendsResultComposite = [
    {
        "measure": "drre",
        "percentChange": 34,
        "subScoreTrends": [
            {
                "measure": "drre-1",
                "percentChange": 63
            },
            {
                "measure": "drre-2",
                "percentChange": 27
            },
            {
                "measure": "drre-3",
                "percentChange": 19
            }
        ],
        "futurePrediction": {
            "2022-02-20": 68.23699713014412,
            "2022-02-21": 68.17193548082246,
            "2022-02-22": 68.10687383150078
        }
    },
    {
        "measure": "aab",
        "percentChange": 9,
        "subScoreTrends": [
            {
                "measure": "aab-1",
                "percentChange": 9
            }
        ],
        "futurePrediction": {
            "2022-02-20": 85.58591329086472,
            "2022-02-21": 86.04889652344241,
            "2022-02-22": 86.5118797560201
        }
    },
    {
        "measure": "aise",
        "percentChange": -16,
        "subScoreTrends": [
            {
                "measure": "aise-1",
                "percentChange": -20
            },
            {
                "measure": "aise-2",
                "percentChange": -10
            },
            {
                "measure": "aise-3",
                "percentChange": 6
            },
            {
                "measure": "aise-4",
                "percentChange": -50
            }
        ],
        "futurePrediction": {}
    },
    {
        "measure": "imae",
        "percentChange": -52,
        "subScoreTrends": [
            {
                "measure": "imae-1",
                "percentChange": -54
            },
            {
                "measure": "imae-2",
                "percentChange": -36
            },
            {
                "measure": "imae-3",
                "percentChange": -46
            },
            {
                "measure": "imae-4",
                "percentChange": -60
            },
            {
                "measure": "imae-5",
                "percentChange": -72
            }
        ],
        "futurePrediction": {
            "2022-02-20": 50.402090735134756,
            "2022-02-21": 51.03935987194361,
            "2022-02-22": 51.67662900875246
        }
    }
]

// Main Trend
export const activeMeasureMain = {
    "_id": "composite-2022-02-27",
    "measure": "composite",
    "date": "2022-02-27T00:00:00.000Z",
    "value": 45.863095238095234,
    "starRating": 2.5,
    "numerator": 78,
    "denominator": 177,
    "initialPopulation": 183,
    "exclusions": 129,
    "label": "Composite - Composite Score",
    "shortLabel": "Composite",
    "title": "Composite Score"
}
export const measureTrendMain = {
    "measure": "composite",
    "percentChange": -9,
    "subScoreTrends": [],
    "futurePrediction": {}
}
export const infoMain = {
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
export const resultMain = {
    measure: 'Composite',
    percentChange: -9
}