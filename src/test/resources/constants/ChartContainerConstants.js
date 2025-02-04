import mockTimelineDisplay from '../mockTimelineDisplay';

export const mockTimelineDisplayData = mockTimelineDisplay;

export const mock30DayTimeline = {
  choice: '30',
  range: [null, null]
};

export const mock90DayTimeline = {
  choice: '90',
  range: [null, null]
};

export const mockTimeline = (choice) => {
  return {
    choice: choice,
    range: [null, null]
  };
};

export const mockSelectedMeasure = {
  _id: 'aise-2022-02-27',
  measure: 'aise',
  date: '2022-02-27T00:00:00.000Z',
  value: 44.285714285714285,
  starRating: 2,
  denominator: 70,
  numerator: 31,
  initialPopulation: 71,
  exclusions: 72,
  subScores: [
    {
      measure: 'aise-1',
      date: '2022-02-27T00:00:00.000Z',
      value: 36.84210526315789,
      denominator: 19,
      numerator: 7,
      initialPopulation: 19,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Influenza'
    },
    {
      measure: 'aise-2',
      date: '2022-02-27T00:00:00.000Z',
      value: 52.63157894736842,
      denominator: 19,
      numerator: 10,
      initialPopulation: 19,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Td/Tdap'
    },
    {
      measure: 'aise-3',
      date: '2022-02-27T00:00:00.000Z',
      value: 52.94117647058824,
      denominator: 17,
      numerator: 9,
      initialPopulation: 18,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Zoster'
    },
    {
      measure: 'aise-4',
      date: '2022-02-27T00:00:00.000Z',
      value: 33.33333333333333,
      denominator: 15,
      numerator: 5,
      initialPopulation: 15,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Pneumococcal'
    }
  ],
  label: 'AIS-E - Adult Immunization Status',
  shortLabel: 'AIS-E',
  title: 'Adult Immunization Status'
};

