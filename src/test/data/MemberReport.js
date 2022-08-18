export const exportUrl = 'this.is.a.valid.url/wow'

export const coverage = [
  {
    status: {
      value: 'active',
    },
    type: {
      coding: [
        {
          system: {
            value: 'https://example.com',
          },
          code: {
            value: 'MCPOL',
          },
          display: {
            value: 'Managed Care Policy',
          },
        },
      ],
    },
    subscriber: {
      reference: {
        value: 'Patient/aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
      },
    },
    beneficiary: {
      reference: {
        value: 'Patient/aab-8856f155-7dc5-4666-8fe7-cc4638fe91ad',
      },
    },
    relationship: {
      coding: [
        {
          code: {
            value: 'self',
          },
        },
      ],
    },
    period: {
      start: {
        value: '2021-06-06',
      },
      end: {
        value: '2023-06-06',
      },
    },
    payor: [
      {
        reference: {
          value: 'Organization/3',
        },
      },
    ],
    id: {
      value: '6bd97cad-779f-418a-8bd5-0c3fce18cade',
    },
  },
]

export const rowData = [{
  0:
    {
      conditions: 'N/A',
      dates: 'N/A',
      exclusions: [],
      measure: 'AAB',
      practitioner: 'N/A',
      recommendations: 'N/A',
      status: false,
      type: 'Measure',
      value: 'aab',
    },
}]

export const description = 'testing is my favourite fun of them alls'
