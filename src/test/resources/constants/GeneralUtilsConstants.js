// Compliant
export const memberResultTrue = {
    _id: 'imae-491c28bf-b3ce-4967-879c-f65026ae0286-imae-0',
    measurementType: 'imae',
    memberId: 'imae-491c28bf-b3ce-4967-879c-f65026ae0286',
    timeStamp: '2025-01-22T19:49:26.085Z',
    coverage: [
        {
            status: {
                value: 'active'
            },
            type: {
                coding: [
                    {
                        system: {
                            value: 'https://terminology.hl7.org/CodeSystem/v3-ActCode'
                        },
                        code: {
                            value: 'MCPOL'
                        },
                        display: {
                            value: 'Managed Care Policy'
                        }
                    }
                ]
            },
            subscriber: {
                reference: {
                    value: 'Patient/imae-491c28bf-b3ce-4967-879c-f65026ae0286'
                }
            },
            beneficiary: {
                reference: {
                    value: 'Patient/imae-491c28bf-b3ce-4967-879c-f65026ae0286'
                }
            },
            relationship: {
                coding: [
                    {
                        code: {
                            value: 'self'
                        }
                    }
                ]
            },
            period: {
                start: {
                    value: '2024-01-22'
                },
                end: {
                    value: '2026-01-22'
                }
            },
            payor: [
                {
                    reference: {
                        value: 'Organization/1'
                    }
                }
            ],
            id: {
                value: 'fdee72de-dcff-4f04-a785-be478a58590a'
            }
        }
    ],
    providers: [
        {
            reference: 'Organization?identifier=667531',
            display: 'Hollifield Clinics'
        },
        {
            reference: 'Practitioner?identifier=7882499',
            display: 'Nurse Practitioner Sharon Arthurs'
        }
    ],
    'imae-491c28bf-b3ce-4967-879c-f65026ae0286': {
        'Initial Population 1': true,
        'Initial Population 2': true,
        'Initial Population 3': true,
        'Initial Population 4': true,
        'Initial Population 5': true,
        'Exclusions 1': false,
        'Exclusions 2': false,
        'Exclusions 3': false,
        'Exclusions 4': false,
        'Exclusions 5': false,
        'Denominator 1': true,
        'Denominator 2': true,
        'Denominator 3': true,
        'Denominator 4': true,
        'Denominator 5': true,
        'Numerator 1': true,
        'Numerator 2': true,
        'Numerator 3': true,
        'Numerator 4': true,
        'Numerator 5': true,
        id: 'imae-491c28bf-b3ce-4967-879c-f65026ae0286'
    }
};
export const complianceResultTrue = [true, true, true, true, true];

// Not compliant
export const memberResultFalse = {
    _id: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb-aab-0',
    measurementType: 'aab',
    memberId: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb',
    timeStamp: '2025-01-16T19:49:25.983Z',
    coverage: [
        {
            status: {
                value: 'active'
            },
            type: {
                coding: [
                    {
                        system: {
                            value: 'https://terminology.hl7.org/CodeSystem/v3-ActCode'
                        },
                        code: {
                            value: 'HMO'
                        },
                        display: {
                            value: 'Health Maintenance Organization Policy'
                        }
                    }
                ]
            },
            subscriber: {
                reference: {
                    value: 'Patient/aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
                }
            },
            beneficiary: {
                reference: {
                    value: 'Patient/aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
                }
            },
            relationship: {
                coding: [
                    {
                        code: {
                            value: 'self'
                        }
                    }
                ]
            },
            period: {
                start: {
                    value: '2024-01-16'
                },
                end: {
                    value: '2026-01-16'
                }
            },
            payor: [
                {
                    reference: {
                        value: 'Organization/3'
                    }
                }
            ],
            id: {
                value: '0a6bf918-b968-4484-9b78-4875bbdcbb52'
            }
        }
    ],
    providers: [
        {
            reference: 'Organization?identifier=71533123',
            display: 'Springfield Hospital'
        },
        {
            reference: 'Practitioner?identifier=1143',
            display: 'Dr. Marc Weber, General Practitioner'
        }
    ],
    'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb': {
        'Initial Population': ['2025-01-14'],
        Exclusions: [],
        Denominator: ['2025-01-14'],
        Numerator: [],
        id: 'aab-d41f1204-81c2-464d-a06a-dd2ea09512eb'
    }
};
export const complianceResultFalse = [false];