export const mockResults = [
  {
    _id: 'composite-2022-02-12',
    measure: 'composite',
    starRating: 3,
    value: 56.54450261780105,
    numerator: 216,
    denominator: 382,
    initialPopulation: 376,
    exclusions: 316,
    date: '2022-02-12T00:00:00.000Z'
  },
  {
    _id: 'aab-2022-02-12',
    measure: 'aab',
    date: '2022-02-12T00:00:00.000Z',
    value: 75,
    denominator: 24,
    numerator: 18,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-12T00:00:00.000Z',
        value: 75,
        denominator: 24,
        numerator: 18,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'drre-2022-02-12',
    measure: 'drre',
    date: '2022-02-12T00:00:00.000Z',
    value: 66.6666666666667,
    denominator: 42,
    numerator: 28,
    initialPopulation: 42,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-12T00:00:00.000Z',
        value: 86.6666666666667,
        denominator: 15,
        numerator: 13,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-12T00:00:00.000Z',
        value: 46.6666666666667,
        denominator: 15,
        numerator: 7,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-12T00:00:00.000Z',
        value: 66.6666666666667,
        denominator: 12,
        numerator: 8,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aise-2022-02-12',
    measure: 'aise',
    date: '2022-02-12T00:00:00.000Z',
    value: 50,
    denominator: 68,
    numerator: 34,
    initialPopulation: 69,
    exclusions: 77,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-12T00:00:00.000Z',
        value: 42.1052631578947,
        denominator: 19,
        numerator: 8,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-12T00:00:00.000Z',
        value: 57.8947368421053,
        denominator: 19,
        numerator: 11,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-12T00:00:00.000Z',
        value: 50,
        denominator: 18,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-12T00:00:00.000Z',
        value: 50,
        denominator: 12,
        numerator: 6,
        initialPopulation: 13,
        exclusions: 17
      }
    ]
  },
  {
    _id: 'imae-2022-02-12',
    measure: 'imae',
    date: '2022-02-12T00:00:00.000Z',
    value: 50,
    denominator: 42,
    numerator: 21,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-12T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-12T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-12T00:00:00.000Z',
        value: 55.5555555555556,
        denominator: 9,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-12T00:00:00.000Z',
        value: 37.5,
        denominator: 8,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-12T00:00:00.000Z',
        value: 40,
        denominator: 5,
        numerator: 2,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'drre-2022-02-13',
    measure: 'drre',
    date: '2022-02-13T00:00:00.000Z',
    value: 66.6666666666667,
    denominator: 42,
    numerator: 28,
    initialPopulation: 42,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-13T00:00:00.000Z',
        value: 86.6666666666667,
        denominator: 15,
        numerator: 13,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-13T00:00:00.000Z',
        value: 46.6666666666667,
        denominator: 15,
        numerator: 7,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-13T00:00:00.000Z',
        value: 66.6666666666667,
        denominator: 12,
        numerator: 8,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-13',
    measure: 'aab',
    date: '2022-02-13T00:00:00.000Z',
    value: 79.1666666666667,
    denominator: 24,
    numerator: 19,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-13T00:00:00.000Z',
        value: 79.1666666666667,
        denominator: 24,
        numerator: 19,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-13',
    measure: 'aise',
    date: '2022-02-13T00:00:00.000Z',
    value: 48.5294117647059,
    denominator: 68,
    numerator: 33,
    initialPopulation: 69,
    exclusions: 77,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-13T00:00:00.000Z',
        value: 42.1052631578947,
        denominator: 19,
        numerator: 8,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-13T00:00:00.000Z',
        value: 57.8947368421053,
        denominator: 19,
        numerator: 11,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-13T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 18,
        numerator: 8,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-13T00:00:00.000Z',
        value: 50,
        denominator: 12,
        numerator: 6,
        initialPopulation: 13,
        exclusions: 17
      }
    ]
  },
  {
    _id: 'imae-2022-02-13',
    measure: 'imae',
    date: '2022-02-13T00:00:00.000Z',
    value: 47.6190476190476,
    denominator: 42,
    numerator: 20,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-13T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-13T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-13T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 9,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-13T00:00:00.000Z',
        value: 37.5,
        denominator: 8,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-13T00:00:00.000Z',
        value: 40,
        denominator: 5,
        numerator: 2,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-13',
    measure: 'composite',
    starRating: 3,
    value: 55.026455026455025,
    numerator: 104,
    denominator: 189,
    initialPopulation: 188,
    exclusions: 158,
    date: '2022-02-13T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-14',
    measure: 'drre',
    date: '2022-02-14T00:00:00.000Z',
    value: 64.2857142857143,
    denominator: 42,
    numerator: 27,
    initialPopulation: 42,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-14T00:00:00.000Z',
        value: 80,
        denominator: 15,
        numerator: 12,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-14T00:00:00.000Z',
        value: 46.6666666666667,
        denominator: 15,
        numerator: 7,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-14T00:00:00.000Z',
        value: 66.6666666666667,
        denominator: 12,
        numerator: 8,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-14',
    measure: 'aab',
    date: '2022-02-14T00:00:00.000Z',
    value: 83.3333333333333,
    denominator: 24,
    numerator: 20,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-14T00:00:00.000Z',
        value: 83.3333333333333,
        denominator: 24,
        numerator: 20,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-14',
    measure: 'aise',
    date: '2022-02-14T00:00:00.000Z',
    value: 49.2753623188406,
    denominator: 69,
    numerator: 34,
    initialPopulation: 70,
    exclusions: 77,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-14T00:00:00.000Z',
        value: 36.8421052631579,
        denominator: 19,
        numerator: 7,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-14T00:00:00.000Z',
        value: 63.1578947368421,
        denominator: 19,
        numerator: 12,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-14T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 18,
        numerator: 8,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-14T00:00:00.000Z',
        value: 53.8461538461538,
        denominator: 13,
        numerator: 7,
        initialPopulation: 14,
        exclusions: 17
      }
    ]
  },
  {
    _id: 'imae-2022-02-14',
    measure: 'imae',
    date: '2022-02-14T00:00:00.000Z',
    value: 44.1860465116279,
    denominator: 43,
    numerator: 19,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-14T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-14T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-14T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 9,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-14T00:00:00.000Z',
        value: 25,
        denominator: 8,
        numerator: 2,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-14T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 6,
        numerator: 2,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-14',
    measure: 'composite',
    starRating: 2.5,
    value: 54.45026178010471,
    numerator: 104,
    denominator: 191,
    initialPopulation: 189,
    exclusions: 158,
    date: '2022-02-14T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-15',
    measure: 'drre',
    date: '2022-02-15T00:00:00.000Z',
    value: 72.0930232558139,
    denominator: 43,
    numerator: 31,
    initialPopulation: 43,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-15T00:00:00.000Z',
        value: 86.6666666666667,
        denominator: 15,
        numerator: 13,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-15T00:00:00.000Z',
        value: 53.3333333333333,
        denominator: 15,
        numerator: 8,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-15T00:00:00.000Z',
        value: 76.9230769230769,
        denominator: 13,
        numerator: 10,
        initialPopulation: 13,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-15',
    measure: 'aab',
    date: '2022-02-15T00:00:00.000Z',
    value: 87.5,
    denominator: 24,
    numerator: 21,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-15T00:00:00.000Z',
        value: 87.5,
        denominator: 24,
        numerator: 21,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-15',
    measure: 'aise',
    date: '2022-02-15T00:00:00.000Z',
    value: 52.8571428571429,
    denominator: 70,
    numerator: 37,
    initialPopulation: 71,
    exclusions: 78,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-15T00:00:00.000Z',
        value: 47.3684210526316,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-15T00:00:00.000Z',
        value: 63.1578947368421,
        denominator: 19,
        numerator: 12,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-15T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 18,
        numerator: 8,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-15T00:00:00.000Z',
        value: 57.1428571428571,
        denominator: 14,
        numerator: 8,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'composite-2022-02-15',
    measure: 'composite',
    starRating: 3,
    value: 58.673469387755105,
    numerator: 115,
    denominator: 196,
    initialPopulation: 195,
    exclusions: 159,
    date: '2022-02-15T00:00:00.000Z'
  },
  {
    _id: 'imae-2022-02-15',
    measure: 'imae',
    date: '2022-02-15T00:00:00.000Z',
    value: 45.8333333333333,
    denominator: 48,
    numerator: 22,
    initialPopulation: 50,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-15T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-15T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-15T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-15T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 9,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-15T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 9,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'drre-2022-02-16',
    measure: 'drre',
    date: '2022-02-16T00:00:00.000Z',
    value: 72.0930232558139,
    denominator: 43,
    numerator: 31,
    initialPopulation: 43,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-16T00:00:00.000Z',
        value: 86.6666666666667,
        denominator: 15,
        numerator: 13,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-16T00:00:00.000Z',
        value: 53.3333333333333,
        denominator: 15,
        numerator: 8,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-16T00:00:00.000Z',
        value: 76.9230769230769,
        denominator: 13,
        numerator: 10,
        initialPopulation: 13,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-16',
    measure: 'aab',
    date: '2022-02-16T00:00:00.000Z',
    value: 91.304347826087,
    denominator: 23,
    numerator: 21,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-16T00:00:00.000Z',
        value: 91.304347826087,
        denominator: 23,
        numerator: 21,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'imae-2022-02-16',
    measure: 'imae',
    date: '2022-02-16T00:00:00.000Z',
    value: 42,
    denominator: 50,
    numerator: 21,
    initialPopulation: 50,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-16T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-16T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-16T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-16T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-16T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-16',
    measure: 'composite',
    starRating: 3,
    value: 57.57575757575758,
    numerator: 114,
    denominator: 198,
    initialPopulation: 195,
    exclusions: 159,
    date: '2022-02-16T00:00:00.000Z'
  },
  {
    _id: 'aise-2022-02-16',
    measure: 'aise',
    date: '2022-02-16T00:00:00.000Z',
    value: 50.7042253521127,
    denominator: 71,
    numerator: 36,
    initialPopulation: 71,
    exclusions: 78,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-16T00:00:00.000Z',
        value: 47.3684210526316,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-16T00:00:00.000Z',
        value: 63.1578947368421,
        denominator: 19,
        numerator: 12,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-16T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 18,
        numerator: 8,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-16T00:00:00.000Z',
        value: 46.6666666666667,
        denominator: 15,
        numerator: 7,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'drre-2022-02-17',
    measure: 'drre',
    date: '2022-02-17T00:00:00.000Z',
    value: 77.2727272727273,
    denominator: 44,
    numerator: 34,
    initialPopulation: 44,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-17T00:00:00.000Z',
        value: 93.3333333333333,
        denominator: 15,
        numerator: 14,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-17T00:00:00.000Z',
        value: 60,
        denominator: 15,
        numerator: 9,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-17T00:00:00.000Z',
        value: 78.5714285714286,
        denominator: 14,
        numerator: 11,
        initialPopulation: 14,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aise-2022-02-17',
    measure: 'aise',
    date: '2022-02-17T00:00:00.000Z',
    value: 58.9041095890411,
    denominator: 73,
    numerator: 43,
    initialPopulation: 73,
    exclusions: 80,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-17T00:00:00.000Z',
        value: 47.3684210526316,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-17T00:00:00.000Z',
        value: 73.6842105263158,
        denominator: 19,
        numerator: 14,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-17T00:00:00.000Z',
        value: 55.5555555555556,
        denominator: 18,
        numerator: 10,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-17T00:00:00.000Z',
        value: 58.8235294117647,
        denominator: 17,
        numerator: 10,
        initialPopulation: 17,
        exclusions: 20
      }
    ]
  },
  {
    _id: 'aab-2022-02-17',
    measure: 'aab',
    date: '2022-02-17T00:00:00.000Z',
    value: 95.4545454545455,
    denominator: 22,
    numerator: 21,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-17T00:00:00.000Z',
        value: 95.4545454545455,
        denominator: 22,
        numerator: 21,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'imae-2022-02-17',
    measure: 'imae',
    date: '2022-02-17T00:00:00.000Z',
    value: 46,
    denominator: 50,
    numerator: 23,
    initialPopulation: 50,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-17T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-17T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-17T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-17T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-17T00:00:00.000Z',
        value: 20,
        denominator: 10,
        numerator: 2,
        initialPopulation: 10,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-17',
    measure: 'composite',
    starRating: 3,
    value: 64.14141414141415,
    numerator: 127,
    denominator: 198,
    initialPopulation: 197,
    exclusions: 161,
    date: '2022-02-17T00:00:00.000Z'
  },
  {
    _id: 'aise-2022-02-18',
    measure: 'aise',
    date: '2022-02-18T00:00:00.000Z',
    value: 54.1666666666667,
    denominator: 72,
    numerator: 39,
    initialPopulation: 72,
    exclusions: 79,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-18T00:00:00.000Z',
        value: 47.3684210526316,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-18T00:00:00.000Z',
        value: 73.6842105263158,
        denominator: 19,
        numerator: 14,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-18T00:00:00.000Z',
        value: 44.4444444444444,
        denominator: 18,
        numerator: 8,
        initialPopulation: 18,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-18T00:00:00.000Z',
        value: 50,
        denominator: 16,
        numerator: 8,
        initialPopulation: 16,
        exclusions: 19
      }
    ]
  },
  {
    _id: 'imae-2022-02-18',
    measure: 'imae',
    date: '2022-02-18T00:00:00.000Z',
    value: 46,
    denominator: 50,
    numerator: 23,
    initialPopulation: 50,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-18T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-18T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-18T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-18T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-18T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'drre-2022-02-18',
    measure: 'drre',
    date: '2022-02-18T00:00:00.000Z',
    value: 74.4186046511628,
    denominator: 43,
    numerator: 32,
    initialPopulation: 43,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-18T00:00:00.000Z',
        value: 93.3333333333333,
        denominator: 15,
        numerator: 14,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-18T00:00:00.000Z',
        value: 53.3333333333333,
        denominator: 15,
        numerator: 8,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-18T00:00:00.000Z',
        value: 76.9230769230769,
        denominator: 13,
        numerator: 10,
        initialPopulation: 13,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-18',
    measure: 'aab',
    date: '2022-02-18T00:00:00.000Z',
    value: 86.9565217391304,
    denominator: 23,
    numerator: 20,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-18T00:00:00.000Z',
        value: 86.9565217391304,
        denominator: 23,
        numerator: 20,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'composite-2022-02-18',
    measure: 'composite',
    starRating: 3,
    value: 60.1010101010101,
    numerator: 119,
    denominator: 198,
    initialPopulation: 196,
    exclusions: 160,
    date: '2022-02-18T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-19',
    measure: 'drre',
    date: '2022-02-19T00:00:00.000Z',
    value: 54.7619047619048,
    denominator: 42,
    numerator: 23,
    initialPopulation: 42,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-19T00:00:00.000Z',
        value: 80,
        denominator: 15,
        numerator: 12,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-19T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 15,
        numerator: 5,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-19T00:00:00.000Z',
        value: 50,
        denominator: 12,
        numerator: 6,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-19',
    measure: 'aab',
    date: '2022-02-19T00:00:00.000Z',
    value: 69.2307692307692,
    denominator: 26,
    numerator: 18,
    initialPopulation: 22,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-19T00:00:00.000Z',
        value: 69.2307692307692,
        denominator: 26,
        numerator: 18,
        initialPopulation: 22,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-19',
    measure: 'aise',
    date: '2022-02-19T00:00:00.000Z',
    value: 56.9230769230769,
    denominator: 65,
    numerator: 37,
    initialPopulation: 66,
    exclusions: 77,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-19T00:00:00.000Z',
        value: 52.6315789473684,
        denominator: 19,
        numerator: 10,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-19T00:00:00.000Z',
        value: 63.1578947368421,
        denominator: 19,
        numerator: 12,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-3',
        date: '2022-02-19T00:00:00.000Z',
        value: 47.0588235294118,
        denominator: 17,
        numerator: 8,
        initialPopulation: 17,
        exclusions: 20
      },
      {
        measure: 'aise-4',
        date: '2022-02-19T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 11,
        exclusions: 17
      }
    ]
  },
  {
    _id: 'imae-2022-02-19',
    measure: 'imae',
    date: '2022-02-19T00:00:00.000Z',
    value: 58.5365853658537,
    denominator: 41,
    numerator: 24,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-19T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-19T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-19T00:00:00.000Z',
        value: 55.5555555555556,
        denominator: 9,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-19T00:00:00.000Z',
        value: 42.8571428571429,
        denominator: 7,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-19T00:00:00.000Z',
        value: 40,
        denominator: 5,
        numerator: 2,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-19',
    measure: 'composite',
    starRating: 3,
    value: 58.1151832460733,
    numerator: 111,
    denominator: 191,
    initialPopulation: 187,
    exclusions: 158,
    date: '2022-02-19T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-20',
    measure: 'drre',
    date: '2022-02-20T00:00:00.000Z',
    value: 37.2093023255814,
    denominator: 43,
    numerator: 16,
    initialPopulation: 43,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-20T00:00:00.000Z',
        value: 66.6666666666667,
        denominator: 15,
        numerator: 10,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-20T00:00:00.000Z',
        value: 20,
        denominator: 15,
        numerator: 3,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-20T00:00:00.000Z',
        value: 23.0769230769231,
        denominator: 13,
        numerator: 3,
        initialPopulation: 13,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-20',
    measure: 'aab',
    date: '2022-02-20T00:00:00.000Z',
    value: 57.1428571428571,
    denominator: 28,
    numerator: 16,
    initialPopulation: 24,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-20T00:00:00.000Z',
        value: 57.1428571428571,
        denominator: 28,
        numerator: 16,
        initialPopulation: 24,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-20',
    measure: 'aise',
    date: '2022-02-20T00:00:00.000Z',
    value: 53.030303030303,
    denominator: 66,
    numerator: 35,
    initialPopulation: 67,
    exclusions: 74,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-20T00:00:00.000Z',
        value: 47.3684210526316,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-20T00:00:00.000Z',
        value: 57.8947368421053,
        denominator: 19,
        numerator: 11,
        initialPopulation: 19,
        exclusions: 19
      },
      {
        measure: 'aise-3',
        date: '2022-02-20T00:00:00.000Z',
        value: 50,
        denominator: 18,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 19
      },
      {
        measure: 'aise-4',
        date: '2022-02-20T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 11,
        exclusions: 16
      }
    ]
  },
  {
    _id: 'imae-2022-02-20',
    measure: 'imae',
    date: '2022-02-20T00:00:00.000Z',
    value: 55.8139534883721,
    denominator: 43,
    numerator: 24,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-20T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-20T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-20T00:00:00.000Z',
        value: 55.5555555555556,
        denominator: 9,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-20T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 9,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-20T00:00:00.000Z',
        value: 40,
        denominator: 5,
        numerator: 2,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-20',
    measure: 'composite',
    starRating: 2.5,
    value: 50.505050505050505,
    numerator: 100,
    denominator: 198,
    initialPopulation: 191,
    exclusions: 153,
    date: '2022-02-20T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-21',
    measure: 'drre',
    date: '2022-02-21T00:00:00.000Z',
    value: 39.5348837209302,
    denominator: 43,
    numerator: 17,
    initialPopulation: 42,
    exclusions: 4,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-21T00:00:00.000Z',
        value: 80,
        denominator: 15,
        numerator: 12,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-21T00:00:00.000Z',
        value: 13.3333333333333,
        denominator: 15,
        numerator: 2,
        initialPopulation: 15,
        exclusions: 2
      },
      {
        measure: 'drre-3',
        date: '2022-02-21T00:00:00.000Z',
        value: 23.0769230769231,
        denominator: 13,
        numerator: 3,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-21',
    measure: 'aab',
    date: '2022-02-21T00:00:00.000Z',
    value: 55.1724137931034,
    denominator: 29,
    numerator: 16,
    initialPopulation: 24,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-21T00:00:00.000Z',
        value: 55.1724137931034,
        denominator: 29,
        numerator: 16,
        initialPopulation: 24,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-21',
    measure: 'aise',
    date: '2022-02-21T00:00:00.000Z',
    value: 48.4848484848485,
    denominator: 66,
    numerator: 32,
    initialPopulation: 67,
    exclusions: 74,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-21T00:00:00.000Z',
        value: 42.1052631578947,
        denominator: 19,
        numerator: 8,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-21T00:00:00.000Z',
        value: 57.8947368421053,
        denominator: 19,
        numerator: 11,
        initialPopulation: 19,
        exclusions: 19
      },
      {
        measure: 'aise-3',
        date: '2022-02-21T00:00:00.000Z',
        value: 38.8888888888889,
        denominator: 18,
        numerator: 7,
        initialPopulation: 18,
        exclusions: 19
      },
      {
        measure: 'aise-4',
        date: '2022-02-21T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 11,
        exclusions: 16
      }
    ]
  },
  {
    _id: 'imae-2022-02-21',
    measure: 'imae',
    date: '2022-02-21T00:00:00.000Z',
    value: 53.4883720930233,
    denominator: 43,
    numerator: 23,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-21T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-21T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-21T00:00:00.000Z',
        value: 55.5555555555556,
        denominator: 9,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-21T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 9,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-21T00:00:00.000Z',
        value: 20,
        denominator: 5,
        numerator: 1,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-21',
    measure: 'composite',
    starRating: 2.5,
    value: 49.74874371859296,
    numerator: 99,
    denominator: 199,
    initialPopulation: 190,
    exclusions: 153,
    date: '2022-02-21T00:00:00.000Z'
  },
  {
    _id: 'drre-2022-02-22',
    measure: 'drre',
    date: '2022-02-22T00:00:00.000Z',
    value: 43.9024390243902,
    denominator: 41,
    numerator: 18,
    initialPopulation: 42,
    exclusions: 3,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-22T00:00:00.000Z',
        value: 86.6666666666667,
        denominator: 15,
        numerator: 13,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-2',
        date: '2022-02-22T00:00:00.000Z',
        value: 13.3333333333333,
        denominator: 15,
        numerator: 2,
        initialPopulation: 15,
        exclusions: 1
      },
      {
        measure: 'drre-3',
        date: '2022-02-22T00:00:00.000Z',
        value: 27.2727272727273,
        denominator: 11,
        numerator: 3,
        initialPopulation: 12,
        exclusions: 1
      }
    ]
  },
  {
    _id: 'aab-2022-02-22',
    measure: 'aab',
    date: '2022-02-22T00:00:00.000Z',
    value: 51.6129032258064,
    denominator: 31,
    numerator: 16,
    initialPopulation: 25,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-22T00:00:00.000Z',
        value: 51.6129032258064,
        denominator: 31,
        numerator: 16,
        initialPopulation: 25,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-22',
    measure: 'aise',
    date: '2022-02-22T00:00:00.000Z',
    value: 40.9090909090909,
    denominator: 66,
    numerator: 27,
    initialPopulation: 67,
    exclusions: 74,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-22T00:00:00.000Z',
        value: 36.8421052631579,
        denominator: 19,
        numerator: 7,
        initialPopulation: 19,
        exclusions: 20
      },
      {
        measure: 'aise-2',
        date: '2022-02-22T00:00:00.000Z',
        value: 52.6315789473684,
        denominator: 19,
        numerator: 10,
        initialPopulation: 19,
        exclusions: 19
      },
      {
        measure: 'aise-3',
        date: '2022-02-22T00:00:00.000Z',
        value: 27.7777777777778,
        denominator: 18,
        numerator: 5,
        initialPopulation: 18,
        exclusions: 19
      },
      {
        measure: 'aise-4',
        date: '2022-02-22T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 11,
        exclusions: 16
      }
    ]
  },
  {
    _id: 'imae-2022-02-22',
    measure: 'imae',
    date: '2022-02-22T00:00:00.000Z',
    value: 41.8604651162791,
    denominator: 43,
    numerator: 18,
    initialPopulation: 46,
    exclusions: 50,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-22T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-2',
        date: '2022-02-22T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-3',
        date: '2022-02-22T00:00:00.000Z',
        value: 33.3333333333333,
        denominator: 9,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-4',
        date: '2022-02-22T00:00:00.000Z',
        value: 11.1111111111111,
        denominator: 9,
        numerator: 1,
        initialPopulation: 10,
        exclusions: 10
      },
      {
        measure: 'imae-5',
        date: '2022-02-22T00:00:00.000Z',
        value: 20,
        denominator: 5,
        numerator: 1,
        initialPopulation: 6,
        exclusions: 10
      }
    ]
  },
  {
    _id: 'composite-2022-02-22',
    measure: 'composite',
    starRating: 2,
    value: 44.221105527638194,
    numerator: 88,
    denominator: 199,
    initialPopulation: 191,
    exclusions: 152,
    date: '2022-02-22T00:00:00.000Z'
  },
  {
    _id: 'aab-2022-02-23',
    measure: 'aab',
    date: '2022-02-23T00:00:00.000Z',
    value: 91.30434782608695,
    starRating: -1,
    denominator: 23,
    numerator: 21,
    initialPopulation: 24,
    exclusions: 21,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-23T00:00:00.000Z',
        value: 91.30434782608695,
        denominator: 23,
        numerator: 21,
        initialPopulation: 24,
        exclusions: 21
      }
    ]
  },
  {
    _id: 'aise-2022-02-23',
    measure: 'aise',
    date: '2022-02-23T00:00:00.000Z',
    value: 57.14285714285714,
    starRating: 3,
    denominator: 70,
    numerator: 40,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-23T00:00:00.000Z',
        value: 47.368421052631575,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-2',
        date: '2022-02-23T00:00:00.000Z',
        value: 68.42105263157895,
        denominator: 19,
        numerator: 13,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-3',
        date: '2022-02-23T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18
      },
      {
        measure: 'aise-4',
        date: '2022-02-23T00:00:00.000Z',
        value: 60,
        denominator: 15,
        numerator: 9,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'drre-2022-02-23',
    measure: 'drre',
    date: '2022-02-23T00:00:00.000Z',
    value: 75.86206896551724,
    starRating: -1,
    denominator: 29,
    numerator: 22,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-23T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-2',
        date: '2022-02-23T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-3',
        date: '2022-02-23T00:00:00.000Z',
        value: 77.77777777777779,
        denominator: 9,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 0
      }
    ]
  },
  {
    _id: 'imae-2022-02-23',
    measure: 'imae',
    date: '2022-02-23T00:00:00.000Z',
    value: 47.91666666666667,
    starRating: 2.5,
    denominator: 48,
    numerator: 23,
    initialPopulation: 50,
    exclusions: 40,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-23T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 8
      },
      {
        measure: 'imae-2',
        date: '2022-02-23T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 8
      },
      {
        measure: 'imae-3',
        date: '2022-02-23T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 8
      },
      {
        measure: 'imae-4',
        date: '2022-02-23T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 8
      },
      {
        measure: 'imae-5',
        date: '2022-02-23T00:00:00.000Z',
        value: 25,
        denominator: 8,
        numerator: 2,
        initialPopulation: 10,
        exclusions: 8
      }
    ]
  },
  {
    _id: 'composite-2022-02-23',
    measure: 'composite',
    date: '2022-02-23T00:00:00.000Z',
    value: 68.056485150282,
    starRating: 3,
    numerator: 106,
    denominator: 170,
    initialPopulation: 175,
    exclusions: 133
  },
  {
    _id: 'aab-2022-02-24',
    measure: 'aab',
    date: '2022-02-24T00:00:00.000Z',
    value: 77.77777777777779,
    starRating: -1,
    denominator: 27,
    numerator: 21,
    initialPopulation: 28,
    exclusions: 21,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-24T00:00:00.000Z',
        value: 77.77777777777779,
        denominator: 27,
        numerator: 21,
        initialPopulation: 28,
        exclusions: 21
      }
    ]
  },
  {
    _id: 'aise-2022-02-24',
    measure: 'aise',
    date: '2022-02-24T00:00:00.000Z',
    value: 57.14285714285714,
    starRating: 3,
    denominator: 70,
    numerator: 40,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-24T00:00:00.000Z',
        value: 47.368421052631575,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-2',
        date: '2022-02-24T00:00:00.000Z',
        value: 68.42105263157895,
        denominator: 19,
        numerator: 13,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-3',
        date: '2022-02-24T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18
      },
      {
        measure: 'aise-4',
        date: '2022-02-24T00:00:00.000Z',
        value: 60,
        denominator: 15,
        numerator: 9,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'drre-2022-02-24',
    measure: 'drre',
    date: '2022-02-24T00:00:00.000Z',
    value: 73.33333333333333,
    starRating: 3.5,
    denominator: 30,
    numerator: 22,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-24T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-2',
        date: '2022-02-24T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-3',
        date: '2022-02-24T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 0
      }
    ]
  },
  {
    _id: 'imae-2022-02-24',
    measure: 'imae',
    date: '2022-02-24T00:00:00.000Z',
    value: 46.808510638297875,
    starRating: 2.5,
    denominator: 47,
    numerator: 22,
    initialPopulation: 50,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-24T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-2',
        date: '2022-02-24T00:00:00.000Z',
        value: 70,
        denominator: 10,
        numerator: 7,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-3',
        date: '2022-02-24T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-4',
        date: '2022-02-24T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-5',
        date: '2022-02-24T00:00:00.000Z',
        value: 28.57142857142857,
        denominator: 7,
        numerator: 2,
        initialPopulation: 10,
        exclusions: 7
      }
    ]
  },
  {
    _id: 'composite-2022-02-24',
    measure: 'composite',
    date: '2022-02-24T00:00:00.000Z',
    value: 63.765619723066536,
    starRating: 3,
    numerator: 105,
    denominator: 174,
    initialPopulation: 179,
    exclusions: 128
  },
  {
    _id: 'aab-2022-02-25',
    measure: 'aab',
    date: '2022-02-25T00:00:00.000Z',
    value: 68.75,
    starRating: 3.5,
    denominator: 32,
    numerator: 22,
    initialPopulation: 33,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-25T00:00:00.000Z',
        value: 68.75,
        denominator: 32,
        numerator: 22,
        initialPopulation: 33,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-25',
    measure: 'aise',
    date: '2022-02-25T00:00:00.000Z',
    value: 52.85714285714286,
    starRating: 2.5,
    denominator: 70,
    numerator: 37,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-25T00:00:00.000Z',
        value: 47.368421052631575,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-2',
        date: '2022-02-25T00:00:00.000Z',
        value: 63.1578947368421,
        denominator: 19,
        numerator: 12,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-3',
        date: '2022-02-25T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18
      },
      {
        measure: 'aise-4',
        date: '2022-02-25T00:00:00.000Z',
        value: 46.666666666666664,
        denominator: 15,
        numerator: 7,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'drre-2022-02-25',
    measure: 'drre',
    date: '2022-02-25T00:00:00.000Z',
    value: 66.66666666666666,
    starRating: 3.5,
    denominator: 30,
    numerator: 20,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-25T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-2',
        date: '2022-02-25T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-3',
        date: '2022-02-25T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 0
      }
    ]
  },
  {
    _id: 'imae-2022-02-25',
    measure: 'imae',
    date: '2022-02-25T00:00:00.000Z',
    value: 42.5531914893617,
    starRating: 2,
    denominator: 47,
    numerator: 20,
    initialPopulation: 50,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-25T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-2',
        date: '2022-02-25T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-3',
        date: '2022-02-25T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-4',
        date: '2022-02-25T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-5',
        date: '2022-02-25T00:00:00.000Z',
        value: 28.57142857142857,
        denominator: 7,
        numerator: 2,
        initialPopulation: 10,
        exclusions: 7
      }
    ]
  },
  {
    _id: 'composite-2022-02-25',
    measure: 'composite',
    date: '2022-02-25T00:00:00.000Z',
    value: 57.7067502532928,
    starRating: 3,
    numerator: 99,
    denominator: 179,
    initialPopulation: 184,
    exclusions: 129
  },
  {
    _id: 'aab-2022-02-26',
    measure: 'aab',
    date: '2022-02-26T00:00:00.000Z',
    value: 53.125,
    starRating: 2.5,
    denominator: 32,
    numerator: 17,
    initialPopulation: 33,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-26T00:00:00.000Z',
        value: 53.125,
        denominator: 32,
        numerator: 17,
        initialPopulation: 33,
        exclusions: 22
      }
    ]
  },
  {
    _id: 'aise-2022-02-26',
    measure: 'aise',
    date: '2022-02-26T00:00:00.000Z',
    value: 48.57142857142857,
    starRating: 2.5,
    denominator: 70,
    numerator: 34,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-26T00:00:00.000Z',
        value: 47.368421052631575,
        denominator: 19,
        numerator: 9,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-2',
        date: '2022-02-26T00:00:00.000Z',
        value: 57.89473684210527,
        denominator: 19,
        numerator: 11,
        initialPopulation: 19,
        exclusions: 18
      },
      {
        measure: 'aise-3',
        date: '2022-02-26T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18
      },
      {
        measure: 'aise-4',
        date: '2022-02-26T00:00:00.000Z',
        value: 33.33333333333333,
        denominator: 15,
        numerator: 5,
        initialPopulation: 15,
        exclusions: 18
      }
    ]
  },
  {
    _id: 'drre-2022-02-26',
    measure: 'drre',
    date: '2022-02-26T00:00:00.000Z',
    value: 60,
    starRating: 3,
    denominator: 30,
    numerator: 18,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-26T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-2',
        date: '2022-02-26T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 0
      },
      {
        measure: 'drre-3',
        date: '2022-02-26T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 0
      }
    ]
  },
  {
    _id: 'imae-2022-02-26',
    measure: 'imae',
    date: '2022-02-26T00:00:00.000Z',
    value: 35.55555555555556,
    starRating: 2,
    denominator: 45,
    numerator: 16,
    initialPopulation: 49,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-26T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-2',
        date: '2022-02-26T00:00:00.000Z',
        value: 60,
        denominator: 10,
        numerator: 6,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-3',
        date: '2022-02-26T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-4',
        date: '2022-02-26T00:00:00.000Z',
        value: 11.11111111111111,
        denominator: 9,
        numerator: 1,
        initialPopulation: 10,
        exclusions: 7
      },
      {
        measure: 'imae-5',
        date: '2022-02-26T00:00:00.000Z',
        value: 16.666666666666664,
        denominator: 6,
        numerator: 1,
        initialPopulation: 9,
        exclusions: 7
      }
    ]
  },
  {
    _id: 'composite-2022-02-26',
    measure: 'composite',
    date: '2022-02-26T00:00:00.000Z',
    value: 49.312996031746025,
    starRating: 2.5,
    numerator: 85,
    denominator: 177,
    initialPopulation: 183,
    exclusions: 129
  },
  {
    _id: 'aab-2022-02-27',
    measure: 'aab',
    date: '2022-02-27T00:00:00.000Z',
    value: 62.5,
    starRating: 3,
    denominator: 32,
    numerator: 20,
    initialPopulation: 33,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 62.5,
        denominator: 32,
        numerator: 20,
        initialPopulation: 33,
        exclusions: 22,
        label:
          'AAB-1 - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis'
      }
    ],
    label:
      'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    shortLabel: 'AAB',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis'
  },
  {
    _id: 'aise-2022-02-27',
    measure: 'aise',
    date: '2022-02-27T00:00:00.000Z',
    value: 44.285714285714285,
    starRating: 2,
    denominator: 70,
    numerator: 31,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 36.84210526315789,
        denominator: 19,
        numerator: 7,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Influenza'
      },
      {
        measure: 'aise-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.63157894736842,
        denominator: 19,
        numerator: 10,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Td/Tdap'
      },
      {
        measure: 'aise-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Zoster'
      },
      {
        measure: 'aise-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 33.33333333333333,
        denominator: 15,
        numerator: 5,
        initialPopulation: 15,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Pneumococcal'
      }
    ],
    label: 'AIS-E - Adult Immunization Status',
    shortLabel: 'AIS-E',
    title: 'Adult Immunization Status'
  },
  {
    _id: 'drre-2022-02-27',
    measure: 'drre',
    date: '2022-02-27T00:00:00.000Z',
    value: 50,
    starRating: 2.5,
    denominator: 30,
    numerator: 15,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Follow-Up'
      },
      {
        measure: 'drre-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Remission'
      },
      {
        measure: 'drre-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Response'
      }
    ],
    label:
      'DRR-E - Depression Remission or Response for Adolescents and Adults',
    shortLabel: 'DRR-E',
    title: 'Depression Remission or Response for Adolescents and Adults'
  },
  {
    _id: 'imae-2022-02-27',
    measure: 'imae',
    date: '2022-02-27T00:00:00.000Z',
    value: 26.666666666666668,
    starRating: 1.5,
    denominator: 45,
    numerator: 12,
    initialPopulation: 49,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Meningococcal Serogroups A, C, W, Y'
      },
      {
        measure: 'imae-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Tdap'
      },
      {
        measure: 'imae-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - HPV'
      },
      {
        measure: 'imae-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 9,
        numerator: 0,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Combination 1: Meningococcal, Tdap'
      },
      {
        measure: 'imae-5',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 6,
        numerator: 0,
        initialPopulation: 9,
        exclusions: 7,
        label: 'IMA-E - Combination 2: Meningococcal, Tdap, HPV'
      }
    ],
    label: 'IMA-E - Immunizations for Adolescents',
    shortLabel: 'IMA-E',
    title: 'Immunizations for Adolescents'
  },
  {
    _id: 'composite-2022-02-27',
    measure: 'composite',
    date: '2022-02-27T00:00:00.000Z',
    value: 45.863095238095234,
    starRating: 2.5,
    numerator: 78,
    denominator: 177,
    initialPopulation: 183,
    exclusions: 129,
    label: 'Composite - Composite Score',
    shortLabel: 'Composite',
    title: 'Composite Score'
  }
];

export const mockCurrentResults = [
  {
    _id: 'composite-2022-02-27',
    measure: 'composite',
    date: '2022-02-27T00:00:00.000Z',
    value: 45.863095238095234,
    starRating: 2.5,
    numerator: 78,
    denominator: 177,
    initialPopulation: 183,
    exclusions: 129,
    label: 'Composite - Composite Score',
    shortLabel: 'Composite',
    title: 'Composite Score'
  },
  {
    _id: 'aab-2022-02-27',
    measure: 'aab',
    date: '2022-02-27T00:00:00.000Z',
    value: 62.5,
    starRating: 3,
    denominator: 32,
    numerator: 20,
    initialPopulation: 33,
    exclusions: 22,
    subScores: [
      {
        measure: 'aab-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 62.5,
        denominator: 32,
        numerator: 20,
        initialPopulation: 33,
        exclusions: 22,
        label:
          'AAB-1 - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis'
      }
    ],
    label:
      'AAB - Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    shortLabel: 'AAB',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis'
  },
  {
    _id: 'aise-2022-02-27',
    measure: 'aise',
    date: '2022-02-27T00:00:00.000Z',
    value: 44.285714285714285,
    starRating: 2,
    denominator: 70,
    numerator: 31,
    initialPopulation: 71,
    exclusions: 72,
    subScores: [
      {
        measure: 'aise-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 36.84210526315789,
        denominator: 19,
        numerator: 7,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Influenza'
      },
      {
        measure: 'aise-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.63157894736842,
        denominator: 19,
        numerator: 10,
        initialPopulation: 19,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Td/Tdap'
      },
      {
        measure: 'aise-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 52.94117647058824,
        denominator: 17,
        numerator: 9,
        initialPopulation: 18,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Zoster'
      },
      {
        measure: 'aise-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 33.33333333333333,
        denominator: 15,
        numerator: 5,
        initialPopulation: 15,
        exclusions: 18,
        label: 'AIS-E - Adult Immunization Status: Pneumococcal'
      }
    ],
    label: 'AIS-E - Adult Immunization Status',
    shortLabel: 'AIS-E',
    title: 'Adult Immunization Status'
  },
  {
    _id: 'drre-2022-02-27',
    measure: 'drre',
    date: '2022-02-27T00:00:00.000Z',
    value: 50,
    starRating: 2.5,
    denominator: 30,
    numerator: 15,
    initialPopulation: 30,
    exclusions: 0,
    subScores: [
      {
        measure: 'drre-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 90,
        denominator: 10,
        numerator: 9,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Follow-Up'
      },
      {
        measure: 'drre-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Remission'
      },
      {
        measure: 'drre-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 0,
        label: 'DRR-E - Depression Response'
      }
    ],
    label:
      'DRR-E - Depression Remission or Response for Adolescents and Adults',
    shortLabel: 'DRR-E',
    title: 'Depression Remission or Response for Adolescents and Adults'
  },
  {
    _id: 'imae-2022-02-27',
    measure: 'imae',
    date: '2022-02-27T00:00:00.000Z',
    value: 26.666666666666668,
    starRating: 1.5,
    denominator: 45,
    numerator: 12,
    initialPopulation: 49,
    exclusions: 35,
    subScores: [
      {
        measure: 'imae-1',
        date: '2022-02-27T00:00:00.000Z',
        value: 40,
        denominator: 10,
        numerator: 4,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Meningococcal Serogroups A, C, W, Y'
      },
      {
        measure: 'imae-2',
        date: '2022-02-27T00:00:00.000Z',
        value: 50,
        denominator: 10,
        numerator: 5,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Tdap'
      },
      {
        measure: 'imae-3',
        date: '2022-02-27T00:00:00.000Z',
        value: 30,
        denominator: 10,
        numerator: 3,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - HPV'
      },
      {
        measure: 'imae-4',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 9,
        numerator: 0,
        initialPopulation: 10,
        exclusions: 7,
        label: 'IMA-E - Combination 1: Meningococcal, Tdap'
      },
      {
        measure: 'imae-5',
        date: '2022-02-27T00:00:00.000Z',
        value: 0,
        denominator: 6,
        numerator: 0,
        initialPopulation: 9,
        exclusions: 7,
        label: 'IMA-E - Combination 2: Meningococcal, Tdap, HPV'
      }
    ],
    label: 'IMA-E - Immunizations for Adolescents',
    shortLabel: 'IMA-E',
    title: 'Immunizations for Adolescents'
  }
];

export const mockActiveMeasure = {
  _id: 'aise-2022-02-27',
  measure: 'aise',
  date: '2022-02-27T00:00:00.000Z',
  value: 44.285714285714285,
  starRating: 2,
  denominator: 70,
  numerator: 31,
  initialPopulation: 71,
  exclusions: 72,
  subScores: [
    {
      measure: 'aise-1',
      date: '2022-02-27T00:00:00.000Z',
      value: 36.84210526315789,
      denominator: 19,
      numerator: 7,
      initialPopulation: 19,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Influenza'
    },
    {
      measure: 'aise-2',
      date: '2022-02-27T00:00:00.000Z',
      value: 52.63157894736842,
      denominator: 19,
      numerator: 10,
      initialPopulation: 19,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Td/Tdap'
    },
    {
      measure: 'aise-3',
      date: '2022-02-27T00:00:00.000Z',
      value: 52.94117647058824,
      denominator: 17,
      numerator: 9,
      initialPopulation: 18,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Zoster'
    },
    {
      measure: 'aise-4',
      date: '2022-02-27T00:00:00.000Z',
      value: 33.33333333333333,
      denominator: 15,
      numerator: 5,
      initialPopulation: 15,
      exclusions: 18,
      label: 'AIS-E - Adult Immunization Status: Pneumococcal'
    }
  ],
  label: 'AIS-E - Adult Immunization Status',
  shortLabel: 'AIS-E',
  title: 'Adult Immunization Status'
};

export const mockMeasure = 'imae';

export const mockInfo = {
  composite: {
    title: 'Composite Score',
    displayLabel: 'Composite',
    hasSubMeasures: false
  },
  aise: {
    domainOfCare: 'ECDS',
    title: 'Adult Immunization Status',
    displayLabel: 'AIS-E',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: true
  },
  'aise-1': {
    domainOfCare: 'ECDS',
    title: 'Adult Immunization Status: Influenza',
    displayLabel: 'AIS-E: Influenza',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  'aise-2': {
    domainOfCare: 'ECDS',
    title: 'Adult Immunization Status: Td/Tdap',
    displayLabel: 'AIS-E: Td/Tdap',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  'aise-3': {
    domainOfCare: 'ECDS',
    title: 'Adult Immunization Status: Zoster',
    displayLabel: 'AIS-E: Zoster',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  'aise-4': {
    domainOfCare: 'ECDS',
    title: 'Adult Immunization Status: Pneumococcal',
    displayLabel: 'AIS-E: Pneumococcal',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  aab: {
    domainOfCare: 'EOC',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    displayLabel: 'AAB',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  'aab-1': {
    domainOfCare: 'EOC',
    title: 'Avoidance of Antibiotic Treatment in Adults with Acute Bronchitis',
    displayLabel: 'AAB',
    measureType: 'process',
    weight: 1,
    hasSubMeasures: false
  },
  drre: {
    domainOfCare: 'ECDS',
    title: 'Depression Remission or Response for Adolescents and Adults',
    displayLabel: 'DRR-E',
    measureType: 'outcome',
    weight: 1,
    hasSubMeasures: true
  },
  'drre-1': {
    domainOfCare: 'ECDS',
    title: 'Depression Follow-Up',
    displayLabel: 'DRR-E: Follow-Up',
    measureType: 'outcome',
    weight: 1,
    hasSubMeasures: false
  },
  'drre-2': {
    domainOfCare: 'ECDS',
    title: 'Depression Remission',
    displayLabel: 'DRR-E: Remission',
    measureType: 'outcome',
    weight: 1,
    hasSubMeasures: false
  },
  'drre-3': {
    domainOfCare: 'ECDS',
    title: 'Depression Response',
    displayLabel: 'DRR-E: Response',
    measureType: 'outcome',
    weight: 1,
    hasSubMeasures: false
  },
  imae: {
    domainOfCare: 'ECDS',
    title: 'Immunizations for Adolescents',
    displayLabel: 'IMA-E',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: true
  },
  'imae-1': {
    domainOfCare: 'ECDS',
    title: 'Meningococcal Serogroups A, C, W, Y',
    displayLabel: 'IMA-E: Meningococcal',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: false
  },
  'imae-2': {
    domainOfCare: 'ECDS',
    title: 'Tdap',
    displayLabel: 'IMA-E: Tdap',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: false
  },
  'imae-3': {
    domainOfCare: 'ECDS',
    title: 'HPV',
    displayLabel: 'IMA-E: HPV',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: false
  },
  'imae-4': {
    domainOfCare: 'ECDS',
    title: 'Combination 1: Meningococcal, Tdap',
    displayLabel: 'IMA-E: Combination 1',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: false
  },
  'imae-5': {
    domainOfCare: 'ECDS',
    title: 'Combination 2: Meningococcal, Tdap, HPV',
    displayLabel: 'IMA-E: Combination 2',
    measureType: 'outcome',
    weight: 3,
    hasSubMeasures: false
  }
};
